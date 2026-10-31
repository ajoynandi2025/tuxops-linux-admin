export const TOPIC_CATEGORIES = [
  "All",
  "Foundations & Architecture",
  "Users & Permissions",
  "Storage & Filesystems",
  "Processes & Systemd",
  "Logging & Auditing",
  "Networking & Firewalls",
  "Package Management",
  "Security & Disaster Recovery"
];

export const TOPICS = [
  // 01. What is Linux System Administration? (GeeksforGeeks Comprehensive Guide)
  {
    id: "what-is-linux-system-administration",
    topicNumber: "01",
    title: "What is Linux System Administration? (Overview, Roles, Commands & Skills)",
    category: "Foundations & Architecture",
    difficulty: "Beginner",
    readTime: "20 min read",
    summary: "A complete introduction to Linux System Administration based on industry standards and GeeksforGeeks guidelines. Learn the administrator's core responsibilities, fundamental operating system concepts, essential day-to-day commands, key technical skills, and career paths.",
    keyCommands: ["uname -r", "whoami", "id", "df -h", "top", "systemctl status"],
    sections: [
      {
        id: "what-is-sysadmin",
        heading: "1. What is Linux System Administration?",
        content: `Linux System Administration involves managing, configuring, maintaining, and troubleshooting Linux-based operating systems to guarantee that servers, applications, and networks run smoothly, securely, and efficiently.

A Linux System Administrator (often abbreviated as SysAdmin) acts as the custodian of the organization's computing infrastructure. Whether managing on-premise bare-metal servers or thousands of cloud instances in AWS, GCP, or Azure, the administrator oversees hardware resources, user access boundaries, software installations, automation scripts, and continuous security monitoring.`,
        codeBlock: {
          command: "hostnamectl && uname -a",
          explanation: "Display system hostname, operating system release, kernel architecture, and virtualization runtime.",
          output: ` Static hostname: production-node01
       Icon name: computer-vm
         Chassis: vm
      Machine ID: d192847a192847192837192847192837
         Boot ID: a819273c819273819273819273819273
Operating System: Ubuntu 24.04 LTS
          Kernel: Linux 6.8.0-31-generic
    Architecture: x86-64`
        }
      },
      {
        id: "core-responsibilities",
        heading: "2. Core Responsibilities of a Linux System Administrator",
        content: `According to GeeksforGeeks and industry benchmarks, the daily responsibilities of a Linux administrator encompass five pillars:

1. System Setup, Installation & Patching:
Installing Linux distributions (Ubuntu, RHEL, Debian, Rocky, Alpine), keeping packages updated, applying kernel security patches, and configuring baseline server templates.

2. User & Group Access Management:
Creating, modifying, and deprovisioning user accounts, configuring supplemental groups, establishing password aging policies, and enforcing the Principle of Least Privilege via sudo delegations.

3. File System & Storage Administration:
Partitioning storage drives (fdisk, parted), creating Logical Volumes (LVM), managing filesystem formats (ext4, XFS, Btrfs), mounting disks via /etc/fstab, and monitoring disk capacity to avoid outages.

4. Performance Monitoring & Resource Optimization:
Continuously tracking CPU utilization, memory pressure, disk I/O latency, and network bandwidth using diagnostic utilities like top, htop, vmstat, iostat, and sar.

5. Security Hardening, Firewalls & Backup Operations:
Enforcing firewall security policies (UFW, Firewalld), managing SSH public key cryptography, auditing security logs, configuring automated backups with rsync, and formulating Disaster Recovery (DR) protocols.`,
        tip: "A successful system administrator prioritizes automation over repetitive manual labor. If you execute a sequence of commands more than twice, write a shell script or Ansible playbook to automate it."
      },
      {
        id: "fundamental-concepts",
        heading: "3. Fundamental Concepts Every SysAdmin Must Understand",
        content: `To effectively administer Linux servers, you must internalize these foundational concepts:

• The Linux Kernel vs. User Space:
The kernel manages physical hardware (CPU, RAM, storage controllers), while applications and users operate in isolated user space communicating with the kernel via system calls.

• The Filesystem Hierarchy Standard (FHS):
Everything in Linux is organized under a unified root directory ('/'). Configurations belong in /etc, dynamic data and logs belong in /var, user home folders in /home, and hardware devices are represented as files in /dev.

• Managing the Superuser (root):
The 'root' user (UID 0) has absolute power over the operating system, with the authority to read, modify, or delete any file on the system. To avoid catastrophic accidents or security breaches, administrators should log in as unprivileged users and invoke elevated permissions using 'sudo'.

• Command-Line Interface (CLI) & Shell:
The primary interface for enterprise Linux servers is the terminal. Linux administrators work almost exclusively without a graphical user interface (GUI) to maximize server performance and minimize resource overhead.`,
        warning: "Never execute arbitrary commands from the internet using 'curl | sudo bash'. Always inspect scripts beforehand to verify they do not contain destructive operations or unauthorized user creation."
      },
      {
        id: "essential-commands-guide",
        heading: "4. Essential Linux Administration Command Reference",
        content: `Linux system administrators rely on a standard set of command-line utilities:

1. File & Directory Management:
• 'ls -la' : List all files including hidden dotfiles with permissions and sizes.
• 'cd /path' : Change current working directory.
• 'pwd' : Print absolute path of current working directory.
• 'mkdir -p /dir1/dir2' : Create nested directories recursively.
• 'cp -r src/ dest/' : Copy files and directories recursively.
• 'mv file new_name' : Move or rename files.
• 'rm -rf /path' : Recursively force remove files and directories.
• 'touch filename' : Create an empty file or update access timestamps.

2. System Information & Identity:
• 'whoami' : Display username of the active shell session.
• 'id' : Print real and effective UID, primary GID, and supplemental groups.
• 'uname -r' : Print kernel release string.
• 'uptime' : Show system running duration, logged-in users, and 1, 5, 15 min load averages.

3. Storage & Memory Inspection:
• 'df -h' : Display filesystem disk usage in human-readable gigabytes/megabytes.
• 'du -sh * | sort -h' : Calculate disk space consumed by files in the current folder.
• 'free -h' : Display total, used, free, and available physical memory and swap.

4. Process & Resource Supervision:
• 'ps aux' : Generate a complete snapshot of all running processes.
• 'top' / 'htop' : Interactive real-time process and CPU resource monitor.
• 'kill -15 <PID>' : Gracefully terminate a process via SIGTERM.`,
        codeBlock: {
          command: "whoami && id && df -h / && free -h",
          explanation: "Run a quick multi-command health and identity check on a Linux server.",
          output: `sysadmin
uid=1000(sysadmin) gid=1000(sysadmin) groups=1000(sysadmin),27(sudo),999(docker)
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2       160G   38G  115G  25% /
               total        used        free      shared  buff/cache   available
Mem:            15Gi       4.1Gi       7.2Gi       128Mi       4.6Gi        11Gi
Swap:          4.0Gi          0B       4.0Gi`
        }
      },
      {
        id: "key-skills-career",
        heading: "5. Key Skills & Career Certifications",
        content: `A career in Linux System Administration opens doors to DevOps Engineering, Site Reliability Engineering (SRE), and Cloud Architecture.

Essential Technical Skills:
• Bash Scripting: Writing robust automation scripts with error trapping ('set -euo pipefail').
• Networking: Configuring static IPs, DNS resolvers, routing tables, and SSH tunneling.
• Security & Auditing: Enforcing SELinux or AppArmor policies, configuring UFW/Firewalld, and auditing with auditd.
• Version Control: Using Git to manage infrastructure configuration files.

Industry Standard Certifications:
• Red Hat Certified System Administrator (RHCSA - EX200): The premier hands-on performance exam for enterprise Linux environments.
• Linux Foundation Certified System Administrator (LFCS): A distribution-flexible practical exam covering storage, services, and networking.
• CompTIA Linux+: Vendor-neutral certification establishing foundational Linux competence.`
      }
    ],
    summaryChecklist: [
      "Linux System Administration is the management, configuration, and security of Linux operating systems.",
      "Key duties include provisioning, user permissions, storage management, monitoring, and security patching.",
      "Administrators operate primarily through the Bash command-line interface (CLI).",
      "Industry certifications like RHCSA and LFCS validate hands-on production administration competence."
    ]
  },
  // 02. Kernel Architecture
  {
    id: "kernel-architecture",
    topicNumber: "02",
    title: "Linux Kernel Architecture, Rings & System Calls",
    category: "Foundations & Architecture",
    difficulty: "Beginner",
    readTime: "15 min read",
    summary: "Understand the core architecture of the Linux operating system, the distinction between User Space and Kernel Space, hardware protection rings, and how system calls bridge applications to the hardware.",
    keyCommands: ["uname -a", "dmesg", "sysctl -a", "strace", "lsmod"],
    sections: [
      {
        id: "architecture-overview",
        heading: "1. The Monolithic Kernel Architecture",
        content: `The Linux operating system is powered by a monolithic kernel. Unlike microkernels that isolate core drivers into separate user processes, the Linux kernel executes its process scheduler, memory manager, virtual file system (VFS), and hardware device drivers inside a single unified address space.

This architectural decision yields maximum execution performance because communication between device drivers, memory management, and file systems avoids costly Inter-Process Communication (IPC) context switches. To maintain stability, modern Linux supports Loadable Kernel Modules (LKMs), allowing drivers and hardware modules to be dynamically inserted or unloaded at runtime without rebooting the server.`,
        codeBlock: {
          command: "uname -a && uname -r",
          explanation: "Display full kernel version, build timestamp, architecture, and kernel release string.",
          output: `Linux production-node01 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC Sat Apr 20 00:40:06 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux
6.8.0-31-generic`
        }
      },
      {
        id: "protection-rings",
        heading: "2. Hardware Protection Rings: User Space vs. Kernel Space",
        content: `Modern x86_64 CPUs enforce hardware-level privilege separation using protection rings:
• Ring 0 (Kernel Space): Highest privilege level. Has direct, unrestricted access to physical memory, CPU registers, interrupt controllers, and I/O ports. Only the Linux kernel binary and loaded modules run in Ring 0.
• Ring 3 (User Space): Restricted execution mode. User applications (Nginx, PostgreSQL, bash shells, system utilities) run in Ring 3. If an application crashes or attempts an illegal memory access, the CPU generates a page fault exception that the kernel catches, terminating only that process without crashing the operating system.
• Rings 1 & 2: Historically reserved for device drivers in x86 architecture, but are left unused in standard Linux implementations.`,
        tip: "A kernel panic occurs when Ring 0 code encounters an unhandled fatal condition. If user space software crashes (e.g. SegFault 11), only that application dies while the Linux kernel remains completely stable."
      },
      {
        id: "syscalls-strace",
        heading: "3. System Calls (syscalls) & Tracing with strace",
        content: `Because User Space applications are forbidden from touching physical disks or network sockets directly, they request services from the kernel via System Calls (syscalls). Common syscalls include open(), read(), write(), close(), fork(), execve(), and socket().

When an application invokes a system call, the CPU transitions from Ring 3 to Ring 0 via a software interrupt or specialized CPU instructions (SYSENTER/SYSCALL). You can intercept and inspect every system call an application makes in real time using the 'strace' diagnostic utility.`,
        codeBlock: {
          command: "strace -e trace=openat,write,read cat /etc/hostname",
          explanation: "Trace file-level system calls executed by the cat utility.",
          output: `openat(AT_FDCWD, "/etc/hostname", O_RDONLY) = 3
read(3, "production-node01\\n", 131072)   = 18
write(1, "production-node01\\n", 18)     = 18
production-node01
close(3)                                = 0`
        }
      },
      {
        id: "kernel-modules",
        heading: "4. Loadable Kernel Modules (LKM)",
        content: `Kernel modules extend kernel capabilities dynamically. Use 'lsmod' to inspect currently loaded modules, 'modinfo' to view module details, and 'modprobe' to load or unload modules with automatic dependency resolution.`,
        codeBlock: {
          command: "lsmod | head -n 6",
          explanation: "Display currently loaded kernel modules, memory footprint, and dependent processes.",
          output: `Module                  Size  Used by
overlay               151552  24
xt_conntrack           12288  14
nf_conntrack          172032  1 xt_conntrack
iptable_filter         12288  1
ip_tables              32768  1 iptable_filter
xfs                  2166784  3`
        },
        warning: "Never use 'rmmod -f' (force remove) on production servers. Unloading an in-use storage or network driver will immediately panic the kernel."
      }
    ],
    summaryChecklist: [
      "The Linux kernel is monolithic with dynamically loadable kernel modules (LKM).",
      "Ring 0 (Kernel Space) has full hardware access; Ring 3 (User Space) runs isolated applications.",
      "Applications interact with hardware strictly through system calls (syscalls).",
      "Use 'strace' to debug application-kernel interaction and 'lsmod'/'modprobe' for module management."
    ]
  },

  // 03. Boot Process
  {
    id: "boot-process",
    topicNumber: "03",
    title: "The 4-Stage Linux Boot Sequence: UEFI/BIOS to systemd",
    category: "Foundations & Architecture",
    difficulty: "Beginner",
    readTime: "20 min read",
    summary: "Master the complete initialization journey of a Linux server from motherboard firmware, GRUB2 bootloader menu, vmlinuz/initramfs handoff, to PID 1 systemd target initialization.",
    keyCommands: ["systemd-analyze", "systemd-analyze blame", "journalctl -b", "dmesg | head"],
    sections: [
      {
        id: "four-stages",
        heading: "1. The 4 Fundamental Boot Stages",
        content: `Every enterprise Linux system transitions through four distinct phases from hardware power-on to a usable login prompt:

Stage 1 - Firmware Phase (UEFI / BIOS):
The motherboard firmware executes the Power-On Self-Test (POST) to verify CPU, RAM, and hardware controllers. Under modern UEFI systems, the firmware locates the EFI System Partition (ESP)—a FAT32 formatted partition—and loads the configured EFI bootloader binary (e.g., /EFI/ubuntu/shimx64.efi or grubx64.efi).

Stage 2 - Bootloader Phase (GRUB2):
Grand Unified Bootloader version 2 (GRUB2) reads its configuration (/boot/grub/grub.cfg). It presents the OS selection menu, loads the compressed Linux kernel binary (/boot/vmlinuz-<version>) and the Initial RAM Filesystem (/boot/initrd.img-<version>) into system memory, then passes control to the kernel with specified boot arguments.

Stage 3 - Kernel Initialization Phase:
The compressed vmlinuz kernel decompresses itself in RAM, initializes memory paging and processor architectures, mounts the temporary initramfs filesystem as its temporary root (/), loads essential hardware controller drivers (RAID, NVMe, SCSI, LVM), and mounts the real physical root partition (/). Once mounted, the kernel executes PID 1 (/sbin/init, which is symlinked to systemd).

Stage 4 - Init Phase (systemd):
systemd takes over as Process ID 1 (PID 1). It reads /etc/systemd/system/default.target (usually multi-user.target for servers or graphical.target for desktops) and starts services concurrently to achieve the target state.`,
        tip: "If a server hangs during boot after a kernel update, you can select the previous working kernel directly from the GRUB2 menu by holding Shift or pressing Esc during early boot."
      },
      {
        id: "boot-analysis",
        heading: "2. Measuring & Analyzing Boot Performance",
        content: `The 'systemd-analyze' suite provides precise millisecond-level telemetry into boot duration, separating firmware, loader, kernel, and userspace milestones.`,
        codeBlock: {
          command: "systemd-analyze && systemd-analyze blame | head -n 5",
          explanation: "Break down startup duration and identify the top 5 slowest services during boot.",
          output: `Startup finished in 2.140s (firmware) + 1.210s (loader) + 2.040s (kernel) + 4.820s (userspace) = 10.210s
multi-user.target reached after 4.790s in userspace

1.620s docker.service
0.840s networkd-dispatcher.service
0.510s snapd.service
0.380s systemd-journal-flush.service
0.210s cron.service`
        }
      },
      {
        id: "grub-recovery-flags",
        heading: "3. Kernel Command Line Parameters in GRUB2",
        content: `Administrators can pass custom parameters to the kernel at boot by editing the GRUB menu line (pressing 'e' in GRUB):
• 'single' or '1': Boots into single-user maintenance mode.
• 'systemd.unit=rescue.target': Boots into system rescue target with root shell.
• 'systemd.unit=emergency.target': Boots into minimal emergency shell without mounting disks.
• 'init=/bin/bash': Bypasses systemd entirely, spawning an immediate bash shell as PID 1 (useful for forgotten root password recovery).`,
        warning: "Always remount the root filesystem read-write after using init=/bin/bash before changing passwords: 'mount -o remount,rw /'."
      }
    ],
    summaryChecklist: [
      "The boot chain flows: UEFI/BIOS → GRUB2 → vmlinuz/initramfs → systemd (PID 1).",
      "initramfs contains minimal storage drivers necessary to locate and mount the real root filesystem.",
      "Analyze boot bottlenecks using 'systemd-analyze' and 'systemd-analyze blame'.",
      "Kernel parameters can be modified on-the-fly in GRUB to enter rescue or single-user modes."
    ]
  },

  // 04. Filesystem Hierarchy Standard
  {
    id: "filesystem-hierarchy",
    topicNumber: "04",
    title: "Filesystem Hierarchy Standard (FHS): Deep Dive into /etc, /var, /proc & /sys",
    category: "Foundations & Architecture",
    difficulty: "Beginner",
    readTime: "20 min read",
    summary: "Explore the Linux directory tree structure governed by the FHS. Understand where configurations, dynamic data, virtual pseudo-filesystems, and device files reside.",
    keyCommands: ["ls -ld /", "df -hT", "stat /etc", "cat /proc/cpuinfo"],
    sections: [
      {
        id: "fhs-overview",
        heading: "1. The Single Root Concept",
        content: `Unlike operating systems that divide physical storage into drive letters (C:, D:), Linux unifies all storage drives, virtual systems, and peripherals into a single hierarchical inverted tree rooted at '/'. The Filesystem Hierarchy Standard (FHS) specifies the expected location and behavior of files and directories across all Linux distributions.`,
        codeBlock: {
          command: "ls -ld /bin /etc /var /proc /sys /dev /home /tmp",
          explanation: "Inspect permissions and attributes of foundational FHS directories.",
          output: `lrwxrwxrwx   1 root root     7 Apr 22  2024 /bin -> usr/bin
drwxr-xr-x 135 root root 12288 Oct 31 10:20 /etc
drwxr-xr-x  14 root root  4096 Oct 31 09:12 /var
dr-xr-xr-x 340 root root     0 Oct 31 08:00 /proc
dr-xr-xr-x  13 root root     0 Oct 31 08:00 /sys
drwxr-xr-x  22 root root  4380 Oct 31 08:00 /dev
drwxr-xr-x   4 root root  4096 Oct 31 08:05 /home
drwxrwxrwt  18 root root  4096 Oct 31 14:30 /tmp`
        }
      },
      {
        id: "critical-directories",
        heading: "2. Breakdown of Critical FHS Branches",
        content: `• /etc: Contains host-specific, static system configuration files (e.g. /etc/fstab, /etc/ssh/sshd_config). Executable binaries must never be placed here.
• /var: Contains variable data files expected to change continuously during normal operation. Subdirectories include /var/log (system logs), /var/spool (mail/print queues), and /var/lib (database storage like /var/lib/mysql).
• /usr: Contains user-facing programs and read-only data (/usr/bin, /usr/lib, /usr/share). In modern distros, /bin and /sbin are symlinks to /usr/bin and /usr/sbin (the UsrMerge standard).
• /tmp: Temporary scratch space. Accessible by all users with the Sticky Bit enabled. Files in /tmp are typically purged upon system reboot or via systemd-tmpfiles.`,
        tip: "Always create separate physical partitions or LVM logical volumes for /var and /home. If /var fills up with runaway logs, it will not exhaust the root filesystem (/) and freeze the entire server."
      },
      {
        id: "pseudo-filesystems",
        heading: "3. Virtual Pseudo-Filesystems: /proc & /sys",
        content: `Directories /proc and /sys do NOT exist on any physical hard drive. They are in-memory virtual filesystems created on-the-fly by the Linux kernel:
• /proc (procfs): Exposes real-time kernel data structures, hardware information, and active processes (each running process has a corresponding numbered folder, e.g., /proc/1 for systemd).
• /sys (sysfs): Exposes the kernel device model, bus hierarchies, and driver tuning attributes.`,
        codeBlock: {
          command: "cat /proc/sys/kernel/hostname && cat /proc/loadavg",
          explanation: "Read live kernel parameters directly from the /proc virtual filesystem.",
          output: `production-node01
0.14 0.22 0.18 1/450 18492`
        }
      }
    ],
    summaryChecklist: [
      "The FHS enforces a standardized single-root (/) directory structure across all distributions.",
      "/etc stores static configuration files; /var stores dynamic, expanding files and logs.",
      "/proc and /sys are virtual pseudo-filesystems dynamically maintained in memory by the kernel.",
      "/bin and /sbin are modern symlinks to /usr/bin under UsrMerge."
    ]
  },

  // 05. Shell Environment
  {
    id: "shell-environment",
    topicNumber: "05",
    title: "Bash Shell Environment, Variables, Dotfiles & Redirection",
    category: "Foundations & Architecture",
    difficulty: "Beginner",
    readTime: "18 min read",
    summary: "Master the command line interpreter environment, shell variable scoping, profile/rc configuration startup files, and standard stream redirection (stdin, stdout, stderr).",
    keyCommands: ["echo $SHELL", "export", "env", "source ~/.bashrc", "2>&1"],
    sections: [
      {
        id: "shell-variables",
        heading: "1. Shell Variables vs. Environment Variables",
        content: `In Bash, local shell variables exist only within the currently executing shell instance. Environment variables, created using the 'export' keyword, are inherited by any child processes or subshells spawned from that session.`,
        codeBlock: {
          command: "APP_ENV='production' && export APP_ENV && env | grep APP_ENV",
          explanation: "Create an environment variable and verify its availability to child environments.",
          output: `APP_ENV=production`
        }
      },
      {
        id: "startup-dotfiles",
        heading: "2. Shell Startup Files & Initialization Order",
        content: `When a shell initializes, it executes specific initialization files depending on whether it is a Login Shell or a Non-Login Interactive Shell:

Login Shells (e.g., SSH login or local console):
1. /etc/profile (Global environment settings for all users)
2. First found of: ~/.bash_profile → ~/.bash_login → ~/.profile (User environment)
3. ~/.bash_logout (Executed when logging out)

Non-Login Interactive Shells (e.g., opening a new terminal window or running 'bash'):
1. /etc/bash.bashrc (Global interactive configuration)
2. ~/.bashrc (User aliases, shell functions, and prompt customizations)`,
        tip: "Place environment variables (like PATH or JAVA_HOME) in ~/.profile or ~/.bash_profile, and place aliases and prompt customizations (PS1) in ~/.bashrc."
      },
      {
        id: "stream-redirection",
        heading: "3. Standard Streams & I/O Redirection",
        content: `Every Linux process opens three standard file descriptors:
• FD 0 - Standard Input (stdin)
• FD 1 - Standard Output (stdout)
• FD 2 - Standard Error (stderr)

Mastering redirection operators:
• '>' : Overwrite stdout to a file
• '>>' : Append stdout to a file
• '2>' : Redirect stderr only
• '&>' or '> file 2>&1' : Redirect both stdout and stderr to the same file
• '<' : Feed file contents into stdin
• '|' (Pipe) : Connect stdout of one process to stdin of the next process`,
        codeBlock: {
          command: "ls /etc/hosts /nonexistent_path > /tmp/output.log 2>&1 && cat /tmp/output.log",
          explanation: "Redirect both stdout and stderr into a single log file simultaneously.",
          output: `ls: cannot access '/nonexistent_path': No such file or directory
/etc/hosts`
        }
      }
    ],
    summaryChecklist: [
      "Use 'export' to promote local shell variables into inherited environment variables.",
      "Login shells parse /etc/profile and ~/.profile; interactive subshells parse ~/.bashrc.",
      "FD 0 is stdin, FD 1 is stdout, and FD 2 is stderr.",
      "Use '2>&1' or '&>' to merge standard error into standard output."
    ]
  },

  // 06. User & Group Management
  {
    id: "user-management",
    topicNumber: "06",
    title: "User & Group Administration, /etc/passwd & Account Aging",
    category: "Users & Permissions",
    difficulty: "Beginner",
    readTime: "20 min read",
    summary: "Provision, modify, and audit local user accounts, supplemental groups, password expiration policies, and understand the internal structure of /etc/passwd and /etc/shadow.",
    keyCommands: ["useradd", "usermod", "userdel", "passwd", "chage -l", "groupadd"],
    sections: [
      {
        id: "passwd-shadow-structure",
        heading: "1. The Anatomy of /etc/passwd and /etc/shadow",
        content: `Linux identifies users numerically through Unique Identifiers (UIDs):
• UID 0: Root superuser
• UIDs 1 - 999: System service accounts (systemd, nginx, sshd)
• UIDs 1000+: Standard human user accounts

The /etc/passwd file contains 7 colon-separated fields:
[username] : [password flag 'x'] : [UID] : [Primary GID] : [GECOS Comment] : [Home Directory] : [Default Shell]

The /etc/shadow file holds the cryptographic password hashes and security aging rules, readable only by root (0640):
[username] : [Hash algorithm ($6$ = SHA-512, $y$ = yescrypt)] : [Last changed days] : [Min days] : [Max days] : [Warn days] : [Inactive days] : [Expire days]`,
        codeBlock: {
          command: "grep -E '^(root|sysadmin):' /etc/passwd",
          explanation: "View user configuration entries in the password database.",
          output: `root:x:0:0:root:/root:/bin/bash
sysadmin:x:1000:1000:Lead Sysadmin,,,:/home/sysadmin:/bin/bash`
        }
      },
      {
        id: "user-provisioning",
        heading: "2. Provisioning Users with useradd & usermod",
        content: `Always use standard administrative commands rather than manually editing user files.
• 'useradd -m': Generates home directory (/home/username) copied from the template /etc/skel.
• 'useradd -s /bin/bash': Assigns the default shell.
• 'usermod -aG <groups>': Appends supplemental groups without clearing existing group memberships.`,
        codeBlock: {
          command: "useradd -m -s /bin/bash -G sudo,docker devops && id devops",
          explanation: "Create an engineer account with home directory and assign to sudo and docker groups.",
          output: `uid=1001(devops) gid=1001(devops) groups=1001(devops),27(sudo),999(docker)`
        },
        warning: "Never run 'usermod -G <group>' without the '-a' (append) flag! Doing so removes the user from all existing groups, including wheel or sudo, locking them out of administrative privileges."
      },
      {
        id: "account-aging",
        heading: "3. Account Aging & Password Policies with chage",
        content: `The 'chage' utility enforces enterprise password rotation policies to satisfy security compliance standards (e.g. PCI-DSS, SOC 2).`,
        codeBlock: {
          command: "chage -l devops",
          explanation: "Inspect password expiration and aging parameters for an account.",
          output: `Last password change                                    : Oct 31, 2026
Password expires                                        : Jan 29, 2027
Password inactive                                       : Never
Account expires                                         : Never
Minimum number of days between password change          : 1
Maximum number of days between password change          : 90
Number of days of warning before password expires       : 7`
        }
      }
    ],
    summaryChecklist: [
      "UID 0 is root; system accounts occupy UIDs 1-999; human users begin at 1000.",
      "/etc/passwd contains account configurations; /etc/shadow stores SHA-512 hashes and expiration rules.",
      "Always use 'usermod -aG' with the '-a' flag when adding secondary groups.",
      "Use 'chage -M 90 -W 7 <user>' to enforce password rotation policies."
    ]
  },

  // 07. Permissions & ACLs
  {
    id: "permissions-acls",
    topicNumber: "07",
    title: "POSIX Permissions (Octal & Symbolic), SUID, SGID & POSIX ACLs",
    category: "Users & Permissions",
    difficulty: "Beginner",
    readTime: "25 min read",
    summary: "Deep dive into standard POSIX read/write/execute permissions, calculating octal masks, special permission bits (SUID, SGID, Sticky bit), and granular Access Control Lists using setfacl.",
    keyCommands: ["chmod", "chown", "chgrp", "umask", "getfacl", "setfacl"],
    sections: [
      {
        id: "standard-permissions",
        heading: "1. The Standard POSIX Permission Triad",
        content: `Linux evaluates permissions in three distinct scopes:
1. Owner (u): The user who owns the file.
2. Group (g): Members of the file's assigned group.
3. Others (o): All other authenticated users on the system.

Each scope has three permission bits:
• Read (r = 4): View file contents or list directory entries.
• Write (w = 2): Modify/truncate file contents or create/delete files inside a directory.
• Execute (x = 1): Run the file as a binary/script, or enter (traverse) into a directory.`,
        codeBlock: {
          command: "chmod 750 /opt/secure_script.sh && ls -l /opt/secure_script.sh",
          explanation: "Apply rwxr-x--- (750) permissions: Owner has full access, Group can read/execute, Others have zero access.",
          output: `-rwxr-x--- 1 sysadmin devops 4096 Oct 31 11:20 /opt/secure_script.sh`
        }
      },
      {
        id: "special-bits",
        heading: "2. Special Permission Bits: SUID, SGID & Sticky Bit",
        content: `When basic permissions are insufficient for multi-tenant collaboration, Linux provides three special bits:

• SUID (Set User ID, 4000): When set on an executable file, any user running the file executes it with the privileges of the file owner rather than their own (e.g. /usr/bin/passwd).
• SGID (Set Group ID, 2000): On directories, any new file created automatically inherits the group ownership of the parent directory rather than the creator's primary group. Essential for shared team directories.
• Sticky Bit (1000): When set on a directory (e.g. /tmp), users can only delete or rename files that they own, even if others have write access.`,
        codeBlock: {
          command: "mkdir /shared/deploy && chown root:developers /shared/deploy && chmod 2775 /shared/deploy && ls -ld /shared/deploy",
          explanation: "Configure a shared project folder with SGID so team files retain developers group ownership.",
          output: `drwxrwsr-x 2 root developers 4096 Oct 31 11:45 /shared/deploy`
        }
      },
      {
        id: "posix-acls",
        heading: "3. Granular Access Control Lists (ACLs)",
        content: `Standard POSIX permissions only permit one owner and one group per file. POSIX ACLs resolve this limitation by enabling granular permissions for multiple specific users or groups.`,
        codeBlock: {
          command: "setfacl -m u:contractor:rx /var/log/app.log && getfacl /var/log/app.log",
          explanation: "Grant read/execute access to user 'contractor' without modifying file ownership.",
          output: `# file: var/log/app.log
# owner: root
# group: root
user::rw-
user:contractor:r-x
group::r--
mask::r-x
other::---`
        }
      }
    ],
    summaryChecklist: [
      "Standard permissions calculate as Read (4) + Write (2) + Execute (1).",
      "SUID (4000) runs binaries as owner; SGID (2000) inherits parent directory group.",
      "The Sticky Bit (1000) prevents users from deleting files owned by peers in shared folders.",
      "Use 'setfacl -m' and 'getfacl' when you need permissions for multiple arbitrary users."
    ]
  },

  // 08. Sudo & PAM
  {
    id: "sudo-pam",
    topicNumber: "08",
    title: "Sudo Security, visudo, Rule Syntax & PAM Authentication",
    category: "Users & Permissions",
    difficulty: "Intermediate",
    readTime: "22 min read",
    summary: "Implement the Principle of Least Privilege using sudoers delegations, syntax validation with visudo, command restrictions, and explore Pluggable Authentication Modules (PAM).",
    keyCommands: ["sudo", "visudo", "sudo -l", "faillock", "pam_tally2"],
    sections: [
      {
        id: "sudoers-syntax",
        heading: "1. The Anatomy of /etc/sudoers",
        content: `The sudo utility allows authorized users to execute individual commands with superuser privileges without sharing the root password.

The sudoers syntax follows this structure:
[Who]    [Where] = ([As Whom])    [Tags] [What Command]
%devops  ALL     = (ALL:ALL)      NOPASSWD: /usr/bin/systemctl restart nginx

• '%': Signifies a group instead of an individual user.
• 'ALL': Applies to all network hosts.
• '(ALL:ALL)': Can run as any user and any target group.
• 'NOPASSWD': Bypasses the password challenge for that specific command.`,
        codeBlock: {
          command: "sudo -l",
          explanation: "List all allowed and restricted commands for the currently logged-in user.",
          output: `User devops may run the following commands on production-node01:
    (root) /usr/bin/apt update
    (root) NOPASSWD: /usr/bin/systemctl restart nginx, /usr/bin/systemctl reload nginx`
        },
        warning: "NEVER edit /etc/sudoers directly with nano or vi! Always use 'visudo'. Visudo locks the file to prevent concurrent edits and verifies syntax before saving. A syntax error in /etc/sudoers can permanently lock all users out of root privileges."
      },
      {
        id: "pam-overview",
        heading: "2. Pluggable Authentication Modules (PAM)",
        content: `PAM provides a modular architecture for Linux authentication. Instead of every program (SSH, login, su, sudo) writing its own password and biometric verification code, they query PAM modules in /etc/pam.d/.

PAM uses four management groups:
1. auth: Verifies user identity (password, OTP tokens).
2. account: Checks account restrictions (is account expired, password aging, login time).
3. password: Manages password updates and complexity checks (pam_pwquality).
4. session: Actions performed prior to and after session execution (mounting home dirs, resource limits via pam_limits).`,
        codeBlock: {
          command: "cat /etc/pam.d/sudo | grep -v '^#' | head -n 4",
          explanation: "Inspect PAM authentication stack invoked during sudo requests.",
          output: `auth       required   pam_env.so readenv=1
auth       required   pam_unix.so nullok
@include common-account
@include common-session-noninteractive`
        }
      }
    ],
    summaryChecklist: [
      "Always use 'visudo' to edit sudoers files safely.",
      "Follow least privilege: delegate specific binaries instead of granting blanket '(ALL) ALL'.",
      "PAM decouples application logic from authentication backends (LDAP, Kerberos, local shadow).",
      "Inspect user permissions quickly using 'sudo -l'."
    ]
  },

  // 09. Disk Partitioning
  {
    id: "disk-partitioning",
    topicNumber: "09",
    title: "Disk Partitioning: MBR vs. GPT, fdisk, parted & Block Devices",
    category: "Storage & Filesystems",
    difficulty: "Intermediate",
    readTime: "25 min read",
    summary: "Understand Linux block device identification, compare MBR (msdos) vs GPT partition schemes, partition disks with fdisk and parted, and query disk UUIDs.",
    keyCommands: ["lsblk", "blkid", "fdisk -l", "parted", "gdisk"],
    sections: [
      {
        id: "block-devices-naming",
        heading: "1. Block Device Naming Standards",
        content: `In Linux, block storage drives are exposed as special device nodes under /dev:
• /dev/sdX (sda, sdb, sdc): SATA, SAS, and SCSI hard drives or USB flash drives. Partitions are suffixed with numbers (e.g. /dev/sda1, /dev/sda2).
• /dev/nvmeXnY (nvme0n1, nvme1n1): High-speed NVMe PCIe solid-state storage. Partitions are designated with 'p' (e.g. /dev/nvme0n1p1, /dev/nvme0n1p2).
• /dev/vdX (vda, vdb): Virtualized disk controllers commonly used in KVM and QEMU cloud instances.
• /dev/mapper/ (or /dev/dm-X): Device-Mapper volumes created by LVM or LUKS disk encryption.`,
        codeBlock: {
          command: "lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINT,UUID",
          explanation: "Display detailed block device topology including partition types, mount points, and UUIDs.",
          output: `NAME        SIZE TYPE FSTYPE MOUNTPOINT UUID
sda         160G disk
├─sda1        1G part vfat   /boot/efi  E412-A09B
├─sda2        2G part ext4   /boot      4d12c8a1-8902-4f11-a881-29188a18cb12
└─sda3      157G part LVM2_m            xL2k8a-19Za-K182-019a-9812-a182-192a01`
        }
      },
      {
        id: "mbr-vs-gpt",
        heading: "2. MBR vs. GPT Partition Schemes",
        content: `Master Boot Record (MBR):
• Legacy 1980s standard.
• Maximum disk capacity: 2 Terabytes.
• Maximum primary partitions: 4 (requiring extended and logical partitions for additional splits).
• Single partition table at the start of the disk with no backup.

GUID Partition Table (GPT):
• Modern standard designed for UEFI systems.
• Maximum disk capacity: 9.4 Zettabytes (9.4 billion Terabytes).
• Supports up to 128 partitions natively without extended partition hacks.
• Features redundant primary and backup partition headers at both the start and end of the physical disk for self-healing corruption recovery.`,
        tip: "Always choose GPT for any new production server installation, even for disks smaller than 2TB, to leverage redundant partition table protection."
      },
      {
        id: "partitioning-parted",
        heading: "3. Non-Interactive Partitioning with parted",
        content: `While 'fdisk' is an interactive menu-driven tool, 'parted' allows programmatic and scripted partition creation suitable for automated server installations and infrastructure-as-code scripts.`,
        codeBlock: {
          command: "parted -s /dev/sdb mklabel gpt && parted -s /dev/sdb mkpart primary xfs 1MiB 100GiB && parted /dev/sdb print",
          explanation: "Initialize a GPT partition label on /dev/sdb and allocate a 100GB primary partition.",
          output: `Model: ATA Samsung SSD 870 (scsi)
Disk /dev/sdb: 500GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name     Flags
 1      1049kB  107GB   107GB   xfs          primary`
        }
      }
    ],
    summaryChecklist: [
      "Storage devices are named /dev/sdX (SATA/SCSI), /dev/nvmeXnY (NVMe), or /dev/vdX (KVM).",
      "MBR is limited to 2TB and 4 primary partitions; GPT supports 9.4ZB and 128 partitions with backup headers.",
      "Use 'lsblk' to view hierarchy and 'blkid' to obtain permanent filesystem UUIDs.",
      "Use 'parted' for non-interactive scripting and 'fdisk'/'gdisk' for interactive administration."
    ]
  },

  // 10. LVM Volume Management
  {
    id: "lvm-storage",
    topicNumber: "10",
    title: "Logical Volume Manager (LVM): Physical Volumes, Volume Groups & Online Sizing",
    category: "Storage & Filesystems",
    difficulty: "Intermediate",
    readTime: "30 min read",
    summary: "Master enterprise storage abstraction using LVM. Build Physical Volumes (PVs), pool them into Volume Groups (VGs), carve out Logical Volumes (LVs), and grow volumes online with zero downtime.",
    keyCommands: ["pvcreate", "vgcreate", "lvcreate", "lvextend", "pvs", "vgs", "lvs"],
    sections: [
      {
        id: "lvm-architecture",
        heading: "1. The 3-Tier LVM Architecture",
        content: `Logical Volume Management (LVM) abstracts physical storage drives away from the operating system, allowing administrators to aggregate multiple hard drives into a unified storage pool that can be expanded dynamically without repartitioning or rebooting.

LVM operates across three distinct tiers:
1. Physical Volume (PV): Raw physical disks or partitions (/dev/sdb, /dev/nvme0n1p3) initialized with an LVM header. The disk space is sliced into Physical Extents (PEs, typically 4MB each).
2. Volume Group (VG): A shared storage pool aggregating one or more PVs into a single pool of free extents (e.g., pooling a 500GB SSD and a 1TB SSD into a 1.5TB VG).
3. Logical Volume (LV): Virtual partitions carved out from the Volume Group. Filesystems (ext4, XFS) are formatted onto LVs and mounted just like physical drives.`,
        codeBlock: {
          command: "pvs && vgs && lvs",
          explanation: "Display brief summary of all physical volumes, volume groups, and logical volumes.",
          output: `  PV         VG      Fmt  Attr PSize   PFree
  /dev/sda3  vg_sys  lvm2 a--  157.00g  12.00g
  /dev/sdb1  vg_data lvm2 a--  500.00g 100.00g

  VG      #PV #LV #SN Attr   VSize   VFree
  vg_data   1   2   0 wz--n- 500.00g 100.00g
  vg_sys    1   3   0 wz--n- 157.00g  12.00g

  LV       VG      Attr       LSize   Pool Origin Data%
  lv_app   vg_data -wi-a----- 250.00g
  lv_db    vg_data -wi-a----- 150.00g
  lv_root  vg_sys  -wi-ao---- 100.00g`
        }
      },
      {
        id: "lvm-provisioning",
        heading: "2. Step-by-Step LVM Volume Creation",
        content: `Creating an LVM volume from a brand new disk follows a clean 4-step workflow:
Step 1: Initialize physical disk: 'pvcreate /dev/sdc'
Step 2: Create volume group: 'vgcreate vg_storage /dev/sdc'
Step 3: Carve logical volume: 'lvcreate -L 200G -n lv_web vg_storage'
Step 4: Format with a filesystem: 'mkfs.xfs /dev/vg_storage/lv_web'`,
        codeBlock: {
          command: "lvcreate -L 50G -n lv_backups vg_data && mkfs.ext4 /dev/vg_data/lv_backups",
          explanation: "Create a 50GB logical volume named lv_backups and format with ext4 filesystem.",
          output: `  Logical volume "lv_backups" created.
mke2fs 1.47.0 (5-Feb-2023)
Creating filesystem with 13107200 4k blocks and 3276800 inodes
Filesystem UUID: 781a9c21-9812-4f11-9a12-88127cb1829a`
        }
      },
      {
        id: "lvm-online-resizing",
        heading: "3. Online Logical Volume Expansion (Zero Downtime)",
        content: `The greatest superpower of LVM is the ability to grow storage on-the-fly while production databases and web servers are actively reading and writing to the disk.

The '--resizefs' (or '-r') flag instructs LVM to automatically call the appropriate filesystem resize utility (resize2fs for ext4 or xfs_growfs for XFS) in the same operation.`,
        codeBlock: {
          command: "lvextend -L +50G /dev/vg_data/lv_app -r",
          explanation: "Expand logical volume by 50GB and resize the underlying filesystem online in one command.",
          output: `  Size of logical volume vg_data/lv_app changed from 250.00 GiB to 300.00 GiB (76800 extents).
  Logical volume vg_data/lv_app successfully resized.
meta-data=/dev/mapper/vg_data-lv_app isize=512    agcount=4, agsize=16384000 blks
data blocks changed from 65536000 to 78643200`
        },
        warning: "XFS filesystems can be expanded online, but CANNOT be shrunk! ext4 filesystems can be shrunk, but shrinking requires taking the filesystem unmounted (offline) to avoid data corruption."
      }
    ],
    summaryChecklist: [
      "LVM abstracts physical storage into Physical Volumes (PV) → Volume Groups (VG) → Logical Volumes (LV).",
      "Volume Groups can span across multiple disparate physical disks seamlessly.",
      "Expand volumes online with zero downtime using 'lvextend -L +SIZE /dev/vg/lv -r'.",
      "XFS can only grow; ext4 can grow and shrink (offline)."
    ]
  },

  // 11. Filesystems & /etc/fstab
  {
    id: "filesystems-fstab",
    topicNumber: "11",
    title: "Linux Filesystems: ext4 vs. XFS vs. Btrfs, Mounting & /etc/fstab Options",
    category: "Storage & Filesystems",
    difficulty: "Intermediate",
    readTime: "25 min read",
    summary: "Compare enterprise Linux filesystems (ext4, XFS, Btrfs), master manual and persistent mounting, optimize mount performance options (noatime), and validate /etc/fstab safely.",
    keyCommands: ["mount", "umount", "tune2fs", "xfs_info", "cat /etc/fstab", "mount -a"],
    sections: [
      {
        id: "filesystem-comparison",
        heading: "1. Enterprise Filesystem Comparison",
        content: `• ext4 (Fourth Extended Filesystem):
The default filesystem on Debian and Ubuntu. Solid, battle-tested, supports online expansion and offline shrinking, uses journaling to protect against power loss, and has maximum volume size of 1 Exabyte.

• XFS (Extents Filesystem):
The default filesystem on Red Hat Enterprise Linux (RHEL), CentOS, Rocky, and AlmaLinux. Highly scalable 64-bit journaling filesystem designed for high parallel I/O throughput. Features delayed allocation for SSD optimization and online defragmentation. Note: XFS cannot be reduced in size.

• Btrfs (B-tree Filesystem):
Default on SUSE and Fedora Workstation. Features copy-on-write (CoW), integrated volume management, subvolumes, transparent compression (zstd), and instantaneous read-only or writable snapshots.`,
        tip: "For high-transaction database workloads (PostgreSQL, MySQL), XFS is widely considered the industry performance standard due to superior parallel locking and extent allocation."
      },
      {
        id: "fstab-syntax",
        heading: "2. The 6 Columns of /etc/fstab",
        content: `The /etc/fstab file configures permanent disk mounts initialized during system boot. Every line consists of exactly 6 whitespace-delimited fields:

Col 1: Device Identifier (Always use UUID=... to prevent device letter drift across reboots).
Col 2: Mount Point (Target directory path, e.g., /mnt/storage).
Col 3: Filesystem Type (ext4, xfs, nfs, btrfs, swap).
Col 4: Mount Options (defaults, noatime, nofail, nodev, nosuid).
Col 5: Dump frequency (0 = disabled, 1 = backup candidate). Set to 0 on modern servers.
Col 6: Fsck Pass Order (1 = Root '/' partition checked first; 2 = Secondary data partitions; 0 = Skip checking for XFS/swap).`,
        codeBlock: {
          command: "cat /etc/fstab | grep -v '^#'",
          explanation: "Inspect persistent filesystem configuration table.",
          output: `UUID=3f1b4a8e-28d1-4e78-9812-a1827cb1829a /               ext4    defaults,noatime,errors=remount-ro 0 1
UUID=E412-A09B                            /boot/efi       vfat    umask=0077                         0 2
UUID=a1c90ef2-9214-41d3-8812-7819ab120912 /var/lib/docker ext4    defaults,noatime,nofail            0 2
/dev/vg_data/lv_app                       /srv/appdata    xfs     defaults,noatime                   0 0`
        }
      },
      {
        id: "validating-fstab",
        heading: "3. Safe Editing and Validating /etc/fstab",
        content: `If you make a typo in /etc/fstab (such as an incorrect UUID or invalid mount option) and reboot the server, systemd will fail dependency checks and halt boot into an emergency maintenance shell!

ALWAYS run 'mount -a' immediately after saving changes to /etc/fstab. The 'mount -a' command reads /etc/fstab and mounts all non-mounted filesystems. If there are syntax errors, it displays them immediately.`,
        codeBlock: {
          command: "mount -a && echo 'fstab syntax is valid!'",
          explanation: "Test /etc/fstab syntax live without rebooting.",
          output: `fstab syntax is valid!`
        },
        warning: "Never reboot a remote cloud server without running 'mount -a' first after touching /etc/fstab. If 'mount -a' prints an error, fix it before rebooting."
      }
    ],
    summaryChecklist: [
      "ext4 is dependable with shrinking support; XFS is ideal for enterprise parallel I/O; Btrfs offers CoW snapshots.",
      "Always reference disks by UUID in /etc/fstab to prevent device naming changes.",
      "Use 'noatime' mount option to reduce disk write latency on database and cache partitions.",
      "Always execute 'mount -a' to validate /etc/fstab syntax before rebooting."
    ]
  },

  // 12. Swap & Memory Management
  {
    id: "swap-memory",
    topicNumber: "12",
    title: "Swap Space Creation, Swappiness Tuning & Virtual Memory Management",
    category: "Storage & Filesystems",
    difficulty: "Intermediate",
    readTime: "18 min read",
    summary: "Configure swap partitions and swap files, tune Linux virtual memory page reclaiming via vm.swappiness, understand anonymous memory, and mitigate Out-Of-Memory (OOM) conditions.",
    keyCommands: ["free -h", "swapon", "swapoff", "mkswap", "sysctl vm.swappiness", "fallocate"],
    sections: [
      {
        id: "swap-purpose",
        heading: "1. The Purpose of Swap Space",
        content: `Swap space is dedicated secondary storage (disk) that the Linux kernel uses as an extension of physical RAM.

When physical RAM fills up, the kernel's virtual memory manager moves idle, inactive memory pages (anonymous memory) to swap, freeing up fast physical RAM for active application code and aggressive file system page caches. Having swap headroom prevents the Linux kernel from triggering the aggressive Out-Of-Memory (OOM) Killer during temporary workload spikes.`,
        codeBlock: {
          command: "free -h",
          explanation: "Display total, used, free, and available physical memory and swap.",
          output: `               total        used        free      shared  buff/cache   available
Mem:            15Gi       4.1Gi       7.2Gi       128Mi       4.6Gi        11Gi
Swap:          4.0Gi          0B       4.0Gi`
        }
      },
      {
        id: "creating-swapfile",
        heading: "2. Creating a Dynamic Swap File",
        content: `While traditional installations created dedicated swap partitions, modern Linux administration prefers swap files. Swap files can be dynamically created, expanded, or deleted without modifying disk partition tables.`,
        codeBlock: {
          command: "fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile",
          explanation: "Allocate a 4GB swap file with secure permissions, format as swap, and activate immediately.",
          output: `Setting up swapspace version 1, size = 4 GiB (4294963200 bytes)
no label, UUID=8812c8a1-9a12-4f11-8812-a1827cb1829a`
        },
        warning: "Permissions on swap files MUST be set to 600 ('chmod 600 /swapfile'). A world-readable swap file exposes decrypted application secrets and passwords stored in memory to unprivileged local users."
      },
      {
        id: "tuning-swappiness",
        heading: "3. Tuning the vm.swappiness Kernel Parameter",
        content: `The 'vm.swappiness' sysctl parameter (ranging from 0 to 200 on modern kernels, typically 0 to 100) controls how aggressively the kernel swaps memory pages out of RAM to disk:
• Value 60: Default Linux desktop setting.
• Value 10: Recommended for production database servers (PostgreSQL, Redis, Elasticsearch). Forces the kernel to favor keeping application pages in physical memory.
• Value 0: Kernel avoids swapping until RAM is completely exhausted.`,
        codeBlock: {
          command: "sysctl -w vm.swappiness=10 && echo 'vm.swappiness=10' >> /etc/sysctl.d/99-sysctl.conf",
          explanation: "Set swappiness to 10 in memory and persist across reboots in sysctl configuration.",
          output: `vm.swappiness = 10`
        }
      }
    ],
    summaryChecklist: [
      "Swap provides overflow headroom to prevent immediate Out-Of-Memory (OOM) crashes.",
      "Swap files created with 'fallocate' and 'mkswap' are preferred over dedicated swap partitions.",
      "Set swap file permissions strictly to 0600 for security.",
      "Tune 'vm.swappiness=10' on production database servers to prioritize physical RAM."
    ]
  },

  // 13. Process Management & Signals
  {
    id: "process-management",
    topicNumber: "13",
    title: "Linux Process Lifecycle, States (R, S, D, Z), Priorities & Signals",
    category: "Processes & Systemd",
    difficulty: "Intermediate",
    readTime: "25 min read",
    summary: "Inspect and manage Linux processes, understand process states (Runnable, Sleeping, Uninterruptible Disk Sleep, Zombie), adjust CPU scheduling priority with nice/renice, and handle POSIX signals.",
    keyCommands: ["ps aux", "top", "htop", "kill", "killall", "nice", "renice", "pidof"],
    sections: [
      {
        id: "process-states",
        heading: "1. The 5 Core Linux Process States",
        content: `Every process running on Linux resides in a specific state managed by the CPU scheduler:
• R (Running / Runnable): Process is actively executing on a CPU core or waiting in the CPU run queue.
• S (Interruptible Sleep): Process is waiting for an event (e.g. keyboard input, network socket packet, timer expiration). Wakes up immediately upon receiving a signal.
• D (Uninterruptible Sleep): Process is waiting on a hardware controller, typically synchronous disk I/O or an NFS file lock. It CANNOT be killed even with 'kill -9' until the hardware responds. A high count of 'D' state processes drives up system load average without high CPU usage.
• Z (Zombie / Defunct): Process has completed execution via exit(), but its parent process has not yet called wait() to reap its termination status. Zombies consume no CPU or RAM, but occupy an entry in the kernel's process table.
• T (Stopped / Traced): Process suspended by a job control signal (Ctrl+Z / SIGSTOP) or a debugger.`,
        codeBlock: {
          command: "ps -eo pid,ppid,stat,pcpu,pmem,comm --sort=-%mem | head -n 6",
          explanation: "Inspect top memory-consuming processes displaying PID, Parent PID, state code, CPU%, and command.",
          output: `    PID    PPID STAT %CPU %MEM COMMAND
   1408       1 S     0.2  4.2 nginx
   2910       1 S     0.4  3.8 dockerd
   4812    2910 Sl    1.2  8.4 postgres
   5012       1 S     0.0  1.1 systemd-journal
   8192    8110 R+    0.0  0.1 ps`
        }
      },
      {
        id: "posix-signals",
        heading: "2. Process Termination & POSIX Signals",
        content: `Signals are asynchronous notifications sent by the kernel or users to notify a process of an event:
• SIGHUP (Signal 1): Hangup. Prompts daemons to reload configuration files without dropping connections.
• SIGINT (Signal 2): Interrupt. Equivalent to keyboard shortcut Ctrl+C.
• SIGQUIT (Signal 3): Quit. Terminates process and generates a core dump file.
• SIGKILL (Signal 9): Forceful termination. Handled directly by the kernel. The process CANNOT catch, block, or ignore SIGKILL. Leaves no opportunity for data flush.
• SIGTERM (Signal 15): Termination request. Default signal sent by 'kill'. Allows the application to gracefully close files, finish database transactions, and clean up lockfiles.
• SIGSTOP (Signal 19): Suspends process execution (cannot be ignored).`,
        codeBlock: {
          command: "kill -15 1408",
          explanation: "Gracefully request process PID 1408 to terminate via SIGTERM.",
          output: `[Exit 0: Signal delivered to PID 1408]`
        },
        tip: "Always attempt graceful termination first with 'kill -15' (SIGTERM). Only resort to 'kill -9' (SIGKILL) if the process is completely hung and unresponsive after a timeout."
      },
      {
        id: "niceness-priority",
        heading: "3. CPU Scheduling Priority: nice and renice",
        content: `Linux processes inherit a 'niceness' value determining their CPU scheduling priority relative to other processes, ranging from -20 (highest priority) to +19 (lowest priority, very nice to others). The default niceness is 0.`,
        codeBlock: {
          command: "nice -n 10 tar -czf /backups/data.tar.gz /srv/data && renice -n 5 -p 4812",
          explanation: "Run a heavy backup with low CPU priority (+10) and adjust priority of running PID 4812 to +5.",
          output: `4812 (process ID) old priority 0, new priority 5`
        }
      }
    ],
    summaryChecklist: [
      "Process states include R (Running), S (Interruptible Sleep), D (Uninterruptible I/O Sleep), and Z (Zombie).",
      "Processes in 'D' state cannot be killed by any signal; they clear when hardware I/O resolves.",
      "Zombies must be reaped by signaling or restarting their parent process (PPID).",
      "Always send SIGTERM (15) first before falling back to uncatchable SIGKILL (9)."
    ]
  },

  // 14. Systemd Services
  {
    id: "systemd-services",
    topicNumber: "14",
    title: "Systemd Service Units: Writing Custom Services, Sandboxing & Dependencies",
    category: "Processes & Systemd",
    difficulty: "Intermediate",
    readTime: "30 min read",
    summary: "Understand systemd unit architecture, manage daemons with systemctl, write production hardened .service unit files, implement sandboxing directives, and debug service failures.",
    keyCommands: ["systemctl status", "systemctl daemon-reload", "systemctl enable --now", "systemctl mask"],
    sections: [
      {
        id: "systemd-architecture",
        heading: "1. The Systemd Manager & Target Concept",
        content: `Systemd is the standard init system and service manager on modern Linux, running as PID 1. It replaces legacy SysVinit scripts with declarative unit configuration files.

Systemd organizes states into Targets (replaces traditional runlevels):
• multi-user.target: Standard non-graphical multi-user CLI mode for enterprise servers (Runlevel 3).
• graphical.target: Graphical desktop mode with display manager (Runlevel 5).
• rescue.target: Single-user maintenance shell with root partition mounted (Runlevel 1).
• emergency.target: Minimal emergency shell with root mounted read-only.`,
        codeBlock: {
          command: "systemctl get-default && systemctl list-units --type=service --state=running | head -n 5",
          explanation: "Check the default boot target and list active running background services.",
          output: `multi-user.target
  UNIT                     LOAD   ACTIVE SUB     DESCRIPTION
  cron.service             loaded active running Regular background program processing daemon
  dbus.service             loaded active running D-Bus System Message Bus
  docker.service           loaded active running Docker Application Container Engine
  nginx.service            loaded active running A high performance web server`
        }
      },
      {
        id: "custom-unit-file",
        heading: "2. Anatomy of a Production .service Unit",
        content: `Unit files live in two primary directories:
• /usr/lib/systemd/system/: Package-manager installed default unit files.
• /etc/systemd/system/: Administrator custom units and overrides (takes precedence).

A production unit file is structured into three sections: [Unit], [Service], and [Install].`,
        codeBlock: {
          command: "cat /etc/systemd/system/node-api.service",
          explanation: "View a hardened custom systemd service configuration.",
          output: `[Unit]
Description=NodeJS Production API Service
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=appuser
Group=appuser
WorkingDirectory=/opt/node-api
ExecStart=/usr/bin/node /opt/node-api/server.js
Restart=on-failure
RestartSec=5s
Environment=NODE_ENV=production PORT=3000

# Security Sandboxing Directives
ProtectSystem=full
ProtectHome=true
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target`
        },
        tip: "Whenever you create or modify ANY file inside /etc/systemd/system/, you MUST execute 'systemctl daemon-reload' before systemd recognizes the configuration changes."
      },
      {
        id: "service-lifecycle",
        heading: "3. Service Lifecycle & Masking",
        content: `Key systemctl commands:
• 'systemctl enable --now <unit>': Enables unit to start at boot AND starts it immediately.
• 'systemctl reload <unit>': Re-reads configuration without terminating active connections.
• 'systemctl mask <unit>': Symlinks the unit file to /dev/null, making it impossible to start manually or as a dependency of another service.`,
        codeBlock: {
          command: "systemctl mask telnet.service && ls -l /etc/systemd/system/telnet.service",
          explanation: "Permanently mask an insecure service by linking it to /dev/null.",
          output: `Created symlink /etc/systemd/system/telnet.service -> /dev/null.
lrwxrwxrwx 1 root root 9 Oct 31 12:00 /etc/systemd/system/telnet.service -> /dev/null`
        }
      }
    ],
    summaryChecklist: [
      "Systemd unit files reside in /etc/systemd/system/ (custom) and /usr/lib/systemd/system/ (vendor).",
      "Always run 'systemctl daemon-reload' after modifying unit files.",
      "Use security directives like 'ProtectSystem=full' and 'NoNewPrivileges=true' to sandbox services.",
      "Use 'systemctl mask' to permanently prevent dangerous services from starting."
    ]
  },

  // 15. Cron & Timers
  {
    id: "cron-systemd-timers",
    topicNumber: "15",
    title: "Task Scheduling: Crontab Syntax, Anacron & Modern Systemd Timers",
    category: "Processes & Systemd",
    difficulty: "Intermediate",
    readTime: "22 min read",
    summary: "Automate recurring maintenance tasks using classic Cron schedules, handle laptop/sleep catchup with Anacron, and migrate to modern systemd timer units for millisecond accuracy and journal logging.",
    keyCommands: ["crontab -e", "crontab -l", "systemctl list-timers", "systemd-run"],
    sections: [
      {
        id: "crontab-syntax",
        heading: "1. The 5-Field Crontab Schedule Syntax",
        content: `The cron daemon checks /var/spool/cron/crontabs and /etc/cron.* every minute.

The crontab syntax consists of 5 time fields followed by the shell command:
.---------------- Minute (0 - 59)
|  .------------- Hour (0 - 23)
|  |  .---------- Day of Month (1 - 31)
|  |  |  .------- Month of Year (1 - 12)
|  |  |  |  .---- Day of Week (0 - 6, Sunday=0)
|  |  |  |  |
*  *  *  *  *  /path/to/command

Special operators:
• '*' : Every time unit.
• ',' : Value list (e.g. 1,15,30 in minute field).
• '-' : Range (e.g. 1-5 in weekday field for Mon-Fri).
• '*/n' : Step value (e.g. */15 for every 15 minutes).`,
        codeBlock: {
          command: "crontab -l",
          explanation: "List installed crontab schedules for the current user.",
          output: `# Rotate logs every Sunday at 03:00 AM
0 3 * * 0 /opt/scripts/rotate_logs.sh >> /var/log/rotate.log 2>&1

# Database backup every 4 hours on weekdays
0 */4 * * 1-5 /opt/scripts/backup_db.sh > /dev/null 2>&1`
        },
        warning: "Cron runs in a minimal environment without inheriting your interactive PATH, environment variables, or shell aliases. ALWAYS use absolute binary paths (e.g., /usr/bin/curl instead of curl) inside cron commands."
      },
      {
        id: "systemd-timers",
        heading: "2. The Modern Alternative: Systemd Timers",
        content: `Enterprise Linux is transitioning from cron to Systemd Timers (.timer units).
Why systemd timers are superior to cron:
• Centralized Logging: Timer execution logs and stdout/stderr stream directly into journalctl.
• Accuracy & Monotonic Timers: Can trigger relative to boot ('OnBootSec=15min') or unit startup ('OnUnitActiveSec=1h').
• Dependencies: Can require network availability ('After=network-online.target') before firing.
• Missing Run Recovery: 'Persistent=true' executes missed runs immediately if the server was powered off.`,
        codeBlock: {
          command: "systemctl list-timers --no-pager",
          explanation: "Display active systemd timers, next scheduled trigger time, and elapsed duration.",
          output: `NEXT                        LEFT       LAST                        PASSED     UNIT                         ACTIVATES
Thu 2026-10-31 16:00:00 UTC 28min left Thu 2026-10-31 15:00:01 UTC 31min ago  logrotate.timer              logrotate.service
Fri 2026-11-01 00:00:00 UTC 8h left    Thu 2026-10-31 00:00:02 UTC 15h ago   fstrim.timer                 fstrim.service
Fri 2026-11-01 06:24:00 UTC 14h left   Thu 2026-10-31 06:12:10 UTC 9h ago    apt-daily-upgrade.timer      apt-daily-upgrade.service`
        }
      }
    ],
    summaryChecklist: [
      "Crontab uses 5 time fields: Minute, Hour, Day-of-Month, Month, Day-of-Week.",
      "Always specify absolute binary paths inside cron scripts due to restricted PATH environments.",
      "Systemd timers offer centralized journalctl logging, persistent catchup runs, and dependency tracking.",
      "View all scheduled timers with 'systemctl list-timers'."
    ]
  },

  // 16. Systemd Journal & Logging
  {
    id: "systemd-journal",
    topicNumber: "16",
    title: "Systemd Journal: journalctl Filtering, Boot Logs, Vacuuming & Syslog",
    category: "Logging & Auditing",
    difficulty: "Intermediate",
    readTime: "25 min read",
    summary: "Query binary systemd journals with journalctl, filter by priority, unit, and boot identifier, configure persistent journal storage, and manage disk space consumption.",
    keyCommands: ["journalctl", "journalctl -u", "journalctl -b", "journalctl --vacuum-size"],
    sections: [
      {
        id: "journalctl-basics",
        heading: "1. Querying the Binary Systemd Journal",
        content: `The systemd-journald daemon aggregates logs from the Linux kernel (dmesg), early boot stages, stdout/stderr from systemd services, and traditional syslog messages into optimized, indexed binary files stored in /var/log/journal/ (persistent) or /run/log/journal/ (volatile).

Because journals are indexed binaries, queries complete in milliseconds even across multi-gigabyte log datasets.`,
        codeBlock: {
          command: "journalctl -u ssh.service -n 5 --no-pager",
          explanation: "Display the 5 most recent log lines generated by the SSH daemon.",
          output: `Oct 31 14:10:01 production-node01 sshd[19021]: Server listening on 0.0.0.0 port 22.
Oct 31 14:12:15 production-node01 sshd[19042]: Accepted publickey for sysadmin from 192.168.1.50 port 54102 ssh2: ED25519
Oct 31 14:12:15 production-node01 sshd[19042]: pam_unix(sshd:session): session opened for user sysadmin(uid=1000)
Oct 31 14:15:20 production-node01 sshd[19088]: Failed password for invalid user admin from 203.0.113.45 port 42100 ssh2
Oct 31 14:15:22 production-node01 sshd[19088]: Connection closed by authenticating user 203.0.113.45 port 42100 [preauth]`
        }
      },
      {
        id: "advanced-filtering",
        heading: "2. Advanced journalctl Filtering Techniques",
        content: `Essential filtering flags:
• Follow live logs: 'journalctl -u nginx -f'
• Filter by boot session: 'journalctl -b 0' (current boot) or 'journalctl -b -1' (previous boot before crash)
• Filter by log priority: 'journalctl -p err..emerg' (shows errors, critical alerts, panics)
• Filter by timeframe: 'journalctl --since "2 hours ago" --until "10 minutes ago"'
• Filter kernel messages: 'journalctl -k'`,
        codeBlock: {
          command: "journalctl -p 3 -b 0 --no-pager | head -n 4",
          explanation: "Query all Error priority (level 3) or higher events during the current boot cycle.",
          output: `Oct 31 08:00:15 production-node01 kernel: ACPI BIOS Error (bug): Could not resolve symbol [\\_SB.PR00._CPC]
Oct 31 08:00:22 production-node01 systemd[1]: Failed to start Application Monitoring Daemon.`
        }
      },
      {
        id: "journal-vacuuming",
        heading: "3. Managing Journal Disk Consumption",
        content: `Over time, systemd journals can consume gigabytes of storage on /var. You can vacuum and purge old journals by size or retention window.`,
        codeBlock: {
          command: "journalctl --disk-usage && journalctl --vacuum-size=500M",
          explanation: "Check journal storage footprint and purge archive logs exceeding 500MB.",
          output: `Archived and active journals take up 1.8GB in the file system.
Vacuuming done, freed 1.3GB of archived journals from /var/log/journal/ec2b1...`
        }
      }
    ],
    summaryChecklist: [
      "systemd-journald collects kernel, syslog, and service stdout/stderr into binary indexed logs.",
      "Inspect service logs live with 'journalctl -u <unit> -f'.",
      "Inspect previous boot crash logs using 'journalctl -b -1'.",
      "Prevent disk exhaustion by vacuuming logs with 'journalctl --vacuum-size=500M'."
    ]
  },

  // 17. Logrotate & Auditd
  {
    id: "logrotate-auditd",
    topicNumber: "17",
    title: "Log Rotation (logrotate) & Linux Auditing Framework (auditd)",
    category: "Logging & Auditing",
    difficulty: "Intermediate",
    readTime: "25 min read",
    summary: "Automate text file log rotation, compression, and purging with logrotate. Enforce security compliance and track unauthorized file modifications using auditd.",
    keyCommands: ["logrotate -d", "logrotate -f", "ausearch", "aureport", "auditctl"],
    sections: [
      {
        id: "logrotate-mechanics",
        heading: "1. The Mechanics of logrotate",
        content: `Traditional server applications (Nginx, Apache, MySQL) write plain-text logs into /var/log/. Without maintenance, these log files would grow infinitely, consuming all available disk space.

The 'logrotate' utility runs daily via cron or systemd timer. It reads master configuration /etc/logrotate.conf and drop-in service configuration files in /etc/logrotate.d/.`,
        codeBlock: {
          command: "cat /etc/logrotate.d/nginx",
          explanation: "Inspect production logrotate policy for the Nginx web server.",
          output: `/var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 $(cat /var/run/nginx.pid)
    endscript
}`
        },
        tip: "Always run 'logrotate -d <config>' (debug mode) when creating new rotation rules. It simulates execution and outputs exact actions without touching real files."
      },
      {
        id: "auditd-framework",
        heading: "2. The Linux Auditing Framework (auditd)",
        content: `The Linux Auditing System (auditd) logs security-relevant events directly from the kernel. It tracks:
• Unauthorized attempts to read sensitive files (e.g. /etc/shadow).
• Execution of specific system calls (execve, openat).
• Changes to administrative account privileges or sudo usage.`,
        codeBlock: {
          command: "auditctl -w /etc/passwd -p wa -k passwd_changes && auditctl -l",
          explanation: "Add an audit watch rule tracking writes (w) and attribute changes (a) to /etc/passwd.",
          output: `-w /etc/passwd -p wa -k passwd_changes`
        }
      },
      {
        id: "analyzing-audit-logs",
        heading: "3. Searching Audit Logs with ausearch and aureport",
        content: `Audit records stored in /var/log/audit/audit.log are dense. Use 'ausearch' to filter by key and 'aureport' for executive compliance summaries.`,
        codeBlock: {
          command: "ausearch -k passwd_changes -ts today --format text",
          explanation: "Search for today's events triggered by our passwd_changes audit key.",
          output: `type=SYSCALL msg=audit(1698751200.120:812): arch=c000003e syscall=257 success=yes exit=3 a0=ffffff9c a1=7ffd98 a2=241 a3=1b6 items=2 ppid=1902 pid=1942 auid=1000 uid=0 gid=0 euid=0 comm="useradd" exe="/usr/sbin/useradd" key="passwd_changes"`
        }
      }
    ],
    summaryChecklist: [
      "logrotate automatically compresses and purges historical text logs in /var/log/.",
      "Use 'logrotate -d' to dry-run and validate rotation policies safely.",
      "auditd monitors kernel events and file modifications for security compliance.",
      "Use 'auditctl -w' to set file watches and 'ausearch -k' to inspect security violations."
    ]
  },

  // 18. Networking & iproute2
  {
    id: "networking-iproute2",
    topicNumber: "18",
    title: "Modern Network Configuration: ip, ss, Routing & DNS Resolution",
    category: "Networking & Firewalls",
    difficulty: "Intermediate",
    readTime: "25 min read",
    summary: "Replace legacy net-tools (ifconfig, netstat) with modern iproute2 utilities (ip, ss). Diagnose network interfaces, routing tables, active listening sockets, and understand the DNS resolution pipeline.",
    keyCommands: ["ip addr", "ip route", "ss -tulpn", "resolvectl status", "dig"],
    sections: [
      {
        id: "iproute2-suite",
        heading: "1. The iproute2 Command Suite",
        content: `The legacy net-tools suite ('ifconfig', 'netstat', 'route') was officially deprecated over two decades ago. Modern Linux networking relies strictly on 'iproute2':
• 'ip addr show' (replaces ifconfig): Display IP addresses, subnets, and MAC addresses.
• 'ip route show' (replaces route): Display the kernel routing table and default gateway.
• 'ip link set <dev> up/down': Activate or deactivate network interfaces.
• 'ss' (replaces netstat): Query socket statistics directly from kernel netlink sockets.`,
        codeBlock: {
          command: "ip -br a && ip route show default",
          explanation: "Display clean brief interface statuses and the default network gateway.",
          output: `lo               UNKNOWN        127.0.0.1/8 ::1/128
eth0             UP             192.168.1.150/24 fe80::a00:27ff:fe8e:561f/64
default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.150 metric 100`
        }
      },
      {
        id: "socket-stats-ss",
        heading: "2. Inspecting Sockets with ss",
        content: `The 'ss' utility is essential for diagnosing port binding conflicts.
Key flags:
• '-t': TCP sockets
• '-u': UDP sockets
• '-l': Listening sockets only
• '-p': Show process name and PID holding the socket
• '-n': Show numeric port numbers instead of resolving service names`,
        codeBlock: {
          command: "ss -tulpn | grep -E ':(22|80|443)'",
          explanation: "Find which processes are listening on SSH, HTTP, or HTTPS ports.",
          output: `tcp   LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=1120,fd=3))
tcp   LISTEN 0      511          0.0.0.0:80        0.0.0.0:*    users:(("nginx",pid=2340,fd=6))
tcp   LISTEN 0      511          0.0.0.0:443       0.0.0.0:*    users:(("nginx",pid=2340,fd=7))`
        },
        tip: "If a web server refuses to start with 'Address already in use', find and kill the conflicting process holding the port using: 'fuser -k 80/tcp'."
      },
      {
        id: "dns-pipeline",
        heading: "3. The Linux DNS Resolution Pipeline",
        content: `When an application resolves a domain name (e.g. google.com), Linux traverses this pipeline:
1. /etc/nsswitch.conf: Defines lookup precedence (typically 'hosts: files dns').
2. /etc/hosts: Local static IP-to-hostname mappings. Checked first.
3. Local Stub Resolver: /etc/resolv.conf points to local systemd-resolved stub listener (127.0.0.53:53).
4. Upstream DNS Nameservers: Configured in systemd-resolved or DHCP leases.`,
        codeBlock: {
          command: "resolvectl status eth0 | grep 'DNS Servers'",
          explanation: "Query active upstream DNS nameservers for network interface eth0.",
          output: `  Current DNS Server: 1.1.1.1
         DNS Servers: 1.1.1.1 8.8.8.8`
        }
      }
    ],
    summaryChecklist: [
      "Use 'ip addr' and 'ip route' instead of deprecated 'ifconfig' and 'route'.",
      "Use 'ss -tulpn' to inspect listening ports and identifying process IDs.",
      "Kill processes locking ports quickly using 'fuser -k <port>/tcp'.",
      "DNS resolution is directed through /etc/nsswitch.conf → /etc/hosts → systemd-resolved."
    ]
  },

  // 19. SSH Hardening
  {
    id: "ssh-hardening",
    topicNumber: "19",
    title: "OpenSSH Server Hardening: ED25519 Keys, Port Security & Config Directives",
    category: "Networking & Firewalls",
    difficulty: "Intermediate",
    readTime: "25 min read",
    summary: "Lock down remote administrative access. Generate modern ED25519 elliptic curve keys, enforce zero-trust passwordless authentication, harden /etc/ssh/sshd_config, and deploy Fail2ban.",
    keyCommands: ["ssh-keygen", "ssh-copy-id", "sshd -t", "fail2ban-client", "systemctl reload sshd"],
    sections: [
      {
        id: "ssh-key-generation",
        heading: "1. Elliptic Curve Cryptography: ED25519 Keys",
        content: `Traditional 2048-bit RSA keys are computationally slow and increasingly vulnerable to cryptographic attacks. The modern industry standard is ED25519 (EdDSA on Curve25519), which offers superior security with a compact 256-bit key length and blazing fast signature verification.`,
        codeBlock: {
          command: "ssh-keygen -t ed25519 -a 100 -C 'admin@infrastructure'",
          explanation: "Generate a hardened ED25519 key pair with 100 rounds of key derivation.",
          output: `Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Your identification has been saved in /home/user/.ssh/id_ed25519
Your public key has been saved in /home/user/.ssh/id_ed25519.pub
SHA256:7uK8Y9xWqVp0Zb12LkJ398hGyTx4mOPQr6s5tUvxw1Y admin@infrastructure`
        }
      },
      {
        id: "sshd-hardening-checklist",
        heading: "2. The Enterprise sshd_config Hardening Checklist",
        content: `OpenSSH server configuration lives in /etc/ssh/sshd_config (or /etc/ssh/sshd_config.d/99-hardening.conf). Apply these critical production directives:
• 'PermitRootLogin no': Prevents direct root logins over the network.
• 'PasswordAuthentication no': Enforces cryptographic public key authentication only.
• 'MaxAuthTries 3': Drops connections after 3 failed attempts.
• 'X11Forwarding no': Disables unnecessary GUI tunneling attack surfaces.
• 'ClientAliveInterval 300' & 'ClientAliveCountMax 2': Cleans up inactive ghost connections.`,
        codeBlock: {
          command: "sshd -t && systemctl reload sshd",
          explanation: "Test sshd configuration syntax safely before reloading the daemon.",
          output: `[Exit 0: No syntax errors detected]`
        },
        warning: "NEVER close your active terminal session after modifying sshd_config! Always run 'sshd -t' to verify syntax, reload the service, and open a NEW separate terminal to test connecting before closing the existing session."
      },
      {
        id: "fail2ban-defense",
        heading: "3. Automated Intrusion Prevention with Fail2ban",
        content: `Fail2ban scans /var/log/auth.log for repeated authentication failures and dynamically inserts firewall rules (via iptables or nftables) to ban the offending IP addresses for a specified duration.`,
        codeBlock: {
          command: "fail2ban-client status sshd",
          explanation: "Inspect Fail2ban SSH jail status and currently banned malicious IPs.",
          output: `Status for the jail: sshd
|- Filter
|  |- Currently failed: 4
|  |- Total failed:     1420
|- Actions
   |- Currently banned: 12
   |- Total banned:     384
   |- Banned IP list:   198.51.100.12 203.0.113.88 192.0.2.45`
        }
      }
    ],
    summaryChecklist: [
      "Generate modern ED25519 SSH keys using 'ssh-keygen -t ed25519'.",
      "Disable 'PermitRootLogin' and 'PasswordAuthentication' in /etc/ssh/sshd_config.",
      "Always validate SSH configuration syntax with 'sshd -t' before reloading.",
      "Deploy Fail2ban to block automated botnet brute-force dictionary attacks."
    ]
  },

  // 20. Firewalls: UFW & Firewalld
  {
    id: "firewalls-ufw-firewalld",
    topicNumber: "20",
    title: "Linux Firewalls: UFW, Firewalld & nftables Packet Filtering",
    category: "Networking & Firewalls",
    difficulty: "Intermediate",
    readTime: "25 min read",
    summary: "Master host-based firewall security using UFW on Debian/Ubuntu, Firewalld on RHEL/Rocky, and understand underlying kernel packet filtering via nftables.",
    keyCommands: ["ufw enable", "ufw status numbered", "firewall-cmd", "nft list ruleset"],
    sections: [
      {
        id: "ufw-ubuntu",
        heading: "1. Uncomplicated Firewall (UFW) on Debian/Ubuntu",
        content: `UFW is a user-friendly frontend for iptables/nftables designed for Debian and Ubuntu environments.

Default Policy:
A secure firewall must always default to:
• Block all incoming traffic (deny incoming)
• Allow all outgoing traffic (allow outgoing)`,
        codeBlock: {
          command: "ufw default deny incoming && ufw default allow outgoing && ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp && ufw enable",
          explanation: "Set default deny policy, allow SSH, HTTP, and HTTPS, then activate UFW.",
          output: `Default incoming policy changed to 'deny'
Default outgoing policy changed to 'allow'
Rules updated
Firewall is active and enabled on system startup`
        },
        warning: "ALWAYS execute 'ufw allow 22/tcp' (or your custom SSH port) BEFORE running 'ufw enable'! Enabling UFW with default deny without opening SSH will immediately lock you out of a remote cloud server."
      },
      {
        id: "firewalld-rhel",
        heading: "2. Firewalld & Dynamic Zones on RHEL/Rocky Linux",
        content: `Firewalld is the dynamic firewall daemon standard on RHEL, CentOS, Rocky, AlmaLinux, and Fedora. It organizes network traffic into trust Zones (e.g. public, internal, trusted, drop).`,
        codeBlock: {
          command: "firewall-cmd --permanent --add-service=https && firewall-cmd --permanent --add-rich-rule='rule family=\"ipv4\" source address=\"192.168.1.0/24\" port port=\"22\" protocol=\"tcp\" accept' && firewall-cmd --reload",
          explanation: "Allow HTTPS publicly and restrict SSH to the internal office subnet permanently.",
          output: `success
success
success`
        }
      },
      {
        id: "nftables-kernel",
        heading: "3. Under the Hood: The Modern nftables Engine",
        content: `Both UFW and Firewalld are frontends. Modern Linux kernels (since version 3.13) perform actual packet classification using 'nftables', which replaced legacy iptables with a unified bytecode engine.`,
        codeBlock: {
          command: "nft list ruleset | grep -A 4 'table inet firewalld'",
          explanation: "Inspect native kernel nftables ruleset generated by firewall managers.",
          output: `table inet firewalld {
    chain filter_INPUT {
        type filter hook input priority filter + 10; policy accept;
        ct state established,related accept
        iifname "lo" accept`
        }
      }
    ],
    summaryChecklist: [
      "Always configure a default incoming DENY and outgoing ALLOW policy.",
      "Open SSH port rules BEFORE enabling any firewall on remote servers.",
      "Use UFW on Debian/Ubuntu and Firewalld with zones on RHEL/Rocky.",
      "Both tools translate rules into high-performance kernel 'nftables' bytecode."
    ]
  },

  // 21. Package Management: APT & DNF
  {
    id: "package-management-apt-dnf",
    topicNumber: "21",
    title: "Package Management: APT/dpkg vs. DNF/RPM vs. Pacman",
    category: "Package Management",
    difficulty: "Beginner",
    readTime: "22 min read",
    summary: "Compare the package ecosystems across major Linux families: Debian/Ubuntu (APT/dpkg), Red Hat/Rocky (DNF/RPM), and Arch (Pacman). Master repository management and GPG verification.",
    keyCommands: ["apt update", "apt upgrade", "dnf install", "rpm -qa", "dpkg -l"],
    sections: [
      {
        id: "ecosystem-overview",
        heading: "1. High-Level Frontends vs. Low-Level Backends",
        content: `Linux package management operates in two layers:
1. Low-Level Backends (dpkg, rpm): Unpack .deb or .rpm archive files, verify checksums, and write binaries directly to disk. They CANNOT resolve dependencies automatically.
2. High-Level Frontends (apt, dnf, pacman): Query remote repository metadata over HTTPS, calculate dependency trees, download missing prerequisites, and invoke the low-level backend to install.`,
        codeBlock: {
          command: "dpkg -l | grep nginx || rpm -qa | grep nginx",
          explanation: "Query low-level package database directly for installed Nginx binaries.",
          output: `ii  nginx          1.24.0-2ubuntu7.1   amd64   small, powerful, scalable web/proxy server`
        }
      },
      {
        id: "apt-workflow",
        heading: "2. The Debian/Ubuntu APT Ecosystem",
        content: `The Golden Rule of APT:
• 'apt update': Downloads the newest package catalogs and security advisory indexes from upstream mirrors. Modifies NO installed software.
• 'apt upgrade': Installs newest versions of all installed packages without removing existing packages.
• 'apt full-upgrade': Upgrades packages while removing obsolete dependencies or resolving new conflicts.`,
        codeBlock: {
          command: "apt update && apt -y upgrade && apt autoremove --purge",
          explanation: "Synchronize package index, apply security updates, and remove obsolete orphaned packages.",
          output: `Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Fetched 110 kB in 1s (120 kB/s)
Reading package lists... Done
12 packages can be upgraded. Upgrading... Done.
0 packages to remove.`
        }
      },
      {
        id: "dnf-workflow",
        heading: "3. The RHEL/Rocky DNF Ecosystem",
        content: `DNF (Dandified YUM) is the next-generation package manager for RPM-based distributions, featuring SAT-solver dependency resolution and multi-threaded downloads.`,
        codeBlock: {
          command: "dnf check-update || dnf provides /usr/bin/iostat",
          explanation: "Find which package provides a specific missing binary across all repositories.",
          output: `sysstat-12.5.4-4.el9.x86_64 : Collection of performance monitoring tools for Linux
Repo        : appstream
Matched from:
Filename    : /usr/bin/iostat`
        }
      }
    ],
    summaryChecklist: [
      "APT manages .deb packages on Debian/Ubuntu; DNF manages .rpm packages on RHEL/Rocky.",
      "'apt update' refreshes repository indexes; 'apt upgrade' installs patches.",
      "Use 'dnf provides <file>' to find which package owns a specific missing command.",
      "Regularly run 'apt autoremove' or 'dnf autoremove' to purge orphaned dependencies."
    ]
  },

  // 22. Compiling from Source
  {
    id: "compiling-from-source",
    topicNumber: "22",
    title: "Building Software from Source: GNU Toolchain, make, gcc & Shared Libraries",
    category: "Package Management",
    difficulty: "Advanced",
    readTime: "25 min read",
    summary: "Compile C/C++ applications from source code when packages are unavailable. Master the configure-make-make install workflow, shared library linking with ldconfig, and patching.",
    keyCommands: ["./configure", "make", "make install", "gcc", "ldconfig", "ldd"],
    sections: [
      {
        id: "gnu-autotools",
        heading: "1. The Classic GNU Autotools Workflow",
        content: `When custom performance tuning flags or pre-release features are required, Linux administrators compile software directly from upstream source tarballs using the GNU Autotools pipeline:

Step 1: './configure --prefix=/usr/local'
Inspects the host architecture, checks for required C compilers (gcc/clang) and dependency header files (e.g. libssl-dev), and generates optimized Makefiles.

Step 2: 'make -j$(nproc)'
Executes the C compiler across all CPU cores to compile source code (.c) into machine code object files (.o) and links them into binary executables.

Step 3: 'sudo make install'
Copies compiled binaries, man pages, and headers to standard destinations (/usr/local/bin, /usr/local/lib).`,
        codeBlock: {
          command: "ldd /usr/bin/curl",
          explanation: "Inspect shared dynamic libraries (.so) required by the curl binary.",
          output: `        linux-vdso.so.1 (0x00007ffe341fe000)
        libcurl.so.4 => /lib/x86_64-linux-gnu/libcurl.so.4 (0x00007f9814c12000)
        libssl.so.3 => /lib/x86_64-linux-gnu/libssl.so.3 (0x00007f9814b6c000)
        libcrypto.so.3 => /lib/x86_64-linux-gnu/libcrypto.so.3 (0x00007f98146f9000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f98144cf000)`
        }
      },
      {
        id: "shared-libraries",
        heading: "2. Dynamic Linker & Shared Libraries (ldconfig)",
        content: `When installing custom shared libraries into /usr/local/lib, the Linux dynamic linker will not locate them until you update the shared library cache. Add your library path to /etc/ld.so.conf.d/custom.conf and execute 'ldconfig'.`,
        codeBlock: {
          command: "echo '/usr/local/lib' > /etc/ld.so.conf.d/local.conf && ldconfig",
          explanation: "Rebuild the kernel shared library runtime link cache.",
          output: `[Exit 0: Dynamic link cache regenerated]`
        }
      }
    ],
    summaryChecklist: [
      "The source compilation pipeline follows: ./configure → make → make install.",
      "Use 'make -j$(nproc)' to accelerate compilation across all available CPU cores.",
      "Use 'ldd' to inspect dynamically linked shared libraries required by an executable.",
      "Run 'ldconfig' whenever installing new shared libraries into /usr/local/lib."
    ]
  },

  // 23. SELinux Mandatory Access Control
  {
    id: "selinux-mac",
    topicNumber: "23",
    title: "SELinux Mandatory Access Control: Contexts, Booleans & Troubleshooting",
    category: "Security & Disaster Recovery",
    difficulty: "Advanced",
    readTime: "30 min read",
    summary: "Demystify Security-Enhanced Linux (SELinux). Differentiate DAC vs MAC, inspect security labels, manage persistent file contexts with semanage/restorecon, toggle booleans, and triage AVC denials.",
    keyCommands: ["getenforce", "setenforce", "restorecon", "semanage fcontext", "getsebool", "audit2why"],
    sections: [
      {
        id: "dac-vs-mac",
        heading: "1. Discretionary (DAC) vs. Mandatory Access Control (MAC)",
        content: `Standard Linux permissions (rwxr-xr-x) represent Discretionary Access Control (DAC): the file owner has full discretion to set permissions. Under DAC, if an attacker exploits a vulnerability in the Nginx web server running as user 'nginx', the attacker can access any file accessible by the nginx user or world-readable files like /etc/passwd.

SELinux enforces Mandatory Access Control (MAC): the Linux kernel confines every process to an isolated domain based on strict security policies. Even if an attacker gains root access inside a confined process, SELinux prevents that process from reading SSH keys, modifying boot files, or connecting to unauthorized network sockets.`,
        codeBlock: {
          command: "getenforce",
          explanation: "Display the active SELinux operating mode.",
          output: `Enforcing`
        },
        tip: "SELinux operates in 3 modes: 'Enforcing' (policy enforced, violations blocked and logged), 'Permissive' (policy not enforced, violations permitted but logged for testing), and 'Disabled'."
      },
      {
        id: "selinux-contexts",
        heading: "2. The Anatomy of an SELinux Context Label",
        content: `Every process, file, directory, and network socket carries an SELinux label consisting of 4 parts:
[user] : [role] : [type] : [level]
system_u:object_r:httpd_sys_content_t:s0

The 'type' field (ending in _t) is the most critical for system administrators (known as Type Enforcement). A process running in domain 'httpd_t' can ONLY access files labeled with type 'httpd_sys_content_t'.`,
        codeBlock: {
          command: "ls -lZ /var/www/html",
          explanation: "Inspect SELinux security context labels assigned to web directory files.",
          output: `-rw-r--r--. 1 root root system_u:object_r:httpd_sys_content_t:s0 1024 Oct 31 10:00 index.html`
        }
      },
      {
        id: "selinux-troubleshooting",
        heading: "3. Triage & Fixing SELinux Denials",
        content: `Common Problem: Moving files with 'mv' into /var/www/html preserves their original source context (e.g. default_t), resulting in 403 Forbidden errors.

Solution:
1. Restore default context: 'restorecon -Rv /var/www/html'
2. If reverse proxying to a backend port is blocked, toggle the appropriate SELinux boolean: 'setsebool -P httpd_can_network_connect 1'
3. Diagnose denials from audit logs using 'audit2why'.`,
        codeBlock: {
          command: "ausearch -m avc -ts recent | audit2why",
          explanation: "Analyze recent SELinux Access Vector Cache (AVC) denial logs and output human-readable remediation advice.",
          output: `type=AVC msg=audit(1698751200.412:891): avc:  denied  { name_connect } for  pid=4102 comm="nginx" dest=8080 scontext=system_u:system_r:httpd_t:s0 tcontext=system_u:object_r:http_cache_port_t:s0 tclass=tcp_socket permissive=0

Was caused by:
One of the following booleans was not enabled:
allow_httpd_anon_write, httpd_can_network_connect`
        },
        warning: "Never disable SELinux (SELINUX=disabled) in production! Disabling SELinux removes critical kernel isolation. Use 'audit2why' or setsebool to grant necessary permissions."
      }
    ],
    summaryChecklist: [
      "SELinux provides kernel-level Mandatory Access Control (MAC) via Type Enforcement.",
      "The 3 operating modes are Enforcing, Permissive, and Disabled.",
      "Use 'restorecon -Rv' to fix incorrect file contexts after moving files.",
      "Enable feature permissions safely using booleans: 'setsebool -P <boolean> 1'."
    ]
  },

  // 24. Kernel Hardening & sysctl
  {
    id: "kernel-hardening-sysctl",
    topicNumber: "24",
    title: "Linux Kernel Hardening via /etc/sysctl.conf & Security Parameters",
    category: "Security & Disaster Recovery",
    difficulty: "Advanced",
    readTime: "22 min read",
    summary: "Harden Linux kernel runtime parameters using the sysctl interface. Defend against SYN flood attacks, IP spoofing, disable ICMP redirects, enable ASLR, and restrict kernel pointer leakage.",
    keyCommands: ["sysctl -a", "sysctl -p", "cat /proc/sys/net/ipv4/tcp_syncookies"],
    sections: [
      {
        id: "sysctl-interface",
        heading: "1. The sysctl Runtime Kernel Interface",
        content: `The Linux kernel exposes hundreds of tunable networking, memory, and security flags via the /proc/sys/ virtual filesystem.

The 'sysctl' tool queries and updates these parameters in live memory without requiring a server reboot. Permanent security hardening rules are stored in /etc/sysctl.conf or drop-in files under /etc/sysctl.d/99-security.conf.`,
        codeBlock: {
          command: "sysctl -a | grep -E '(tcp_syncookies|ip_forward)' | head -n 3",
          explanation: "Query active kernel parameters governing TCP SYN defense and IP forwarding.",
          output: `net.ipv4.ip_forward = 0
net.ipv4.tcp_syncookies = 1`
        }
      },
      {
        id: "hardening-ruleset",
        heading: "2. Enterprise Kernel Hardening Ruleset",
        content: `Apply these baseline security parameters to /etc/sysctl.d/99-security.conf:
• 'net.ipv4.tcp_syncookies = 1': Defends against Denial of Service (DoS) TCP SYN flood attacks.
• 'net.ipv4.ip_forward = 0': Disables packet forwarding between interfaces (unless acting as a router or VPN).
• 'net.ipv4.conf.all.accept_redirects = 0': Rejects ICMP redirect packets to prevent Man-in-the-Middle routing attacks.
• 'net.ipv4.conf.all.rp_filter = 1': Enables Reverse Path Filtering to block IP source address spoofing.
• 'kernel.randomize_va_space = 2': Enforces Address Space Layout Randomization (ASLR) to prevent buffer overflow exploits.`,
        codeBlock: {
          command: "sysctl -p /etc/sysctl.d/99-security.conf",
          explanation: "Reload and apply kernel security settings live from configuration file.",
          output: `net.ipv4.tcp_syncookies = 1
net.ipv4.ip_forward = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.rp_filter = 1
kernel.randomize_va_space = 2`
        }
      }
    ],
    summaryChecklist: [
      "sysctl tunes live kernel parameters mapped to /proc/sys/.",
      "Enable 'tcp_syncookies=1' to mitigate DoS SYN flood attacks.",
      "Enable 'rp_filter=1' to eliminate IP spoofing attacks via reverse path verification.",
      "Persist hardening rules cleanly in /etc/sysctl.d/99-security.conf."
    ]
  },

  // 25. Performance Monitoring & Triage
  {
    id: "performance-tuning-use",
    topicNumber: "25",
    title: "Performance Monitoring & Triage: CPU, Memory, Disk I/O & Load Averages",
    category: "Security & Disaster Recovery",
    difficulty: "Advanced",
    readTime: "30 min read",
    summary: "Systematically diagnose production system slowdowns using Brendan Gregg's USE Method (Utilization, Saturation, Errors). Demystify load averages, I/O wait, memory saturation, and disk latency.",
    keyCommands: ["uptime", "vmstat 1", "iostat -xz 1", "mpstat -P ALL 1", "pidstat 1", "free -h"],
    sections: [
      {
        id: "load-averages",
        heading: "1. Demystifying Linux Load Average",
        content: `The three load average numbers in 'uptime' represent the average number of processes in the CPU run queue (Runnable, 'R' state) PLUS processes blocked in Uninterruptible Sleep ('D' state, waiting on disk I/O or network file locks) over 1, 5, and 15 minutes.

How to interpret Load Average:
• Always divide load average by the number of CPU cores ('nproc').
• On an 8-core CPU, a load average of 8.0 represents 100% capacity utilization.
• A load average of 24.0 on an 8-core CPU indicates severe saturation (16 processes queuing).
• If load average is high but CPU utilization ('top %cpu') is low, the server is suffering from disk I/O bottleneck stalls!`,
        codeBlock: {
          command: "uptime && nproc",
          explanation: "Check system load averages and total physical CPU cores.",
          output: ` 15:30:12 up 42 days,  8:14,  2 users,  load average: 1.12, 1.45, 1.30
8`
        }
      },
      {
        id: "use-method-tools",
        heading: "2. The 60-Second Linux Triage Checklist",
        content: `When a production performance incident occurs, run these commands sequentially to pinpoint the bottleneck:
1. 'uptime': Check load averages vs. core count.
2. 'dmesg -T | tail': Look for hardware errors, link drops, or OOM killer events.
3. 'vmstat 1': Inspect 'r' (runnable CPU processes) and 'b' (blocked on I/O). Check column 'wa' (I/O wait). If %wa > 20%, focus on disk I/O.
4. 'iostat -xz 1': Inspect disk %util and await (average latency in milliseconds). If %util approaches 100%, storage drives are saturated.
5. 'free -h': Check available memory.
6. 'pidstat 1': Pinpoint the exact process PID driving the resource consumption.`,
        codeBlock: {
          command: "vmstat 1 3",
          explanation: "Sample system activity every 1 second across CPU, memory, and disk I/O.",
          output: `procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0      0 421892  84120 1823904    0    0   120  4500 1204 2410 25  5 70  0  0
 1  0      0 410280  84120 1823904    0    0     0  9200 1450 3120 28  6 66  0  0
 1  0      0 410280  84120 1823904    0    0     0  1200 1100 2100 20  4 76  0  0`
        }
      }
    ],
    summaryChecklist: [
      "Load average includes both CPU runnable (R) and Disk I/O blocked (D) processes.",
      "Compare load average against CPU core count from 'nproc'.",
      "High %wa (I/O wait) in 'vmstat' points to disk or storage array saturation.",
      "Use 'iostat -xz 1' to evaluate disk latency and %util saturation."
    ]
  },

  // 26. Disaster Recovery & Chroot
  {
    id: "disaster-recovery-chroot",
    topicNumber: "26",
    title: "Disaster Recovery & Rescue Mode: Fixing Broken Bootloaders & Chroot",
    category: "Security & Disaster Recovery",
    difficulty: "Advanced",
    readTime: "30 min read",
    summary: "Recover corrupted, unbootable Linux servers. Boot from live rescue media, mount root, bind mount pseudo-filesystems, enter a chroot environment, repair /etc/fstab, reinstall GRUB2, and reset root passwords.",
    keyCommands: ["chroot", "grub-install", "update-grub", "update-initramfs -u", "fsck"],
    sections: [
      {
        id: "rescue-scenarios",
        heading: "1. Common Unbootable Scenarios",
        content: `A server can become unbootable due to:
• Corrupted or misspelled /etc/fstab entries.
• Overwritten or corrupted GRUB2 bootloader (dropping into 'grub rescue>').
• Corrupted Initial RAM Filesystem (initramfs) after failed kernel upgrades.
• Forgotten root password on a machine with no secondary administrative accounts.

In all these scenarios, you can recover the system without data loss using a Live USB/ISO rescue image and 'chroot' (Change Root).`,
        tip: "Keep a bootable Live Server ISO accessible in your cloud provider's console or data center IPMI/iDRAC virtual media."
      },
      {
        id: "chroot-procedure",
        heading: "2. The Step-by-Step Chroot Rescue Procedure",
        content: `Step 1: Boot the server using a Live Linux ISO.
Step 2: Identify the root partition: 'lsblk'
Step 3: Mount the target root partition to /mnt:
'mount /dev/sda2 /mnt'
(If using EFI: 'mount /dev/sda1 /mnt/boot/efi')

Step 4: Bind mount the virtual pseudo-filesystems so the rescue shell has full hardware access:
'mount --bind /dev /mnt/dev'
'mount --bind /proc /mnt/proc'
'mount --bind /sys /mnt/sys'
'mount --bind /run /mnt/run'

Step 5: Enter the broken system root:
'chroot /mnt /bin/bash'`,
        codeBlock: {
          command: "chroot /mnt /bin/bash",
          explanation: "Switch the root directory to /mnt. You are now executing commands directly inside the broken host OS.",
          output: `root@live-rescue:/# whoami
root`
        }
      },
      {
        id: "performing-repairs",
        heading: "3. Performing Critical System Repairs Inside Chroot",
        content: `Once inside the chroot environment, execute required repairs:
• Repair GRUB2 bootloader: 'grub-install /dev/sda && update-grub'
• Regenerate missing initramfs: 'update-initramfs -u -k all'
• Fix broken /etc/fstab: 'nano /etc/fstab'
• Reset forgotten root password: 'passwd root'

Step 6: Exit and reboot cleanly:
'exit'
'umount -R /mnt'
'reboot'`,
        warning: "Always unmount cleanly with 'umount -R /mnt' before triggering reboot to ensure all disk write buffers are flushed to physical storage."
      }
    ],
    summaryChecklist: [
      "Live ISO chroot recovery can repair almost any unbootable Linux system.",
      "Mount broken root to /mnt and bind-mount /dev, /proc, /sys, and /run.",
      "Execute 'chroot /mnt' to operate with full root administrative control.",
      "Unmount recursively with 'umount -R /mnt' before rebooting."
    ]
  }
];
