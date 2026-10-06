import React from 'react';
import { X, CheckCircle2, Cpu, GraduationCap, ShieldAlert } from 'lucide-react';

interface VivaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VivaModal: React.FC<VivaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-semibold">Academic Project Defense & Viva Guide</h3>
              <p className="text-xs text-slate-400">Standard explanation for evaluators and presentation panel</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm text-slate-700">

          {/* Q1 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              What is your project?
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-md text-slate-800 font-medium">
              &ldquo;ResumeForge AI is an AI-powered career platform designed to help students and job seekers improve their resumes. Users can upload their resume, and our system extracts the resume content, checks contact information, technical skills, sections and weak statements, calculates a resume score, identifies mistakes and provides professional corrections and recommendations.&rdquo;
            </div>
          </div>

          {/* Q2 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              What technologies did you use?
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-md text-slate-800 font-medium">
              &ldquo;We used React.js with TypeScript for the frontend, Vite for development, React Router for navigation, CSS for UI design, Node.js and npm for the project environment, and PDF.js for extracting text from uploaded PDF resumes. We used regular expressions, keyword matching and TypeScript logic for resume analysis and scoring.&rdquo;
            </div>
          </div>

          {/* Q3 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Is it really AI?
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-md text-slate-800 font-medium">
              &ldquo;The current prototype uses rule-based resume analysis. We have designed the architecture to integrate AI and NLP in the future for advanced grammar analysis, resume rewriting and intelligent recommendations.&rdquo;
            </div>
          </div>

          {/* Project Differentiation */}
          <div className="border border-blue-100 rounded-lg p-4 bg-blue-50/40">
            <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Project Differentiation
            </h4>
            <p className="text-slate-700 leading-relaxed">
              &ldquo;ResumeForge AI is designed as a student-focused career intelligence platform that combines resume checking with future modules such as skill-gap analysis, company matching, AI resume rewriting, project recommendations and research-paper suggestions.&rdquo;
            </p>
          </div>

          {/* Prototype Implementation Notice */}
          <div className="border border-amber-200 rounded-lg p-4 bg-amber-50/50 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-semibold">Academic Disclosure Standard</p>
              <p>
                The currently fully implemented operational module is the <strong>Resume Checker</strong> with client-side PDF.js extraction, regex verification, and dynamic penalty scoring. Remaining career intelligence modules (ATS Scanner, Skill Gap, Company Match, AI Rewriter, Projects, Journal Papers) are designed in the UI and scheduled for progressive deployment.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
