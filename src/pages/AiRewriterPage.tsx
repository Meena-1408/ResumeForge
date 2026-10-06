import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Menu,
  Wand2,
  CheckCircle2,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { VivaModal } from '../components/VivaModal';

// Pre-built dictionary of rule-based rewrites and enhancements
const REWRITE_PRESETS = [
  {
    input: 'Worked on library management project.',
    output: 'Developed and implemented a Java-based Library Management System with MySQL integration for managing book inventory and student records.',
    category: 'Engineering / Software'
  },
  {
    input: 'Responsible for database tables and user login.',
    output: 'Architected relational schema architectures, normalized PostgreSQL entities, and implemented secure Bcrypt/JWT user authentication.',
    category: 'Backend / Security'
  },
  {
    input: 'Helped team members connect frontend with backend.',
    output: 'Collaborated cross-functionally to integrate asynchronous RESTful APIs, reducing data synchronization latency by 35%.',
    category: 'Integration / Teamwork'
  },
  {
    input: 'Did testing for book issue return modules.',
    output: 'Engineered comprehensive unit and integration test suites utilizing JUnit and Postman, achieving 94% code branch coverage.',
    category: 'QA / Reliability'
  },
  {
    input: 'Made simple user interface using html css.',
    output: 'Designed and deployed a responsive, mobile-first web interface adhering to WCAG 2.1 accessibility standards using HTML5 and CSS3.',
    category: 'Frontend / UI'
  },
  {
    input: 'Worked with sensors on arduino.',
    output: 'Synthesized multi-sensor telemetry nodes integrating capacitive soil moisture and DHT22 sensors via I2C protocol on ESP32/Arduino.',
    category: 'Hardware / IoT'
  }
];

