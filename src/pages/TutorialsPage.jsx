import React, { useState, useEffect } from 'react';
import { 
  TUTORIAL_MODULES 
} from '../data/tutorials';
import { 
  BookOpen, CheckCircle, CheckCircle2, ChevronRight, ChevronLeft, 
  Terminal, Copy, Check, Play, Search, Shield, HardDrive, 
  Server, Network, Package, ShieldAlert, Activity, RotateCcw, Cpu, Users
} from 'lucide-react';

const ICON_MAP = {
  Cpu: Cpu,
  Users: Users,
  HardDrive: HardDrive,
  Server: Server,
  Network: Network,
  Package: Package,
  ShieldAlert: ShieldAlert,
  Terminal: Terminal,
  Activity: Activity,
  RotateCcw: RotateCcw
};

export default function TutorialsPage({
  onOpenTerminalWithCommand,
  completedModules,
  toggleModuleCompleted
}) {
  const [activeModuleId, setActiveModuleId] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && TUTORIAL_MODULES.some(m => m.id === hash)) {
      return hash;
    }
    return TUTORIAL_MODULES[0].id;
  });

  const [sidebarSearch, setSidebarSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState(null);

  // Sync hash with activeModuleId
  useEffect(() => {
    window.location.hash = activeModuleId;
  }, [activeModuleId]);

  const activeModuleIndex = TUTORIAL_MODULES.findIndex(m => m.id === activeModuleId);
  const activeModule = TUTORIAL_MODULES[activeModuleIndex] || TUTORIAL_MODULES[0];

  const prevModule = activeModuleIndex > 0 ? TUTORIAL_MODULES[activeModuleIndex - 1] : null;
  const nextModule = activeModuleIndex < TUTORIAL_MODULES.length - 1 ? TUTORIAL_MODULES[activeModuleIndex + 1] : null;

  const isCompleted = completedModules && completedModules[activeModule.id];

  const filteredModules = TUTORIAL_MODULES.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
                          m.overview.toLowerCase().includes(sidebarSearch.toLowerCase());
    const matchesDiff = selectedDifficulty === "All" || m.difficulty === selectedDifficulty;
    return matchesSearch && matchesDiff;
  });

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const handleSelectModule = (id) => {
    setActiveModuleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ModuleIcon = ICON_MAP[activeModule.icon] || Terminal;

  // Calculate overall progress
  const completedCount = Object.values(completedModules || {}).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / TUTORIAL_MODULES.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
          <span>Tutorials</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold font-mono">Module {activeModule.moduleNumber}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white truncate max-w-xs">{activeModule.title}</span>
        </div>

        {/* Global Progress Indicator */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400 font-sans">Course Progress:</span>
          <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="font-mono text-emerald-400 font-semibold">{completedCount}/{TUTORIAL_MODULES.length} ({progressPercent}%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Sidebar */}
        <aside className="lg:col-span-4 bg-[#111726] border border-slate-800 rounded-2xl p-4 lg:sticky lg:top-24 max-h-[85vh] flex flex-col">
          <div className="pb-3 border-b border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                Curriculum Syllabus
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                10 Lessons
              </span>
            </div>

            {/* Search */}
            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                placeholder="Filter topics..."
                className="w-full bg-[#0a0d14] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
              />
            </div>

            {/* Difficulty Filter Chips */}
            <div className="flex items-center gap-1 text-[11px]">
              {["All", "Beginner", "Intermediate", "Advanced"].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2 py-0.5 rounded transition ${
                    selectedDifficulty === diff
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Module Links List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 py-3 pr-1">
            {filteredModules.map((m) => {
              const active = m.id === activeModuleId;
              const completed = completedModules && completedModules[m.id];
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectModule(m.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between text-xs group ${
                    active
                      ? "bg-slate-800 border border-emerald-500/40 text-white font-semibold shadow"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded shrink-0 ${
                      active ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400"
                    }`}>
                      {m.moduleNumber}
                    </span>
                    <span className="truncate">{m.title}</span>
                  </div>

                  {completed && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Main Tutorial Viewer */}
        <main className="lg:col-span-8 bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Header */}
          <div className="pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ModuleIcon className="w-6 h-6" />
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Module {activeModule.moduleNumber} • {activeModule.badge}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  activeModule.difficulty === 'Beginner' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' :
                  activeModule.difficulty === 'Intermediate' ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/40' :
                  'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                }`}>
                  {activeModule.difficulty}
                </span>
                <span className="text-xs text-slate-500 font-sans">{activeModule.duration}</span>
                <button
                  onClick={() => toggleModuleCompleted(activeModule.id)}
                  className={`ml-2 px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompleted ? "Completed" : "Mark as Done"}</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans mt-2">
              {activeModule.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
              {activeModule.overview}
            </p>
          </div>

          {/* Key Learning Objectives */}
          <div className="p-5 rounded-xl bg-[#0a0d14] border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Key Learning Objectives
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {activeModule.keyConcepts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture / Concept Flow Diagram */}
          {activeModule.architectureDiagram && (
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                [Architecture & Execution Pipeline]
              </span>
              <pre className="p-4 bg-[#0a0d14] border border-slate-800 rounded-xl font-mono text-[11px] sm:text-xs text-emerald-300 overflow-x-auto leading-tight shadow-inner">
                {activeModule.architectureDiagram.trim()}
              </pre>
            </div>
          )}

          {/* Detailed Tutorial Sections */}
          <div className="space-y-8">
            {activeModule.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                  {section.heading}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {section.text}
                </p>

                {section.details && (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-2">
                    {section.details.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-1 shrink-0">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Annotated Code Block */}
                {section.codeSnippet && (
                  <div className="rounded-xl overflow-hidden bg-[#0a0d14] border border-slate-800 font-mono text-xs">
                    {/* Snippet Header */}
                    <div className="px-4 py-2 bg-[#161b22] border-b border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">
                        {section.codeSnippet.explanation}
                      </span>
                      <div className="flex items-center gap-2">
                        {section.interactiveCommand && (
                          <button
                            onClick={() => onOpenTerminalWithCommand(section.interactiveCommand)}
                            className="text-emerald-400 hover:text-emerald-300 text-[11px] font-sans font-semibold flex items-center gap-1"
                            title="Run command in web lab terminal"
                          >
                            <Play className="w-3 h-3 fill-emerald-400" /> Run in Lab
                          </button>
                        )}
                        <button
                          onClick={() => handleCopyCode(section.codeSnippet.command, sIdx)}
                          className="text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px]"
                        >
                          {copiedSnippetIndex === sIdx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Command execution */}
                    <div className="p-4 bg-[#0a0d14] text-slate-200">
                      <div className="flex items-center gap-2 text-amber-300 font-bold">
                        <span className="text-slate-500">$</span>
                        <span>{section.codeSnippet.command}</span>
                      </div>
                      {section.codeSnippet.output && (
                        <pre className="mt-3 text-slate-400 text-[11px] sm:text-xs overflow-x-auto border-t border-slate-800/80 pt-2 leading-relaxed">
                          {section.codeSnippet.output}
                        </pre>
                      )}
                    </div>
                  </div>
                )}

                {/* SysAdmin ProTip Callout */}
                {section.proTip && (
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-3">
                    <span className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5">
                      <Shield className="w-4 h-4" />
                    </span>
                    <div className="text-xs text-slate-300">
                      <span className="font-semibold text-cyan-300 block mb-0.5">Production SysAdmin ProTip:</span>
                      <p>{section.proTip}</p>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Real-World Production Outage Scenario */}
          {activeModule.productionScenario && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/20 to-slate-900 border border-red-500/30 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4" /> Production Incident Triage Simulation
              </div>

              <h4 className="text-base font-bold text-white">
                Problem: {activeModule.productionScenario.problem}
              </h4>

              <div className="text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-slate-400 block text-[11px] uppercase">Incident Triage:</span>
                <p className="whitespace-pre-line leading-relaxed">{activeModule.productionScenario.triage}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="font-mono text-xs text-emerald-400 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 overflow-x-auto">
                  {activeModule.productionScenario.resolutionCommand}
                </div>
                <button
                  onClick={() => onOpenTerminalWithCommand(activeModule.productionScenario.resolutionCommand)}
                  className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Try Remediation
                </button>
              </div>
            </div>
          )}

          {/* Bottom Module Navigation Buttons */}
          <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
            {prevModule ? (
              <button
                onClick={() => handleSelectModule(prevModule.id)}
                className="p-3 sm:px-4 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left hidden sm:block">
                  <span className="text-[10px] text-slate-400 block font-normal">Previous</span>
                  <span>{prevModule.title}</span>
                </div>
              </button>
            ) : <div></div>}

            {nextModule ? (
              <button
                onClick={() => handleSelectModule(nextModule.id)}
                className="p-3 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-2"
              >
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-900 block font-normal">Next Module</span>
                  <span>{nextModule.title}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleSelectModule(TUTORIAL_MODULES[0].id)}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition"
              >
                Restart Curriculum
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
