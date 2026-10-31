import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, BookOpen, Clock, Tag, Check, Copy, 
  AlertTriangle, Lightbulb, ChevronRight, Share2, Layers, CheckCircle2 
} from 'lucide-react';

export default function TopicDetailPage({
  topic,
  onNavigateHome,
  onNavigateTopic,
  prevTopic,
  nextTopic
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("");

  // Scroll to top on topic change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (topic?.sections?.length > 0) {
      setActiveSectionId(topic.sections[0].id);
    }
  }, [topic?.id]);

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Topic Not Found</h2>
        <p className="text-slate-400 mb-6">The requested tutorial topic does not exist.</p>
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm"
        >
          Return to All Topics
        </button>
      </div>
    );
  }

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-sans flex-wrap">
          <button
            onClick={onNavigateHome}
            className="hover:text-emerald-400 transition flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Topics</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-400">{topic.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-mono font-semibold">Topic {topic.topicNumber}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareLink}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5"
          >
            {shareCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{shareCopied ? "Link Copied!" : "Share Topic"}</span>
          </button>
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            Back to Directory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Topic Article Body */}
        <main className="lg:col-span-8 bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-10">
          {/* Article Header */}
          <div className="space-y-4 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                Topic {topic.topicNumber}
              </span>
              <span className="text-xs font-medium text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                {topic.category}
              </span>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${
                topic.difficulty === 'Beginner' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' :
                topic.difficulty === 'Intermediate' ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/40' :
                'bg-amber-950/60 text-amber-400 border border-amber-800/40'
              }`}>
                {topic.difficulty}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5" /> {topic.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans leading-tight">
              {topic.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {topic.summary}
            </p>

            {/* Key Commands Strip */}
            {topic.keyCommands && topic.keyCommands.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-2 font-mono">
                  Essential Commands in this Guide:
                </span>
                <div className="flex flex-wrap gap-2">
                  {topic.keyCommands.map((cmd, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#0a0d14] border border-slate-800 text-amber-300 font-mono text-xs"
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Topic Sections */}
          <div className="space-y-12">
            {topic.sections.map((section, sIdx) => (
              <article key={section.id || sIdx} id={section.id} className="space-y-5 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
                  <span>{section.heading}</span>
                </h2>

                <div className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-3">
                  {section.content}
                </div>

                {/* Annotated Code Block */}
                {section.codeBlock && (
                  <div className="rounded-xl overflow-hidden bg-[#0a0d14] border border-slate-800 font-mono text-xs">
                    <div className="px-4 py-2.5 bg-[#161b22] border-b border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400 text-[11px] font-sans">
                        {section.codeBlock.explanation}
                      </span>
                      <button
                        onClick={() => handleCopyCode(section.codeBlock.command, sIdx)}
                        className="text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px]"
                      >
                        {copiedIndex === sIdx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-sans">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="font-sans">Copy Command</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-[#0a0d14]">
                      <div className="flex items-center gap-2 text-amber-300 font-bold">
                        <span className="text-slate-600">$</span>
                        <span>{section.codeBlock.command}</span>
                      </div>
                      {section.codeBlock.output && (
                        <pre className="mt-3 text-slate-400 text-[11px] sm:text-xs overflow-x-auto border-t border-slate-800/80 pt-2.5 leading-relaxed">
                          {section.codeBlock.output}
                        </pre>
                      )}
                    </div>
                  </div>
                )}

                {/* ProTip Callout */}
                {section.tip && (
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-3">
                    <span className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5 shrink-0">
                      <Lightbulb className="w-4 h-4" />
                    </span>
                    <div className="text-xs sm:text-sm text-slate-300">
                      <span className="font-semibold text-cyan-300 block mb-0.5 font-sans">SysAdmin ProTip:</span>
                      <p>{section.tip}</p>
                    </div>
                  </div>
                )}

                {/* Warning Callout */}
                {section.warning && (
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 flex items-start gap-3">
                    <span className="p-1 rounded bg-red-500/20 text-red-400 mt-0.5 shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    <div className="text-xs sm:text-sm text-slate-300">
                      <span className="font-semibold text-red-400 block mb-0.5 font-sans">Production Pitfall & Warning:</span>
                      <p>{section.warning}</p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Key Summary Checklist */}
          {topic.summaryChecklist && (
            <div className="p-6 rounded-xl bg-[#0a0d14] border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Topic Summary & Key Takeaways
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {topic.summaryChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Previous & Next Topic Navigation */}
          <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
            {prevTopic ? (
              <button
                onClick={() => onNavigateTopic(prevTopic.id)}
                className="p-3.5 sm:px-5 sm:py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-xs font-semibold transition flex items-center gap-2.5 max-w-[48%]"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="text-left truncate">
                  <span className="text-[10px] text-slate-500 block font-normal">Previous Topic</span>
                  <span className="truncate block">{prevTopic.title}</span>
                </div>
              </button>
            ) : <div />}

            {nextTopic ? (
              <button
                onClick={() => onNavigateTopic(nextTopic.id)}
                className="p-3.5 sm:px-5 sm:py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-2.5 max-w-[48%] ml-auto"
              >
                <div className="text-right truncate">
                  <span className="text-[10px] text-slate-900 block font-normal">Next Topic</span>
                  <span className="truncate block">{nextTopic.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-950 shrink-0" />
              </button>
            ) : (
              <button
                onClick={onNavigateHome}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition"
              >
                All 25 Topics Completed! Back to Home
              </button>
            )}
          </div>
        </main>

        {/* Right Sticky Sidebar: Table of Contents */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-[#111726] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 font-sans">
              <Layers className="w-4 h-4 text-emerald-400" /> On This Page (TOC)
            </h4>

            <nav className="space-y-2 text-xs">
              {topic.sections.map((sec, idx) => (
                <a
                  key={sec.id || idx}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`block py-1.5 px-2.5 rounded-lg transition leading-snug ${
                    activeSectionId === sec.id
                      ? "bg-slate-800 text-emerald-400 font-semibold border-l-2 border-emerald-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-850/50"
                  }`}
                >
                  {sec.heading}
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Info Box */}
          <div className="bg-[#111726] border border-slate-800 rounded-2xl p-5 text-xs text-slate-400 space-y-2.5">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block font-sans">
              Guide Specifications
            </span>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span>Category:</span>
              <span className="text-slate-200 font-medium">{topic.category}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span>Difficulty:</span>
              <span className="text-emerald-400 font-medium">{topic.difficulty}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span>Estimated Reading:</span>
              <span className="text-slate-200 font-medium">{topic.readTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Target Distributions:</span>
              <span className="text-slate-300">Ubuntu, RHEL, Debian, Arch</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