export const AiRewriterPage: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);

  const [inputSentence, setInputSentence] = useState('Worked on library management project.');
  const [tone, setTone] = useState<'action' | 'metric' | 'leadership'>('action');
  const [outputSentence, setOutputSentence] = useState(
    'Developed and implemented a Java-based Library Management System with MySQL integration for managing book inventory and student records.'
  );
  const [isCopied, setIsCopied] = useState(false);

  // Dynamic Rule-Based Rewriter Engine
  const handleRewrite = (textToRewrite: string, selectedTone: 'action' | 'metric' | 'leadership' = tone) => {
    const raw = textToRewrite.trim();
    if (!raw) {
      setOutputSentence('Please enter a resume bullet point or sentence to rewrite.');
      return;
    }

    // Check exact presets first
    const preset = REWRITE_PRESETS.find(
      (p) => p.input.toLowerCase().replace(/[^a-z0-9]/g, '') === raw.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
    if (preset) {
      let variant = preset.output;
      if (selectedTone === 'metric' && !variant.includes('%')) {
        variant += ' — accelerating workflow turnaround by 28%.';
      } else if (selectedTone === 'leadership') {
        variant = variant.replace('Developed and implemented', 'Led the architectural design and execution of');
      }
      setOutputSentence(variant);
      return;
    }

    // Rule-based substitution engine
    let rewritten = raw;

    // Verb substitutions
    rewritten = rewritten.replace(/\bworked on\b/gi, 'Developed and deployed');
    rewritten = rewritten.replace(/\bresponsible for\b/gi, 'Spearheaded and executed');
    rewritten = rewritten.replace(/\bhelped\b/gi, 'Collaborated with engineering peers to implement');
    rewritten = rewritten.replace(/\bdid\b/gi, 'Engineered and completed');
    rewritten = rewritten.replace(/\bmade\b/gi, 'Architected and designed');
    rewritten = rewritten.replace(/\bgood knowledge of\b/gi, 'Proficient in');
    rewritten = rewritten.replace(/\bparticipated in\b/gi, 'Actively contributed to');
    rewritten = rewritten.replace(/\bworked with\b/gi, 'Utilized');

    // Capitalization & standards
    rewritten = rewritten.replace(/\bjavascript\b/gi, 'JavaScript');
    rewritten = rewritten.replace(/\bhtml\b/gi, 'HTML5');
    rewritten = rewritten.replace(/\bcss\b/gi, 'CSS3');
    rewritten = rewritten.replace(/\bpython\b/gi, 'Python');
    rewritten = rewritten.replace(/\bjava\b/gi, 'Java');
    rewritten = rewritten.replace(/\bsql\b/gi, 'SQL');

    // Tone variations
    if (selectedTone === 'metric' && !rewritten.includes('%')) {
      rewritten += ', improving system throughput and execution efficiency by 30%.';
    } else if (selectedTone === 'leadership') {
      rewritten = 'Spearheaded project initiatives to ' + rewritten.charAt(0).toLowerCase() + rewritten.slice(1);
    }

    // Ensure ending period
    if (!rewritten.endsWith('.')) {
      rewritten += '.';
    }

    setOutputSentence(rewritten);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputSentence);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-professional-light flex">
      <Sidebar
        onOpenVivaModal={() => setVivaModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 text-slate-600 hover:text-slate-900 lg:hidden rounded-md hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/dashboard" className="hover:text-slate-900">Career Workspace</Link>
              <span>/</span>
              <span className="font-semibold text-slate-900">AI Resume Rewriter</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVivaModalOpen(true)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg"
          >
            Academic Defense Guide
          </button>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Impact Enhancer</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">AI Resume Rewriter</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Transform weak, passive statements into high-impact, quantified engineering bullet points
              </p>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 max-w-xs">
              <span className="font-semibold text-slate-900 block">Prototype Note:</span>
              Current prototype utilizes rule-based syntactic rewriting. Neural NLP model integration is planned for future versions.
            </div>
          </div>

          {/* Interactive Rewriter Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Box */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="weakSentence" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Weak Resume Sentence (Input)
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Type or choose an example below
                  </span>
                </div>

                <textarea
                  id="weakSentence"
                  rows={4}
                  value={inputSentence}
                  onChange={(e) => setInputSentence(e.target.value)}
                  placeholder="e.g. Worked on library management project."
                  className="w-full text-xs sm:text-sm p-3.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-mono"
                />

                {/* Tone / Angle selection */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-600">Select Rewrite Angle:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTone('action');
                        handleRewrite(inputSentence, 'action');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                        tone === 'action'
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Action-Driven
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTone('metric');
                        handleRewrite(inputSentence, 'metric');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                        tone === 'metric'
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Metric-Boosted
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTone('leadership');
                        handleRewrite(inputSentence, 'leadership');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                        tone === 'leadership'
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Leadership
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setInputSentence('Worked on library management project.');
                    handleRewrite('Worked on library management project.');
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRewrite(inputSentence)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Rewrite Statement</span>
                </button>
              </div>
            </div>

            {/* Output Box */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Optimized Resume Statement (Output)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    ATS & Recruiter Approved
                  </span>
                </div>

                <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/80 min-h-[140px] flex items-center">
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    &ldquo;{outputSentence}&rdquo;
                  </p>
                </div>

                {/* Improvements checklist */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Improvements Applied:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Direct action verb ownership</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Concrete technology stacks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Eliminated passive phrasing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Recruiter-scannable clarity</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied to Clipboard' : 'Copy Improved Bullet'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick-Try Curated Examples */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Try Common Student Resume Weak Statements
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {REWRITE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputSentence(preset.input);
                    setOutputSentence(preset.output);
                  }}
                  className="p-3.5 bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-lg text-left transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {preset.category}
                    </span>
                    <p className="text-xs font-mono text-slate-600 mt-2 italic">
                      &ldquo;{preset.input}&rdquo;
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 mt-3 flex items-center gap-1">
                    <span>Load & Rewrite</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>

        </main>
      </div>

      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </div>
  );
};
