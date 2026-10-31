import React, { useState } from 'react';
import { 
  BookOpen, Search, ArrowRight, Clock, Tag, Layers, 
  Terminal, Shield, Cpu, HardDrive, Filter, CheckCircle
} from 'lucide-react';
import { TOPICS, TOPIC_CATEGORIES } from '../data/topicsData';

export default function HomePage({ onSelectTopic }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTopics = TOPICS.filter((topic) => {
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      topic.title.toLowerCase().includes(query) ||
      topic.summary.toLowerCase().includes(query) ||
      topic.category.toLowerCase().includes(query) ||
      (topic.keyCommands && topic.keyCommands.some(cmd => cmd.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12">
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>25 In-Depth Topics • Production Handbook</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans max-w-4xl mx-auto">
            The Complete Modern <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Linux System Administration
            </span> Tutorial
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive, page-by-page technical handbook. Each topic is thoroughly documented on its own dedicated page with deep kernel architecture, command breakdowns, real terminal outputs, and production hardening.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-sans text-slate-400">
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-white font-mono">25</strong> Deep-Dive Topics</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span><strong className="text-white font-mono">8</strong> Core Curriculums</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Ubuntu, RHEL, Rocky, Debian, Arch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Search & Category Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" id="topics-directory">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 25 topics by name, command (e.g. lvextend, systemctl, chmod, ufw, fstab)..."
            className="w-full bg-[#111726] border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 pt-2">
          {TOPIC_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search status info */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>Showing <strong className="text-white font-mono">{filteredTopics.length}</strong> of {TOPICS.length} topics</span>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-emerald-400 hover:underline"
            >
              Reset to all categories
            </button>
          )}
        </div>

        {/* 25 Topics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="group p-6 rounded-2xl bg-[#111726] border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Card Top Pill Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition">
                    Topic {topic.topicNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      topic.difficulty === 'Beginner' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' :
                      topic.difficulty === 'Intermediate' ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/40' :
                      'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                    }`}>
                      {topic.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-500 font-sans flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {topic.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition mb-2.5 line-clamp-2">
                  {topic.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {topic.summary}
                </p>

                {/* Key commands tags */}
                {topic.keyCommands && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {topic.keyCommands.slice(0, 3).map((cmd, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded bg-[#0a0d14] text-slate-300 border border-slate-800 font-mono text-[10px]"
                      >
                        {cmd}
                      </span>
                    ))}
                    {topic.keyCommands.length > 3 && (
                      <span className="text-[10px] text-slate-500 font-mono self-center">
                        +{topic.keyCommands.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] truncate max-w-[160px]">
                  {topic.category}
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Roadmap / Tracks Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Recommended Learning Progression
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Follow sequentially through the 3 operational tracks or jump straight to any single topic page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Track 1 */}
            <div className="p-5 rounded-xl bg-[#0a0d14] border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Phase 1: Foundations
              </span>
              <h3 className="text-base font-bold text-white">Kernel & Shell Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Covers hardware rings, system calls, the 4-stage boot sequence, FHS directory tree, and Bash stream redirection.
              </p>
              <div className="text-xs text-slate-500 font-mono">Topics 01 — 04</div>
            </div>

            {/* Track 2 */}
            <div className="p-5 rounded-xl bg-[#0a0d14] border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Phase 2: Core Admin
              </span>
              <h3 className="text-base font-bold text-white">Storage, Services & Users</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Covers user/group provisioning, POSIX permissions, LVM dynamic storage, /etc/fstab, process states, and custom systemd units.
              </p>
              <div className="text-xs text-slate-500 font-mono">Topics 05 — 16</div>
            </div>

            {/* Track 3 */}
            <div className="p-5 rounded-xl bg-[#0a0d14] border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Phase 3: Production
              </span>
              <h3 className="text-base font-bold text-white">Hardening & Triage Ops</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Covers modern networking (ip/ss), SSH keys, UFW/Firewalld, SELinux policies, kernel hardening, load average triage, and chroot disaster recovery.
              </p>
              <div className="text-xs text-slate-500 font-mono">Topics 17 — 25</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
