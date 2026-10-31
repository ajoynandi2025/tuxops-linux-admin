import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal, Maximize2, Minimize2, Copy, Check, RotateCcw } from 'lucide-react';

export default function TerminalModal({ isOpen, onClose, initialCommand = "" }) {
  const [history, setHistory] = useState([
    {
      command: "uname -a",
      output: "Linux tuxops-virtual-lab 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux"
    },
    {
      command: "uptime",
      output: " 18:40:00 up 12 days,  4:20,  1 user,  load average: 0.05, 0.10, 0.08"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [currentDir, setCurrentDir] = useState("~");
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Simulated virtual filesystem
  const virtualFS = {
    "~": ["deploy_service.sh", "notes.txt", "projects", "backup.tar.gz"],
    "/": ["bin", "boot", "dev", "etc", "home", "lib", "media", "mnt", "opt", "proc", "root", "run", "sbin", "srv", "sys", "tmp", "usr", "var"],
    "/etc": ["passwd", "shadow", "group", "fstab", "hosts", "resolv.conf", "systemd", "ssh", "ufw"],
    "/var/log": ["syslog", "auth.log", "nginx", "journal", "dmesg", "dpkg.log"]
  };

  useEffect(() => {
    if (isOpen && initialCommand) {
      handleExecute(initialCommand);
    }
  }, [isOpen, initialCommand]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleExecute = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let output = "";
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch (cmd) {
      case "help":
        output = `TuxOps Interactive Shell Simulator
Available Commands:
  • ls, pwd, cd [dir], cat [file]
  • df -h, free -m, uptime, uname -a, whoami
  • systemctl [status|start|stop] [service]
  • ps aux, top, kill [pid]
  • ip a, ss -tulpn
  • chmod [mode] [file], chown [user] [file]
  • clear, history, exit`;
        break;

      case "ls":
        const files = virtualFS[currentDir] || ["app", "data", "logs"];
        output = files.join("   ");
        break;

      case "pwd":
        output = currentDir === "~" ? "/home/sysadmin" : currentDir;
        break;

      case "cd":
        if (!arg || arg === "~") {
          setCurrentDir("~");
          output = "";
        } else if (arg === "/" || arg === "/etc" || arg === "/var/log") {
          setCurrentDir(arg);
          output = "";
        } else if (arg === "..") {
          setCurrentDir("/");
          output = "";
        } else {
          output = `bash: cd: ${arg}: No such directory in simulated sandbox`;
        }
        break;

      case "cat":
        if (!arg) {
          output = "cat: missing operand";
        } else if (arg.includes("passwd")) {
          output = `root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nsysadmin:x:1000:1000:Sysadmin,,,:/home/sysadmin:/bin/bash\nnginx:x:101:101:nginx user:/var/www:/usr/sbin/nologin`;
        } else if (arg.includes("fstab")) {
          output = `UUID=3f1b4a8e-28d1-4e78 / ext4 defaults,noatime 0 1\nUUID=a1c90ef2-9214-41d3 /boot ext4 defaults 0 2\nUUID=e82711ab-3290-4bf0 /var/lib/docker ext4 defaults 0 2`;
        } else if (arg.includes("os-release")) {
          output = `NAME="Ubuntu"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu\nVERSION_ID="24.04"`;
        } else {
          output = `Contents of ${arg}:\n# Simulated production configuration file\nACTIVE=true\nLOG_LEVEL=info`;
        }
        break;

      case "whoami":
        output = "sysadmin (uid=1000, gid=1000, groups=1000(sysadmin), 27(sudo), 999(docker))";
        break;

      case "uname":
        output = "Linux tuxops-lab 6.8.0-31-generic #31-Ubuntu SMP x86_64";
        break;

      case "df":
        output = `Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda2       160G   38G  115G  25% /\ntmpfs           1.6G  1.2M  1.6G   1% /run\n/dev/sdb1       500G  142G  333G  30% /var/lib/docker`;
        break;

      case "free":
        output = `               total        used        free      shared  buff/cache   available\nMem:           16384        4210        6890         140        5284       11740\nSwap:           4096           0        4096`;
        break;

      case "uptime":
        output = " 18:42:15 up 12 days,  4:22,  1 user,  load average: 0.14, 0.12, 0.09";
        break;

      case "systemctl":
        if (trimmed.includes("status")) {
          output = `● active (running)\n   Main PID: 1408\n   Tasks: 4\n   Memory: 24.1M\n   Loaded: loaded (/etc/systemd/system/app.service)`;
        } else {
          output = `[systemd] Execution simulated: ${trimmed}`;
        }
        break;

      case "ss":
        output = `Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port\ntcp    LISTEN  0       128      0.0.0.0:2222         0.0.0.0:*\ntcp    LISTEN  0       511      0.0.0.0:80           0.0.0.0:*\ntcp    LISTEN  0       511      0.0.0.0:443          0.0.0.0:*`;
        break;

      case "ip":
        output = `1: lo: <LOOPBACK,UP> inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> inet 192.168.1.150/24 brd 192.168.1.255 scope global eth0`;
        break;

      case "exit":
        onClose();
        return;

      default:
        output = `bash: ${trimmed}: command simulated successfully.\n[Return code: 0]`;
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
    setInputVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleExecute(inputVal);
  };

  const handleCopyHistory = () => {
    const text = history.map(h => `$ ${h.command}\n${h.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className={`bg-[#0d1117] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono transition-all duration-200 ${
          isMaximized ? "w-full h-full" : "w-full max-w-4xl h-[600px]"
        }`}
      >
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800 select-none">
          <div className="flex items-center space-x-2">
            <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:opacity-100 transition"></button>
            <button onClick={() => setIsMaximized(!isMaximized)} className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:opacity-100 transition"></button>
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80"></div>
            <span className="ml-2 text-xs text-slate-300 font-sans font-medium flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              TuxOps Virtual Lab Terminal • sysadmin@srv01:{currentDir}
            </span>
          </div>

          <div className="flex items-center space-x-2 font-sans text-xs">
            <button
              onClick={handleCopyHistory}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              title="Copy Terminal Logs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setHistory([])}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              title="Clear Terminal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Screen */}
        <div 
          className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] text-slate-200 text-xs sm:text-sm leading-relaxed cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="text-slate-500 text-xs mb-3 pb-2 border-b border-slate-800/80">
            Welcome to the TuxOps Interactive Sandbox. Type <span className="text-amber-300 font-bold">'help'</span> for instructions or test any Linux command!
          </div>

          {history.map((item, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex items-center text-slate-300">
                <span className="text-emerald-400 font-semibold mr-1.5">sysadmin@srv01:{currentDir}$</span>
                <span className="text-amber-300 font-semibold">{item.command}</span>
              </div>
              {item.output && (
                <pre className="mt-1 text-slate-300 whitespace-pre-wrap font-mono text-xs sm:text-[13px] overflow-x-auto">
                  {item.output}
                </pre>
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-emerald-400 font-semibold mr-1.5 shrink-0">sysadmin@srv01:{currentDir}$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-amber-300 font-mono text-xs sm:text-[13px] p-0 focus:ring-0"
              autoFocus
            />
            <span className="terminal-cursor ml-1"></span>
          </form>
          <div ref={bottomRef} />
        </div>

        {/* Footer shortcuts */}
        <div className="bg-[#161b22] px-4 py-2 text-[11px] text-slate-400 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 font-sans">
          <div className="flex items-center gap-2">
            <span>Try:</span>
            {["cat /etc/passwd", "systemctl status", "df -h", "ss -tulpn", "ls -l /etc"].map(preset => (
              <button
                key={preset}
                onClick={() => handleExecute(preset)}
                className="bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono text-[10px]"
              >
                {preset}
              </button>
            ))}
          </div>
          <span className="text-slate-500">Press ESC or click close</span>
        </div>
      </div>
    </div>
  );
}
