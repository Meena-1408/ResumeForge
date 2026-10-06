import { ResumeAnalysisResult, WeakPhraseMatch, SpellingCorrection } from '../types/resume';

// 1. Technical Skills Dictionary mapped by categories
export const SKILLS_DICTIONARY: { name: string; aliases: (string | RegExp)[]; category: 'programming' | 'web' | 'hardware' | 'data_ai' | 'soft_skills' }[] = [
  // Programming Languages
  { name: 'C', aliases: [/\bC\b(?!\+\+|#)/i], category: 'programming' },
  { name: 'C++', aliases: [/\bC\+\+\b/i, /\bcpp\b/i], category: 'programming' },
  { name: 'Python', aliases: [/\bpython\b/i], category: 'programming' },
  { name: 'Java', aliases: [/\bjava\b(?!\s*script)/i], category: 'programming' },
  { name: 'JavaScript', aliases: [/\bjavascript\b/i, /\bjs\b/i], category: 'web' },
  { name: 'TypeScript', aliases: [/\btypescript\b/i, /\bts\b/i], category: 'web' },
  
  // Web Technologies
  { name: 'React', aliases: [/\breact(\.js)?\b/i], category: 'web' },
  { name: 'HTML', aliases: [/\bhtml5?\b/i], category: 'web' },
  { name: 'CSS', aliases: [/\bcss3?\b/i, /\btailwind/i], category: 'web' },
  { name: 'Node.js', aliases: [/\bnode(\.js)?\b/i], category: 'web' },
  { name: 'SQL', aliases: [/\bsql\b/i, /\bmysql\b/i, /\bpostgresql\b/i], category: 'data_ai' },
  { name: 'MongoDB', aliases: [/\bmongodb\b/i, /\bmongo\b/i], category: 'data_ai' },

  // Hardware & Embedded
  { name: 'Arduino', aliases: [/\barduino\b/i], category: 'hardware' },
  { name: 'IoT', aliases: [/\biot\b/i, /\binternet of things\b/i], category: 'hardware' },
  { name: 'Embedded Systems', aliases: [/\bembedded systems?\b/i, /\bmicrocontroller\b/i], category: 'hardware' },
  { name: 'MATLAB', aliases: [/\bmatlab\b/i], category: 'hardware' },
  { name: 'Verilog', aliases: [/\bverilog\b/i], category: 'hardware' },
  { name: 'VHDL', aliases: [/\bvhdl\b/i], category: 'hardware' },

  // AI & Data
  { name: 'Machine Learning', aliases: [/\bmachine learning\b/i, /\bml\b/i], category: 'data_ai' },
  { name: 'Deep Learning', aliases: [/\bdeep learning\b/i, /\bdl\b/i, /\bneural network\b/i], category: 'data_ai' },

  // Soft Skills
  { name: 'Communication', aliases: [/\bcommunication\b/i, /\binterpersonal\b/i], category: 'soft_skills' },
  { name: 'Problem Solving', aliases: [/\bproblem[- ]solving\b/i, /\banalytical skills?\b/i], category: 'soft_skills' }
];

// 2. Resume Sections configuration
export const RESUME_SECTIONS = [
  { name: 'Education', key: 'education', pattern: /\b(education|academic|b\.?tech|b\.?e|bachelor|master|university|college|cgpa|gpa|schooling)\b/i },
  { name: 'Skills', key: 'skills', pattern: /\b(skills|technical skills|key competencies|technologies|technical proficiencies)\b/i },
  { name: 'Projects', key: 'projects', pattern: /\b(projects|academic projects|capstone|personal projects|key projects)\b/i },
  { name: 'Experience', key: 'experience', pattern: /\b(experience|work experience|employment|internship|internships|professional experience)\b/i },
  { name: 'Certifications', key: 'certifications', pattern: /\b(certifications|certificates|licenses|accreditations|courses completed)\b/i },
  { name: 'Summary / Career Objective', key: 'summary', pattern: /\b(summary|career objective|professional summary|about me|profile summary)\b/i }
] as const;

// 3. Weak Statements Dictionary with professional corrections
export const WEAK_PHRASES = [
  {
    phrase: 'worked on',
    regex: /\b(worked on)\b/gi,
    suggestion: 'Developed and implemented',
    reason: 'Passive and generic. Replace with active execution verbs to convey direct ownership.'
  },
  {
    phrase: 'responsible for',
    regex: /\b(responsible for)\b/gi,
    suggestion: 'Managed and executed',
    reason: 'Describes duties instead of measurable accomplishments. Focus on action taken.'
  },
  {
    phrase: 'helped',
    regex: /\b(helped(\s+to)?)\b/gi,
    suggestion: 'Assisted in implementing',
    reason: 'Minimizes your individual technical impact. Specify your collaborative role.'
  },
  {
    phrase: 'did',
    regex: /\b(did)\b/gi,
    suggestion: 'Developed and completed',
    reason: 'Elementary verb lacking precision. Use descriptive engineering terminology.'
  },
  {
    phrase: 'made',
    regex: /\b(made)\b/gi,
    suggestion: 'Designed and developed',
    reason: 'Overly simplistic. State design, architecture, and development contribution.'
  },
  {
    phrase: 'good knowledge',
    regex: /\b(good knowledge(\s+of)?)\b/gi,
    suggestion: 'Proficient in',
    reason: 'Vague qualifier. Use industry standard proficiency markers like "Proficient in".'
  },
  {
    phrase: 'participated in',
    regex: /\b(participated in)\b/gi,
    suggestion: 'Collaborated actively in',
    reason: 'Sounds like passive attendance. Highlight active engagement and deliverables.'
  },
  {
    phrase: 'worked with',
    regex: /\b(worked with)\b/gi,
    suggestion: 'Engineered solutions utilizing',
    reason: 'Weak association. Clarify how you utilized tools, libraries, or frameworks.'
  }
];

// 4. Common spelling and unprofessional phrasing corrections
export const COMMON_CORRECTIONS: { pattern: RegExp; originalExample: string; replacement: string; explanation: string }[] = [
  {
    pattern: /\bjavascript\b/g,
    originalExample: 'javascript',
    replacement: 'JavaScript',
    explanation: 'Proper capitalization for technology brand name.'
  },
  {
    pattern: /\bcertificatein\b/gi,
    originalExample: 'certificatein',
    replacement: 'certificate in',
    explanation: 'Missing space between words.'
  },
  {
    pattern: /\bjava programming\b/gi,
    originalExample: 'java programming',
    replacement: 'Java Programming',
    explanation: 'Capitalize standardized language and domain names.'
  },
  {
    pattern: /\bpython course completed\b/gi,
    originalExample: 'python course completed',
    replacement: 'Completed specialized certification in Python Architecture',
    explanation: 'Transform basic statement into an impactful credential bullet point.'
  },
  {
    pattern: /\breact js\b/gi,
    originalExample: 'react js',
    replacement: 'React.js',
    explanation: 'Standard technical naming convention.'
  },
  {
    pattern: /\bnode js\b/gi,
    originalExample: 'node js',
    replacement: 'Node.js',
    explanation: 'Standard technical naming convention.'
  },
  {
    pattern: /\bhtml css\b/gi,
    originalExample: 'html css',
    replacement: 'HTML5 & CSS3',
    explanation: 'Use modern industry standard terminology.'
  }
];

export function analyzeResumeText(rawText: string, fileName = 'resume.pdf'): ResumeAnalysisResult {
  const text = rawText || '';
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = text.length;

  // A. Contact Information Extraction
  // Email detection
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const emailMatch = text.match(emailRegex);
  const detectedEmail = emailMatch ? emailMatch[1] : null;

  // Phone number detection
  const phoneRegex = /(?:(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})|(?:\+?91[-.\s]?[6-9]\d{9})|(?:\b[6-9]\d{9}\b))/;
  const phoneMatch = text.match(phoneRegex);
  const detectedPhone = phoneMatch ? phoneMatch[0].trim() : null;

  // LinkedIn & GitHub detection
  const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const githubMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/i);

  // B. Technical Skills Detection
  const detectedSkills: string[] = [];
  const detectedCategories: ResumeAnalysisResult['skills']['detectedCategories'] = {
    programming: [],
    web: [],
    hardware: [],
    data_ai: [],
    soft_skills: []
  };

  SKILLS_DICTIONARY.forEach((skill) => {
    const matched = skill.aliases.some((alias) => {
      if (typeof alias === 'string') {
        const reg = new RegExp(`\\b${alias}\\b`, 'i');
        return reg.test(text);
      }
      return alias.test(text);
    });

    if (matched) {
      detectedSkills.push(skill.name);
      detectedCategories[skill.category].push(skill.name);
    }
  });

  // C. Sections Detection
  const detectedSections: string[] = [];
  const missingSections: string[] = [];

  RESUME_SECTIONS.forEach((section) => {
    if (section.pattern.test(text)) {
      detectedSections.push(section.name);
    } else {
      missingSections.push(section.name);
    }
  });

  // D. Weak Phrases Detection
  const weakPhraseMatches: WeakPhraseMatch[] = [];
  let totalWeakMatchesCount = 0;

  WEAK_PHRASES.forEach((item) => {
    const matches = text.match(item.regex);
    if (matches && matches.length > 0) {
      totalWeakMatchesCount += matches.length;

      // Extract a representative snippet around the first match
      const firstIndex = text.search(item.regex);
      const snippetStart = Math.max(0, firstIndex - 25);
      const snippetEnd = Math.min(text.length, firstIndex + 50);
      const snippet = text.slice(snippetStart, snippetEnd).trim();

      weakPhraseMatches.push({
        phrase: item.phrase,
        count: matches.length,
        originalSnippet: `"...${snippet}..."`,
        suggestion: item.suggestion,
        reason: item.reason
      });
    }
  });

  // E. Mistakes & Corrections Detection
  const appliedCorrections: SpellingCorrection[] = [];
  COMMON_CORRECTIONS.forEach((rule) => {
    if (rule.pattern.test(text)) {
      appliedCorrections.push({
        original: rule.originalExample,
        replacement: rule.replacement,
        explanation: rule.explanation
      });
    }
  });

  // Also add corrections derived from detected weak phrases
  weakPhraseMatches.forEach((weak) => {
    appliedCorrections.push({
      original: `"${weak.phrase}"`,
      replacement: `"${weak.suggestion}"`,
      explanation: weak.reason
    });
  });

  // F. Dynamic Score Calculation strictly following user guidelines
  // Start: 100
  let score = 100;

  // Contact penalties:
  // - Missing email: -10
  // - Missing phone: -10
  const emailDeduction = detectedEmail ? 0 : 10;
  const phoneDeduction = detectedPhone ? 0 : 10;
  score -= (emailDeduction + phoneDeduction);

  // Technical skills penalties:
  // - No skills: -15
  // - Less than 3 skills: -10
  // - Less than 5 skills: -5
  let skillsDeduction = 0;
  if (detectedSkills.length === 0) {
    skillsDeduction = 15;
  } else if (detectedSkills.length < 3) {
    skillsDeduction = 10;
  } else if (detectedSkills.length < 5) {
    skillsDeduction = 5;
  }
  score -= skillsDeduction;

  // Missing sections penalties:
  // - 1 missing section: -5
  // - 2 missing sections: -10
  // - 3 or more missing sections: -15
  let sectionsDeduction = 0;
  if (missingSections.length === 1) {
    sectionsDeduction = 5;
  } else if (missingSections.length === 2) {
    sectionsDeduction = 10;
  } else if (missingSections.length >= 3) {
    sectionsDeduction = 15;
  }
  score -= sectionsDeduction;

  // Weak statements penalties:
  // - 1 weak phrase: -15
  // - 3 weak phrases: -30
  // - 5 or more weak phrases: -40
  let weakStatementsDeduction = 0;
  if (totalWeakMatchesCount >= 5) {
    weakStatementsDeduction = 40;
  } else if (totalWeakMatchesCount >= 3) {
    weakStatementsDeduction = 30;
  } else if (totalWeakMatchesCount >= 2) {
    weakStatementsDeduction = 20;
  } else if (totalWeakMatchesCount === 1) {
    weakStatementsDeduction = 15;
  }
  score -= weakStatementsDeduction;

  // Grammar/spelling issues:
  // Apply additional penalties based on detected issues (-2 per issue up to -8)
  const spellingIssuesCount = appliedCorrections.filter(c => !c.original.startsWith('"')).length;
  const spellingDeduction = Math.min(8, spellingIssuesCount * 2);
  score -= spellingDeduction;

  // Keep minimum score around 20%, maximum score around 95%
  // (Do not make every good resume automatically 100%)
  if (score > 94) {
    score = 92; // realistic high score
  } else if (score < 20) {
    score = 20;
  }

  // Determine qualitative grade
  let scoreGrade: ResumeAnalysisResult['scoreGrade'] = 'Needs Improvement';
  if (score >= 82) {
    scoreGrade = 'Excellent';
  } else if (score >= 70) {
    scoreGrade = 'Good';
  } else if (score >= 45) {
    scoreGrade = 'Needs Improvement';
  } else {
    scoreGrade = 'Critical Review';
  }

  // Status cards required by specification
  const grammarAndSpellingStatus: 'Good' | 'Needs Improvement' =
    spellingDeduction > 0 ? 'Needs Improvement' : 'Good';
  const contactInformationStatus: 'Good' | 'Needs Improvement' =
    detectedEmail && detectedPhone ? 'Good' : 'Needs Improvement';
  const technicalSkillsStatus: 'Good' | 'Needs Improvement' =
    detectedSkills.length >= 4 ? 'Good' : 'Needs Improvement';
  const resumeSectionsStatus: 'Good' | 'Needs Improvement' =
    missingSections.length === 0 ? 'Good' : 'Needs Improvement';
  const weakStatementsStatus: 'Good' | 'Review Required' =
    totalWeakMatchesCount > 0 ? 'Review Required' : 'Good';

  // Standardized recommendations aligned with project specification
  const recommendations: string[] = [
    'Improve weak statements: Replace passive phrasing ("worked on", "responsible for") with active verbs.',
    'Add relevant technical keywords: Align project technologies with target role expectations.',
    'Correct spelling and grammar: Use proper capitalization for technical frameworks (e.g. JavaScript, React.js).',
    'Add missing resume sections: Ensure standard sections (Education, Skills, Projects, Experience, Certifications, Summary) are present.',
    'Use measurable project achievements: Quantify impact with performance, throughput, or latency metrics.',
    'Improve professional wording: Avoid elementary vocabulary and emphasize ownership.'
  ];

  return {
    fileName,
    wordCount,
    charCount,
    extractedText: rawText,
    overallScore: score,
    scoreGrade,
    statusCards: {
      grammarAndSpelling: grammarAndSpellingStatus,
      contactInformation: contactInformationStatus,
      technicalSkills: technicalSkillsStatus,
      resumeSections: resumeSectionsStatus,
      weakStatements: weakStatementsStatus
    },
    contact: {
      email: {
        value: detectedEmail,
        status: detectedEmail ? 'Good' : 'Needs Improvement'
      },
      phone: {
        value: detectedPhone,
        status: detectedPhone ? 'Good' : 'Needs Improvement'
      },
      linkedin: {
        value: linkedinMatch ? linkedinMatch[0] : null,
        status: linkedinMatch ? 'Detected' : 'Not Found'
      },
      github: {
        value: githubMatch ? githubMatch[0] : null,
        status: githubMatch ? 'Detected' : 'Not Found'
      }
    },
    skills: {
      detected: detectedSkills,
      detectedCategories,
      status: detectedSkills.length >= 3 ? 'Good' : 'Needs Improvement',
      penaltyApplied: skillsDeduction
    },
    sections: {
      detected: detectedSections,
      missing: missingSections,
      penaltyApplied: sectionsDeduction
    },
    weakStatements: {
      items: weakPhraseMatches,
      totalCount: totalWeakMatchesCount,
      penaltyApplied: weakStatementsDeduction,
      status: totalWeakMatchesCount > 0 ? 'Review Required' : 'Good'
    },
    corrections: appliedCorrections,
    scoreBreakdown: {
      startingScore: 100,
      emailDeduction,
      phoneDeduction,
      skillsDeduction,
      sectionsDeduction,
      weakStatementsDeduction,
      spellingDeduction,
      finalScore: score
    },
    recommendations
  };
}
