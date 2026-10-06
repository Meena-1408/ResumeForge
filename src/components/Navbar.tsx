import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X, HelpCircle, ArrowRight, Sun, Moon } from 'lucide-react';
import { VivaModal } from './VivaModal';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <header className={`sticky top-0 z-40 border-b transition-colors ${
        isDark
          ? 'bg-slate-950/85 backdrop-blur-md border-slate-800/80 text-slate-200'
          : 'bg-white/95 backdrop-blur-md border-slate-200/90 text-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Zone 1: Single text element wordmark */}
            <div className="flex items-center gap-2.5">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-lg font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    ResumeForge <span className="text-blue-500">AI</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Zone 2: 4-6 clean text navigation links */}
            {!isAuthPage && (
              <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
                <Link
                  to="/"
                  className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Home
                </Link>
                <a
                  href="#features"
                  className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  How It Works
                </a>
                <a
                  href="#about"
                  className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  About
                </a>
                <Link
                  to="/resume-checker"
                  className="font-semibold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  Resume Checker
                </Link>
                <button
                  type="button"
                  onClick={() => setVivaModalOpen(true)}
                  className={`transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  <span>Viva Q&A</span>
                </button>
              </nav>
            )}

            {/* Zone 3: Actions + Theme Switcher */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? 'Switch to Professional Light' : 'Switch to Executive Dark'}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-amber-400 hover:text-white hover:border-slate-600'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-blue-600" />}
              </button>

              <Link
                to="/login"
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-1.5 rounded-lg border ${
                  isDark ? 'bg-slate-900 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md ${
                  isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-b px-4 pt-3 pb-5 space-y-3 ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1"
            >
              Home
            </Link>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1"
            >
              How It Works
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1"
            >
              About
            </a>
            <Link
              to="/resume-checker"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-blue-500 py-1"
            >
              Resume Checker (Live Module)
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setVivaModalOpen(true);
              }}
              className="w-full text-left text-sm font-medium py-1 flex items-center gap-2 text-slate-300"
            >
              <HelpCircle className="w-4 h-4 text-blue-400" />
              Viva & Academic Guide
            </button>
            <div className={`pt-3 border-t flex flex-col gap-2 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Academic / Viva modal */}
      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </>
  );
};
