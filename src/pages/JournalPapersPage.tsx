import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  ExternalLink,
  Menu,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { VivaModal } from '../components/VivaModal';
import { JOURNAL_PAPERS_DATA, JournalPaperSuggestion } from '../data/journalPapersData';

export const JournalPapersPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);

  // Search parameters
  const [domainFilter, setDomainFilter] = useState('All');
  const [topicQuery, setTopicQuery] = useState('');

  useEffect(() => {
    const topicParam = searchParams.get('topic');
    if (topicParam) {
      setTopicQuery(topicParam);
    }
  }, [searchParams]);

  const filteredPapers = JOURNAL_PAPERS_DATA.filter((paper) => {
    if (domainFilter !== 'All' && !paper.domain.toLowerCase().includes(domainFilter.toLowerCase())) {
      return false;
    }
    if (topicQuery.trim()) {
      const q = topicQuery.toLowerCase().trim();
      const inTitle = paper.paperTitle.toLowerCase().includes(q);
      const inTopic = paper.projectTopic.toLowerCase().includes(q);
      const inArea = paper.researchArea.toLowerCase().includes(q);
      const inKeywords = paper.keywords.some((k) => k.toLowerCase().includes(q));
      if (!inTitle && !inTopic && !inArea && !inKeywords) return false;
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
              <span className="font-semibold text-slate-900">Journal Papers</span>
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
                <BookOpen className="w-3.5 h-3.5" />
                <span>Academic Literature Search</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Journal Paper Suggestions</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Discover peer-reviewed IEEE, ACM, and Elsevier papers to ground final year projects & substantiate resumes
              </p>
            </div>

            <Link
              to="/project-ideas"
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>View Project Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Search & Domain Filter Bar */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Domain:</span>
                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Domains</option>
                  <option value="Internet of Things">IoT & Embedded Systems</option>
                  <option value="Artificial Intelligence">AI & Natural Language Processing</option>
                  <option value="Edge AI">Edge AI & Microcontrollers</option>
                  <option value="Power Systems">Electrical & Power Systems</option>
                  <option value="Computer Vision">Computer Vision</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={topicQuery}
                onChange={(e) => setTopicQuery(e.target.value)}
                placeholder="Search topic or keywords (e.g. TinyML, LoRa, Resume)..."
                className="text-xs border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
              />
              {topicQuery && (
                <button
                  type="button"
                  onClick={() => setTopicQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Papers Listing */}
          <div className="space-y-4">
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 hover:border-blue-300 transition-all space-y-4"
                >
                  {/* Top Bar with Journal & Relevance */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {paper.journal} ({paper.year})
                        </span>
                        <span className="text-xs text-slate-500">
                          Domain: <strong className="text-slate-700">{paper.domain}</strong>
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {paper.paperTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Related Project Topic: <strong className="text-slate-800">{paper.projectTopic}</strong>
                      </p>
                    </div>

                    <div className="text-right shrink-0 self-start sm:self-auto">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Relevance
                      </span>
                      <span className="text-2xl font-bold text-emerald-600 tabular-nums">
                        {paper.relevanceScore}%
                      </span>
                    </div>
                  </div>

                  {/* Research Area & Keywords as specified in prompt */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block mb-1">
                        Research Area:
                      </span>
                      <p className="text-slate-700">{paper.researchArea}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block mb-1">
                        Keywords:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {paper.keywords.map((kw) => (
                          <span key={kw} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded text-[11px]">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Suggested Research Direction as specified in prompt */}
                  <div className="p-3.5 bg-blue-50/60 rounded-lg border border-blue-200 text-xs">
                    <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider block mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Suggested Research Direction & Extension:
                    </span>
                    <p className="text-blue-900 font-medium leading-relaxed">
                      {paper.suggestedDirection}
                    </p>
                  </div>

                  {/* Key Contributions */}
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-slate-700 block">Key Paper Takeaways:</span>
                    <ul className="text-slate-600 pl-4 list-disc space-y-0.5">
                      {paper.keyContributions.map((contrib, i) => (
                        <li key={i}>{contrib}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                No journal paper references found matching your query.
              </div>
            )}
          </div>

        </main>
      </div>

      <VivaModal isOpen={vivaModalOpen} onClose={() => setVivaModalOpen(false)} />
    </div>
  );
};
