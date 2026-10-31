import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Info, Sparkles } from 'lucide-react';

export default function ChmodCalculator() {
  const [permissions, setPermissions] = useState({
    special: { suid: false, sgid: false, sticky: false },
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: true }
  });
  const [filename, setFilename] = useState("deploy_service.sh");
  const [copied, setCopied] = useState(false);

  const toggle = (section, type) => {
    setPermissions(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: !prev[section][type]
      }
    }));
  };

  // Calculate Octal
  const getOctalDigit = (obj) => {
    let sum = 0;
    if (obj.read) sum += 4;
    if (obj.write) sum += 2;
    if (obj.execute) sum += 1;
    return sum;
  };

  const getSpecialDigit = () => {
    let sum = 0;
    if (permissions.special.suid) sum += 4;
    if (permissions.special.sgid) sum += 2;
    if (permissions.special.sticky) sum += 1;
    return sum;
  };

  const specialOctal = getSpecialDigit();
  const ownerOctal = getOctalDigit(permissions.owner);
  const groupOctal = getOctalDigit(permissions.group);
  const othersOctal = getOctalDigit(permissions.others);

  const octalString = specialOctal > 0
    ? `${specialOctal}${ownerOctal}${groupOctal}${othersOctal}`
    : `${ownerOctal}${groupOctal}${othersOctal}`;

  // Symbolic representation
  const getSymbolic = (obj, isSpecial, specialCharLow, specialCharHigh) => {
    let r = obj.read ? 'r' : '-';
    let w = obj.write ? 'w' : '-';
    let x = obj.execute ? 'x' : '-';

    if (isSpecial) {
      if (obj.execute) {
        x = specialCharLow; // e.g. 's' or 't'
      } else {
        x = specialCharHigh; // e.g. 'S' or 'T'
      }
    }
    return `${r}${w}${x}`;
  };

  const symbolicString = `-${getSymbolic(permissions.owner, permissions.special.suid, 's', 'S')}${getSymbolic(permissions.group, permissions.special.sgid, 's', 'S')}${getSymbolic(permissions.others, permissions.special.sticky, 't', 'T')}`;

  const command = `chmod ${octalString} ${filename}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset) => {
    if (preset === '755') {
      setPermissions({
        special: { suid: false, sgid: false, sticky: false },
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: false, execute: true },
        others: { read: true, write: false, execute: true }
      });
      setFilename("script.sh");
    } else if (preset === '644') {
      setPermissions({
        special: { suid: false, sgid: false, sticky: false },
        owner: { read: true, write: true, execute: false },
        group: { read: true, write: false, execute: false },
        others: { read: true, write: false, execute: false }
      });
      setFilename("index.html");
    } else if (preset === '600') {
      setPermissions({
        special: { suid: false, sgid: false, sticky: false },
        owner: { read: true, write: true, execute: false },
        group: { read: false, write: false, execute: false },
        others: { read: false, write: false, execute: false }
      });
      setFilename("id_ed25519");
    } else if (preset === '2775') {
      setPermissions({
        special: { suid: false, sgid: true, sticky: false },
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: true, execute: true },
        others: { read: true, write: false, execute: true }
      });
      setFilename("/shared/project");
    } else if (preset === '1777') {
      setPermissions({
        special: { suid: false, sgid: false, sticky: true },
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: true, execute: true },
        others: { read: true, write: true, execute: true }
      });
      setFilename("/tmp");
    }
  };

  return (
    <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white font-sans">Interactive Linux Chmod Calculator</h3>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Toggle permissions visually to generate octal notation, symbolic strings, and exact chmod commands.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-slate-500 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Presets:
          </span>
          <button onClick={() => applyPreset('755')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">755 (Exec)</button>
          <button onClick={() => applyPreset('644')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">644 (File)</button>
          <button onClick={() => applyPreset('600')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">600 (SSH Key)</button>
          <button onClick={() => applyPreset('2775')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono transition">2775 (SGID)</button>
          <button onClick={() => applyPreset('1777')} className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono transition">1777 (Sticky)</button>
        </div>
      </div>

      {/* Main Grid: Columns for Owner, Group, Others */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Owner */}
        <div className="p-4 rounded-xl bg-[#0a0d14] border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="font-semibold text-emerald-400 text-sm">Owner (User / u)</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-sm font-bold">
              {ownerOctal}
            </span>
          </div>
          <div className="space-y-2.5 text-sm">
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Read (r)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 4</span>
              <input
                type="checkbox"
                checked={permissions.owner.read}
                onChange={() => toggle('owner', 'read')}
                className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:ring-offset-0"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Write (w)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 2</span>
              <input
                type="checkbox"
                checked={permissions.owner.write}
                onChange={() => toggle('owner', 'write')}
                className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:ring-offset-0"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Execute (x)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 1</span>
              <input
                type="checkbox"
                checked={permissions.owner.execute}
                onChange={() => toggle('owner', 'execute')}
                className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:ring-offset-0"
              />
            </label>
          </div>
        </div>

        {/* Group */}
        <div className="p-4 rounded-xl bg-[#0a0d14] border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="font-semibold text-cyan-400 text-sm">Group (g)</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-sm font-bold">
              {groupOctal}
            </span>
          </div>
          <div className="space-y-2.5 text-sm">
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Read (r)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 4</span>
              <input
                type="checkbox"
                checked={permissions.group.read}
                onChange={() => toggle('group', 'read')}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 focus:ring-offset-0"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Write (w)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 2</span>
              <input
                type="checkbox"
                checked={permissions.group.write}
                onChange={() => toggle('group', 'write')}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 focus:ring-offset-0"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Execute (x)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 1</span>
              <input
                type="checkbox"
                checked={permissions.group.execute}
                onChange={() => toggle('group', 'execute')}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 focus:ring-offset-0"
              />
            </label>
          </div>
        </div>

        {/* Others */}
        <div className="p-4 rounded-xl bg-[#0a0d14] border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="font-semibold text-amber-400 text-sm">Others (Public / o)</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-sm font-bold">
              {othersOctal}
            </span>
          </div>
          <div className="space-y-2.5 text-sm">
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Read (r)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 4</span>
              <input
                type="checkbox"
                checked={permissions.others.read}
                onChange={() => toggle('others', 'read')}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-amber-500 focus:ring-offset-0"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Write (w)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 2</span>
              <input
                type="checkbox"
                checked={permissions.others.write}
                onChange={() => toggle('others', 'write')}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-amber-500 focus:ring-offset-0"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 cursor-pointer">
              <span className="text-slate-300">Execute (x)</span>
              <span className="text-xs text-slate-500 mr-2 font-mono">value: 1</span>
              <input
                type="checkbox"
                checked={permissions.others.execute}
                onChange={() => toggle('others', 'execute')}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-amber-500 focus:ring-offset-0"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Special Bits Strip */}
      <div className="p-4 rounded-xl bg-[#0a0d14] border border-slate-800/80 mb-6">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
          Special Enterprise Bits (Optional)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <label className="flex items-start gap-2.5 p-2 rounded hover:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={permissions.special.suid}
              onChange={() => toggle('special', 'suid')}
              className="mt-0.5 w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700"
            />
            <div>
              <span className="font-semibold text-slate-200">SUID (4000)</span>
              <p className="text-slate-400 text-[11px]">Executes as file owner (e.g. /usr/bin/passwd)</p>
            </div>
          </label>

          <label className="flex items-start gap-2.5 p-2 rounded hover:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={permissions.special.sgid}
              onChange={() => toggle('special', 'sgid')}
              className="mt-0.5 w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
            />
            <div>
              <span className="font-semibold text-slate-200">SGID (2000)</span>
              <p className="text-slate-400 text-[11px]">Files inherit folder group ownership</p>
            </div>
          </label>

          <label className="flex items-start gap-2.5 p-2 rounded hover:bg-slate-800/40 cursor-pointer">
            <input
              type="checkbox"
              checked={permissions.special.sticky}
              onChange={() => toggle('special', 'sticky')}
              className="mt-0.5 w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
            />
            <div>
              <span className="font-semibold text-slate-200">Sticky Bit (1000)</span>
              <p className="text-slate-400 text-[11px]">Only owner/root can delete (e.g. /tmp)</p>
            </div>
          </label>
        </div>
      </div>

      {/* Result Display Bar */}
      <div className="bg-[#0a0d14] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
          <div>
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Octal</span>
            <span className="font-mono text-xl font-bold text-emerald-400">{octalString}</span>
          </div>
          <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Symbolic</span>
            <span className="font-mono text-lg font-bold text-cyan-300">{symbolicString}</span>
          </div>
          <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">Target File/Path:</span>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-white rounded px-2 py-1 font-mono focus:border-emerald-500 outline-none w-36"
            />
          </div>
        </div>

        {/* Generated Command Box */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-lg font-mono text-xs sm:text-sm text-amber-300 flex-1 md:flex-initial overflow-x-auto">
            {command}
          </div>
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs transition flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
