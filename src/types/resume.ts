export interface SkillDetection {
  name: string;
  found: boolean;
  category: 'programming' | 'web' | 'hardware' | 'data_ai' | 'soft_skills';
}

export interface SectionDetection {
  name: string;
  key: 'education' | 'skills' | 'projects' | 'experience' | 'certifications' | 'summary';
  found: boolean;
}

export interface WeakPhraseMatch {
  phrase: string;
  count: number;
  originalSnippet: string;
  suggestion: string;
  reason: string;
}

export interface SpellingCorrection {
  original: string;
  replacement: string;
  explanation: string;
}

export interface ResumeAnalysisResult {
  fileName: string;
  wordCount: number;
  charCount: number;
  extractedText: string;
  overallScore: number;
  scoreGrade: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical Review';
  contact: {
    email: {
      value: string | null;
      status: 'Good' | 'Needs Improvement';
    };
    phone: {
      value: string | null;
      status: 'Good' | 'Needs Improvement';
    };
    linkedin: {
      value: string | null;
      status: 'Detected' | 'Not Found';
    };
    github: {
      value: string | null;
      status: 'Detected' | 'Not Found';
    };
  };
  skills: {
    detected: string[];
    detectedCategories: {
      programming: string[];
      web: string[];
      hardware: string[];
      data_ai: string[];
      soft_skills: string[];
    };
    status: 'Good' | 'Needs Improvement';
    penaltyApplied: number;
  };
  sections: {
    detected: string[];
    missing: string[];
    penaltyApplied: number;
  };
  weakStatements: {
    items: WeakPhraseMatch[];
    totalCount: number;
    penaltyApplied: number;
    status: 'Review Required' | 'Good';
  };
  corrections: SpellingCorrection[];
  statusCards: {
    grammarAndSpelling: 'Good' | 'Needs Improvement';
    contactInformation: 'Good' | 'Needs Improvement';
    technicalSkills: 'Good' | 'Needs Improvement';
    resumeSections: 'Good' | 'Needs Improvement';
    weakStatements: 'Good' | 'Review Required';
  };
  scoreBreakdown: {
    startingScore: number;
    emailDeduction: number;
    phoneDeduction: number;
    skillsDeduction: number;
    sectionsDeduction: number;
    weakStatementsDeduction: number;
    spellingDeduction: number;
    finalScore: number;
  };
  recommendations: string[];
}
