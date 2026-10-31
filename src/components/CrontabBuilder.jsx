import React, { useState } from 'react';
import { Clock, Copy, Check, Sparkles, Terminal } from 'lucide-react';

export default function CrontabBuilder() {
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("2");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");
  const [command, setCommand] = useState("/opt/scripts/backup_db.sh >/var/log/backup.log 2>&1");
  const [copied, setCopied] = useState(false);

  const cronExpression = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const fullLine = `${cronExpression} ${command}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLine);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset) => {
    if (preset === 'every5min') {
      setMinute("*/5"); setHour("*"); setDom("*"); setMonth("*"); setDow("*");
    } else if (preset === 'hourly') {
      setMinute("0"); setHour("*"); setDom("*"); setMonth("*"); setDow("*");
    } else if (preset === 'daily2am') {
      setMinute("0"); setHour("2"); setDom("*"); setMonth("*"); setDow("*");
    } else if (preset === 'weeklySunday') {
      setMinute("0"); setHour("3"); setDom("*"); setMonth("*"); setDow("0");
    } else if (preset === 'monthlyFirst') {
      setMinute("0"); setHour("4"); setDom("1"); setMonth("*"); setDow("*");
    }
  };

  const getHumanReadable = () => {
    if (minute === '*/5' && hour === '*' && dom === '*' && month === '*' && dow === '*') return 'Every 5 minutes';
    if (minute === '*/15' && hour === '*' && dom === '*' && month === '*' && dow === '*') return 'Every 15 minutes';
    if (minute === '0' && hour === '*' && dom === '*' && month === '*' && dow === '*') return 'Every hour on the hour (minute 0)';
    if (minute === '0' && hour === '2' && dom === '*' && month === '*' && dow === '*') return 'Every day at 02:00 AM';
    if (minute === '0' && hour === '3' && dow === '0') return 'Every Sunday at 03:00 AM';
    if (minute === '0' && hour === '4' && dom === '1') return 'At 04:00 AM on the 1st of every month';
    return `At minute ${minute}, hour ${hour}, day-of-month ${dom}, month ${month}, weekday ${dow}`;
  };

  return (
    <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white font-sans">Visual Crontab Expression Builder</h3>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Configure automated cron jobs with instant human-readable syntax and safe execution redirects.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-slate-500 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Presets:
          </span>
          <button onClick={() => applyPreset('every5min')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">*/5 mins</button>
          <button onClick={() => applyPreset('hourly')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">Hourly</button>
          <button onClick={() => applyPreset('daily2am')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono transition">Daily 2am</button>
          <button onClick={() => applyPreset('weeklySunday')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono transition">Sun 3am</button>
          <button onClick={() => applyPreset('monthlyFirst')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono transition">Monthly</button>
        </div>
      </div>

      {/* Cron 5 Fields Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-6">
        <div className="bg-[#0a0d14] border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Minute (0-59)</span>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded text-center text-lg font-mono font-bold text-amber-400 py-1 focus:border-amber-500 outline-none"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">e.g. *, 0, */15</span>
        </div>

        <div className="bg-[#0a0d14] border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Hour (0-23)</span>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded text-center text-lg font-mono font-bold text-amber-400 py-1 focus:border-amber-500 outline-none"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">e.g. *, 2, 0-6</span>
        </div>

        <div className="bg-[#0a0d14] border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Day of Month (1-31)</span>
          <input
            type="text"
            value={dom}
            onChange={(e) => setDom(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded text-center text-lg font-mono font-bold text-amber-400 py-1 focus:border-amber-500 outline-none"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">e.g. *, 1, 15</span>
        </div>

        <div className="bg-[#0a0d14] border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Month (1-12)</span>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded text-center text-lg font-mono font-bold text-amber-400 py-1 focus:border-amber-500 outline-none"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">e.g. *, 1-12</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-[#0a0d14] border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Weekday (0-6 Sun-Sat)</span>
          <input
            type="text"
            value={dow}
            onChange={(e) => setDow(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded text-center text-lg font-mono font-bold text-amber-400 py-1 focus:border-amber-500 outline-none"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">0 = Sun, 1-5 = Mon-Fri</span>
        </div>
      </div>

      {/* Command Input Field */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Command or Script to Execute:
        </label>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="w-full bg-[#0a0d14] border border-slate-700 rounded-xl px-4 py-2.5 font-mono text-sm text-white focus:border-amber-500 outline-none"
          placeholder="/path/to/script.sh"
        />
        <span className="text-[11px] text-slate-500 mt-1 block">
          Tip: Always use absolute paths (e.g. <code className="text-slate-400">/usr/bin/curl</code>) and redirect stdout/stderr (<code className="text-slate-400">&gt;&gt; /var/log/cron.log 2&gt;&amp;1</code>).
        </span>
      </div>

      {/* Result Card */}
      <div className="bg-[#0a0d14] border border-amber-500/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Schedule:
            <span className="text-amber-300 font-semibold">{getHumanReadable()}</span>
          </span>
          <div className="font-mono text-sm sm:text-base text-white mt-1 break-all">
            <span className="text-amber-400 font-bold">{cronExpression}</span> {command}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition flex items-center gap-1.5 shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Crontab"}
        </button>
      </div>

      {/* Installation hint */}
      <div className="mt-4 text-xs text-slate-400 font-mono">
        Edit your crontab with: <code className="text-emerald-400 bg-slate-900 px-2 py-0.5 rounded">crontab -e</code> or list with <code className="text-emerald-400 bg-slate-900 px-2 py-0.5 rounded">crontab -l</code>
      </div>
    </div>
  );
}
