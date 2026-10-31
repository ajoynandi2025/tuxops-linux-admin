import React, { useState } from 'react';
import { 
  Terminal, ShieldCheck, HardDrive, Server, Network, 
  Cpu, Activity, CheckCircle, ArrowRight, Play, Sparkles, 
  BookOpen, Award, Layers, Zap, Clock, ChevronRight, AlertTriangle
} from 'lucide-react';
import HeroTerminal from '../components/HeroTerminal';
import ChmodCalculator from '../components/ChmodCalculator';
import SystemdGenerator from '../components/SystemdGenerator';
import CrontabBuilder from '../components/CrontabBuilder';
import FirewallBuilder from '../components/FirewallBuilder';
import { TUTORIAL_MODULES } from '../data/tutorials';

export default function HomePage({
  setCurrentView,
  onOpenTerminalWithCommand,
  onOpenCheatSheet,
  onOpenQuiz,
  activeToolTab,
  setActiveToolTab,
  completedModules
}) {
  const [selectedIncident, setSelectedIncident] = useState(0);

  const incidents = [
    {
      title: "100% Root Partition Full (Zero Bytes Left)",
      cause: "Runaway unrotated logs in /var/log/syslog or Docker container volumes eating /var/lib/docker.",
      detection: "df -hT /; du -sh /var/log/* | sort -h",
      fixCommand: "journalctl --vacuum-size=200M && truncate -s 0 /var/log/app.log",
      explanation: "Never delete open log files directly with rm because the file descriptor remains open in RAM and space is not reclaimed. Always truncate using `truncate -s 0`."
    },
    {
      title: "Zombie / Defunct Processes Accumulation",
      cause: "Parent process terminated or failed to call wait() syscall to reap dead child processes.",
      detection: "ps aux | grep 'Z'",
      fixCommand: "kill -HUP $(ps -A -ostat,ppid | awk '/[zZ]/{print $2}')",
      explanation: "You cannot kill a zombie with `kill -9` because it is already dead. You must kill or signal the parent process so init (PID 1) inherits and reaps it."
    },
    {
      title: "Out Of Memory (OOM) Killer Halting Database",
      cause: "PostgreSQL/MySQL allocated more virtual memory than available physical RAM + swap.",
      detection: "dmesg -T | grep -i -E 'killed process|oom_reaper'",
      fixCommand: "echo 'vm.swappiness = 10' >> /etc/sysctl.conf && sysctl -p",
      explanation: "Tuning `vm.swappiness` to 10 prevents aggressive paging while maintaining emergency swap headroom for dirty memory buffers."
    },
    {
      title: "DNS Resolution Delay (5-Second Timeout on Queries)",
      cause: "Broken secondary nameserver listed first or systemd-resolved DNSSEC validation timeout.",
      detection: "dig @127.0.0.53 google.com +stats; resolvectl status",
      fixCommand: "systemctl restart systemd-resolved",
      explanation: "If local DNS stub cache desynchronizes with DHCP lease servers, restart systemd-resolved or edit /etc/systemd/resolved.conf."
    }
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Linux Kernel 6.8+ • RHCSA / LFCS Ready</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Master Modern <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Linux System Administration
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
                From kernel boot architecture and LVM storage to systemd daemons, firewalls, and production outage triage. Includes a live in-browser terminal emulator, interactive tools, and 100% production-tested commands.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setCurrentView('tutorials')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition flex items-center gap-2 group"
                >
                  <BookOpen className="w-4 h-4 text-slate-950" />
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenTerminalWithCommand("uname -r")}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm transition flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Launch Web Lab</span>
                </button>

                <button
                  onClick={onOpenCheatSheet}
                  className="px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm font-medium transition"
                >
                  Browse Cheat Sheet
                </button>
              </div>

              {/* Quick metrics */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-bold font-mono text-white">10</div>
                  <div className="text-xs text-slate-400">Deep-Dive Modules</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">150+</div>
                  <div className="text-xs text-slate-400">Commands Indexed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-cyan-400">100%</div>
                  <div className="text-xs text-slate-400">Free & Interactive</div>
                </div>
              </div>
            </div>

            {/* Right Terminal Widget */}
            <div className="lg:col-span-6 w-full">
              <HeroTerminal onOpenFullLab={() => onOpenTerminalWithCommand("")} />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive SysAdmin Tools Strip Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="sysadmin-tools">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5" /> Live SysAdmin Utilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
            Interactive Generators & Calculators
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            No more memorizing complex octal bitmasks or systemd unit boilerplates. Configure parameters and copy production-tested configs in seconds.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveToolTab('chmod')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
              activeToolTab === 'chmod'
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Chmod Calculator</span>
          </button>

          <button
            onClick={() => setActiveToolTab('systemd')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
              activeToolTab === 'systemd'
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Systemd Generator</span>
          </button>

          <button
            onClick={() => setActiveToolTab('cron')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
              activeToolTab === 'cron'
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Crontab Scheduler</span>
          </button>

          <button
            onClick={() => setActiveToolTab('firewall')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
              activeToolTab === 'firewall'
                ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Firewall Rules (UFW/Firewalld)</span>
          </button>
        </div>

        {/* Active Tool Render */}
        <div className="animate-fade-in">
          {activeToolTab === 'chmod' && <ChmodCalculator />}
          {activeToolTab === 'systemd' && <SystemdGenerator />}
          {activeToolTab === 'cron' && <CrontabBuilder />}
          {activeToolTab === 'firewall' && <FirewallBuilder />}
        </div>
      </section>

      {/* Curriculum & Tutorials Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono mb-2">
              <BookOpen className="w-3.5 h-3.5" /> Structured Learning Path
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              10 Enterprise-Grade Linux Modules
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Follow sequentially or dive into specific topics required for your infrastructure tasks.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('tutorials')}
            className="text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View Full Handbook & Syllabus</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TUTORIAL_MODULES.map((module) => {
            const isCompleted = completedModules && completedModules[module.id];
            return (
              <div
                key={module.id}
                className="group p-6 rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                      Module {module.moduleNumber}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        module.difficulty === 'Beginner' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' :
                        module.difficulty === 'Intermediate' ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/40' :
                        'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                      }`}>
                        {module.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          <CheckCircle className="w-3 h-3" /> Done
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition mb-2">
                    {module.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {module.overview}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {module.keyConcepts.slice(0, 2).map((concept, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                        <span className="line-clamp-1">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{module.duration}</span>
                  <button
                    onClick={() => {
                      setCurrentView('tutorials');
                      // set active module
                      window.location.hash = module.id;
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Production Outage & Triage Playbook Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-mono mb-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Production War Room
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                Real-World SysAdmin Outage Playbooks
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Real production triage scripts for when the 3 AM PagerDuty alert strikes.
              </p>
            </div>
            <button
              onClick={() => onOpenTerminalWithCommand(incidents[selectedIncident].fixCommand)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-white text-xs font-semibold transition flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Test Triage in Web Shell</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Scenarios List */}
            <div className="lg:col-span-4 space-y-2">
              {incidents.map((inc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIncident(idx)}
                  className={`w-full text-left p-4 rounded-xl transition text-xs font-sans ${
                    selectedIncident === idx
                      ? "bg-slate-800/90 border border-emerald-500/40 text-white shadow"
                      : "bg-[#0a0d14] border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span className="font-semibold block text-sm mb-1">{inc.title}</span>
                  <span className="text-[11px] text-slate-400 line-clamp-1">{inc.cause}</span>
                </button>
              ))}
            </div>

            {/* Selected Scenario Details */}
            <div className="lg:col-span-8 bg-[#0a0d14] border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    {incidents[selectedIncident].title}
                  </h3>
                  <span className="text-xs text-red-400 font-mono bg-red-950/40 px-2.5 py-1 rounded border border-red-800/40">
                    High Severity Incident
                  </span>
                </div>

                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[10px] block">Root Cause Analysis</span>
                    <p className="text-slate-300">{incidents[selectedIncident].cause}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[10px] block">Detection Command</span>
                    <pre className="bg-slate-900 p-2 rounded text-amber-300 font-mono text-xs overflow-x-auto mt-0.5">
                      {incidents[selectedIncident].detection}
                    </pre>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[10px] block">Remediation Action</span>
                    <pre className="bg-slate-900 p-2 rounded text-emerald-400 font-mono text-xs overflow-x-auto mt-0.5">
                      {incidents[selectedIncident].fixCommand}
                    </pre>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-slate-300">
                    <span className="text-emerald-400 font-semibold block mb-0.5">SysAdmin Rule of Thumb:</span>
                    {incidents[selectedIncident].explanation}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex justify-end">
                <button
                  onClick={() => onOpenTerminalWithCommand(incidents[selectedIncident].detection)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" /> Run Diagnostics
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linux Distro Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
            Enterprise Linux Distro Comparison
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Choosing the right distribution for production servers, containers, and bare metal workloads.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs bg-[#111726] border border-slate-800 rounded-xl overflow-hidden font-sans">
            <thead className="bg-[#0a0d14] text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Distribution</th>
                <th className="p-4">Package Manager</th>
                <th className="p-4">Default Security Engine</th>
                <th className="p-4">Primary Production Role</th>
                <th className="p-4">LTS Support Cycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Ubuntu Server (24.04 LTS)
                </td>
                <td className="p-4 font-mono text-emerald-400">APT / dpkg</td>
                <td className="p-4">AppArmor</td>
                <td className="p-4">Cloud instances, Kubernetes nodes, AI/ML hosts</td>
                <td className="p-4">5 years standard (10y ESM)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> RHEL / Rocky / Alma 9
                </td>
                <td className="p-4 font-mono text-cyan-400">DNF / RPM</td>
                <td className="p-4 text-emerald-400 font-semibold">SELinux (Enforcing)</td>
                <td className="p-4">Fortune 500 banks, enterprise ERP, government clouds</td>
                <td className="p-4">10 years enterprise</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Debian 12 (Bookworm)
                </td>
                <td className="p-4 font-mono text-emerald-400">APT / dpkg</td>
                <td className="p-4">AppArmor</td>
                <td className="p-4">Ultra-stable core infrastructure, DNS, bare-metal routers</td>
                <td className="p-4">5 years community</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Alpine Linux (3.20)
                </td>
                <td className="p-4 font-mono text-amber-400">APK (musl libc)</td>
                <td className="p-4">PaX / grsecurity</td>
                <td className="p-4">Micro-container base images (5MB image footprint)</td>
                <td className="p-4">2 years rolling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Certification Readiness CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Award className="w-4 h-4" /> Certification Exam Simulator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to test your Linux System Admin skills?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Challenge yourself with our interactive 8-question exam covering PID 1, SGID bitmasks, XFS filesystems, SELinux policies, and Bash pipefall mechanics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuiz}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>Launch Quiz Challenge</span>
            </button>
            <button
              onClick={() => setCurrentView('tutorials')}
              className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-sm font-semibold transition"
            >
              Study Modules First
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
