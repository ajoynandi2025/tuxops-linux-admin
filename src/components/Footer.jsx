import React from 'react';
import { Terminal, Shield, Heart, ExternalLink, BookOpen, HardDrive, Cpu, Award } from 'lucide-react';

export default function Footer({ setCurrentView, onOpenCheatSheet, onOpenTerminal, onOpenQuiz }) {
  return (
    <footer className="bg-[#07090e] border-t border-slate-800/80 text-slate-400 text-xs font-sans mt-24">
      {/* Terminal Shell Shortcut Strip */}
      <div className="border-b border-slate-800/60 bg-[#0d1117]/50 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-emerald-400 font-bold">$ Essential CLI Shortcuts:</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-slate-300"><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Ctrl+C</kbd> SIGINT Kill</span>
            <span className="text-slate-300"><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Ctrl+Z</kbd> Background SIGTSTP</span>
            <span className="text-slate-300"><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Ctrl+R</kbd> History Search</span>
            <span className="text-slate-300"><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Ctrl+L</kbd> Clear Screen</span>
          </div>
          <button
            onClick={() => onOpenTerminal("")}
            className="text-emerald-400 hover:text-emerald-300 font-sans flex items-center gap-1 font-semibold"
          >
            Launch Web Shell &rarr;
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono text-base font-bold text-white">TuxOps Academy</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The premier interactive tutorial and reference handbook for modern Linux System Administration, DevOps infrastructure, and enterprise certifications.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Built for Ubuntu, Debian, RHEL, Rocky & Arch
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Core Curriculum</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('tutorials')} className="hover:text-emerald-400 transition">
                  01. Linux Foundations & Boot Stages
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('tutorials')} className="hover:text-emerald-400 transition">
                  02. User Permissions, SUID & ACLs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('tutorials')} className="hover:text-emerald-400 transition">
                  03. Storage, LVM & Filesystem Resizing
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('tutorials')} className="hover:text-emerald-400 transition">
                  04. Systemd Units & Process Management
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('tutorials')} className="hover:text-emerald-400 transition">
                  05. Network Stack, Firewalls & SSH
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">SysAdmin Toolkit</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenCheatSheet} className="hover:text-cyan-400 transition">
                  Linux Command Cheat Sheet (150+)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenTerminal("")} className="hover:text-emerald-400 transition">
                  Interactive Terminal Emulator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-amber-400 transition">
                  Chmod Octal/Symbolic Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-cyan-400 transition">
                  Systemd Service File Builder
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-emerald-400 transition flex items-center gap-1">
                  <span>Certification Exam Prep</span>
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Certifications Roadmap */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Certification Roadmaps</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200 block">Red Hat Certified (RHCSA / EX200)</span>
                <span className="text-[11px] text-slate-400">Modules 1-7 cover 100% of RHCSA performance exam objectives.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200 block">Linux Foundation (LFCS)</span>
                <span className="text-[11px] text-slate-400">Focus on LVM, systemd services, and networking.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TuxOps Academy. Open-source educational project for Linux System Administrators.
          </div>
          <div className="flex items-center gap-4">
            <span>Kernel 6.8+ Ready</span>
            <span>POSIX Compliant</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Free & Open Learning
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
