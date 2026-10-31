import React, { useState } from 'react';
import { Terminal, BookOpen, Search, Menu, X, ChevronDown, Layers } from 'lucide-react';
import { TOPIC_CATEGORIES, TOPICS } from '../data/topicsData';

export default function Navbar({
  currentView,
  onNavigateHome,
  onSelectTopic
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleTopicClick = (id) => {
    onSelectTopic(id);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0d14]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-lg font-extrabold tracking-tight text-white">TuxOps</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">v3.0</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans tracking-wide">Linux Administration Handbook</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          <button
            onClick={onNavigateHome}
            className={`px-3.5 py-1.5 rounded-lg transition ${
              currentView === 'home'
                ? "bg-slate-800 text-white font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            All Topics ({TOPICS.length})
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
              className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Browse Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-64 p-2 bg-[#111726] border border-slate-800 rounded-xl shadow-2xl space-y-1 z-50">
                {TOPIC_CATEGORIES.filter(c => c !== "All").map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigateHome();
                      setCategoryDropdownOpen(false);
                      // Scroll to topics directory
                      setTimeout(() => {
                        const el = document.getElementById("topics-directory");
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition block truncate"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById("topics-directory");
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Search Guides</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1117] border-b border-slate-800 px-4 pt-3 pb-5 space-y-2.5 text-sm animate-fade-in font-medium">
          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span>All 25 Topics Directory</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">25</span>
          </button>

          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-xs text-slate-500 uppercase tracking-wider px-3 mb-2 block font-sans">
              Jump to Topic:
            </span>
            <div className="max-h-60 overflow-y-auto space-y-1 pr-1 text-xs">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTopicClick(t.id)}
                  className="w-full text-left p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 truncate block"
                >
                  <span className="font-mono text-emerald-400 mr-2">{t.topicNumber}</span>
                  <span>{t.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
