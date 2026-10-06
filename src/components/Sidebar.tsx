import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCheck2,
  FileSearch,
  ScanText,
  Target,
  Building2,
  Sparkles,
  Lightbulb,
  BookOpen,
  GraduationCap,
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  onOpenVivaModal?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenVivaModal,
  mobileOpen = false,
  onCloseMobile
}) => {
  const navigationItems = [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Resume Analyzer',
      to: '/resume-analyzer',
      icon: FileSearch,
      badge: null
    },
    {
      name: 'Resume Checker',
      to: '/resume-checker',
      icon: FileCheck2,
      badge: 'Live Module'
    },
    {
      name: 'ATS Scanner',
      to: '/ats-scanner',
      icon: ScanText,
      badge: null
    },
    {
      name: 'Skill Gap',
      to: '/skill-gap',
      icon: Target,
      badge: null
    },
    {
      name: 'Company Match',
      to: '/company-match',
      icon: Building2,
      badge: null
    },
    {
      name: 'AI Resume Rewriter',
      to: '/ai-rewriter',
      icon: Sparkles,
      badge: null
    },
    {
      name: 'Project Ideas',
      to: '/project-ideas',
      icon: Lightbulb,
      badge: null
    },
    {
      name: 'Journal Papers',
      to: '/journal-papers',
      icon: BookOpen,
      badge: null
    }
  ];

  const content = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 w-64 border-r border-slate-800">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            RF
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight leading-none">
              ResumeForge <span className="text-blue-400">AI</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Career Intelligence</p>
          </div>
        </NavLink>
      </div>

      {/* User profile capsule */}
      <div className="px-4 py-3 mx-3 my-3 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-semibold text-xs">
          <UserCheck className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">Candidate Student</p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>B.Tech / Student</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Career Intelligence Tools
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`
              }
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Academic Viva Helper & Footer Actions */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {onOpenVivaModal && (
          <button
            type="button"
            onClick={onOpenVivaModal}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-slate-700/60"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Viva & Project Q&A</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}

        <NavLink
          to="/login"
          className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Workspace</span>
        </NavLink>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60" onClick={onCloseMobile} />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
};
