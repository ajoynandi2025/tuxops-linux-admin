import React, { useState } from 'react';
import { X, Search, Copy, Check, Filter, Terminal } from 'lucide-react';
import { CHEATSHEET_DATA } from '../data/cheatsheet';

export default function CheatSheetModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const categories = ["All", "Storage", "Permissions", "Systemd", "Processes", "Networking", "Security", "Search"];

  const filteredCommands = CHEATSHEET_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.example && item.example.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (command, index) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl w-full max-w-4xl h-[650px] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Terminal className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Linux Admin Command Cheat Sheet</h3>
              <p className="text-xs text-slate-400">Searchable reference for daily server operations, triage, and certifications</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-[#0a0d14] border-b border-slate-800/80 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search commands (e.g. disk space, chmod, kill port, ufw, fstab)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-emerald-500 text-slate-950 font-semibold"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Command List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm">No commands found matching "{searchTerm}".</p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                className="mt-2 text-xs text-emerald-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredCommands.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0a0d14] border border-slate-800/90 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 text-xs sm:text-sm font-bold">
                      {item.command}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {item.category}
                    </span>
                    {item.tag && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">{item.description}</p>
                  {item.example && (
                    <div className="text-[11px] text-slate-500 font-mono">
                      Example: <span className="text-amber-300/90">{item.example}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleCopy(item.command, idx)}
                  className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition flex items-center gap-1.5 shrink-0"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0a0d14] border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Showing {filteredCommands.length} of {CHEATSHEET_DATA.length} commands</span>
          <span className="text-slate-500">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
