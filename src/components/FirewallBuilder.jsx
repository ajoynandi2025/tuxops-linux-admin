import React, { useState } from 'react';
import { ShieldAlert, Copy, Check, Terminal } from 'lucide-react';

export default function FirewallBuilder() {
  const [engine, setEngine] = useState("ufw"); // "ufw" | "firewalld"
  const [action, setAction] = useState("allow"); // "allow" | "deny"
  const [port, setPort] = useState("22");
  const [protocol, setProtocol] = useState("tcp"); // "tcp" | "udp" | "any"
  const [sourceType, setSourceType] = useState("subnet"); // "any" | "subnet" | "ip"
  const [sourceAddress, setSourceAddress] = useState("192.168.1.0/24");
  const [comment, setComment] = useState("Internal SSH Access");
  const [copied, setCopied] = useState(false);

  // Generate command based on engine
  const getCommand = () => {
    if (engine === "ufw") {
      let cmd = `sudo ufw ${action}`;
      if (protocol !== "any") {
        cmd += ` proto ${protocol}`;
      }
      if (sourceType === "any") {
        cmd += ` from any to any port ${port}`;
      } else {
        cmd += ` from ${sourceAddress} to any port ${port}`;
      }
      if (comment) {
        cmd += ` comment '${comment}'`;
      }
      return cmd;
    } else {
      // Firewalld
      if (sourceType === "any") {
        return `sudo firewall-cmd --permanent --add-port=${port}/${protocol === 'any' ? 'tcp' : protocol} && sudo firewall-cmd --reload`;
      } else {
        return `sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="${sourceAddress}" port port="${port}" protocol="${protocol === 'any' ? 'tcp' : protocol}" ${action === 'allow' ? 'accept' : 'reject'}' && sudo firewall-cmd --reload`;
      }
    }
  };

  const command = getCommand();

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectService = (servicePort, proto, label) => {
    setPort(servicePort);
    setProtocol(proto);
    setComment(label);
  };

  return (
    <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white font-sans">UFW & Firewalld Rule Generator</h3>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Construct exact, safe firewall rules with source IP filtering for Debian/Ubuntu or RHEL/Rocky.
          </p>
        </div>

        {/* Engine Switcher */}
        <div className="flex items-center bg-[#0a0d14] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setEngine("ufw")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              engine === "ufw"
                ? "bg-red-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            UFW (Ubuntu/Debian)
          </button>
          <button
            onClick={() => setEngine("firewalld")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              engine === "firewalld"
                ? "bg-red-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Firewalld (RHEL/Rocky)
          </button>
        </div>
      </div>

      {/* Quick Service Presets */}
      <div className="flex flex-wrap gap-2 items-center my-4 text-xs">
        <span className="text-slate-500 font-medium">Quick Ports:</span>
        <button onClick={() => selectService("22", "tcp", "SSH Secure Shell")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">SSH (22)</button>
        <button onClick={() => selectService("80", "tcp", "HTTP Web Traffic")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">HTTP (80)</button>
        <button onClick={() => selectService("443", "tcp", "HTTPS Secure Web")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">HTTPS (443)</button>
        <button onClick={() => selectService("3306", "tcp", "MySQL/MariaDB DB")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">MySQL (3306)</button>
        <button onClick={() => selectService("5432", "tcp", "PostgreSQL DB")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">Postgres (5432)</button>
        <button onClick={() => selectService("6443", "tcp", "Kubernetes API Server")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition">K8s API (6443)</button>
      </div>

      {/* Form Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-xs font-sans">
        <div>
          <label className="block text-slate-400 font-medium mb-1">Action</label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white focus:border-red-500 outline-none"
          >
            <option value="allow">ALLOW (Accept)</option>
            <option value="deny">DENY (Drop/Reject)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">Port or Range</label>
          <input
            type="text"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-red-500 outline-none"
            placeholder="e.g. 22 or 8000:8080"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">Protocol</label>
          <select
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white font-mono focus:border-red-500 outline-none"
          >
            <option value="tcp">TCP</option>
            <option value="udp">UDP</option>
            <option value="any">Both / Any</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">Source Filter</label>
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            className="w-full bg-[#0a0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-white focus:border-red-500 outline-none"
          >
            <option value="any">Anywhere (Public 0.0.0.0/0)</option>
            <option value="subnet">Specific Subnet (CIDR)</option>
            <option value="ip">Single Host IP</option>
          </select>
        </div>
      </div>

      {sourceType !== "any" && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Source IP Address or CIDR Subnet:
          </label>
          <input
            type="text"
            value={sourceAddress}
            onChange={(e) => setSourceAddress(e.target.value)}
            className="w-full bg-[#0a0d14] border border-slate-700 rounded-xl px-4 py-2 font-mono text-sm text-white focus:border-red-500 outline-none"
            placeholder="192.168.1.0/24 or 10.0.0.50"
          />
        </div>
      )}

      {/* Result Box */}
      <div className="bg-[#0a0d14] border border-red-500/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-auto flex-1 overflow-x-auto">
          <span className="text-[11px] text-slate-500 uppercase font-semibold block">
            Generated {engine.toUpperCase()} Command:
          </span>
          <pre className="font-mono text-xs sm:text-sm text-emerald-400 mt-1 whitespace-pre-wrap break-all">
            {command}
          </pre>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Command"}
        </button>
      </div>
    </div>
  );
}
