import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileCheck2,
  Upload,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Sparkles,
  Menu,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Copy,
  Check,
  ArrowRight,
  AlertCircle,
  SpellCheck,
  UserCheck,
  Cpu,
  Layers,
  Edit3,
  X,
  Sun,
  Moon,
  Info
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { ScoreGauge } from '../components/ScoreGauge';
import { VivaModal } from '../components/VivaModal';
import { extractTextFromFile } from '../services/pdfExtractor';
import { analyzeResumeText } from '../services/resumeAnalyzer';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { ResumeAnalysisResult } from '../types/resume';
import { useTheme } from '../context/ThemeContext';

export const ResumeCheckerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Resume state
  const [resumeText, setResumeText] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string>('sample_resume.pdf');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [showFullExtractedText, setShowFullExtractedText] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'sections' | 'breakdown'>('overview');

  // Manual paste modal state
  const [pasteModalOpen, setPasteModalOpen] = useState(false);
  const [manualTextDraft, setManualTextDraft] = useState('');

  // Load sample or previously uploaded resume on initial mount
  useEffect(() => {
    const sampleParam = searchParams.get('sample');
    const storedText = sessionStorage.getItem('resumeforge_uploaded_text');
    const storedName = sessionStorage.getItem('resumeforge_uploaded_name');

    if (sampleParam) {
      const sample = SAMPLE_RESUMES.find((s) => s.id === sampleParam) || SAMPLE_RESUMES[0];
      loadTextForAnalysis(sample.content, `${sample.id}.pdf`);
    } else if (storedText) {
      loadTextForAnalysis(storedText, storedName || 'uploaded_resume.pdf');
      sessionStorage.removeItem('resumeforge_uploaded_text');
      sessionStorage.removeItem('resumeforge_uploaded_name');
    } else {
      // Default to weak/incomplete resume to showcase mistake detection and score calculation
      loadTextForAnalysis(SAMPLE_RESUMES[1].content, 'sample_student_resume.pdf');
    }
  }, [searchParams]);

  const loadTextForAnalysis = (text: string, fileName: string) => {
    if (!text || text.trim().length < 50) {
      setErrorMessage('Resume content is insufficient for analysis.');
      return;
    }
    setErrorMessage(null);
    setResumeText(text);
    setCurrentFileName(fileName);
    const result = analyzeResumeText(text, fileName);
    setAnalysisResult(result);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setErrorMessage('Please upload your resume first.');
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
      setErrorMessage('Please upload a PDF, DOC or DOCX file.');
      return;
    }

    setIsExtracting(true);
    setErrorMessage(null);

    try {
      const res = await extractTextFromFile(file);
      setIsExtracting(false);

      if (!res.success) {
        setErrorMessage(res.error || 'Unable to extract text from this PDF.');
        return;
      }

      loadTextForAnalysis(res.text, file.name);
    } catch {
      setIsExtracting(false);
      setErrorMessage('Unable to extract text from this PDF.');
    }
  };

  const handleApplyPastedText = () => {
    if (!manualTextDraft || manualTextDraft.trim().length < 50) {
      setErrorMessage('Resume content is insufficient for analysis.');
      return;
    }
    loadTextForAnalysis(manualTextDraft, 'custom_pasted_resume.txt');
    setPasteModalOpen(false);
    setManualTextDraft('');
  };

  const handleCopyText = () => {
    if (!resumeText) return;
    navigator.clipboard.writeText(resumeText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-executive-canvas text-slate-100' : 'bg-professional-light text-slate-900'}`}>
      {/* Sidebar */}
      <Sidebar
        onOpenVivaModal={() => setVivaModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top bar with Professional Theme Switcher */}
        <header className={`sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between border-b transition-colors ${
          isDark
            ? 'bg-slate-950/80 backdrop-blur-md border-slate-800/80 text-slate-200'
            : 'bg-white/95 backdrop-blur-md border-slate-200/90 text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className={`p-1.5 lg:hidden rounded-md ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Link to="/dashboard" className={`${isDark ? 'hover:text-blue-400' : 'hover:text-slate-900'} transition-colors`}>Career Workspace</Link>
              <span>/</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Resume Checker Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-600" />}
              <span className="hidden sm:inline">{isDark ? 'Professional Light' : 'Executive Dark'}</span>
            </button>

            <span className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
              isDark
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Main Working Module
            </span>

            <button
              type="button"
              onClick={() => setVivaModalOpen(true)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'text-blue-400 hover:text-blue-300 bg-blue-950/60 border-blue-800/60'
                  : 'text-blue-600 hover:text-blue-700 bg-blue-50 border-blue-200'
              }`}
            >
              Academic Defense Guide
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header Banner */}
          <div className={`rounded-xl border p-6 transition-all ${
            isDark
              ? 'bg-slate-900/70 border-slate-800/80 shadow-lg shadow-black/20 backdrop-blur-xs'
              : 'bg-white border-slate-200/90 shadow-xs'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Resume Checker
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload PDF &rarr; Extract Text via PDF.js &rarr; Analyze & Detect Problems &rarr; Dynamic Score & Corrections
                  </p>
                </div>
              </div>

              {/* Upload & Quick Switchers */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {/* PDF Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isExtracting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isExtracting ? 'Extracting via PDF.js...' : 'Upload Resume PDF'}</span>
                </button>

                {/* Paste Text Directly Button */}
                <button
                  type="button"
                  onClick={() => setPasteModalOpen(true)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Paste Text Directly</span>
                </button>

                {/* Sample Profile Switcher */}
                <div className="relative group">
                  <button
                    type="button"
                    className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 border transition-all ${
                      isDark
                        ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Test Sample Profiles</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <div className={`absolute right-0 mt-1 w-64 border rounded-xl shadow-xl py-1.5 z-20 hidden group-hover:block ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <p className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">
                      Compare Score Differences
                    </p>
                    {SAMPLE_RESUMES.map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => loadTextForAnalysis(sample.content, `${sample.id}.pdf`)}
                        className={`w-full text-left px-3 py-2 text-xs flex flex-col transition-colors ${
                          isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-blue-50 text-slate-700'
                        }`}
                      >
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{sample.name.split('(')[0]}</span>
                        <span className="text-[11px] text-slate-400">Expected Score: {sample.expectedScore}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PROFESSIONAL NOTICE & RECOVERY CARD (When extraction error occurs) */}
          {errorMessage && (
            <div className={`rounded-xl border p-5 transition-all space-y-3 ${
              isDark
                ? 'bg-red-950/30 border-red-800/50 text-red-200'
                : 'bg-red-50/80 border-red-200 text-red-800'
            }`}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-red-400">Notice: {errorMessage}</p>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                      Diagnostic Help
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This typically happens if the uploaded document contains flat image scans (without an OCR text stream), protected fonts, or non-standard encoding. Use the recovery options below to proceed immediately without interruption:
                  </p>
                </div>
              </div>

              {/* Action Buttons to recover instantly */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-red-900/40">
                <button
                  type="button"
                  onClick={() => setPasteModalOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Paste Resume Text Directly</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadTextForAnalysis(SAMPLE_RESUMES[0].content, 'aravind_sharma_resume.pdf')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>Load Sample High-Score Resume (91%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadTextForAnalysis(SAMPLE_RESUMES[1].content, 'sample_student_resume.pdf')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>Load Sample Weak Resume (52%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1"
                >
                  Try Another File
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: EXTRACTED RESUME TEXT SECTION */}
          <div className={`rounded-xl border p-5 transition-all space-y-3 ${
            isDark
              ? 'bg-slate-900/70 border-slate-800/80 shadow-lg shadow-black/20'
              : 'bg-white border-slate-200/90 shadow-xs'
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Extracted Resume Text
                </h3>
                <span className="text-slate-500">&middot;</span>
                <span className="text-xs text-blue-400 font-mono font-medium">{currentFileName}</span>
                <span className="text-slate-500">&middot;</span>
                <span className="text-xs text-slate-400">{analysisResult?.wordCount || 0} words</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPasteModalOpen(true)}
                  className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit / Replace Text</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowFullExtractedText(!showFullExtractedText)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>{showFullExtractedText ? 'Collapse Text' : 'Expand Text'}</span>
                  {showFullExtractedText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
            </div>

            {showFullExtractedText && (
              <pre className={`text-xs font-mono p-4 rounded-lg overflow-x-auto max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed border transition-colors ${
                isDark
                  ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                {resumeText}
              </pre>
            )}
          </div>

          {analysisResult && (
            <>
              {/* STEP 2: RESULT UI - OVERALL RESUME SCORE & 5 STATUS CARDS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Analysis Results & Performance Report
                  </h2>
                  <span className="text-xs font-medium text-slate-400">
                    Dynamically Calculated &middot; Bounded 20% – 95%
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                  
                  {/* OVERALL RESUME SCORE CARD (Spans 2 columns on large screen) */}
                  <div className={`lg:col-span-2 rounded-xl border p-6 flex flex-col items-center justify-center text-center transition-all ${
                    isDark
                      ? 'bg-slate-900/70 border-slate-800/80 shadow-lg shadow-black/20'
                      : 'bg-white border-slate-200/90 shadow-xs'
                  }`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Overall Resume Score
                    </span>
                    
                    <ScoreGauge
                      score={analysisResult.overallScore}
                      size={165}
                      strokeWidth={14}
                      label={analysisResult.scoreGrade}
                      subtitle="Evaluated via rule-based scoring engine"
                    />

                    <div className={`mt-4 pt-3 border-t w-full flex items-center justify-around text-xs ${
                      isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                    }`}>
                      <div>
                        <span className="block text-[11px] uppercase">Base</span>
                        <span className={`font-semibold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>100</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase">Deductions</span>
                        <span className="font-semibold text-red-400 tabular-nums">
                          -{100 - analysisResult.overallScore}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase">Status</span>
                        <span className="font-semibold text-blue-400">
                          {analysisResult.scoreGrade}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 5 STATUS CARDS REQUIRED BY SPECIFICATION (Spans 4 columns) */}
                  <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    
                    {/* Card 1: Grammar & Spelling */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200/90 shadow-xs'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Grammar & Spelling</span>
                        <SpellCheck className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <span
                          className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md ${
                            analysisResult.statusCards.grammarAndSpelling === 'Good'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {analysisResult.statusCards.grammarAndSpelling}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-2">
                          {analysisResult.statusCards.grammarAndSpelling === 'Good'
                            ? 'Technical capitalization verified'
                            : 'Detected capitalization/spacing issues'}
                        </p>
                      </div>
                    </div>

                    {/* Card 2: Contact Information */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200/90 shadow-xs'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Contact Information</span>
                        <UserCheck className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <span
                          className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md ${
                            analysisResult.statusCards.contactInformation === 'Good'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {analysisResult.statusCards.contactInformation}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-2">
                          {analysisResult.contact.email.value && analysisResult.contact.phone.value
                            ? 'Email & Phone present'
                            : !analysisResult.contact.email.value
                            ? 'Missing Email address'
                            : 'Missing Phone number'}
                        </p>
                      </div>
                    </div>

                    {/* Card 3: Technical Skills */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200/90 shadow-xs'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Technical Skills</span>
                        <Cpu className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <span
                          className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md ${
                            analysisResult.statusCards.technicalSkills === 'Good'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {analysisResult.statusCards.technicalSkills}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-2">
                          {analysisResult.skills.detected.length} core skills detected
                        </p>
                      </div>
                    </div>

                    {/* Card 4: Resume Sections */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200/90 shadow-xs'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Resume Sections</span>
                        <Layers className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <span
                          className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md ${
                            analysisResult.statusCards.resumeSections === 'Good'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {analysisResult.statusCards.resumeSections}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-2">
                          {analysisResult.sections.missing.length === 0
                            ? 'All 6 key sections present'
                            : `Missing ${analysisResult.sections.missing.length} section(s)`}
                        </p>
                      </div>
                    </div>

                    {/* Card 5: Weak Statements */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between sm:col-span-2 lg:col-span-2 transition-all ${
                      isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200/90 shadow-xs'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Weak Statements</span>
                        <AlertTriangle className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <span
                          className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md ${
                            analysisResult.statusCards.weakStatements === 'Review Required'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {analysisResult.statusCards.weakStatements}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-2">
                          {analysisResult.weakStatements.totalCount > 0
                            ? `${analysisResult.weakStatements.totalCount} weak passive phrase(s) flagged`
                            : 'Zero weak passive phrases flagged'}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* STEP 3: MISTAKES & CORRECTIONS SECTION */}
              <div className={`rounded-xl border p-6 space-y-4 transition-all ${
                isDark
                  ? 'bg-slate-900/70 border-slate-800/80 shadow-lg shadow-black/20'
                  : 'bg-white border-slate-200/90 shadow-xs'
              }`}>
                <div className={`flex items-center justify-between pb-3 border-b ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      Mistakes & Professional Corrections
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Transforms passive, elementary statements into quantifiable action-oriented engineering bullet points.
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                    isDark
                      ? 'bg-blue-950/60 text-blue-300 border-blue-800/50'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {analysisResult.weakStatements.totalCount} Weak Verb(s) Flagged
                  </span>
                </div>

                {/* Detected Mistakes List */}
                <div className="space-y-3">
                  {analysisResult.weakStatements.items.length > 0 ? (
                    analysisResult.weakStatements.items.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border space-y-3 ${
                          isDark
                            ? 'bg-slate-950/60 border-slate-800/90'
                            : 'bg-slate-50/70 border-slate-200/90'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${
                            isDark
                              ? 'bg-red-950/60 border-red-800 text-red-300'
                              : 'bg-red-50 border-red-200 text-red-700'
                          }`}>
                            Weak phrase: &ldquo;{item.phrase}&rdquo;
                          </span>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                            isDark
                              ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            Review Required
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className={`p-3 rounded-lg border ${
                            isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                          }`}>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              Detected in context:
                            </span>
                            <p className="font-mono italic">{item.originalSnippet}</p>
                          </div>

                          <div className={`p-3 rounded-lg border ${
                            isDark ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          }`}>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                              Professional Correction:
                            </span>
                            <p className="font-bold text-emerald-300">
                              &ldquo;{item.suggestion}&rdquo;
                            </p>
                            <p className="text-[11px] text-emerald-400/90 mt-1">{item.reason}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`p-4 rounded-lg border text-xs flex items-center gap-2 ${
                      isDark
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>No weak phrases detected. The resume utilizes authoritative action verbs!</span>
                    </div>
                  )}
                </div>

                {/* Spelling & Phrasing Corrections */}
                <div className={`pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <span className="text-xs font-bold text-slate-400 block mb-2">
                    Spelling & Capitalization Corrections:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className={`p-3 border rounded-lg ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <span className="text-slate-400 line-through">javascript</span>
                      <p className="font-semibold text-emerald-400 mt-1">&rarr; JavaScript</p>
                    </div>
                    <div className={`p-3 border rounded-lg ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <span className="text-slate-400 line-through">certificatein</span>
                      <p className="font-semibold text-emerald-400 mt-1">&rarr; certificate in</p>
                    </div>
                    <div className={`p-3 border rounded-lg ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <span className="text-slate-400 line-through">java programming</span>
                      <p className="font-semibold text-emerald-400 mt-1">&rarr; Java Programming</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4: RECOMMENDATIONS SECTION (EXACT 6 BULLETS) */}
              <div className={`rounded-xl border p-6 space-y-4 transition-all ${
                isDark
                  ? 'bg-slate-900/70 border-slate-800/80 shadow-lg shadow-black/20'
                  : 'bg-white border-slate-200/90 shadow-xs'
              }`}>
                <div className={`flex items-center gap-2 pb-2 border-b ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Recommendations
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  
                  <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                      1
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Improve weak statements</h4>
                      <p className="text-slate-400 mt-0.5">
                        Replace generic verbs like &ldquo;worked on&rdquo; and &ldquo;responsible for&rdquo; with active execution verbs such as &ldquo;Developed&rdquo;, &ldquo;Architected&rdquo;, and &ldquo;Managed&rdquo;.
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                      2
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Add relevant technical keywords</h4>
                      <p className="text-slate-400 mt-0.5">
                        Ensure role-critical competencies (e.g. Git, REST APIs, SQL, Data Structures) are explicitly featured in your skills section.
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                      3
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Correct spelling and grammar</h4>
                      <p className="text-slate-400 mt-0.5">
                        Use industry-standard technical capitalization (&ldquo;JavaScript&rdquo;, &ldquo;React.js&rdquo;, &ldquo;Node.js&rdquo;) and check for spacing errors.
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                      4
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Add missing resume sections</h4>
                      <p className="text-slate-400 mt-0.5">
                        Ensure all 6 key sections (Education, Skills, Projects, Experience, Certifications, Summary / Objective) are populated.
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                      5
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Use measurable project achievements</h4>
                      <p className="text-slate-400 mt-0.5">
                        Quantify results with performance statistics, user counts, or operational efficiency improvements (e.g. &ldquo;reduced latency by 35%&rdquo;).
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                      6
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Improve professional wording</h4>
                      <p className="text-slate-400 mt-0.5">
                        Avoid ambiguous phrases like &ldquo;good knowledge of&rdquo; and replace them with standard proficiency markers such as &ldquo;Proficient in&rdquo;.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* STEP 5: DEEP AUDIT DETAILS TABS */}
              <div className={`rounded-xl border overflow-hidden transition-all ${
                isDark
                  ? 'bg-slate-900/70 border-slate-800/80 shadow-lg shadow-black/20'
                  : 'bg-white border-slate-200/90 shadow-xs'
              }`}>
                <div className={`flex items-center gap-1 p-2 border-b overflow-x-auto ${
                  isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100/70 border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === 'overview'
                        ? isDark ? 'bg-slate-800 text-blue-400' : 'bg-white text-blue-600 shadow-xs'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Contact & Section Audit
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('skills')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === 'skills'
                        ? isDark ? 'bg-slate-800 text-blue-400' : 'bg-white text-blue-600 shadow-xs'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Technical Skills ({analysisResult.skills.detected.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('breakdown')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === 'breakdown'
                        ? isDark ? 'bg-slate-800 text-blue-400' : 'bg-white text-blue-600 shadow-xs'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Dynamic Score Math Table
                  </button>
                </div>

                {/* Tab 1: Contact & Sections */}
                {activeTab === 'overview' && (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    
                    {/* Contact Detection */}
                    <div className={`p-4 rounded-lg border space-y-3 ${
                      isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/50 border-slate-200'
                    }`}>
                      <span className={`font-bold uppercase tracking-wider block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Contact Information Regex Detection
                      </span>
                      <div className="space-y-2">
                        <div className={`p-2.5 rounded border flex justify-between items-center ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                        }`}>
                          <div>
                            <span className="font-semibold text-slate-400">Email:</span>
                            <span className="ml-2 font-mono text-blue-400">
                              {analysisResult.contact.email.value || 'Not Detected'}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            analysisResult.contact.email.status === 'Good'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}>
                            {analysisResult.contact.email.status}
                          </span>
                        </div>

                        <div className={`p-2.5 rounded border flex justify-between items-center ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                        }`}>
                          <div>
                            <span className="font-semibold text-slate-400">Phone:</span>
                            <span className="ml-2 font-mono text-blue-400">
                              {analysisResult.contact.phone.value || 'Not Detected'}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            analysisResult.contact.phone.status === 'Good'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}>
                            {analysisResult.contact.phone.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Penalties: -10 for missing email, -10 for missing phone number.
                      </p>
                    </div>

                    {/* Section Detection */}
                    <div className={`p-4 rounded-lg border space-y-3 ${
                      isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/50 border-slate-200'
                    }`}>
                      <span className={`font-bold uppercase tracking-wider block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Resume Sections Detection ({analysisResult.sections.detected.length}/6)
                      </span>
                      <div>
                        <span className="text-slate-400 block mb-1">Detected:</span>
                        <div className="flex flex-wrap gap-1">
                          {analysisResult.sections.detected.map((sec) => (
                            <span key={sec} className={`px-2 py-0.5 rounded font-medium border ${
                              isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                            }`}>
                              ✓ {sec}
                            </span>
                          ))}
                        </div>
                      </div>
                      {analysisResult.sections.missing.length > 0 && (
                        <div className={`p-2.5 rounded border ${
                          isDark ? 'bg-amber-950/30 border-amber-800 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
                        }`}>
                          <span className="font-semibold block mb-1">Missing Sections:</span>
                          <span className="font-medium">
                            {analysisResult.sections.missing.join(', ')}
                          </span>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-400">
                        Penalties: 1 missing (-5), 2 missing (-10), 3+ missing (-15).
                      </p>
                    </div>

                  </div>
                )}

                {/* Tab 2: Technical Skills */}
                {activeTab === 'skills' && (
                  <div className="p-6 space-y-4 text-xs">
                    <div className={`p-3 rounded-lg border ${
                      isDark ? 'bg-blue-950/40 border-blue-800/60' : 'bg-blue-50/60 border-blue-200'
                    }`}>
                      <span className={`font-bold block mb-1 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                        Detected Skills Summary:
                      </span>
                      <p className="font-mono font-semibold text-blue-400">
                        {analysisResult.skills.detected.length > 0
                          ? `Detected Skills: ${analysisResult.skills.detected.join(', ')}`
                          : 'Needs Improvement — No recognized technical skills detected.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg border ${
                        isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`font-bold block mb-1.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>Programming & Web:</span>
                        <div className="flex flex-wrap gap-1">
                          {[
                            ...analysisResult.skills.detectedCategories.programming,
                            ...analysisResult.skills.detectedCategories.web
                          ].map((s) => (
                            <span key={s} className={`px-2 py-0.5 rounded border ${
                              isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                            }`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={`p-3 rounded-lg border ${
                        isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`font-bold block mb-1.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>Hardware, AI & Core:</span>
                        <div className="flex flex-wrap gap-1">
                          {[
                            ...analysisResult.skills.detectedCategories.hardware,
                            ...analysisResult.skills.detectedCategories.data_ai,
                            ...analysisResult.skills.detectedCategories.soft_skills
                          ].map((s) => (
                            <span key={s} className={`px-2 py-0.5 rounded border ${
                              isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                            }`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Score Math Breakdown */}
                {activeTab === 'breakdown' && (
                  <div className="p-6 text-xs space-y-4">
                    <div className={`border rounded-xl overflow-hidden ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}>
                      <table className="w-full text-left">
                        <thead className={`uppercase text-[10px] tracking-wider border-b ${
                          isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          <tr>
                            <th className="py-2.5 px-4 font-semibold">Criteria</th>
                            <th className="py-2.5 px-4 font-semibold">Observed Status</th>
                            <th className="py-2.5 px-4 font-semibold text-right">Penalty</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y font-medium ${
                          isDark ? 'divide-slate-800' : 'divide-slate-200'
                        }`}>
                          <tr>
                            <td className={`py-2.5 px-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Base Starting Score</td>
                            <td className="py-2.5 px-4 text-slate-400">Standard starting pool</td>
                            <td className="py-2.5 px-4 text-right text-emerald-400 font-bold tabular-nums">100</td>
                          </tr>
                          <tr>
                            <td className={`py-2.5 px-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Missing Email</td>
                            <td className="py-2.5 px-4 text-slate-400">{analysisResult.contact.email.value ? 'Email present' : 'Missing email address'}</td>
                            <td className="py-2.5 px-4 text-right tabular-nums text-red-400 font-semibold">
                              {analysisResult.scoreBreakdown.emailDeduction > 0 ? `-${analysisResult.scoreBreakdown.emailDeduction}` : '0'}
                            </td>
                          </tr>
                          <tr>
                            <td className={`py-2.5 px-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Missing Phone</td>
                            <td className="py-2.5 px-4 text-slate-400">{analysisResult.contact.phone.value ? 'Phone present' : 'Missing phone number'}</td>
                            <td className="py-2.5 px-4 text-right tabular-nums text-red-400 font-semibold">
                              {analysisResult.scoreBreakdown.phoneDeduction > 0 ? `-${analysisResult.scoreBreakdown.phoneDeduction}` : '0'}
                            </td>
                          </tr>
                          <tr>
                            <td className={`py-2.5 px-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Low Technical Skills</td>
                            <td className="py-2.5 px-4 text-slate-400">{analysisResult.skills.detected.length} skills detected</td>
                            <td className="py-2.5 px-4 text-right tabular-nums text-red-400 font-semibold">
                              {analysisResult.scoreBreakdown.skillsDeduction > 0 ? `-${analysisResult.scoreBreakdown.skillsDeduction}` : '0'}
                            </td>
                          </tr>
                          <tr>
                            <td className={`py-2.5 px-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Missing Sections</td>
                            <td className="py-2.5 px-4 text-slate-400">{analysisResult.sections.missing.length} missing</td>
                            <td className="py-2.5 px-4 text-right tabular-nums text-red-400 font-semibold">
                              {analysisResult.scoreBreakdown.sectionsDeduction > 0 ? `-${analysisResult.scoreBreakdown.sectionsDeduction}` : '0'}
                            </td>
                          </tr>
                          <tr>
                            <td className={`py-2.5 px-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Weak Statements</td>
                            <td className="py-2.5 px-4 text-slate-400">{analysisResult.weakStatements.totalCount} flagged</td>
                            <td className="py-2.5 px-4 text-right tabular-nums text-red-400 font-semibold">
                              {analysisResult.scoreBreakdown.weakStatementsDeduction > 0 ? `-${analysisResult.scoreBreakdown.weakStatementsDeduction}` : '0'}
                            </td>
                          </tr>
                          <tr>
                            <td className={`py-2.5 px-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Spelling / Grammar</td>
                            <td className="py-2.5 px-4 text-slate-400">Standardization penalties</td>
                            <td className="py-2.5 px-4 text-right tabular-nums text-red-400 font-semibold">
                              {analysisResult.scoreBreakdown.spellingDeduction > 0 ? `-${analysisResult.scoreBreakdown.spellingDeduction}` : '0'}
                            </td>
                          </tr>
                          <tr className={`font-bold ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                            <td className="py-3 px-4">Final Dynamic Score</td>
                            <td className="py-3 px-4 text-slate-400">Graded: {analysisResult.scoreGrade} (Bound: 20% – 95%)</td>
                            <td className="py-3 px-4 text-right text-base text-blue-400 tabular-nums font-extrabold">
                              {analysisResult.overallScore}%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            </>
          )}

        </main>
      </div>

      {/* PASTE RESUME TEXT MODAL */}
      {pasteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`relative max-w-2xl w-full rounded-2xl border shadow-2xl overflow-hidden ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm">Paste or Edit Resume Text</h3>
              </div>
              <button
                type="button"
                onClick={() => setPasteModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-400">
                Paste your resume text directly below. Useful if your PDF was scanned as an image or you have your resume in plain text:
              </p>
              <textarea
                rows={10}
                value={manualTextDraft}
                onChange={(e) => setManualTextDraft(e.target.value)}
                placeholder="Paste resume content here (e.g. John Doe, Email, Education, Technical Skills, Projects, Work Experience)..."
                className={`w-full text-xs font-mono p-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-200'
                    : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              />
            </div>

            <div className={`px-6 py-3.5 border-t flex justify-end gap-2 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setPasteModalOpen(false)}
                className={`px-4 py-2 text-xs font-medium rounded-lg border ${
                  isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyPastedText}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
              >
                Analyze Pasted Resume
              </button>
            </div>
          </div>
        </div>
      )}

      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </div>
  );
};
