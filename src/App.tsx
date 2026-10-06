import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeCheckerPage } from './pages/ResumeCheckerPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { AtsScannerPage } from './pages/AtsScannerPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { CompanyMatchPage } from './pages/CompanyMatchPage';
import { AiRewriterPage } from './pages/AiRewriterPage';
import { ProjectIdeasPage } from './pages/ProjectIdeasPage';
import { JournalPapersPage } from './pages/JournalPapersPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Authentication */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Dashboard Workspace */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Primary Operational Module: Resume Checker */}
          <Route path="/resume-checker" element={<ResumeCheckerPage />} />

          {/* Career Intelligence Modules */}
          <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/ats-scanner" element={<AtsScannerPage />} />
          <Route path="/skill-gap" element={<SkillGapPage />} />
          <Route path="/company-match" element={<CompanyMatchPage />} />
          <Route path="/ai-rewriter" element={<AiRewriterPage />} />
          <Route path="/project-ideas" element={<ProjectIdeasPage />} />
          <Route path="/journal-papers" element={<JournalPapersPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
