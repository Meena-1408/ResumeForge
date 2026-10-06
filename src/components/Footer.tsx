import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                ResumeForge <span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              AI-Powered Resume & Career Intelligence Platform designed for students and job seekers. Analyze resumes, detect mistakes, identify weak phrases, calculate dynamic scores, and optimize for recruitment.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Client-side parsing with PDF.js & TypeScript rule engine. No resume data is sold or retained.</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3">Core Modules</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/resume-checker" className="hover:text-blue-400 transition-colors">
                  Resume Checker (Active)
                </Link>
              </li>
              <li>
                <Link to="/resume-analyzer" className="hover:text-blue-400 transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/ats-scanner" className="hover:text-blue-400 transition-colors">
                  ATS Scanner
                </Link>
              </li>
              <li>
                <Link to="/skill-gap" className="hover:text-blue-400 transition-colors">
                  Skill Gap Analyzer
                </Link>
              </li>
              <li>
                <Link to="/company-match" className="hover:text-blue-400 transition-colors">
                  Company Match
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3">Career & Research</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-rewriter" className="hover:text-blue-400 transition-colors">
                  AI Resume Rewriter
                </Link>
              </li>
              <li>
                <Link to="/project-ideas" className="hover:text-blue-400 transition-colors">
                  Project Ideas Catalog
                </Link>
              </li>
              <li>
                <Link to="/journal-papers" className="hover:text-blue-400 transition-colors">
                  Journal Paper Suggestions
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} ResumeForge AI. Academic Project Prototype.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with React, TypeScript, PDF.js & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
