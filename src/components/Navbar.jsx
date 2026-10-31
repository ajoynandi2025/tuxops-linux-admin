import React, { useState } from 'react';
import { Terminal, BookOpen, Wrench, FileCode, Award, Search, Menu, X, Shield, Sparkles } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  onOpenTerminal,
  onOpenCheatSheet,
  onOpenQuiz,
  onSelectTool
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToolClick = (toolName) => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      onSelectTool(toolName);
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0d14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-lg font-extrabold tracking-tight text-white">TuxOps</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">v2.4</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans tracking-wide">Linux SysAdmin Academy</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currentView === 'home'
                ? "bg-slate-800 text-white font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('tutorials')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              currentView === 'tutorials'
                ? "bg-slate-800 text-emerald-400 font-semibold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tutorials</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-mono font-semibold">10</span>
          </button>

          {/* Tools Menu Dropdown / Direct triggers */}
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white flex items-center gap-1 transition">
              <Wrench className="w-4 h-4" />
              <span>SysAdmin Tools</span>
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block w-56 p-2 bg-[#111726] border border-slate-800 rounded-xl shadow-xl space-y-1">
              <button
                onClick={() => handleToolClick('chmod')}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chmod Permissions Calculator</span>
              </button>
              <button
                onClick={() => handleToolClick('systemd')}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Systemd Unit Generator</span>
              </button>
              <button
                onClick={() => handleToolClick('cron')}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Crontab Expression Builder</span>
              </button>
              <button
                onClick={() => handleToolClick('firewall')}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition flex items-center gap-2"
              >
                <FileCode className="w-3.5 h-3.5 text-red-400" />
                <span>UFW / Firewalld Builder</span>
              </button>
            </div>
          </div>

          <button
            onClick={onOpenCheatSheet}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white transition flex items-center gap-1.5"
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>Cheat Sheet</span>
          </button>

          <button
            onClick={onOpenQuiz}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white transition flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Quiz & Certs</span>
          </button>
        </nav>

        {/* Right CTA & Terminal Trigger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCheatSheet}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Quick Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">Ctrl+K</kbd>
          </button>

          <button
            onClick={() => onOpenTerminal("")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition group"
          >
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
            <Terminal className="w-4 h-4" />
            <span>Lab Terminal</span>
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
        <div className="md:hidden bg-[#0d1117] border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 text-sm animate-fade-in font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('tutorials')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span>Tutorials & Handbook</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono">10 Modules</span>
          </button>
          <button
            onClick={onOpenCheatSheet}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            Cheat Sheet & Command Search
          </button>
          <button
            onClick={onOpenQuiz}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            Certification Quiz
          </button>

          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-xs text-slate-500 uppercase tracking-wider px-3 mb-1 block">SysAdmin Utilities:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => handleToolClick('chmod')} className="p-2 rounded bg-slate-800 text-slate-300 text-left">Chmod Calc</button>
              <button onClick={() => handleToolClick('systemd')} className="p-2 rounded bg-slate-800 text-slate-300 text-left">Systemd Builder</button>
              <button onClick={() => handleToolClick('cron')} className="p-2 rounded bg-slate-800 text-slate-300 text-left">Cron Generator</button>
              <button onClick={() => handleToolClick('firewall')} className="p-2 rounded bg-slate-800 text-slate-300 text-left">UFW Firewall</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
