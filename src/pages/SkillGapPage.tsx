import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  Menu,
  Plus,
  Trash2,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { VivaModal } from '../components/VivaModal';
import { ROLE_SKILL_REQUIREMENTS } from '../data/skillsData';

export const SkillGapPage: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);

  // Selected target role
  const [selectedRoleId, setSelectedRoleId] = useState<string>('software-developer');
  
  // User skills state as requested in prompt example: Java, Python, SQL, HTML, CSS
  const [userSkills, setUserSkills] = useState<string[]>([
    'Java',
    'Python',
    'SQL',
    'HTML',
    'CSS'
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');

  const currentRole = ROLE_SKILL_REQUIREMENTS.find((r) => r.id === selectedRoleId) || ROLE_SKILL_REQUIREMENTS[0];

  // Calculate matched vs missing skills
  const matchedSkills = currentRole.requiredSkills.filter((req) =>
    userSkills.some((user) => user.toLowerCase().trim() === req.toLowerCase().trim())
  );

  const missingSkills = currentRole.requiredSkills.filter(
    (req) => !userSkills.some((user) => user.toLowerCase().trim() === req.toLowerCase().trim())
  );

  const totalRequired = currentRole.requiredSkills.length;
  const matchPercentage = Math.round((matchedSkills.length / totalRequired) * 100);
  const skillGapPercentage = 100 - matchPercentage;

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!userSkills.includes(newSkillInput.trim())) {
      setUserSkills([...userSkills, newSkillInput.trim()]);
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setUserSkills(userSkills.filter((s) => s !== skillToRemove));
  };

  const handleResetDefault = () => {
    setUserSkills(['Java', 'Python', 'SQL', 'HTML', 'CSS']);
  };

  return (
    <div className="min-h-screen bg-professional-light flex">
      <Sidebar
        onOpenVivaModal={() => setVivaModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
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
              <span className="font-semibold text-slate-900">Skill Gap Analyzer</span>
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

        {/* Content Body */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Skill Gap Analyzer</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Benchmark your candidate profile against required industry competencies & obtain targeted roadmaps
              </p>
            </div>

            {/* Target Role Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="roleSelect" className="text-xs font-bold text-slate-700 shrink-0">
                Target Role:
              </label>
              <select
                id="roleSelect"
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ROLE_SKILL_REQUIREMENTS.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName} ({role.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Metric Overview Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500">Skill Gap Percentage</span>
              <p className="text-3xl font-bold text-amber-600 mt-1 tabular-nums">
                {skillGapPercentage}%
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {missingSkills.length} of {totalRequired} target skills required
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500">Role Match Alignment</span>
              <p className="text-3xl font-bold text-blue-600 mt-1 tabular-nums">
                {matchPercentage}%
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {matchedSkills.length} competencies verified
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500">Total User Skills</span>
              <p className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">
                {userSkills.length}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Interactive candidate skillset
              </p>
            </div>

          </div>

          {/* Interactive User Skills Management */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Your Current Skills</h3>
                <p className="text-xs text-slate-500">
                  Add or remove skills to simulate how your gap score responds
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetDefault}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold self-start"
              >
                Reset to Example Profile (Java, Python, SQL, HTML, CSS)
              </button>
            </div>

            {/* Current skill tags */}
            <div className="flex flex-wrap gap-2">
              {userSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium border border-slate-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-600 cursor-pointer"
                    aria-label={`Remove ${skill}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill input form */}
            <form onSubmit={handleAddSkill} className="flex gap-2 max-w-md pt-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add skill (e.g. Spring Boot, Git, Docker)"
                className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Matched vs Missing Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Matched Skills */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Matched Skills ({matchedSkills.length})
                </h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Eligible
                </span>
              </div>
              
              <div className="space-y-2 pt-2">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-emerald-900">{skill}</span>
                      <span className="text-[11px] text-emerald-700 font-medium">Verified in profile</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No skills currently match the role requirements.</p>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-amber-600" />
                  Missing Skills ({missingSkills.length})
                </h3>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Action Required
                </span>
              </div>

              <div className="space-y-2 pt-2">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill) => (
                    <div
                      key={skill}
                      className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-amber-900">{skill}</span>
                      <button
                        type="button"
                        onClick={() => setUserSkills([...userSkills, skill])}
                        className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        + Mark as Learned
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs">
                    Congratulations! You have satisfied 100% of the baseline skills for this role.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Recommendations & Study Roadmap as specified in prompt: Learn Spring Boot, Practice DSA, Build REST API project */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Personalized Learning Roadmap & Recommendations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentRole.recommendedRoadmap.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                      Phase 0{idx + 1} &middot; {step.estimatedWeeks} Weeks
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {step.step}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Curriculum: {step.resource}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                    <span>Explore syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </div>
  );
};
