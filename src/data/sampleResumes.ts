export interface SampleResume {
  id: string;
  name: string;
  badge: string;
  expectedScore: string;
  description: string;
  content: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'real-software-engineer',
    name: 'Real Candidate Resume (Software Engineer)',
    badge: 'High Score Demo',
    expectedScore: '~91%',
    description: 'Complete sections, proper contact info, strong technical skills (Java, Python, SQL, React, HTML, CSS), no weak verbs.',
    content: `ARAVIND SHARMA
Email: aravind.sharma@example.com | Phone: +91 9845012345
LinkedIn: linkedin.com/in/aravind-sharma | GitHub: github.com/aravind-sharma
Chennai, India

SUMMARY / CAREER OBJECTIVE
Results-driven Computer Science graduate with strong foundation in full-stack software development, distributed algorithms, and database systems. Experienced in architecting scalable web applications using Java, Python, React, and SQL. Seeking a Software Developer position to engineer robust enterprise platforms.

EDUCATION
B.Tech in Computer Science and Engineering | CGPA: 8.9 / 10
R.M.K. Engineering College, Anna University (2021 – 2025)
Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks

TECHNICAL SKILLS
- Programming Languages: Java, Python, C++, TypeScript, C
- Web Technologies: React, JavaScript, HTML, CSS, Node.js
- Databases & Systems: SQL, MongoDB, PostgreSQL, Git, Linux
- Core Competencies: Problem Solving, Data Structures, REST APIs, Communication

WORK EXPERIENCE / INTERNSHIPS
Software Engineering Intern | Cognizant Technology Solutions (Jun 2024 – Nov 2024)
- Architected and deployed microservices handling 25,000 daily user transactions using Java and Spring Boot.
- Engineered automated data ingestion pipeline utilizing SQL and Python, reducing report generation latency by 42%.
- Collaborated with cross-functional engineering teams to implement secure authentication and API rate limiting.

PROJECTS
1. Cloud-Based Inventory & Billing Management Platform
- Engineered full-stack enterprise web portal using React, Node.js, and SQL to track stock levels in real time.
- Integrated automated PDF invoicing and analytics dashboard with interactive visualization charts.
- Optimized query execution plans, improving database response time by 35%.

2. Smart Algorithm Visualizer
- Designed interactive algorithm simulation suite in JavaScript and HTML/CSS demonstrating Graph Search and Sorting.
- Implemented real-time step execution engine allowing students to examine memory frames.

CERTIFICATIONS
- AWS Certified Cloud Practitioner
- Oracle Certified Associate: Java SE Programmer
- Meta Front-End Developer Professional Certificate
`
  },
  {
    id: 'weak-fake-resume',
    name: 'Weak / Incomplete Resume (Common Student Pitfalls)',
    badge: 'Low Score Demo',
    expectedScore: '~52%',
    description: 'Demonstrates weak phrases ("worked on", "responsible for", "helped", "did", "made", "good knowledge"), lowercase javascript, certificatein, missing contact phone, missing certifications.',
    content: `KUMAR R
Email: kumar.student@gmail.com
Chennai

CAREER OBJECTIVE
Looking for an entry level job in a good software company where I can use my skills.

EDUCATION
B.E. Computer Science Engineering
ABC Institute of Technology
Graduated 2024

SKILLS
- javascript
- html css
- C
- good knowledge of computer basics

PROJECTS
Library System
- worked on library management project in college.
- responsible for database tables and user login.
- helped team members connect frontend with backend.
- did testing for book issue return modules.
- made simple user interface using html css.

WORK EXPERIENCE
Intern at Local Web Agency
- worked with seniors on company website.
- participated in weekly team meetings.

`
  },
  {
    id: 'ece-embedded-resume',
    name: 'Hardware & IoT Student Resume (ECE Core)',
    badge: 'Engineering Core Demo',
    expectedScore: '~84%',
    description: 'Embedded systems, Arduino, IoT, MATLAB, Verilog, C, Python skills with comprehensive project documentation.',
    content: `PRIYA SUNDARAM
Email: priya.sundaram@example.com | Phone: +91 9444123456
LinkedIn: linkedin.com/in/priyasundaram | GitHub: github.com/priyasundaram
Coimbatore, India

SUMMARY
Passionate Electronics and Communication Engineering undergraduate with hands-on expertise in Embedded Systems, IoT firmware, and digital circuit synthesis using Verilog and MATLAB.

EDUCATION
B.E. in Electronics and Communication Engineering | CGPA: 8.65 / 10
Government College of Technology (2021 – 2025)

TECHNICAL SKILLS
- Hardware & Embedded: Arduino, IoT, Embedded Systems, Microcontrollers, Raspberry Pi, Sensors
- Hardware Description & Simulation: Verilog, VHDL, MATLAB, Multisim
- Languages: C, C++, Python
- Interpersonal: Problem Solving, Technical Communication, Team Leadership

PROJECTS
1. Smart Agricultural IoT Monitoring Node
- Designed battery-powered telemetry node integrating soil moisture, temperature, and humidity sensors.
- Programmed firmware on Arduino and ESP32 with MQTT protocol transmission to cloud telemetry dashboard.
- Implemented low-power sleep modes extending operational battery life by 60 days.

2. Verilog FPGA Pipeline Arithmetic Logic Unit (ALU)
- Synthesized 16-bit pipelined ALU using Verilog HDL with carry-lookahead adders and hardware multiplication.
- Conducted timing analysis and waveform validation utilizing ModelSim and Vivado suites.

CERTIFICATIONS
- Certified Embedded Systems Developer (NIELIT)
- IoT Architecture and Wireless Protocols Specialization
`
  }
];
