import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  ScanText,
  Target,
  Building2,
  Sparkles,
  ArrowRight,
  Upload,
  Search,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  CheckCircle2,
  Award,
  Layers
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { VivaModal } from '../components/VivaModal';
import { useTheme } from '../context/ThemeContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [vivaModalOpen, setVivaModalOpen] = useState(false);
  const { isDark } = useTheme();

  const handleSelectSample = (sampleId: string) => {
    navigate(`/resume-checker?sample=${sampleId}`);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isDark ? 'bg-executive-canvas text-slate-100' : 'bg-professional-light text-slate-900'
    }`}>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className={`relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28 border-b transition-colors ${
          isDark ? 'border-slate-800/80' : 'border-slate-200/90'
        }`}>
          {/* Subtle Ambient Radial Glow */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] blur-[120px] pointer-events-none rounded-full ${
            isDark ? 'bg-blue-600/15' : 'bg-blue-500/5'
          }`} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              
              {/* Executive Academic Badge */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md transition-colors ${
                isDark ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span>Student-Focused Career Intelligence Platform</span>
              </div>

              {/* Exact heading requested */}
              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Resume That Beats <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ATS + Human Recruiters</span>
              </h1>

              {/* Exact description requested */}
              <p className={`text-base sm:text-lg leading-relaxed text-balance max-w-2xl mx-auto ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Analyze your resume, discover missing skills, improve ATS compatibility and build a stronger career profile.
              </p>

              {/* Exact CTA buttons requested */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <Link
                  to="/resume-checker"
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Analyze My Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/dashboard"
                  className={`w-full sm:w-auto px-7 py-3.5 text-sm font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
                    isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-white border-slate-700/80 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
                  }`}
                >
                  <span>View Dashboard</span>
                </Link>
              </div>

              {/* Immediate Quick Tester with Sample Resumes */}
              <div className="pt-8">
                <p className={`text-[11px] font-bold uppercase tracking-wider mb-3 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Or test live with sample profiles:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {SAMPLE_RESUMES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectSample(sample.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        isDark
                          ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-blue-500 hover:text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 shadow-2xs'
                      }`}
                    >
                      <span className="font-semibold">{sample.name.split('(')[0]}</span>
                      <span className={`text-[11px] font-mono ${isDark ? 'text-blue-400' : 'text-blue-600 font-bold'}`}>{sample.expectedScore}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURE CARDS SECTION */}
        <section id="features" className={`py-16 border-b transition-colors ${
          isDark ? 'border-slate-800/80' : 'border-slate-200/90'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Designed for Engineering & Placement Success
              </h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Evaluate your resume through the same multi-factor lens used by campus recruitment teams and ATS software.
              </p>
            </div>

            {/* Exact 6 Feature cards: Resume Checker, ATS Scanner, Skill Gap, Company Match, AI Resume Rewriter, Project Ideas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Resume Checker */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-900/90'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}>
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-blue-500/15 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-600'
                  }`}>
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Resume Checker
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Extract text via PDF.js, audit contact details, detect 18+ technical skills, flag weak phrases, and calculate a dynamic score.
                  </p>
                </div>
                <div className={`pt-4 border-t mt-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <Link
                    to="/resume-checker"
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <span>Launch Resume Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 2: ATS Scanner */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}>
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-400' : 'bg-indigo-50 border border-indigo-200 text-indigo-600'
                  }`}>
                    <ScanText className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    ATS Scanner
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Verify applicant tracking system compatibility, parse layout readability, and detect missing role-critical keywords before applying.
                  </p>
                </div>
                <div className={`pt-4 border-t mt-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <Link
                    to="/ats-scanner"
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <span>Launch ATS Scanner</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Skill Gap */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900/90'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}>
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                  }`}>
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Skill Gap
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Benchmark your profile against target roles (Software Dev, Embedded, AI/DS). Uncover missing competencies and get a study roadmap.
                  </p>
                </div>
                <div className={`pt-4 border-t mt-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <Link
                    to="/skill-gap"
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <span>Explore Skill Gap</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 4: Company Match */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-purple-500/50 hover:bg-slate-900/90'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}>
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-purple-500/15 border border-purple-500/30 text-purple-400' : 'bg-purple-50 border border-purple-200 text-purple-600'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Company Match
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Discover hiring compatibility percentages with Tier-1 tech giants, product startups, and core hardware engineering companies.
                  </p>
                </div>
                <div className={`pt-4 border-t mt-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <Link
                    to="/company-match"
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <span>Check Company Fit</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 5: AI Resume Rewriter */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900/90'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}>
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400' : 'bg-amber-50 border border-amber-200 text-amber-600'
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    AI Resume Rewriter
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Elevate weak, passive bullet points into high-impact engineering accomplishments with quantifiable business deliverables.
                  </p>
                </div>
                <div className={`pt-4 border-t mt-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <Link
                    to="/ai-rewriter"
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <span>Launch AI Rewriter</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 6: Project Ideas */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-rose-500/50 hover:bg-slate-900/90'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}>
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-rose-500/15 border border-rose-500/30 text-rose-400' : 'bg-rose-50 border border-rose-200 text-rose-600'
                  }`}>
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Project Ideas
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Department-curated capstone and semester engineering projects with problem statements, hardware components, and outcomes.
                  </p>
                </div>
                <div className={`pt-4 border-t mt-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <Link
                    to="/project-ideas"
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <span>Explore Project Ideas</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Spotlight Banner on Main Working Module */}
            <div className={`mt-10 p-7 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md transition-all ${
              isDark
                ? 'bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border-blue-900/60 text-white shadow-black/20'
                : 'bg-slate-900 text-white border-slate-800'
            }`}>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-500/20 text-xs font-semibold text-blue-300 border border-blue-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Primary Operational Engine</span>
                </div>
                <h3 className="text-xl font-bold">Resume Checker with PDF.js Text Parser</h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Extracts raw resume text page-by-page directly in client memory, checks email/phone contact information, identifies 18+ technical skills, flags weak passive verbs, and applies deterministic scoring.
                </p>
              </div>
              <Link
                to="/resume-checker"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-md shadow-blue-600/30"
              >
                Open Resume Checker
              </Link>
            </div>

          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className={`py-16 border-b transition-colors ${
          isDark ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200/90 bg-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                How It Works
              </h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Five structured steps to transform your raw academic draft into a recruiter-ready resume.
              </p>
            </div>

            {/* Exactly 5 steps: Upload Resume, Analyze Resume, Identify Problems, Get Recommendations, Improve Resume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50/70 border-slate-200/90 shadow-2xs'
              }`}>
                <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  isDark ? 'bg-blue-500/15 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
                }`}>
                  01
                </div>
                <h4 className={`text-sm font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Upload className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  Upload Resume
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Upload your PDF. PDF.js extracts text page-by-page directly in client memory without server storage.
                </p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50/70 border-slate-200/90 shadow-2xs'
              }`}>
                <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  isDark ? 'bg-blue-500/15 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
                }`}>
                  02
                </div>
                <h4 className={`text-sm font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Search className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  Analyze Resume
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Regular expressions scan for email/phone contact info, 18+ technical skills, and 6 core sections.
                </p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50/70 border-slate-200/90 shadow-2xs'
              }`}>
                <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  isDark ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400' : 'bg-amber-50 border border-amber-200 text-amber-700'
                }`}>
                  03
                </div>
                <h4 className={`text-sm font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  Identify Problems
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Flags weak verbs like &ldquo;worked on&rdquo;, spelling slips (javascript &rarr; JavaScript), and missing sections.
                </p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50/70 border-slate-200/90 shadow-2xs'
              }`}>
                <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  isDark ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                }`}>
                  04
                </div>
                <h4 className={`text-sm font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Lightbulb className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  Get Recommendations
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Receive professional replacements and quantifiable impact suggestions with dynamic score math.
                </p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50/70 border-slate-200/90 shadow-2xs'
              }`}>
                <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  isDark ? 'bg-blue-500/15 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
                }`}>
                  05
                </div>
                <h4 className={`text-sm font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <CheckCircle className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  Improve Resume
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Apply corrections, re-evaluate to watch your dynamic score climb from ~55% up to 85%–95%.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`p-8 rounded-2xl border transition-all space-y-6 ${
              isDark
                ? 'bg-slate-900/70 border-slate-800/80 shadow-xl shadow-black/20'
                : 'bg-white border-slate-200/90 shadow-sm'
            }`}>
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
                isDark ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    About ResumeForge AI
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Student Career Intelligence & Recruitment Enablement
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setVivaModalOpen(true)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start cursor-pointer transition-colors border ${
                    isDark
                      ? 'text-blue-400 bg-blue-950/60 border-blue-800/60 hover:bg-blue-900/60'
                      : 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Academic Defense Guide</span>
                </button>
              </div>

              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                ResumeForge AI is an academic career platform specifically architected to help undergraduate students, recent graduates, and job seekers navigate modern technical campus placements. Rather than relying on black-box opacity, the platform breaks down candidate resumes systematically into measurable criteria: contact accessibility, technical skill density, structural section coverage, and active verb impact.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    Current Architecture
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Powered by React, TypeScript, PDF.js, regular expressions, and deterministic rule-based scoring. Real resumes score dynamically based on rigorous multi-attribute checks rather than arbitrary hardcoding.
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    Future Roadmap
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Progressive integration of NLP transformers, automated job description matching, candidate skill gap roadmaps, and intelligent resume rewriting engines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </div>
  );
};
