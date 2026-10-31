# TuxOps — Modern Linux System Administration Academy & Interactive Labs

**TuxOps** is a comprehensive, production-grade Linux System Administration tutorial website and interactive learning platform built with **React**, **Vite**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🚀 Key Features

### 1. High-Impact Tech & DevOps Home Page
- **Live In-Browser Terminal Emulator**: Fully simulated bash environment with commands like `neofetch`, `df -h`, `uname -r`, `ps aux`, `uptime`, `cat /etc/os-release`, `systemctl status nginx`, quick-run action chips, command history, and session copy.
- **Interactive SysAdmin Toolkit**:
  - **Chmod Permissions Calculator**: Visual checkboxes for Owner/Group/Others, octal (`755`), symbolic (`rwxr-xr-x`), SUID/SGID/Sticky bit support, and instant presets.
  - **Systemd Service Generator**: Form-driven `.service` file builder with sandbox hardening (`ProtectSystem`, `ProtectHome`, `NoNewPrivileges`).
  - **Visual Crontab Scheduler**: Intuitive 5-field time picker with real-time human-readable translations and execution redirect safeguards.
  - **UFW & Firewalld Rule Generator**: Generates safe firewall rules with source CIDR subnets and port filters for Debian/Ubuntu or RHEL/Rocky.
- **Production War Room Triage**: Playbooks for 100% full root disks, zombie processes, OOM killer crashes, and DNS timeouts.
- **Enterprise Linux Distro Comparison Matrix**: Ubuntu Server vs. RHEL/Rocky/Alma vs. Debian vs. Alpine.
- **RHCSA / LFCS Certification Readiness Callouts**.

### 2. 10 Deep-Dive Curriculum Modules (Handbook & Reader)
1. **Module 01: Foundations & Boot Architecture** (UEFI/BIOS, GRUB2, Kernel/initramfs, systemd, FHS directory tree).
2. **Module 02: User, Group & Permission Management** (UID/GID, /etc/passwd & /etc/shadow, SUID/SGID/Sticky, ACLs, sudoers).
3. **Module 03: Storage Management, Filesystems & LVM** (PV/VG/LV sizing, ext4 vs XFS, `/etc/fstab` structure & UUIDs, swap tuning).
4. **Module 04: Systemd, Services & Process Control** (Unit files, targets, journalctl log diagnostics, kill signals).
5. **Module 05: Networking, Firewalls & SSH Hardening** (`ip`, `ss`, systemd-resolved, UFW/Firewalld, fail2ban, SSH key security).
6. **Module 06: Package Management & Repositories** (APT vs DNF/RPM vs Pacman, repository keys, compilation from source).
7. **Module 07: Security Hardening, SELinux & Auditing** (SELinux contexts & booleans, AppArmor profiles, sysctl kernel flags).
8. **Module 08: Bash Scripting & SysAdmin Automation** (`set -euo pipefail` strict mode, traps, idempotent maintenance scripts).
9. **Module 09: Performance Tuning & Troubleshooting** (Load average triage, memory leaks, I/O bottlenecks with `vmstat` & `iostat`).
10. **Module 10: Backup, Disaster Recovery & Rescue Ops** (3-2-1 rule, `rsync` flags, LVM snapshots, GRUB rescue & chroot recovery).

### 3. Interactive Web Lab & Certification Quiz
- **Global Lab Shell**: Accessible from the top navbar or directly via "Run in Lab" buttons inside tutorials.
- **150+ Command Cheat Sheet**: Instant search modal (`Ctrl+K`) with copy-to-clipboard functionality and category filters.
- **Certification Exam Simulator**: 8-question multiple-choice quiz covering RHCSA/LFCS objectives with instant explanations and scoring.
- **Persistent Progress Tracking**: Saves completed modules and quiz progress in browser `localStorage`.

---

## 🛠️ Getting Started

### Start the Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```
Generates optimized static HTML, CSS, and JS in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
