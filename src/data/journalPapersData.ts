export interface JournalPaperSuggestion {
  id: string;
  domain: string;
  projectTopic: string;
  paperTitle: string;
  journal: string;
  year: number;
  researchArea: string;
  keywords: string[];
  relevanceScore: number;
  suggestedDirection: string;
  keyContributions: string[];
}

export const JOURNAL_PAPERS_DATA: JournalPaperSuggestion[] = [
  {
    id: 'paper-1',
    domain: 'Internet of Things & Embedded Systems',
    projectTopic: 'IoT Smart Agriculture & Irrigation',
    paperTitle: 'Energy-Efficient LoRaWAN-Based Wireless Sensor Network Architecture for Precision Agriculture',
    journal: 'IEEE Internet of Things Journal',
    year: 2024,
    researchArea: 'Low-Power Wide-Area Telemetry & Soil Hydrology Automation',
    keywords: ['IoT', 'Precision Agriculture', 'LoRaWAN', 'Soil Moisture', 'Energy Harvesting'],
    relevanceScore: 94,
    suggestedDirection: 'Incorporate adaptive transmission intervals based on diurnal temperature cycles to conserve 30% sensor node battery power.',
    keyContributions: [
      'Comparative packet delivery analysis between Zigbee, BLE, and LoRa protocols.',
      'Field deployment empirical formula for multi-depth soil capacitance readings.',
      'Sleep-wake scheduling algorithm minimizing idle power dissipation.'
    ]
  },
  {
    id: 'paper-2',
    domain: 'Artificial Intelligence & Natural Language Processing',
    projectTopic: 'Resume Parsing & Job Applicant Screening',
    paperTitle: 'Domain-Adapted Transformer Embeddings for Automated Resume Entity Extraction and Competency Matching',
    journal: 'ACM Transactions on Information Systems',
    year: 2023,
    researchArea: 'Named Entity Recognition (NER) & Skill Graph Mining',
    keywords: ['Resume Parsing', 'BERT', 'Information Extraction', 'Skill Taxonomy', 'Semantic Search'],
    relevanceScore: 96,
    suggestedDirection: 'Implement contextual sentence tokenization to distinguish between claimed personal skills versus tools merely mentioned in project references.',
    keyContributions: [
      'Curated benchmark dataset of 5,000 annotated technical resumes across engineering domains.',
      'Contrastive loss fine-tuning on technical skill taxonomies.',
      'Robust evaluation metrics against OCR errors and varied PDF column formatting.'
    ]
  },
  {
    id: 'paper-3',
    domain: 'Edge AI & Microcontroller Systems',
    projectTopic: 'TinyML Industrial Vibration Fault Detection',
    paperTitle: 'Real-Time Edge Anomaly Detection for Induction Motors Using Quantized 1D-CNN on Microcontrollers',
    journal: 'IEEE Transactions on Industrial Electronics',
    year: 2024,
    researchArea: 'Edge Machine Learning & Predictive Maintenance',
    keywords: ['TinyML', 'Vibration Analysis', 'Quantization', 'Fault Diagnosis', 'ARM Cortex-M'],
    relevanceScore: 91,
    suggestedDirection: 'Utilize 8-bit integer post-training quantization (PTQ) to fit complex feature extraction into less than 64KB RAM.',
    keyContributions: [
      'Time-frequency domain vibration feature mapping suited for low-power edge chips.',
      'Comparative benchmarking of inference latency on STM32 vs ESP32 microcontrollers.',
      'Zero false-negative bearing ball defect detection across varied RPM loads.'
    ]
  },
  {
    id: 'paper-4',
    domain: 'Electrical & Power Systems',
    projectTopic: 'Wireless EV Charging & Resonant Inductive Power',
    paperTitle: 'High-Efficiency Dual-Sided LCC-Compensated Dynamic Wireless Power Transfer for Electric Vehicles',
    journal: 'IEEE Transactions on Power Electronics',
    year: 2023,
    researchArea: 'Resonant Magnetic Coupling & Foreign Object Detection',
    keywords: ['Wireless Power Transfer', 'Electric Vehicles', 'Resonant Inverter', 'FOD Detection'],
    relevanceScore: 89,
    suggestedDirection: 'Design an auxiliary sensing matrix to detect metallic debris without introducing parasitic eddy current losses.',
    keyContributions: [
      'Mathematical derivation of magnetic coupling tolerance under lateral coil misalignment.',
      'Soft-switching inverter design minimizing harmonic electromagnetic radiation.',
      'Experimental 3.3kW inductive test rig with 92.4% DC-to-DC system efficiency.'
    ]
  },
  {
    id: 'paper-5',
    domain: 'Computer Vision & Deep Learning',
    projectTopic: 'Automated Waste Segregation & Classification',
    paperTitle: 'Lightweight MobileNetV3 Framework with Attention Gate for Multi-Class Waste Sorting',
    journal: 'Elsevier Computers & Industrial Engineering',
    year: 2024,
    researchArea: 'Computer Vision & Real-Time Conveyor Automation',
    keywords: ['Waste Classification', 'Computer Vision', 'Deep Learning', 'Edge Computing', 'Recycling'],
    relevanceScore: 88,
    suggestedDirection: 'Combine optical RGB cameras with reflective near-infrared spectral sensors to distinguish transparent PET from PVC plastics.',
    keyContributions: [
      'High-throughput classification algorithm operating at 45 FPS on Raspberry Pi 4.',
      'Augmented dataset of 12,000 real-world municipal waste images with occlusion variations.',
      'Integrated pneumatic sorting actuator triggering mechanism.'
    ]
  }
];
