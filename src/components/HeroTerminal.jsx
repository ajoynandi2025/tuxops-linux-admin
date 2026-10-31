import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check, Play, RefreshCw } from 'lucide-react';

const INITIAL_COMMANDS = [
  "neofetch",
  "uname -r",
  "df -h",
  "systemctl status nginx",
  "uptime",
  "free -m",
  "cat /etc/os-release"
];

const MOCK_OUTPUTS = {
  "neofetch": `
        /\\         sysadmin@production-srv01
       /  \\        -------------------------
      /\\   \\       OS: Ubuntu 24.04 LTS x86_64
     /      \\      Host: KVM Cloud Compute v4.2
    /   ,,   \\     Kernel: 6.8.0-31-generic
   /   |  |  -\\    Uptime: 42 days, 8 hours, 14 mins
  /_-''    ''-_\\   Packages: 1,428 (dpkg)
                   Shell: bash 5.2.21
                   CPU: AMD EPYC 7763 (8) @ 3.24GHz
                   Memory: 4,120MiB / 16,384MiB (25%)
                   Disk (/): 38G / 160G (24%)`,

  "uname -r": `6.8.0-31-generic`,

  "uname -a": `Linux production-srv01 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC Sat Apr 20 00:40:06 UTC 2024 x86_64 GNU/Linux`,

  "df -h": `Filesystem      Size  Used Avail Use% Mounted on
tmpfs           1.6G  1.2M  1.6G   1% /run
/dev/sda2       160G   38G  115G  25% /
tmpfs           7.8G     0  7.8G   0% /dev/shm
/dev/sda1       1.1G  6.1M  1.1G   1% /boot/efi
/dev/sdb1       500G  142G  333G  30% /var/lib/docker`,

  "free -m": `               total        used        free      shared  buff/cache   available
Mem:           16000        4120        7240         128        4640       11752
Swap:           4096           0        4096`,

  "systemctl status nginx": `● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2026-10-31 08:00:12 UTC; 10h ago
       Docs: man:nginx(8)
   Main PID: 1408 (nginx)
      Tasks: 5 (limit: 19042)
     Memory: 28.4M
     CGroup: /system.slice/nginx.service
             ├─1408 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
             ├─1409 nginx: worker process
             ├─1410 nginx: worker process
             └─1411 nginx: worker process`,

  "uptime": ` 18:35:12 up 42 days, 8:14, 2 users, load average: 0.12, 0.28, 0.35`,

  "cat /etc/os-release": `NAME="Ubuntu"
VERSION="24.04 LTS (Noble Numbat)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 24.04 LTS"
VERSION_ID="24.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"`,

  "whoami": `sysadmin`,

  "ps aux": `USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.1 168240 12840 ?        Ss   Sep19   1:12 /sbin/init
root           2  0.0  0.0      0     0 ?        S    Sep19   0:00 [kthreadd]
sysadmin    1408  0.2  0.3  68200 48200 ?        S    08:00   0:04 nginx: master process
sysadmin    2910  0.1  0.8 198420 128900 ?       Sl   08:12   0:45 /usr/bin/dockerd
sysadmin    4120  0.0  0.0   9800  3200 pts/0    R+   18:35   0:00 ps aux`,

  "ip a": `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default
    inet 192.168.1.150/24 brd 192.168.1.255 scope global dynamic eth0
    inet6 fe80::a00:27ff:fe8e:561f/64 scope link`,

  "help": `Available simulated commands:
  • neofetch              • uname -r / uname -a
  • df -h                 • free -m
  • systemctl status nginx• uptime
  • cat /etc/os-release   • whoami
  • ps aux                • ip a
  • clear                 • matrix
Type any command above or click the quick action chips below!`
};

export default function HeroTerminal({ onOpenFullLab }) {
  const [history, setHistory] = useState([
    {
      command: "neofetch",
      output: MOCK_OUTPUTS["neofetch"]
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const handleRunCommand = (cmdToRun) => {
    const raw = cmdToRun.trim();
    if (!raw) return;

    if (raw.toLowerCase() === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (raw.toLowerCase() === "matrix") {
      setHistory(prev => [
        ...prev,
        {
          command: "matrix",
          output: `Wake up, Neo...\nThe Matrix has you.\nFollow the white rabbit.\n[System status: 100% Kernel Integrity]`
        }
      ]);
      setInputVal("");
      return;
    }

    let output = MOCK_OUTPUTS[raw];
    if (!output) {
      // Fuzzy or prefix matches
      const clean = raw.toLowerCase();
      if (clean.startsWith("ls")) {
        output = `bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var`;
      } else if (clean.startsWith("pwd")) {
        output = `/home/sysadmin`;
      } else if (clean.startsWith("date")) {
        output = new Date().toUTCString();
      } else {
        output = `bash: ${raw}: command not recognized in sandbox.\nType 'help' for available commands or choose a preset below.`;
      }
    }

    setHistory(prev => [...prev, { command: raw, output }]);
    setInputVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRunCommand(inputVal);
  };

  const handleCopyHistory = () => {
    const text = history.map(h => `$ ${h.command}\n${h.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="w-full rounded-2xl bg-[#0d1117] border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:opacity-100 transition"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:opacity-100 transition"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition"></div>
          <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            sysadmin@production-srv01:~ (bash)
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-sans">
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
            Live Shell
          </span>
          <button
            onClick={handleCopyHistory}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition text-xs"
            title="Copy terminal session"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={() => setHistory([])}
            className="text-slate-400 hover:text-slate-200 transition text-xs"
            title="Clear terminal"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div 
        className="p-5 h-[340px] overflow-y-auto bg-[#0a0e17] text-slate-200 font-mono text-xs sm:text-[13px] leading-relaxed cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-slate-500 text-xs mb-3 pb-2 border-b border-slate-800/60 flex items-center justify-between">
          <span>Linux Kernel 6.8.0-31-generic (Ubuntu 24.04 LTS) • x86_64</span>
          <span className="text-emerald-400">Interactive Web Lab</span>
        </div>

        {history.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center text-slate-300">
              <span className="text-emerald-400 font-semibold mr-1.5">sysadmin@srv01:~$</span>
              <span className="text-amber-300 font-semibold">{item.command}</span>
            </div>
            <pre className="mt-1 text-slate-300 whitespace-pre-wrap font-mono text-xs sm:text-[13px] overflow-x-auto leading-normal">
              {item.output}
            </pre>
          </div>
        ))}

        {/* Active Command Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-emerald-400 font-semibold mr-1.5 shrink-0">sysadmin@srv01:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. df -h, uptime, help)..."
            className="flex-1 bg-transparent border-none outline-none text-amber-300 font-mono text-xs sm:text-[13px] p-0 focus:ring-0 placeholder:text-slate-600"
          />
          <span className="terminal-cursor ml-1"></span>
        </form>
        <div ref={bottomRef} />
      </div>

      {/* Quick Action Chips Bar */}
      <div className="bg-[#111726] border-t border-slate-800/80 px-4 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-sans">
        <span className="text-slate-400 text-[11px] font-semibold shrink-0 uppercase tracking-wider flex items-center gap-1">
          <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Run:
        </span>
        {INITIAL_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            className="px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-emerald-950/60 hover:text-emerald-300 hover:border-emerald-600/40 text-slate-300 border border-slate-700/60 font-mono text-[11px] whitespace-nowrap transition"
          >
            {cmd}
          </button>
        ))}
        {onOpenFullLab && (
          <button
            onClick={onOpenFullLab}
            className="ml-auto text-xs text-cyan-400 hover:text-cyan-300 font-medium whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            Open Full Lab &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
