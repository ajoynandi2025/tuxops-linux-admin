import React, { useState } from 'react';
import { Server, Copy, Check, Download, ShieldCheck } from 'lucide-react';

export default function SystemdGenerator() {
  const [serviceName, setServiceName] = useState("api-backend");
  const [description, setDescription] = useState("Production Node API Microservice");
  const [user, setUser] = useState("appuser");
  const [group, setGroup] = useState("appuser");
  const [workDir, setWorkDir] = useState("/opt/api-backend");
  const [execStart, setExecStart] = useState("/usr/bin/node /opt/api-backend/server.js");
  const [restartPolicy, setRestartPolicy] = useState("on-failure");
  const [restartSec, setRestartSec] = useState("5s");
  const [envVars, setEnvVars] = useState("NODE_ENV=production PORT=3000");
  const [sandboxProtect, setSandboxProtect] = useState(true);
  const [copied, setCopied] = useState(false);

  const unitContent = `[Unit]
Description=${description}
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=${user}
Group=${group}
WorkingDirectory=${workDir}
ExecStart=${execStart}
Restart=${restartPolicy}
RestartSec=${restartSec}
Environment="${envVars}"
StandardOutput=journal
StandardError=journal
SyslogIdentifier=${serviceName}

${sandboxProtect ? `# Enterprise Security Sandboxing
ProtectSystem=full
ProtectHome=true
NoNewPrivileges=true
PrivateTmp=true
ProtectKernelTunables=true
ProtectControlGroups=true` : '# Security Sandboxing disabled'}

[Install]
WantedBy=multi-user.target`;

  const handleCopy = () => {
    navigator.clipboard.writeText(unitContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([unitContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${serviceName}.service`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Server className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white font-sans">Systemd Service Unit Generator</h3>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Build production-ready, hardened systemd `.service` files for Node, Python, Go, Docker, or shell daemons.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Download .service
          </button>
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Unit"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Form Controls */}
        <div className="lg:col-span-6 space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Service Unit Name</label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
                placeholder="e.g. backend"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Execution User</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Execution Group</label>
              <input
                type="text"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Working Directory</label>
            <input
              type="text"
              value={workDir}
              onChange={(e) => setWorkDir(e.target.value)}
              className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">ExecStart (Full Binary Path)</label>
            <input
              type="text"
              value={execStart}
              onChange={(e) => setExecStart(e.target.value)}
              className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Restart Policy</label>
              <select
                value={restartPolicy}
                onChange={(e) => setRestartPolicy(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none cursor-pointer"
              >
                <option value="on-failure">on-failure (Recommended)</option>
                <option value="always">always</option>
                <option value="on-abnormal">on-abnormal</option>
                <option value="no">no</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">RestartSec Delay</label>
              <input
                type="text"
                value={restartSec}
                onChange={(e) => setRestartSec(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Environment Variables</label>
            <input
              type="text"
              value={envVars}
              onChange={(e) => setEnvVars(e.target.value)}
              className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>

          <label className="flex items-center gap-2 p-3 rounded-lg bg-[#0a0d14] border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={sandboxProtect}
              onChange={() => setSandboxProtect(!sandboxProtect)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
            />
            <div>
              <span className="font-semibold text-slate-200 block">Enable Systemd Security Sandbox</span>
              <span className="text-[11px] text-slate-400">Protects /home, read-only /usr & /etc, and drops dangerous kernel capabilities.</span>
            </div>
          </label>
        </div>

        {/* Live Code Preview */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="text-xs text-slate-400 font-mono mb-2 flex items-center justify-between">
            <span>/etc/systemd/system/{serviceName || "service"}.service</span>
            <span className="text-emerald-400 font-sans">Live Preview</span>
          </div>
          <pre className="flex-1 bg-[#0a0d14] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
            {unitContent}
          </pre>
        </div>
      </div>

      {/* Deployment Instructions Box */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
        <span className="text-slate-400 font-sans font-semibold block uppercase tracking-wider text-[11px]">
          Deployment Quick Steps:
        </span>
        <div className="text-emerald-400">1. sudo nano /etc/systemd/system/{serviceName}.service  <span className="text-slate-500"># Paste content above</span></div>
        <div className="text-emerald-400">2. sudo systemctl daemon-reload                      <span className="text-slate-500"># Reload systemd manager</span></div>
        <div className="text-emerald-400">3. sudo systemctl enable --now {serviceName}.service   <span className="text-slate-500"># Enable & start immediately</span></div>
        <div className="text-emerald-400">4. sudo journalctl -u {serviceName}.service -f         <span className="text-slate-500"># Stream logs live</span></div>
      </div>
    </div>
  );
}
