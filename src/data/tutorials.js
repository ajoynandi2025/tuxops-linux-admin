export const TUTORIAL_MODULES = [
  {
    id: "linux-architecture",
    moduleNumber: "01",
    title: "Linux Foundations & Boot Architecture",
    badge: "Core Foundations",
    duration: "25 min read",
    difficulty: "Beginner",
    category: "Architecture",
    icon: "Cpu",
    overview: "Understand how the Linux kernel initializes hardware, mounts the root filesystem, transfers control to PID 1 (systemd), and organizes files according to the Filesystem Hierarchy Standard (FHS).",
    keyConcepts: [
      "User Space vs. Kernel Space and System Calls (syscalls)",
      "The 4 Stages of the Linux Boot Process (UEFI/BIOS → GRUB2 → Kernel/initramfs → systemd)",
      "Filesystem Hierarchy Standard (FHS) explained: /etc, /var, /proc, /sys, /dev",
      "VFS (Virtual File System) abstraction and inode architecture"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|                    USER SPACE (Ring 3)                        |
|  Applications, Bash Shell, Nginx, Docker, Daemons, Tools      |
+---------------------------------------------------------------+
              | System Calls (open, read, fork, execve)
+---------------------------------------------------------------+
|                    KERNEL SPACE (Ring 0)                      |
|  Process Scheduler | Memory Manager | VFS | Network Stack    |
|  Device Drivers & Hardware Abstraction Layer (HAL)            |
+---------------------------------------------------------------+
                               |
                   PHYSICAL HARDWARE (CPU, RAM, Disks, NIC)
    `,
    sections: [
      {
        heading: "1. The 4-Stage Linux Boot Sequence",
        text: "Every production Linux server transitions through four distinct initialization stages before presenting a login prompt or starting container workloads.",
        details: [
          "Stage 1 - Firmware (BIOS/UEFI): Power-on self-test (POST) verifies hardware. UEFI loads bootloader from the EFI System Partition (ESP) formatted in FAT32.",
          "Stage 2 - Bootloader (GRUB2): Displays kernel boot menu, loads selected Linux kernel binary (vmlinuz) and Initial RAM Filesystem (initramfs/initrd) into memory.",
          "Stage 3 - Kernel Initialization: Kernel decompresses itself, initializes drivers, mounts temporary initramfs as root, detects storage controller, mounts real root (/), and spawns PID 1.",
          "Stage 4 - Init System (systemd): Reads `/etc/systemd/system/default.target` (usually multi-user.target or graphical.target) and concurrently launches required system daemons."
        ],
        codeSnippet: {
          command: "systemd-analyze && systemd-analyze blame | head -n 5",
          explanation: "Analyzes system boot speed and identifies the top 5 slowest startup services.",
          output: `Startup finished in 3.421s (firmware) + 2.110s (loader) + 1.840s (kernel) + 4.230s (userspace) = 11.601s
multi-user.target reached after 4.120s in userspace

1.420s docker.service
0.980s networkd-dispatcher.service
0.720s snapd.service
0.410s systemd-journal-flush.service
0.340s cron.service`
        },
        proTip: "If a server hangs during boot after kernel upgrades, select the previous kernel version from the GRUB menu or pass `systemd.unit=rescue.target` to GRUB kernel parameters.",
        interactiveCommand: "systemd-analyze"
      },
      {
        heading: "2. Filesystem Hierarchy Standard (FHS)",
        text: "Unlike Windows with drive letters (C:\\, D:\\), Linux treats everything as a file under a unified root directory (`/`). Understanding key directories is critical for system diagnostics.",
        details: [
          "/etc: Host-specific configuration files (systemd, sshd, fstab, network). Never stores binaries.",
          "/var: Variable data expected to grow continuously (logs in /var/log, spool, caches, web roots).",
          "/proc: Virtual pseudo-filesystem exposing live kernel & process state (e.g. /proc/cpuinfo, /proc/sys/).",
          "/sys: Virtual filesystem for kernel device drivers and hardware subsystem attributes.",
          "/dev: Device nodes representing physical or pseudo hardware (/dev/sda, /dev/nvme0n1, /dev/null, /dev/urandom).",
          "/usr/bin & /usr/sbin: Executables for standard users vs. system administrative binaries."
        ],
        codeSnippet: {
          command: "ls -ld /etc /var /proc /sys /dev",
          explanation: "Inspect directory permissions and attributes of critical root branches.",
          output: `drwxr-xr-x 138 root root 12288 Oct 31 10:20 /etc
drwxr-xr-x  14 root root  4096 Oct 31 09:12 /var
dr-xr-xr-x 342 root root     0 Oct 31 09:00 /proc
dr-xr-xr-x  13 root root     0 Oct 31 09:00 /sys
drwxr-xr-x  22 root root  4380 Oct 31 09:00 /dev`
        },
        proTip: "Never fill up the `/var` partition. If `/var/log` consumes 100% disk space, critical daemons like SSH and database engines may fail to record authentication attempts and crash.",
        interactiveCommand: "df -h"
      }
    ],
    productionScenario: {
      problem: "Server boots into emergency mode after reboot with error: 'Failed to mount /mnt/data: Dependency failed'.",
      triage: "1. Check `/etc/fstab` syntax and UUIDs with `blkid`.\n2. A non-critical external disk was listed in /etc/fstab without the `nofail` mount option.\n3. Edit `/etc/fstab`, add `nofail,x-systemd.device-timeout=5s`, and run `systemctl daemon-reload`.",
      resolutionCommand: "vi /etc/fstab # add nofail to non-root mounts"
    }
  },
  {
    id: "user-permissions",
    moduleNumber: "02",
    title: "User Management, Permissions & ACLs",
    badge: "Security & Access",
    duration: "30 min read",
    difficulty: "Beginner",
    category: "Security",
    icon: "Users",
    overview: "Master user and group provisioning, standard POSIX permissions (octal and symbolic), special bits (SUID, SGID, Sticky bit), Access Control Lists (ACLs), and granular sudo privileges.",
    keyConcepts: [
      "User Identification (UID), Group Identification (GID), /etc/passwd and /etc/shadow",
      "Standard Permission Matrix: Read (4), Write (2), Execute (1) across Owner, Group, Others",
      "Special permission bits: SUID (4000), SGID (2000), and Sticky Bit (1000)",
      "POSIX Access Control Lists (getfacl, setfacl) for multi-user shared folders",
      "Sudoers hardening with visudo and sudo privileges delegation"
    ],
    architectureDiagram: `
   File Type & Permissions: - r w x r - x r - -
                            | \___/ \___/ \___/
                            |   |     |     |
    Regular File (-) -------+   |     |     +--> Others: Read Only (4 = r--)
    Owner (u): Read/Write/Exec (7 = rwx)    +--> Group (g): Read/Exec (5 = r-x)
    Octal Notation: 755
    `,
    sections: [
      {
        heading: "1. The Linux Authentication Trinity",
        text: "Linux authenticates users via three files located in `/etc`. These files establish authorization boundaries across every shell session.",
        details: [
          "/etc/passwd: Stores username, UID, primary GID, user info, home directory, and default login shell (/bin/bash, /usr/sbin/nologin).",
          "/etc/shadow: Stores SHA-512 cryptographically hashed passwords, expiration dates, and account aging policy. Accessible only by root (0640 or 0600).",
          "/etc/group: Maps group names to GIDs and secondary user memberships."
        ],
        codeSnippet: {
          command: "useradd -m -s /bin/bash -G sudo,docker devops_engineer",
          explanation: "Creates a new user with a home directory (-m), bash shell (-s), and secondary groups sudo and docker.",
          output: `User 'devops_engineer' created with UID 1002. Added to supplemental groups: sudo, docker.`
        },
        proTip: "Never edit `/etc/passwd` or `/etc/shadow` directly with regular text editors! Always use `vipw` and `vigr` to prevent file corruption and race conditions.",
        interactiveCommand: "cat /etc/passwd"
      },
      {
        heading: "2. Special Bits: SUID, SGID & Sticky Bit",
        text: "Standard permissions are often insufficient for collaboration directories and privileged tools.",
        details: [
          "SUID (4000 / u+s): Program executes with the privileges of the file owner instead of the executing user (e.g. `/usr/bin/passwd`).",
          "SGID (2000 / g+s): When applied to a directory, any file created inside automatically inherits the directory's group ownership rather than the creator's primary group.",
          "Sticky Bit (1000 / +t): Applied to directories (like `/tmp`), prevents users from deleting or renaming files owned by others, even if they have group/other write permissions."
        ],
        codeSnippet: {
          command: "mkdir /shared/deploy && chown :developers /shared/deploy && chmod 2775 /shared/deploy",
          explanation: "Sets SGID (2) on the shared folder so any file created retains 'developers' group ownership.",
          output: `drwxrwsr-x 2 root developers 4096 Oct 31 10:45 /shared/deploy`
        },
        proTip: "Audit unauthorized SUID binaries regularly to prevent local privilege escalation: `find / -perm /4000 -type f -exec ls -ld {} \\; 2>/dev/null`.",
        interactiveCommand: "ls -ld /tmp"
      }
    ],
    productionScenario: {
      problem: "Developer cannot delete their own temporary lockfile in `/tmp/shared_app` created by another developer.",
      triage: "The `/tmp` directory has the sticky bit set (`drwxrwxrwt`). Only the file owner or root can unlink files. The team needed a designated group folder with SGID instead of using generic `/tmp`.",
      resolutionCommand: "setfacl -m u:devops_engineer:rwx /shared/app_data"
    }
  },
  {
    id: "storage-lvm",
    moduleNumber: "03",
    title: "Storage Management, Filesystems & LVM",
    badge: "Enterprise Storage",
    duration: "35 min read",
    difficulty: "Intermediate",
    category: "Storage",
    icon: "HardDrive",
    overview: "Manage physical block devices, partition tables (GPT/MBR), Logical Volume Management (LVM: PV, VG, LV), dynamic volume resizing, XFS vs ext4 filesystems, and /etc/fstab persistence.",
    keyConcepts: [
      "Block device naming conventions (sdX, nvmeXnY, vdX, mapper)",
      "GPT vs MBR partitioning using `parted` and `fdisk`",
      "LVM 3-tier architecture: Physical Volumes (PV) → Volume Groups (VG) → Logical Volumes (LV)",
      "Online filesystem growth: resize2fs (ext4) and xfs_growfs (XFS)",
      "Permanent mounting with UUIDs in `/etc/fstab` and swap space tuning"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|              LVM ARCHITECTURE & VOLUME HIERARCHY              |
|                                                               |
|  [Physical Disk /dev/sdb]           [Physical Disk /dev/sdc]  |
|            |                                   |              |
|  Physical Volume (PV 1)             Physical Volume (PV 2)    |
|            \\___________________________________/              |
|                              |                                |
|                   Volume Group: vg_data                       |
|                   (Total Capacity: 2 TB)                      |
|                  /                      \\                     |
|      Logical Volume: lv_db (1.5 TB)   Logical Volume: lv_logs |
|             | (XFS filesystem)                 | (ext4)       |
|       Mounted at /var/lib/mysql         Mounted at /var/log   |
+---------------------------------------------------------------+
    `,
    sections: [
      {
        heading: "1. LVM Step-by-Step Provisioning",
        text: "LVM eliminates disk partitioning headaches by pooling raw drives together and allowing volume expansion without rebooting.",
        details: [
          "Step 1: Initialize physical disks into Physical Volumes: `pvcreate /dev/sdb /dev/sdc`",
          "Step 2: Aggregate PVs into a shared Volume Group: `vgcreate vg_data /dev/sdb /dev/sdc`",
          "Step 3: Carve out a Logical Volume with specific size: `lvcreate -L 200G -n lv_app vg_data`",
          "Step 4: Format with a modern filesystem: `mkfs.xfs /dev/vg_data/lv_app`",
          "Step 5: Mount and persist in `/etc/fstab` using UUID."
        ],
        codeSnippet: {
          command: "lvextend -L +50G /dev/vg_data/lv_app --resizefs",
          explanation: "Expands the logical volume by 50GB AND resizes the underlying filesystem online in one command.",
          output: `Size of logical volume vg_data/lv_app changed from 200.00 GiB to 250.00 GiB.
Logical volume vg_data/lv_app successfully resized.
meta-data=/dev/mapper/vg_data-lv_app isize=512    agcount=4, agsize=13107200 blks
data blocks changed from 52428800 to 65536000`
        },
        proTip: "XFS filesystems can be grown online with `xfs_growfs`, but CANNOT be shrunk! If you require dynamic shrinking, choose ext4 with `resize2fs`.",
        interactiveCommand: "lsblk"
      },
      {
        heading: "2. The /etc/fstab Structure",
        text: "Every entry in `/etc/fstab` consists of 6 space-separated columns: Device Identifier, Mount Point, Filesystem Type, Mount Options, Dump frequency, and Fsck pass number.",
        details: [
          "Col 1: UUID=... (preferred over /dev/sdX because device letters can change after reboots).",
          "Col 2: /mnt/storage (target directory).",
          "Col 3: xfs or ext4.",
          "Col 4: defaults,noatime,nofail (noatime boosts database read/write throughput by disabling access timestamp updates).",
          "Col 5: 0 (disable dump backup tool).",
          "Col 6: 2 (fsck order: 1 for root '/', 2 for data volumes, 0 for XFS/swap)."
        ],
        codeSnippet: {
          command: "mount -a",
          explanation: "Validates /etc/fstab by mounting all entries without rebooting. If there are syntax errors, it warns immediately before your next reboot fails.",
          output: `[Exit 0: No syntax errors detected in /etc/fstab]`
        },
        proTip: "ALWAYS run `mount -a` immediately after modifying `/etc/fstab`. If there is a typo, running `mount -a` catches it. If you reboot without checking, the server will drop into an emergency shell.",
        interactiveCommand: "cat /etc/fstab"
      }
    ],
    productionScenario: {
      problem: "Database server reports 'No space left on device' on `/var/lib/postgresql`, halting all API traffic.",
      triage: "1. `vgs` shows 400G free PE in `vg_postgres`.\n2. Extend LV and filesystem online with `lvextend -L +100G /dev/vg_postgres/lv_pg --resizefs`.\n3. Zero downtime experienced by end users.",
      resolutionCommand: "lvextend -L +100G /dev/vg_postgres/lv_pg -r"
    }
  },
  {
    id: "systemd-services",
    moduleNumber: "04",
    title: "Systemd, Process Control & Logging",
    badge: "Service Architecture",
    duration: "40 min read",
    difficulty: "Intermediate",
    category: "Systemd",
    icon: "Server",
    overview: "Deep dive into systemd unit files, service lifecycle, socket activation, target states, binary systemd journal diagnostics, and process triage with signals (SIGTERM, SIGKILL, SIGHUP).",
    keyConcepts: [
      "Systemd Unit Types: .service, .socket, .target, .timer, .mount",
      "Systemctl lifecycle: start, stop, restart, reload, enable, mask",
      "Creating enterprise-grade custom .service units with sandbox hardening",
      "Journalctl filtering by unit, priority, boot identifier, and reverse timeline",
      "Process state codes (R, S, D, Z, T) and signal handling"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|                    SYSTEMD TARGET GRAPH                       |
|                                                               |
|                      sysinit.target                           |
|                            |                                  |
|                      basic.target                             |
|                     /            \\                            |
|             network.target     sockets.target                 |
|                     \\            /                            |
|                   multi-user.target (Server CLI Mode)         |
|                            |                                  |
|                   graphical.target (Desktop GUI Mode)         |
+---------------------------------------------------------------+
    `,
    sections: [
      {
        heading: "1. Anatomy of a Production .service Unit",
        text: "Systemd unit files live in `/usr/lib/systemd/system/` (vendor defaults) and `/etc/systemd/system/` (administrator overrides). The latter takes precedence.",
        details: [
          "[Unit]: Describes the service, dependencies (Requires, Wants), and startup ordering (After, Before).",
          "[Service]: Type (simple, forking, notify), ExecStart, ExecReload, User, Group, Restart policies (on-failure, always), RestartSec, and cgroup resource limits (MemoryMax, CPUQuota).",
          "[Install]: Specifies which target pulls in this service when enabled with `systemctl enable` (usually WantedBy=multi-user.target)."
        ],
        codeSnippet: {
          command: "cat /etc/systemd/system/nodeapp.service",
          explanation: "Example production hardened systemd unit file with automatic restart and system protection.",
          output: `[Unit]
Description=NodeJS Production API Microservice
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=appuser
Group=appuser
WorkingDirectory=/opt/nodeapp
ExecStart=/usr/bin/node /opt/nodeapp/server.js
Restart=on-failure
RestartSec=5s
Environment=NODE_ENV=production PORT=3000

# Security Sandboxing
ProtectSystem=full
ProtectHome=true
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target`
        },
        proTip: "After modifying any unit file under `/etc/systemd/system/`, you MUST execute `systemctl daemon-reload` before systemd acknowledges the modifications.",
        interactiveCommand: "systemctl status"
      },
      {
        heading: "2. Mastering journalctl Diagnostics",
        text: "The systemd journal captures stdout, stderr, syslog, and kernel dmesg messages into high-speed binary journals.",
        details: [
          "Follow live logs: `journalctl -u nginx.service -f`",
          "Inspect current boot only: `journalctl -b 0` (or `-b -1` for previous crash boot)",
          "Filter by severity: `journalctl -p err..emerg` (shows warnings, errors, panics)",
          "Limit time window: `journalctl --since \"1 hour ago\"`"
        ],
        codeSnippet: {
          command: "journalctl -u ssh.service -n 10 --no-pager",
          explanation: "Fetch the 10 most recent SSH daemon authentication and connection logs.",
          output: `Oct 31 11:22:01 srv-prod sshd[18492]: Server listening on 0.0.0.0 port 2222.
Oct 31 11:24:15 srv-prod sshd[18510]: Accepted publickey for sysadmin from 192.168.1.50 port 54102 ssh2: ED25519
Oct 31 11:24:15 srv-prod sshd[18510]: pam_unix(sshd:session): session opened for user sysadmin(uid=1000)`
        },
        proTip: "Clean up bloated journals consuming gigabytes of disk space using `journalctl --vacuum-size=500M` or `journalctl --vacuum-time=14d`.",
        interactiveCommand: "journalctl -n 5"
      }
    ],
    productionScenario: {
      problem: "A critical service was disabled, but a junior admin accidentally ran `systemctl start buggy-service`. How to permanently prevent it from starting?",
      triage: "Running `systemctl disable` only removes boot symlinks. The service can still be started manually or by socket activation.",
      resolutionCommand: "systemctl mask buggy-service # symlinks unit to /dev/null"
    }
  },
  {
    id: "networking-firewall",
    moduleNumber: "05",
    title: "Networking, Firewalls & SSH Hardening",
    badge: "Network Security",
    duration: "45 min read",
    difficulty: "Advanced",
    category: "Networking",
    icon: "Network",
    overview: "Configure IPv4/IPv6 interfaces with modern `iproute2`, diagnose ports with `ss`, manage DNS via systemd-resolved, implement firewall rules with UFW and firewalld, and lock down OpenSSH.",
    keyConcepts: [
      "Replacing deprecated tools: `ip addr` (ifconfig), `ip route` (route), `ss` (netstat)",
      "DNS resolution pipeline: /etc/hosts → systemd-resolved (127.0.0.53) → /etc/resolv.conf",
      "Firewall management: UFW (Ubuntu/Debian) vs Firewalld (RHEL/Rocky/Fedora) vs nftables",
      "SSH daemon hardening: ED25519 keys, disabling root password logins, changing ports",
      "Brute-force mitigation using Fail2Ban and connection rate limits"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|                     LINUX NETWORK PACKET FLOW                 |
|                                                               |
|  Incoming Packet ---> [PREROUTING] (DNAT)                     |
|                              |                                |
|                     Routing Decision?                         |
|                     /               \\                        |
|   [INPUT] (Firewall Filter)      [FORWARD] (To other host)    |
|            |                                |                 |
|     Local Process (Nginx)        [POSTROUTING] (SNAT/Masq)    |
|            |                                |                 |
|   [OUTPUT] (Firewall Filter)          Network Wire Out        |
+---------------------------------------------------------------+
    `,
    sections: [
      {
        heading: "1. The Modern iproute2 & Socket Suite",
        text: "The legacy `net-tools` suite (`ifconfig`, `netstat`, `route`) was deprecated decades ago. Production engineering demands `ip` and `ss` for sub-millisecond kernel socket inspection.",
        details: [
          "`ip addr show`: Display all IP addresses and subnet masks.",
          "`ip route show`: Display kernel routing table and default gateway.",
          "`ss -tulpn`: Inspect active TCP (-t), UDP (-u) listening (-l) sockets with process IDs (-p) and numeric ports (-n)."
        ],
        codeSnippet: {
          command: "ss -tulpn | grep -E ':(80|443|22)'",
          explanation: "Find which processes are currently listening on HTTP, HTTPS, or SSH ports.",
          output: `tcp  LISTEN 0  128  0.0.0.0:2222    0.0.0.0:*   users:(("sshd",pid=1120,fd=3))
tcp  LISTEN 0  511  0.0.0.0:80      0.0.0.0:*   users:(("nginx",pid=2340,fd=6))
tcp  LISTEN 0  511  0.0.0.0:443     0.0.0.0:*   users:(("nginx",pid=2340,fd=7))`
        },
        proTip: "If you cannot bind to a port because 'Address already in use', quickly find and terminate the offending PID with: `fuser -k 8080/tcp`.",
        interactiveCommand: "ss -tuln"
      },
      {
        heading: "2. SSH Enterprise Hardening Checklist",
        text: "The OpenSSH daemon (`sshd`) is the primary vector for automated attacks. Protect `/etc/ssh/sshd_config` with these critical directives:",
        details: [
          "`PermitRootLogin no`: Blocks direct root authentication over SSH.",
          "`PasswordAuthentication no`: Enforces public key-only cryptography (ED25519).",
          "`MaxAuthTries 3`: Disconnects aggressive password guessing attempts.",
          "`X11Forwarding no`: Prevents malicious graphical session hijacking.",
          "`ClientAliveInterval 300`: Keeps legitimate connections alive without ghost sockets."
        ],
        codeSnippet: {
          command: "ssh-keygen -t ed25519 -C 'admin@infrastructure'",
          explanation: "Generates an elliptic curve key pair, vastly faster and more secure than legacy 2048-bit RSA.",
          output: `Generating public/private ed25519 key pair.
Your identification has been saved in /home/user/.ssh/id_ed25519
Your public key has been saved in /home/user/.ssh/id_ed25519.pub
SHA256:7uK8Y9xWqVp0Zb12LkJ398hGyTx4mOPQr6s5tUvxw1Y admin@infrastructure`
        },
        proTip: "Before restarting `sshd` after editing `/etc/ssh/sshd_config`, run `sshd -t` to test the configuration syntax. NEVER close your current terminal window until you successfully log in via a secondary test terminal!",
        interactiveCommand: "ip a"
      }
    ],
    productionScenario: {
      problem: "Server's SSH log shows 50,000 failed password attempts in 2 hours from a Chinese botnet IP pool.",
      triage: "1. Install and activate fail2ban.\n2. Configure `/etc/fail2ban/jail.local` with `bantime = 1d`, `maxretry = 3`.\n3. UFW blocks offending IPs automatically at kernel level.",
      resolutionCommand: "fail2ban-client status sshd"
    }
  },
  {
    id: "package-mgmt",
    moduleNumber: "06",
    title: "Package Management & Repositories",
    badge: "Software Delivery",
    duration: "25 min read",
    difficulty: "Beginner",
    category: "Packages",
    icon: "Package",
    overview: "Understand package ecosystems across Debian/Ubuntu (APT, dpkg), Red Hat/Rocky (DNF/RPM), and Arch (Pacman). Learn repository pinning, GPG key validation, and building from source.",
    keyConcepts: [
      "APT commands: update, upgrade, dist-upgrade, autoremove, apt-cache",
      "DNF / RPM commands: install, provides, groupinstall, rpm -qa, rpm -ql",
      "Repository management and GPG signature verification in /etc/apt/trusted.gpg.d/ and /etc/yum.repos.d/",
      "Compiling C/C++ applications from source: ./configure, make, make install"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|                  PACKAGE MANAGEMENT HIERARCHY                 |
|                                                               |
|   High-Level Frontends:      [APT]           [DNF]    [PACMAN]|
|                              |               |        |       |
|   Resolves Dependencies, Downloads from Mirrors over HTTPS    |
|                              |               |        |       |
|   Low-Level Backends:        [dpkg]          [RPM]    [libalpm|
|                              |               |        |       |
|   Unpacks Archive, Verifies Hashes, Writes to /usr /bin /etc  |
+---------------------------------------------------------------+
    `,
    sections: [
      {
        heading: "1. The Golden Rule of APT: update vs upgrade",
        text: "One of the most common beginner confusions is between updating package indexes and upgrading actual software binaries.",
        details: [
          "`apt update`: Downloads the latest package list and metadata from upstream repositories. It modifies ZERO installed software.",
          "`apt upgrade`: Installs the newest versions of all packages currently installed on the system without removing packages.",
          "`apt full-upgrade`: Upgrades packages while removing obsolete dependencies or installing newly required packages."
        ],
        codeSnippet: {
          command: "apt update && apt -y upgrade",
          explanation: "Synchronize repository index files and apply security patches non-interactively.",
          output: `Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Fetched 110 kB in 1s (120 kB/s)
Reading package lists... Done
Building dependency tree... Done
12 packages can be upgraded. Upgrading... Done.`
        },
        proTip: "Use `apt-cache policy <package>` to view all available repository versions and determine which source repository has priority.",
        interactiveCommand: "apt list --upgradable"
      }
    ],
    productionScenario: {
      problem: "You need to know which package installed the missing `/usr/bin/iostat` utility on an AlmaLinux 9 server.",
      triage: "Use DNF's `provides` query to search through the entire repository database for the binary.",
      resolutionCommand: "dnf provides /usr/bin/iostat # Result: sysstat"
    }
  },
  {
    id: "security-hardening",
    moduleNumber: "07",
    title: "Security Hardening, SELinux & Auditing",
    badge: "Zero-Trust Ops",
    duration: "45 min read",
    difficulty: "Advanced",
    category: "Security",
    icon: "ShieldAlert",
    overview: "Enforce Mandatory Access Control (MAC) with SELinux (contexts, booleans, audit logs) and AppArmor. Harden kernel parameters via `/etc/sysctl.conf` and track privilege escalation with `auditd`.",
    keyConcepts: [
      "Discretionary Access Control (DAC) vs. Mandatory Access Control (MAC)",
      "SELinux Modes: Enforcing, Permissive, Disabled (`getenforce`, `setenforce`)",
      "SELinux labels (User:Role:Type:Level) and `restorecon`, `semanage fcontext`",
      "AppArmor profiles: enforce, complain, aa-status, aa-genprof",
      "Kernel hardening flags: SYN cookie protection, disabling ICMP echo broadcast, ASLR"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|               DAC vs MAC SECURITY VERIFICATION                |
|                                                               |
|  User Process (Nginx) ---> Standard Linux Permissions (DAC)   |
|                                       | Passed                |
|                            SELinux Engine (MAC)               |
|                                       |                       |
|           Check Security Context: httpd_t -> httpd_sys_content|
|                         /                           \\         |
|                     Allowed                       Denied      |
|                        |                             |        |
|             Read File in /var/www/html        Log AVC to Audit|
|                                            (/var/log/audit/audit.log)
+---------------------------------------------------------------+
    `,
    sections: [
      {
        heading: "1. Demystifying SELinux Contexts",
        text: "SELinux confines processes to isolated domains. Even if an attacker gains root access inside an Nginx worker process, SELinux prevents them from reading `/etc/shadow` or private SSH keys.",
        details: [
          "Check file contexts: `ls -lZ /var/www/html`",
          "Check process contexts: `ps -eZ | grep nginx`",
          "Set persistent folder context: `semanage fcontext -a -t httpd_sys_content_t '/custom_web(/.*)?'`",
          "Apply contexts to disk: `restorecon -Rv /custom_web`"
        ],
        codeSnippet: {
          command: "ausearch -m avc -ts recent | audit2why",
          explanation: "Analyzes recent SELinux Access Vector Cache (AVC) denial logs and explains why an action was blocked.",
          output: `type=AVC msg=audit(1698751200.412:891): avc:  denied  { name_connect } for  pid=4102 comm="nginx" dest=8080 scontext=system_u:system_r:httpd_t:s0 tcontext=system_u:object_r:http_cache_port_t:s0 tclass=tcp_socket permissive=0

Was caused by:
One of the following booleans was not enabled:
allow_httpd_anon_write, httpd_can_network_connect`
        },
        proTip: "Never disable SELinux in production (`SELINUX=disabled`)! To fix Nginx reverse proxy denials, simply enable the boolean: `setsebool -P httpd_can_network_connect 1`.",
        interactiveCommand: "getenforce"
      }
    ],
    productionScenario: {
      problem: "Nginx web server returns 403 Forbidden when serving files from `/srv/www`, even though permissions are 755 and owner is nginx.",
      triage: "Files moved with `mv` retain their original SELinux contexts (e.g. `default_t` or `user_home_t`). Nginx requires `httpd_sys_content_t`.",
      resolutionCommand: "restorecon -Rv /srv/www"
    }
  },
  {
    id: "bash-automation",
    moduleNumber: "08",
    title: "Bash Scripting & SysAdmin Automation",
    badge: "Automation",
    duration: "35 min read",
    difficulty: "Intermediate",
    category: "Scripting",
    icon: "Terminal",
    overview: "Write bulletproof shell scripts for infrastructure automation. Implement error handling with `set -euo pipefail`, process loops, file descriptors, and trap handlers.",
    keyConcepts: [
      "The Unofficial Bash Strict Mode: `set -euo pipefail`",
      "Positional parameters ($0, $1, $@, $#) and exit codes ($?)",
      "Control structures: `if [[ -f $file ]]`, `for item in \"\${array[@]}\"`, `while read`",
      "Signals and cleanup traps: `trap 'rm -rf \"$TMP_DIR\"' EXIT INT TERM`",
      "Writing idempotent system check and log rotation scripts"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|               ROBUST BASH PIPELINE ERROR TRAPPING             |
|                                                               |
|  Command 1  |  Command 2 (Fails!)  |  Command 3 (Success)     |
|                                                               |
|  Without 'pipefail':  Exit Code = 0 (Silent Catastrophic Fail)|
|  With 'set -eo pipefail': Pipeline immediately aborts with non-zero
|                           Triggers EXIT trap for safe cleanup!|
+---------------------------------------------------------------+
    `,
    sections: [
      {
        heading: "1. The Production Bash Header",
        text: "Never write a production automation script without strict error trapping. By default, bash ignores errors and continues executing subsequent lines, which can lead to data loss.",
        details: [
          "`set -e`: Exit immediately if any command exits with a non-zero status.",
          "`set -u`: Treat unset variables as an error and exit immediately.",
          "`set -o pipefail`: Return the exit status of the last command in the pipeline that failed.",
          "`IFS=$'\\n\\t'`: Prevents dangerous word splitting on whitespace."
        ],
        codeSnippet: {
          command: "cat backup_postgres.sh",
          explanation: "Enterprise-grade database backup script with rotation and atomic temporary directory cleanup.",
          output: `#!/usr/bin/env bash
set -euo pipefail
IFS=$'\\n\\t'

readonly BACKUP_DIR="/var/backups/postgres"
readonly TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
readonly BACKUP_FILE="\${BACKUP_DIR}/db_\${TIMESTAMP}.sql.gz"
readonly TMP_DIR=$(mktemp -d /tmp/backup.XXXXXX)

# Trap executes automatically on any script termination
cleanup() {
  echo "[$(date)] Cleaning up temporary directory..."
  rm -rf "\${TMP_DIR}"
}
trap cleanup EXIT

echo "Starting automated database backup to \${BACKUP_FILE}..."
mkdir -p "\${BACKUP_DIR}"
pg_dumpall | gzip > "\${TMP_DIR}/dump.gz"
mv "\${TMP_DIR}/dump.gz" "\${BACKUP_FILE}"

# Rotate backups older than 7 days
find "\${BACKUP_DIR}" -type f -name "*.sql.gz" -mtime +7 -delete
echo "Backup completed successfully!"`
        },
        proTip: "Use `shellcheck` (the static analysis tool for shell scripts) in your CI/CD pipeline to catch syntax errors, unquoted variables, and security traps before deployment.",
        interactiveCommand: "echo $SHELL"
      }
    ],
    productionScenario: {
      problem: "A script had `rm -rf $TARGET_DIR/*`. Because `$TARGET_DIR` was misspelled, it evaluated to an empty string and executed `rm -rf /*`!",
      triage: "Using `set -u` halts the script immediately before executing `rm` when an undeclared variable is referenced.",
      resolutionCommand: "set -u # Halts script on unbound variable"
    }
  },
  {
    id: "performance-troubleshooting",
    moduleNumber: "09",
    title: "Performance Tuning & Diagnostics",
    badge: "Production Triage",
    duration: "40 min read",
    difficulty: "Advanced",
    category: "Performance",
    icon: "Activity",
    overview: "Diagnose production outages methodically using the USE method (Utilization, Saturation, Errors). Master load averages, memory leaks, I/O bottlenecks with `iostat`, and the Linux OOM Killer.",
    keyConcepts: [
      "Load Average vs CPU Core Count: Why 4.0 on a 2-core box is saturated",
      "Process states: Uninterruptible Sleep ('D' state) and disk I/O stalls",
      "Memory analysis: buffers, cached, anonymous memory, and swappiness tuning",
      "The Out Of Memory (OOM) Killer mechanics: oom_score and dmesg triage",
      "Brendan Gregg's Linux Performance 60-Second Checklist"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|             THE LINUX 60-SECOND TRIAGE CHECKLIST              |
|                                                               |
|  1. uptime         --> Check 1, 5, 15 min Load Averages       |
|  2. dmesg -T | tail --> Check for OOM kills, kernel panics     |
|  3. vmstat 1       --> Check run queue (r) & blocking I/O (b) |
|  4. mpstat -P ALL 1--> Check for single-threaded CPU pegging  |
|  5. pidstat 1      --> Pinpoint specific rogue process PID    |
|  6. iostat -xz 1   --> Disk %util and await latency           |
|  7. free -m        --> Available memory (never just 'free')   |
|  8. sar -n DEV 1   --> Network interface throughput & drops   |
+---------------------------------------------------------------+
    `,
    sections: [
      {
        heading: "1. Demystifying Linux Load Average",
        text: "Load average represents the average number of processes in a 'runnable' state (using or waiting for CPU) PLUS processes in an 'uninterruptible sleep' state ('D' state, typically waiting on disk I/O or NFS locks).",
        details: [
          "A load average of 8.0 on an 8-core CPU = 100% healthy capacity.",
          "A load average of 24.0 on an 8-core CPU = Heavily saturated, 16 processes queuing.",
          "If load average is high but CPU utilization (`top %cpu`) is low, processes are waiting on slow disk I/O or network file shares!"
        ],
        codeSnippet: {
          command: "vmstat 1 5",
          explanation: "Samples system activity every second. Columns 'r' (runnable) and 'b' (blocked on I/O) are the first indicators of bottlenecks.",
          output: `procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 6  2      0 421892  84120 1823904    0    0   120  4500 1204 2410 45 12 38  5  0
 8  3      0 410280  84120 1823904    0    0     0  9200 1450 3120 50 15 25 10  0`
        },
        proTip: "Look at column 'wa' (I/O Wait). If %wa is above 20%, your CPU is idle waiting for storage drives to respond. Focus your investigation on disks (`iostat -xz 1`).",
        interactiveCommand: "uptime"
      }
    ],
    productionScenario: {
      problem: "Java application suddenly terminated without generating an application crash log or stacktrace.",
      triage: "Check Linux kernel messages for the OOM killer invoked when memory and swap are exhausted.",
      resolutionCommand: "dmesg -T | grep -i 'killed process' # Out of memory: Killed process 3841 (java)"
    }
  },
  {
    id: "backup-recovery",
    moduleNumber: "10",
    title: "Backup, Disaster Recovery & Rescue Ops",
    badge: "Disaster Recovery",
    duration: "30 min read",
    difficulty: "Advanced",
    category: "Recovery",
    icon: "RotateCcw",
    overview: "Formulate bulletproof disaster recovery plans using `rsync` over SSH, incremental `tar` archives, LVM snapshots, and boot into chroot rescue environments to fix unbootable systems.",
    keyConcepts: [
      "The 3-2-1 Enterprise Backup Architecture",
      "Mastering `rsync -avzP --delete` for differential mirror synchronization",
      "LVM volume snapshots for point-in-time zero-downtime database backups",
      "Booting into Live Rescue ISO and chrooting into corrupted root (/)",
      "Rebuilding initramfs and reinstalling GRUB2 bootloader"
    ],
    architectureDiagram: `
+---------------------------------------------------------------+
|                 CHROOT DISASTER RESCUE WORKFLOW               |
|                                                               |
|  [Live Boot ISO] ---> Mount broken root to /mnt               |
|                        |                                      |
|                  Bind mount virtual pseudo-filesystems:       |
|                  mount --bind /dev /mnt/dev                   |
|                  mount --bind /proc /mnt/proc                 |
|                  mount --bind /sys /mnt/sys                   |
|                        |                                      |
|                  Execute: chroot /mnt                         |
|                        |                                      |
|  [NOW INSIDE BROKEN SYSTEM ENVIRONMENT AS ROOT]               |
|  - Fix corrupted /etc/fstab                                   |
|  - Reset forgotten root password (passwd)                     |
|  - Reinstall GRUB: grub2-install /dev/sda                     |
|  - Regenerate initramfs: update-initramfs -u                  |
+---------------------------------------------------------------+
    `,
    sections: [
      {
        heading: "1. The Production rsync Protocol",
        text: "Rsync uses an intelligent delta-transfer algorithm, only transmitting bytes that have changed between local and remote directories.",
        details: [
          "`-a` (archive): Preserves timestamps, permissions, symlinks, and user/group ownership.",
          "`-v` (verbose): Displays transferred files.",
          "`-z` (compress): Compresses file data during transmission.",
          "`-P` (progress & partial): Keeps partially transferred files for resume support.",
          "`--delete`: Deletes extraneous files from the receiving directory."
        ],
        codeSnippet: {
          command: "rsync -avzP -e 'ssh -p 2222' /var/www/ backup@remote.nas:/backups/www/",
          explanation: "Safely syncs production web directory over custom SSH port with bandwidth efficiency.",
          output: `sending incremental file list
wp-content/uploads/2026/10/architecture.png
      3,412,890 100%   28.40MB/s    0:00:00 (xfr#1, to-chk=4/120)

sent 3,413,200 bytes  received 45 bytes  2,275,496.67 bytes/sec
total size is 1.45GB  speedup is 424.81`
        },
        proTip: "ALWAYS run rsync with `-n` or `--dry-run` first when using `--delete`! A single trailing slash mistake could wipe your destination folder.",
        interactiveCommand: "rsync --help | head -n 10"
      }
    ],
    productionScenario: {
      problem: "Server failed kernel update and boots into a GRUB rescue prompt with 'error: no such partition'.",
      triage: "1. Boot server with Ubuntu Live Server ISO.\n2. Mount `/dev/sda2` to `/mnt`.\n3. Bind mount /dev, /proc, /sys into /mnt.\n4. Run `chroot /mnt`.\n5. Run `grub-install /dev/sda && update-grub`.\n6. Reboot into fully restored OS.",
      resolutionCommand: "chroot /mnt /bin/bash"
    }
  }
];
