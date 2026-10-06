export interface ProjectIdea {
  id: string;
  title: string;
  department: 'ECE' | 'CSE' | 'IT' | 'EEE' | 'AI/DS';
  skills: string[];
  careerGoal: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  problemStatement: string;
  objectives: string[];
  technologies: string[];
  components: string[];
  expectedOutcome: string;
}

export const PROJECT_IDEAS_DATA: ProjectIdea[] = [
  {
    id: 'smart-agri-iot',
    title: 'Smart Agriculture Telemetry & Automated Irrigation Node',
    department: 'ECE',
    skills: ['Arduino', 'IoT', 'Embedded Systems', 'C++'],
    careerGoal: 'Embedded & IoT Systems Engineer',
    difficulty: 'Intermediate',
    problemStatement: 'Traditional farming wastes up to 40% of fresh water due to manual schedules and lacks real-time soil metric awareness.',
    objectives: [
      'Interface capacitive soil moisture and DHT22 atmospheric sensors with ESP32/Arduino.',
      'Deploy automatic solenoid valve relay actuation governed by calibrated threshold heuristics.',
      'Transmit environmental telemetry over MQTT protocol to real-time analytics dashboard.'
    ],
    technologies: ['Arduino IDE', 'C++', 'MQTT Protocol', 'Node-RED / Blynk', 'ESP32'],
    components: ['ESP32 Development Board', 'Capacitive Soil Moisture Sensor', 'DHT22 Temp & Humidity Sensor', '12V Solenoid Valve', '5V Relay Module'],
    expectedOutcome: 'A field-deployable low-power telemetry station that cuts irrigation water consumption by 35% with mobile metric alerts.'
  },
  {
    id: 'iot-weather-monitoring',
    title: 'Solar-Powered Microclimate Weather Monitoring Station',
    department: 'ECE',
    skills: ['Arduino', 'IoT', 'Python', 'C'],
    careerGoal: 'Hardware Firmware Developer',
    difficulty: 'Beginner',
    problemStatement: 'Localized micro-climates in agricultural farms and university campuses require compact, autonomous atmospheric tracking without grid power dependence.',
    objectives: [
      'Synthesize multi-sensor data capture for barometric pressure, UV index, and precipitation.',
      'Integrate solar charge controller with lithium polymer battery management system.',
      'Build Python API listener to ingest and log timestamped sensor frames into an SQLite database.'
    ],
    technologies: ['Arduino C', 'Python', 'SQLite', 'Matplotlib', 'HTTP REST'],
    components: ['Arduino Nano 33 BLE', 'BME280 Atmospheric Sensor', 'Raindrop Detection Module', '6V Solar Panel', 'TP4056 Charging Unit'],
    expectedOutcome: 'Continuous autonomous outdoor recording with real-time weather analytics graphs hosted locally.'
  },
  {
    id: 'tinyml-fault-detection',
    title: 'TinyML Industrial Vibration Fault Detection on Microcontrollers',
    department: 'ECE',
    skills: ['Embedded Systems', 'Machine Learning', 'Python', 'C++'],
    careerGoal: 'Edge AI / Embedded Systems Engineer',
    difficulty: 'Advanced',
    problemStatement: 'Industrial motors incur massive unplanned downtime when mechanical bearing failures are detected too late by manual maintenance audits.',
    objectives: [
      'Sample high-frequency 3-axis accelerometer data from vibrating rotating machinery.',
      'Train lightweight Convolutional Neural Network / Random Forest model using TensorFlow Lite for Microcontrollers.',
      'Flash quantized model onto STM32/ESP32 for real-time anomalous vibration classification under 15ms latency.'
    ],
    technologies: ['TinyML', 'TensorFlow Lite', 'Edge Impulse', 'C++', 'Python'],
    components: ['STM32F4 Discovery / ESP32', 'MPU6050 / ADXL345 Accelerometer', 'OLED Display (SSD1306)', 'Buzzer Indicator'],
    expectedOutcome: 'Edge intelligence anomaly classifier achieving 92%+ fault detection accuracy without streaming raw data to the cloud.'
  },
  {
    id: 'smart-waste-segregation',
    title: 'Automated Smart Waste Segregation with Inductive & Capacitive Sensing',
    department: 'EEE',
    skills: ['Arduino', 'Embedded Systems', 'IoT'],
    careerGoal: 'Robotics & Automation Engineer',
    difficulty: 'Intermediate',
    problemStatement: 'Municipal recycling centers struggle with contaminated recyclable batches due to poor segregation at the disposal point.',
    objectives: [
      'Distinguish between metallic and non-metallic dry refuse using proximity and inductive loop sensors.',
      'Implement moisture detection probe to segregate wet organic food waste.',
      'Actuate dual servo-driven flap chute directing waste into respective partitioned bins.'
    ],
    technologies: ['Embedded C', 'Microcontroller Logic', 'Servo PWM Control'],
    components: ['Arduino Uno', 'Inductive Proximity Sensor LJ12A3', 'Capacitive Moisture Sensor', 'Dual MG996R High-Torque Servos', 'Ultrasonic Bin-Level Sensors'],
    expectedOutcome: 'Automated mechanical hopper that categorizes waste into wet, metallic, and dry plastic compartments with fill-level alerts.'
  },
  {
    id: 'wireless-ev-charging',
    title: 'Foreign Object Detection & Resonant Inductive Wireless EV Charging System',
    department: 'EEE',
    skills: ['Embedded Systems', 'MATLAB', 'IoT'],
    careerGoal: 'Power Electronics & EV Engineer',
    difficulty: 'Advanced',
    problemStatement: 'Wireless power transfer coils in electric vehicles risk thermal damage if metallic foreign objects accidentally enter the magnetic flux field.',
    objectives: [
      'Design high-frequency resonant inductive coil transmitter and receiver circuitry.',
      'Simulate electromagnetic flux distribution and coil coupling coefficient in MATLAB/Simulink.',
      'Implement thermal and eddy-current foreign object detection (FOD) circuit with rapid relay cut-off.'
    ],
    technologies: ['MATLAB Simulink', 'Embedded C', 'Hardware PWM Inverter Control'],
    components: ['Ferrite Core Planar Coils', 'IRF540N MOSFET Full-Bridge Inverter', 'Current Sensor ACS712', 'Microcontroller Control Unit', 'OLED Status Screen'],
    expectedOutcome: 'High-efficiency inductive power transfer demonstration bench achieving 85% wireless transfer efficiency with sub-100ms safety cut-off.'
  },
  {
    id: 'ai-ats-resume-parser',
    title: 'High-Throughput Enterprise Resume Screening & ATS Ranking Engine',
    department: 'CSE',
    skills: ['Python', 'SQL', 'React', 'Problem Solving'],
    careerGoal: 'Full Stack Software Engineer',
    difficulty: 'Intermediate',
    problemStatement: 'Recruitment teams spend 80% of screening time manually parsing inconsistent PDF formats rather than conducting candidate technical evaluation.',
    objectives: [
      'Build modular PDF text tokenization pipeline with section bounding box extraction.',
      'Implement TF-IDF and semantic similarity indexing matching candidate qualifications with job descriptions.',
      'Provide an interactive web dashboard for recruiters to filter, score, and rank applicant batches.'
    ],
    technologies: ['Python', 'React', 'FastAPI', 'PostgreSQL', 'TypeScript'],
    components: ['REST API Backend', 'Relational Database Schema', 'Vite Frontend Dashboard', 'Vector Embedding Index'],
    expectedOutcome: 'Web platform processing up to 100 candidate resumes in seconds, outputting transparent qualification match breakdowns.'
  },
  {
    id: 'distributed-code-evaluator',
    title: 'Sandboxed Online Code Execution & Automated Grading Engine',
    department: 'CSE',
    skills: ['Java', 'Python', 'SQL', 'Data Structures'],
    careerGoal: 'Backend Systems Engineer',
    difficulty: 'Advanced',
    problemStatement: 'Online university programming tests require safe, deterministic sandbox execution that prevents malicious code from compromising the host server.',
    objectives: [
      'Develop secure isolated process runner using Linux namespaces, cgroups, and resource bounds.',
      'Support multilingual compilation and test-case verification for C, C++, Java, and Python.',
      'Implement memory and time limit monitoring with millisecond precision.'
    ],
    technologies: ['Java', 'Docker Engine / Linux Cgroups', 'Redis Message Queue', 'PostgreSQL'],
    components: ['Worker Queue Nodes', 'Isolated Docker Runners', 'Code Ingestion Gateway', 'Judge Evaluation Engine'],
    expectedOutcome: 'Robust programming judge system capable of grading concurrent code submissions within 500ms with full security isolation.'
  }
];
