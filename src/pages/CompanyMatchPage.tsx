import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Menu,
  Briefcase,
  Search,
  ExternalLink
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { VivaModal } from '../components/VivaModal';
import { COMPANY_MATCH_DATA, CompanyMatchProfile } from '../data/companyData';

export const CompanyMatchPage: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState('Software Engineer');
  
  // User skills baseline
  const [userSkills, setUserSkills] = useState<string[]>([
    'Java',
    'Python',
    'SQL',
    'HTML',
    'CSS',
    'Data Structures',
    'Problem Solving'
  ]);

  const filteredCompanies = COMPANY_MATCH_DATA.map((company) => {
    const matched = company.requiredSkills.filter((req) =>
      userSkills.some((s) => s.toLowerCase() === req.toLowerCase())
    );
    const missing = company.requiredSkills.filter(
      (req) => !userSkills.some((s) => s.toLowerCase() === req.toLowerCase())
    );
    const matchPercentage = Math.round((matched.length / company.requiredSkills.length) * 100);

    return {
      ...company,
      matched,
      missing,
      matchPercentage
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="min-h-screen bg-professional-light flex">
      <Sidebar
        onOpenVivaModal={() => setVivaModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

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
              <Link to="/dashboard" className="hover:text-slate-900">Career Workspace</Link>
              <span>/</span>
              <span className="font-semibold text-slate-900">Company Match</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVivaModalOpen(true)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg"
          >
            Academic Viva Guide
          </button>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Company Match Engine</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Benchmark your candidate profile against hiring requirements at top recruitment organizations
              </p>
            </div>

            {/* Target Role Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="targetRole" className="text-xs font-bold text-slate-700 shrink-0">
                Target Role:
              </label>
              <select
                id="targetRole"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Software Engineer">Software Engineer / Developer</option>
                <option value="Embedded Systems Engineer">Embedded Systems Engineer</option>
              </select>
            </div>
          </div>

          {/* Profile snapshot banner */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="font-semibold text-slate-900">Active Profile Skills:</span>
              <span className="font-mono text-blue-700">{userSkills.join(', ')}</span>
            </div>
            <span className="text-[11px] text-slate-500">
              Showing {filteredCompanies.length} benchmarked companies
            </span>
          </div>

          {/* Company Cards Grid */}
          <div className="space-y-4">
            {filteredCompanies.map((company) => {
              const isHighMatch = company.matchPercentage >= 75;
              const isModerateMatch = company.matchPercentage >= 60;

              return (
                <div
                  key={company.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 hover:border-blue-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                        {company.logoInitial}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{company.companyName}</h3>
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {company.tier}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Role Focus: {company.roleTarget}</p>
                      </div>
                    </div>

                    {/* Match percentage badge */}
                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Profile Match
                        </span>
                        <span
                          className={`text-2xl font-bold tabular-nums ${
                            isHighMatch
                              ? 'text-emerald-600'
                              : isModerateMatch
                              ? 'text-blue-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {company.matchPercentage}%
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isHighMatch
                              ? 'bg-emerald-500'
                              : isModerateMatch
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid: Required vs Matched vs Missing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    
                    {/* Required Skills & Matched */}
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-semibold text-slate-900 block">
                        Required Skills ({company.requiredSkills.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {company.requiredSkills.map((skill) => {
                          const hasIt = company.matched.includes(skill);
                          return (
                            <span
                              key={skill}
                              className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                                hasIt
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              {skill} {hasIt && '✓'}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-200/70 space-y-2">
                      <span className="font-semibold text-amber-900 block">
                        Missing Skills to Bridge ({company.missing.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {company.missing.length > 0 ? (
                          company.missing.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded text-[11px] font-medium bg-white border border-amber-300 text-amber-800"
                            >
                              + {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-emerald-700 font-medium">
                            Profile fully covers all prerequisites!
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Hiring Focus & Rounds */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
                    <p className="italic max-w-xl">
                      <strong>Recruitment Focus:</strong> {company.hiringFocus}
                    </p>
                    <div className="flex items-center gap-1.5 text-blue-600 font-semibold cursor-pointer">
                      <span>View Interview Stages ({company.interviewStages.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </main>
      </div>

      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </div>
  );
};
