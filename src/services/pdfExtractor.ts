import * as pdfjsLib from 'pdfjs-dist';
// Import local worker via Vite ?url to ensure exact version matching (6.4.299)
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
}

export interface ExtractionResult {
  success: boolean;
  text: string;
  pageCount: number;
  error?: string;
}

function extractFallbackPdfStreams(arrayBuffer: ArrayBuffer): string {
  try {
    const uint8 = new Uint8Array(arrayBuffer);
    const decoder = new TextDecoder('latin1');
    const fullContent = decoder.decode(uint8);

    // Extract text in parentheses before Tj
    const textMatches = fullContent.match(/\(([^()]{2,})\)\s*Tj/g);
    if (textMatches && textMatches.length > 5) {
      return textMatches
        .map((m) => m.replace(/\)\s*Tj$/, '').replace(/^\(/, ''))
        .filter((s) => s.trim().length > 0)
        .join(' ')
        .trim();
    }

    // Extract text in TJ array blocks: [(text) 10 (text)] TJ
    const tjArrays = fullContent.match(/\[(.*?)\]\s*TJ/g);
    if (tjArrays && tjArrays.length > 5) {
      const extracted: string[] = [];
      tjArrays.forEach((arr) => {
        const innerMatches = arr.match(/\(([^()]+)\)/g);
        if (innerMatches) {
          extracted.push(innerMatches.map((m) => m.slice(1, -1)).join(''));
        }
      });
      const combined = extracted.join(' ').trim();
      if (combined.length > 50) {
        return combined;
      }
    }
  } catch (e) {
    console.warn('Fallback stream extraction failed', e);
  }
  return '';
}

export async function extractTextFromFile(file: File): Promise<ExtractionResult> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (!extension || !['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
    return {
      success: false,
      text: '',
      pageCount: 0,
      error: 'Please upload a PDF, DOC or DOCX file.'
    };
  }

  // Handle plain text files directly
  if (extension === 'txt') {
    try {
      const text = await file.text();
      if (!text || text.trim().length < 50) {
        return {
          success: false,
          text: '',
          pageCount: 1,
          error: 'Resume content is insufficient for analysis.'
        };
      }
      return { success: true, text: text.trim(), pageCount: 1 };
    } catch {
      return {
        success: false,
        text: '',
        pageCount: 0,
        error: 'Unable to read file content. Please try another file.'
      };
    }
  }

  // Handle PDF files with PDF.js
  if (extension === 'pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        useSystemFonts: true
      });
      
      const pdfDocument = await loadingTask.promise;
      const totalPages = pdfDocument.numPages;
      let fullExtractedText = '';

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        const pageStrings = textContent.items
          .map((item: any) => (item && 'str' in item ? item.str : ''))
          .join(' ');
        
        fullExtractedText += pageStrings + '\n\n';
      }

      const trimmedText = fullExtractedText.trim();
      if (!trimmedText || trimmedText.length < 50) {
        // Attempt secondary stream decoding fallback
        const fallbackText = extractFallbackPdfStreams(arrayBuffer);
        if (fallbackText && fallbackText.length >= 50) {
          return {
            success: true,
            text: fallbackText,
            pageCount: totalPages
          };
        }

        return {
          success: false,
          text: '',
          pageCount: totalPages,
          error: 'Resume content is insufficient for analysis.'
        };
      }

      return {
        success: true,
        text: trimmedText,
        pageCount: totalPages
      };
    } catch (err: any) {
      console.error('PDF Extraction error:', err);
      // Attempt secondary stream decoding fallback even if pdfjs worker threw
      try {
        const arrayBuffer = await file.arrayBuffer();
        const fallbackText = extractFallbackPdfStreams(arrayBuffer);
        if (fallbackText && fallbackText.length >= 50) {
          return {
            success: true,
            text: fallbackText,
            pageCount: 1
          };
        }
      } catch (streamErr) {
        console.warn('Fallback stream error', streamErr);
      }

      return {
        success: false,
        text: '',
        pageCount: 0,
        error: 'Unable to extract text from this PDF.'
      };
    }
  }

  // For DOC / DOCX in browser client without heavy binary node unzippers:
  // In a frontend-only environment, binary docx extraction requires unzipping XML.
  // We provide a quick text unzipper or friendly prompt:
  if (extension === 'docx') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const textDecoder = new TextDecoder('utf-8');
      const rawStr = textDecoder.decode(arrayBuffer);
      // Basic XML text node extractor for word/document.xml if plain text was stored
      const matches = rawStr.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
      if (matches && matches.length > 5) {
        const docText = matches.map(m => m.replace(/<[^>]+>/g, '')).join(' ');
        if (docText.trim().length >= 50) {
          return { success: true, text: docText.trim(), pageCount: 1 };
        }
      }
      return {
        success: false,
        text: '',
        pageCount: 0,
        error: 'For best results, please convert DOCX to PDF format or use our Sample Resumes.'
      };
    } catch {
      return {
        success: false,
        text: '',
        pageCount: 0,
        error: 'Unable to extract text from this DOCX file. Please upload a PDF resume.'
      };
    }
  }

  return {
    success: false,
    text: '',
    pageCount: 0,
    error: 'Please upload a PDF, DOC or DOCX file.'
  };
}
