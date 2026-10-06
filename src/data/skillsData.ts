export interface RoleSkillRequirement {
  id: string;
  roleName: string;
  department: string;
  requiredSkills: string[];
  recommendedRoadmap: { step: string; resource: string; estimatedWeeks: number }[];
}

export const ROLE_SKILL_REQUIREMENTS: RoleSkillRequirement[] = [
  {
    id: 'software-developer',
    roleName: 'Software Developer',
    department: 'CSE / IT',
    requiredSkills: [
      'Java',
      'Python',
      'Data Structures',
      'Algorithms',
      'Git',
      'SQL',
      'Spring Boot',
      'REST API'
    ],
    recommendedRoadmap: [
      { step: 'Master Spring Boot Framework & Dependency Injection', resource: 'Spring Guides & REST microservices', estimatedWeeks: 3 },
      { step: 'Practice Intermediate to Advanced LeetCode / GeeksForGeeks DSA', resource: 'Trees, Graphs, and Dynamic Programming', estimatedWeeks: 4 },
      { step: 'Build and deploy a full-stack REST API with JWT security', resource: 'Spring Boot + PostgreSQL + React project', estimatedWeeks: 3 }
    ]
  },
  {
    id: 'fullstack-developer',
    roleName: 'Full Stack Web Developer',
    department: 'CSE / IT',
    requiredSkills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'HTML',
      'CSS',
      'SQL',
      'MongoDB',
      'Git'
    ],
    recommendedRoadmap: [
      { step: 'Strengthen TypeScript and React performance hooks (useMemo, useCallback)', resource: 'React Docs & Clean Architecture', estimatedWeeks: 2 },
      { step: 'Build scalable Node.js microservices with database indexing', resource: 'Express, Prisma & PostgreSQL', estimatedWeeks: 3 },
      { step: 'CI/CD deployment and cloud containerization', resource: 'Docker & GitHub Actions', estimatedWeeks: 2 }
    ]
  },
  {
    id: 'embedded-engineer',
    roleName: 'Embedded Systems Engineer',
    department: 'ECE / EEE',
    requiredSkills: [
      'C',
      'C++',
      'Embedded Systems',
      'Arduino',
      'IoT',
      'Microcontrollers',
      'RTOS',
      'Verilog'
    ],
    recommendedRoadmap: [
      { step: 'Deep-dive into ARM Cortex-M Architecture & Bare-metal C', resource: 'STM32 Embedded Systems Mastery', estimatedWeeks: 4 },
      { step: 'Implement FreeRTOS tasks, semaphores, and queue communication', resource: 'Real-time OS Fundamentals', estimatedWeeks: 3 },
      { step: 'Hardware protocol validation (I2C, SPI, UART, CAN)', resource: 'Logic Analyzer & Protocol Decoding', estimatedWeeks: 2 }
    ]
  },
  {
    id: 'ai-ml-engineer',
    roleName: 'AI / Machine Learning Engineer',
    department: 'AI & Data Science',
    requiredSkills: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'SQL',
      'Pandas & NumPy',
      'PyTorch / TensorFlow',
      'Data Structures',
      'Problem Solving'
    ],
    recommendedRoadmap: [
      { step: 'Implement custom neural architectures in PyTorch', resource: 'Deep Learning Specialization', estimatedWeeks: 4 },
      { step: 'Model evaluation, hyperparameter tuning & MLflow tracking', resource: 'Applied MLOps Fundamentals', estimatedWeeks: 3 },
      { step: 'Deploy inference APIs with FastAPI and Docker', resource: 'Containerized Model Serving', estimatedWeeks: 2 }
    ]
  }
];
