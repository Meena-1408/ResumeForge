import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Cpu,
  Layers,
  CheckCircle2,
  Filter,
  ArrowRight,
  Menu,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { VivaModal } from '../components/VivaModal';
import { PROJECT_IDEAS_DATA, ProjectIdea } from '../data/projectIdeasData';

export const ProjectIdeasPage: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);

  // Filters
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchSkill, setSearchSkill] = useState<string>('');

  const filteredProjects = PROJECT_IDEAS_DATA.filter((project) => {
    if (selectedDept !== 'All' && project.department !== selectedDept) return false;
    if (selectedDifficulty !== 'All' && project.difficulty !== selectedDifficulty) return false;
    if (searchSkill.trim()) {
      const query = searchSkill.toLowerCase().trim();
      const hasSkill = project.skills.some((s) => s.toLowerCase().includes(query));
      const hasTech = project.technologies.some((t) => t.toLowerCase().includes(query));
      const hasTitle = project.title.toLowerCase().includes(query);
      if (!hasSkill && !hasTech && !hasTitle) return false;
    }
    return true;
  });

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
              <span className="font-semibold text-slate-900">Project Ideas Catalog</span>
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

        {/* Content Body */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Capstone & Mini-Project Intelligence</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Engineering Project Ideas</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Curated capstone & resume-boosting hardware/software engineering projects mapped to placement goals
              </p>
            </div>

            <Link
              to="/journal-papers"
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Journal Papers</span>
            </Link>
          </div>

          {/* Interactive Filters Bar */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Department Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Department:</span>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Departments</option>
                  <option value="ECE">ECE (Electronics & Comm)</option>
                  <option value="CSE">CSE (Computer Science)</option>
                  <option value="EEE">EEE (Electrical & Electronics)</option>
                </select>
              </div>

              {/* Difficulty Level */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Difficulty:</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Keyword / Skill Search */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                placeholder="Search skills (e.g. Arduino, IoT, Python)..."
                className="text-xs border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
              {searchSkill && (
                <button
                  type="button"
                  onClick={() => setSearchSkill('')}
                  className="text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Quick preset selector buttons for ECE demo requested in prompt */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold">Quick Focus Demo:</span>
            <button
              type="button"
              onClick={() => {
                setSelectedDept('ECE');
                setSelectedDifficulty('All');
                setSearchSkill('IoT');
              }}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded text-xs font-medium cursor-pointer"
            >
              ECE + IoT + Arduino
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDept('CSE');
                setSelectedDifficulty('All');
                setSearchSkill('');
              }}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded text-xs font-medium cursor-pointer"
            >
              CSE + Software Dev
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDept('All');
                setSelectedDifficulty('All');
                setSearchSkill('');
              }}
              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 underline"
            >
              Show All ({PROJECT_IDEAS_DATA.length})
            </button>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 hover:border-blue-300 transition-all space-y-4"
                >
                  {/* Header Title & Badges */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                          Dept: {project.department}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                            project.difficulty === 'Advanced'
                              ? 'bg-purple-100 text-purple-800'
                              : project.difficulty === 'Intermediate'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          Level: {project.difficulty}
                        </span>
                        <span className="text-xs text-slate-500">
                          Target Goal: <strong className="text-slate-700">{project.careerGoal}</strong>
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                        {project.title}
                      </h3>
                    </div>

                    <Link
                      to={`/journal-papers?topic=${encodeURIComponent(project.title)}`}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0 self-start"
                    >
                      <span>Find Journal Papers</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Problem Statement as specified in prompt */}
                  <div className="p-3.5 bg-slate-50/70 rounded-lg border border-slate-200/80 text-xs">
                    <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block mb-1">
                      Problem Statement:
                    </span>
                    <p className="text-slate-700 leading-relaxed">{project.problemStatement}</p>
                  </div>

                  {/* Objectives as specified in prompt */}
                  <div className="text-xs space-y-1.5">
                    <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
                      Project Objectives:
                    </span>
                    <ul className="space-y-1 text-slate-700 pl-4 list-disc marker:text-blue-600">
                      {project.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies & Components as specified in prompt */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                    
                    {/* Technologies */}
                    <div className="p-3 bg-blue-50/40 rounded-lg border border-blue-100 space-y-1.5">
                      <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider block">
                        Technologies & Frameworks:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 bg-white text-blue-800 rounded font-medium border border-blue-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Components */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                      <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
                        Hardware / Architectural Components:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.components.map((comp) => (
                          <span key={comp} className="px-2 py-0.5 bg-white text-slate-700 rounded font-medium border border-slate-200">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Expected Outcome as specified in prompt */}
                  <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 text-xs">
                    <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider block mb-0.5">
                      Expected Outcome & Deliverables:
                    </span>
                    <p className="text-emerald-800 font-medium">{project.expectedOutcome}</p>
                  </div>

                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                No project matches found for this filter criteria. Try clearing the search.
              </div>
            )}
          </div>

        </main>
      </div>

      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </div>
  );
};
