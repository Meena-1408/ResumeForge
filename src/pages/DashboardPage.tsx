import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Upload,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  FileCheck2,
  ScanText,
  Target,
  Building2,
  Sparkles,
  Lightbulb,
  BookOpen,
  Menu,
  AlertCircle
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { VivaModal } from '../components/VivaModal';
import { extractTextFromFile } from '../services/pdfExtractor';
import { SAMPLE_RESUMES } from '../data/sampleResumes';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Statistics required by specification
  const stats = [
    {
      title: 'ATS Score',
      value: '82%',
      subtext: 'ATS Friendly baseline',
      icon: ScanText,
      trend: '+12% from initial draft'
    },
    {
      title: 'Resume Quality',
      value: '78%',
      subtext: 'Action verb & structure score',
      icon: Award,
      trend: 'Good standard'
    },
    {
      title: 'Skills Matched',
      value: '14',
      subtext: 'Keywords detected across sections',
      icon: CheckCircle2,
      trend: '4 core skills detected'
    },
    {
      title: 'Job Match',
      value: '76%',
      subtext: 'Tier-1 tech profile fit',
      icon: TrendingUp,
      trend: 'High alignment'
    }
  ];

  const tools = [
    {
      title: 'Resume Checker',
      desc: 'Extract resume via PDF.js, detect weak statements, mistakes, and calculate score.',
      to: '/resume-checker',
      icon: FileCheck2,
      tag: 'Live Module'
    },
    {
      title: 'Resume Analyzer',
      desc: 'In-depth breakdown of section weights, ATS readiness, and measurable suggestions.',
      to: '/resume-analyzer',
      icon: FileText,
      tag: 'Recommended'
    },
    {
      title: 'ATS Scanner',
      desc: 'Simulate ATS keyword scanning, header parsing, and mechanical readability.',
      to: '/ats-scanner',
      icon: ScanText,
      tag: 'ATS Optimization'
    },
    {
      title: 'Skill Gap Analyzer',
      desc: 'Benchmark your profile against target roles and discover missing technical skills.',
      to: '/skill-gap',
      icon: Target,
      tag: 'Role Alignment'
    },
    {
      title: 'Company Match',
      desc: 'Evaluate eligibility against Google, Microsoft, Amazon, Zoho, Bosch, and Qualcomm.',
      to: '/company-match',
      icon: Building2,
      tag: 'Recruiter Match'
    },
    {
      title: 'AI Resume Rewriter',
      desc: 'Transform passive expressions like "worked on" into high-impact engineering bullets.',
      to: '/ai-rewriter',
      icon: Sparkles,
      tag: 'Smart Rewriter'
    },
    {
      title: 'Project Ideas',
      desc: 'Generate department-specific capstone and semester projects with hardware components.',
      to: '/project-ideas',
      icon: Lightbulb,
      tag: 'ECE / CSE / EEE'
    },
    {
      title: 'Journal Papers',
      desc: 'Discover academic IEEE/ACM paper references and research directions for final year.',
      to: '/journal-papers',
      icon: BookOpen,
      tag: 'Academic Research'
    }
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !['pdf', 'doc', 'docx'].includes(extension)) {
      setUploadError('Please upload a PDF, DOC or DOCX file.');
      setSelectedFileName(null);
      return;
    }

    setSelectedFileName(file.name);
    setUploadError(null);
    setIsProcessing(true);

    try {
      const result = await extractTextFromFile(file);
      setIsProcessing(false);

      if (!result.success) {
        setUploadError(result.error || 'Unable to extract text from this PDF.');
        return;
      }

      // Store in sessionStorage and navigate directly to Resume Checker with state
      sessionStorage.setItem('resumeforge_uploaded_text', result.text);
      sessionStorage.setItem('resumeforge_uploaded_name', file.name);
      navigate('/resume-checker');
    } catch {
      setIsProcessing(false);
      setUploadError('Unable to extract text from this PDF.');
    }
  };

  const handleLoadSample = (sampleId: string) => {
    navigate(`/resume-checker?sample=${sampleId}`);
  };

  return (
    <div className="min-h-screen bg-professional-light flex">
      {/* Sidebar */}
      <Sidebar
        onOpenVivaModal={() => setVivaModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top bar */}
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
              <span className="font-medium text-slate-900">Career Workspace</span>
              <span>/</span>
              <span>Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setVivaModalOpen(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Academic Viva Q&A
            </button>
            <Link
              to="/resume-checker"
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Resume Checker</span>
            </Link>
          </div>
        </header>

        {/* Content body */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Your Career Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Analyze, improve and optimize your resume with AI.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-900">Profile Status:</span>
              <span>Candidate Student (Active)</span>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500">{stat.title}</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                      {stat.value}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{stat.subtext}</p>
                    <p className="text-[11px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                      <span>{stat.trend}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resume Upload Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 sm:p-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Primary Verification Workflow</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Analyze Your Resume</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Upload your resume and get an AI-powered analysis, ATS score and personalized recommendations. Supports PDF, DOC, and DOCX formats.
              </p>

              {/* Upload Drop Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 rounded-xl p-8 text-center cursor-pointer transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                
                <p className="text-sm font-semibold text-slate-800">
                  {selectedFileName ? (
                    <span className="text-blue-600 font-bold">{selectedFileName}</span>
                  ) : (
                    'Click to upload or drag & drop your resume file'
                  )}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max 10MB)
                </p>

                {isProcessing && (
                  <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full" />
                    Extracting text with PDF.js engine...
                  </div>
                )}
              </div>

              {/* Error indicator */}
              {uploadError && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Quick sample resume loader */}
              <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  <span>No PDF on hand? Test immediately with built-in profiles:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_RESUMES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleLoadSample(sample.id)}
                      className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-md font-medium transition-colors cursor-pointer"
                    >
                      {sample.name.split('(')[0]} ({sample.expectedScore})
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Career Intelligence Tools Catalog */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Career Intelligence Tools</h3>
              <p className="text-xs text-slate-500">
                Full modular suite designed for placement training and career optimization
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.title}
                    to={tool.to}
                    className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {tool.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-semibold text-blue-600">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </main>
      </div>

      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </div>
  );
};
