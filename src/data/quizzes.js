export const QUIZ_QUESTIONS = [
  {
    id: 1,
    module: "Architecture",
    question: "Which process is assigned Process ID 1 (PID 1) upon successful Linux kernel initialization on modern enterprise systems?",
    options: [
      "kthreadd",
      "systemd",
      "bash",
      "grub2"
    ],
    correctAnswer: 1,
    explanation: "On modern Linux systems (RHEL, Ubuntu, Debian, Arch), systemd is spawned by the kernel as PID 1 to orchestrate all userspace daemons and target states."
  },
  {
    id: 2,
    module: "Permissions",
    question: "What does the permission string `drwxrwsr-x` indicate on a shared directory?",
    options: [
      "The Sticky Bit is set; files cannot be deleted by other users.",
      "The SUID bit is set; files execute as root.",
      "The SGID bit is set; new files inherit the directory's group ownership.",
      "The directory is world-writable."
    ],
    correctAnswer: 2,
    explanation: "The lowercase 's' in the group execute column (`rws`) denotes the SGID (Set Group ID) bit. In directories, this forces newly created files to inherit the parent directory's group."
  },
  {
    id: 3,
    module: "Storage",
    question: "Which statement is true regarding shrinking an XFS filesystem?",
    options: [
      "XFS can be shrunk online using `xfs_growfs -s`.",
      "XFS filesystems can only be shrunk while unmounted.",
      "XFS filesystems cannot be shrunk; only grown.",
      "XFS requires a reboot into single-user mode to shrink."
    ],
    correctAnswer: 2,
    explanation: "XFS design does not support filesystem reduction/shrinking. If shrinking is required, use ext4 with resize2fs, or backup data, recreate a smaller XFS volume, and restore."
  },
  {
    id: 4,
    module: "Systemd",
    question: "After editing `/etc/systemd/system/myapp.service`, what command must you run before systemd recognizes the changes?",
    options: [
      "systemctl restart myapp",
      "systemctl daemon-reload",
      "systemctl reload-all",
      "systemd --recheck"
    ],
    correctAnswer: 1,
    explanation: "`systemctl daemon-reload` instructs the systemd manager to reload all unit configuration files and rebuild dependency trees."
  },
  {
    id: 5,
    module: "Networking",
    question: "Which modern command replaces the deprecated `netstat -tulpn` for inspecting active TCP and UDP listening sockets?",
    options: [
      "ip route show",
      "ss -tulpn",
      "sockstat -a",
      "traceroute -p"
    ],
    correctAnswer: 1,
    explanation: "`ss` (Socket Statistics) is part of `iproute2` and reads socket data directly from the kernel sockdiag netlink interface, making it vastly faster than parsing `/proc/net` like netstat."
  },
  {
    id: 6,
    module: "Security",
    question: "If an Nginx web server returns 403 Forbidden because files were copied to `/var/www/html` with incorrect SELinux contexts, which command fixes them?",
    options: [
      "chmod 777 -R /var/www/html",
      "setenforce 0",
      "restorecon -Rv /var/www/html",
      "chown root:root /var/www/html"
    ],
    correctAnswer: 2,
    explanation: "`restorecon -Rv` resets the file security contexts to match the default labeling rules defined in the system's SELinux policy database."
  },
  {
    id: 7,
    module: "Scripting",
    question: "In bash automation scripts, why is `set -o pipefail` critical?",
    options: [
      "It speeds up pipeline execution using multithreading.",
      "It prevents buffer overruns on standard input pipes.",
      "It ensures a pipeline returns a failure code if ANY command in the pipe fails, not just the last one.",
      "It automatically redirects stderr to /dev/null."
    ],
    correctAnswer: 2,
    explanation: "By default in bash, the return code of a pipeline is that of the last command. `pipefail` ensures that if an early command fails (e.g. `pg_dump | gzip`), the script notices and handles the error."
  },
  {
    id: 8,
    module: "Diagnostics",
    question: "What does an unexpected high number in the 'D' state (uninterruptible sleep) in `ps aux` or `top` signify?",
    options: [
      "Process is awaiting user keyboard input.",
      "Process is frozen waiting on disk I/O or network filesystem lock.",
      "Process is in a zombie state and has completed.",
      "Process has been throttled by the CPU scheduler."
    ],
    correctAnswer: 1,
    explanation: "A process in 'D' state is in Uninterruptible Sleep, typically waiting for disk reads/writes or unresponsive NFS mounts. It cannot be killed even with `kill -9` until the kernel I/O request finishes."
  }
];
