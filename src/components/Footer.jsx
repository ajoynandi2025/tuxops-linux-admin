import React from 'react';
import { Terminal, BookOpen, Layers, Heart, ArrowUp } from 'lucide-react';
import { TOPICS } from '../data/topicsData';

export default function Footer({ onSelectTopic, onNavigateHome }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07090e] border-t border-slate-800/80 text-slate-400 text-xs font-sans mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div 
              onClick={onNavigateHome}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono text-base font-bold text-white">TuxOps Handbook</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The complete, open-source Linux System Administration Handbook. Each topic is documented on its own dedicated page with deep kernel architecture, command breakdowns, and production configurations.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              25 Dedicated Topic Pages • 100% Free
            </div>
          </div>

          {/* Architecture & Foundations */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 font-sans">
              Foundations & Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              {TOPICS.slice(0, 5).map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTopic(t.id)}
                    className="hover:text-emerald-400 transition text-left truncate max-w-full block"
                  >
                    {t.topicNumber}. {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Storage & Process Daemons */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 font-sans">
              Storage, LVM & Services
            </h4>
            <ul className="space-y-2 text-xs">
              {TOPICS.slice(7, 13).map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTopic(t.id)}
                    className="hover:text-emerald-400 transition text-left truncate max-w-full block"
                  >
                    {t.topicNumber}. {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Disaster Recovery */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 font-sans">
              Security & Disaster Recovery
            </h4>
            <ul className="space-y-2 text-xs">
              {TOPICS.slice(17, 23).map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTopic(t.id)}
                    className="hover:text-emerald-400 transition text-left truncate max-w-full block"
                  >
                    {t.topicNumber}. {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TuxOps — Linux System Administration Handbook.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="hover:text-white transition flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Back to top
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Free & Open Learning
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
