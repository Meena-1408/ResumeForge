export interface CompanyMatchProfile {
  id: string;
  companyName: string;
  tier: 'Top Tech' | 'Product Unicorn' | 'Enterprise Tech' | 'Core Hardware';
  roleTarget: string;
  logoInitial: string;
  requiredSkills: string[];
  hiringFocus: string;
  interviewStages: string[];
}

export const COMPANY_MATCH_DATA: CompanyMatchProfile[] = [
  {
    id: 'google',
    companyName: 'Google',
    tier: 'Top Tech',
    roleTarget: 'Software Engineer',
    logoInitial: 'G',
    requiredSkills: ['Data Structures', 'Algorithms', 'Java', 'C++', 'Python', 'Problem Solving', 'System Design'],
    hiringFocus: 'Deep algorithmic complexity analysis, clean code, scalable architecture.',
    interviewStages: ['Online Assessment', 'Technical Coding Round 1', 'Technical Coding Round 2', 'Googliness & Leadership']
  },
  {
    id: 'microsoft',
    companyName: 'Microsoft',
    tier: 'Top Tech',
    roleTarget: 'Software Engineer',
    logoInitial: 'M',
    requiredSkills: ['C++', 'C#', 'Java', 'Data Structures', 'SQL', 'Algorithms', 'Cloud Concepts'],
    hiringFocus: 'Object-oriented engineering, data structure efficiency, modular systems.',
    interviewStages: ['Codility Screen', 'Technical Interview 1', 'Technical Interview 2', 'AA (As Appropriate) Round']
  },
  {
    id: 'amazon',
    companyName: 'Amazon',
    tier: 'Top Tech',
    roleTarget: 'Software Engineer',
    logoInitial: 'A',
    requiredSkills: ['Java', 'Data Structures', 'Algorithms', 'SQL', 'Object-Oriented Design', 'Leadership Principles'],
    hiringFocus: 'Amazon Leadership Principles, practical coding, low-level design.',
    interviewStages: ['Online Coding & Work Simulation', 'Technical Onsite 1', 'Technical Onsite 2', 'Bar Raiser Round']
  },
  {
    id: 'zoho',
    companyName: 'Zoho Corporation',
    tier: 'Product Unicorn',
    roleTarget: 'Software Developer',
    logoInitial: 'Z',
    requiredSkills: ['C', 'Java', 'Problem Solving', 'Data Structures', 'Application Logic', 'SQL'],
    hiringFocus: 'Hands-on problem solving, programming from scratch without library dependencies, clean logic.',
    interviewStages: ['Basic Programming Round', 'Advanced Programming Round (CLI App)', 'Technical HR', 'General HR']
  },
  {
    id: 'qualcomm',
    companyName: 'Qualcomm',
    tier: 'Core Hardware',
    roleTarget: 'Embedded Systems Engineer',
    logoInitial: 'Q',
    requiredSkills: ['C', 'C++', 'Embedded Systems', 'Microcontrollers', 'RTOS', 'Verilog', 'Computer Architecture'],
    hiringFocus: 'Memory management, pointers, bare-metal microcontroller programming, bus protocols.',
    interviewStages: ['Written Technical Test', 'Embedded C & Pointer Concepts', 'Hardware Architecture', 'Managerial Round']
  },
  {
    id: 'bosch',
    companyName: 'Bosch Global Software',
    tier: 'Core Hardware',
    roleTarget: 'Embedded Systems Engineer',
    logoInitial: 'B',
    requiredSkills: ['Embedded Systems', 'C', 'IoT', 'Arduino', 'CAN Protocol', 'Microcontrollers', 'MATLAB'],
    hiringFocus: 'Automotive electronics, sensor telemetry, real-time safety critical firmware.',
    interviewStages: ['Technical Aptitude', 'Embedded Technical Interview', 'System Scenario Discussion', 'HR Round']
  },
  {
    id: 'tcs-digital',
    companyName: 'TCS Digital',
    tier: 'Enterprise Tech',
    roleTarget: 'Software Developer',
    logoInitial: 'T',
    requiredSkills: ['Java', 'Python', 'SQL', 'Data Structures', 'Problem Solving', 'Web Technologies'],
    hiringFocus: 'Strong programming aptitude, database querying, full-stack fundamentals.',
    interviewStages: ['NQT Assessment (Digital Category)', 'Technical Coding Interview', 'Managerial Interview', 'HR Interview']
  }
];
