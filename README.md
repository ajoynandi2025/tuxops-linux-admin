# TuxOps — Modern Linux System Administration Handbook

**TuxOps** is an exhaustive, page-by-page technical handbook for modern Linux System Administration. Built with **React**, **Vite**, and **Tailwind CSS**, each of the **25 distinct topics** is documented on its own dedicated page with deep kernel architecture, command breakdowns, real terminal outputs, and production hardening.

---

## 📚 Curriculum Structure (25 Dedicated Topic Pages)

### Phase 1: Foundations & Architecture
1. **Topic 01: Linux Kernel Architecture, Rings & System Calls** — Monolithic kernel, Ring 0 vs Ring 3, system calls (strace), and loadable kernel modules.
2. **Topic 02: The 4-Stage Linux Boot Sequence** — UEFI/BIOS, GRUB2 parameters, vmlinuz/initramfs, systemd-analyze, and rescue targets.
3. **Topic 03: Filesystem Hierarchy Standard (FHS)** — Inverted tree structure, `/etc`, `/var`, `/proc`, `/sys`, and `/dev` virtual pseudo-filesystems.
4. **Topic 04: Bash Shell Environment, Variables & Redirection** — Scoping (`export`), shell dotfiles (`.bashrc`, `.profile`), and file descriptors (`stdin`, `stdout`, `stderr`, `2>&1`).

### Phase 2: Users & Permissions
5. **Topic 05: User & Group Administration** — UIDs, `/etc/passwd`, `/etc/shadow`, user provisioning (`useradd`, `usermod -aG`), and account aging (`chage`).
6. **Topic 06: POSIX Permissions, SUID, SGID & ACLs** — Octal masks, symbolic notation, special bits (SUID 4000, SGID 2000, Sticky 1000), and POSIX ACLs (`setfacl`, `getfacl`).
7. **Topic 07: Sudo Security & PAM Authentication** — Sudoers syntax delegation, `visudo` validation, and Pluggable Authentication Modules (PAM) stack.

### Phase 3: Storage & Filesystems
8. **Topic 08: Disk Partitioning: MBR vs. GPT** — Block device identification (`sdX`, `nvmeXnY`), MBR vs GPT, `lsblk`, `blkid`, and `parted`.
9. **Topic 09: Logical Volume Manager (LVM)** — 3-tier architecture (PV, VG, LV) and online dynamic volume growth with `lvextend -r`.
10. **Topic 10: Linux Filesystems & /etc/fstab** — ext4 vs. XFS vs. Btrfs, the 6 columns of `/etc/fstab`, `noatime` optimization, and validating with `mount -a`.
11. **Topic 11: Swap Space & Virtual Memory** — Dynamic swap files, swappiness tuning (`vm.swappiness`), anonymous memory, and OOM mitigation.

### Phase 4: Processes & Systemd
12. **Topic 12: Process Lifecycle & POSIX Signals** — Process states (`R`, `S`, `D`, `Z`), priority (`nice`/`renice`), and signal handling (`SIGTERM 15`, `SIGKILL 9`, `SIGHUP 1`).
13. **Topic 13: Systemd Service Units** — Writing custom unit files, dependency ordering, security sandboxing (`ProtectSystem`, `NoNewPrivileges`), and unit masking.
14. **Topic 14: Task Scheduling: Cron & Systemd Timers** — Crontab 5-field syntax, environment caveats, and modern `.timer` units.

### Phase 5: Logging & Auditing
15. **Topic 15: Systemd Journal (journalctl)** — Binary journal queries, priority filtering, boot crash analysis (`-b -1`), and disk vacuuming.
16. **Topic 16: Log Rotation & Linux Auditing (auditd)** — `logrotate` policies, compression, and kernel audit rules with `auditctl` and `ausearch`.

### Phase 6: Networking & Firewalls
17. **Topic 17: Modern Networking with iproute2** — Replacing legacy net-tools (`ip`, `ss`), socket statistics, routing tables, and DNS resolution.
18. **Topic 18: OpenSSH Server Hardening** — ED25519 elliptic curve keys, passwordless authentication, `sshd_config` directives, and Fail2ban.
19. **Topic 19: Linux Firewalls: UFW & Firewalld** — Default deny policies, port filters, CIDR subnets, and `nftables` kernel packet classification.

### Phase 7: Package Management & Source Compilation
20. **Topic 20: Package Management: APT & DNF** — Low-level backends (`dpkg`, `rpm`) vs high-level frontends (`apt`, `dnf`), repository keys, and orphan cleanup.
21. **Topic 21: Building Software from Source** — GNU Autotools pipeline (`./configure`, `make -j`, `make install`), shared libraries, and `ldconfig`.

### Phase 8: Security, Performance & Disaster Recovery
22. **Topic 22: SELinux Mandatory Access Control** — Type Enforcement (`httpd_sys_content_t`), modes, contexts, booleans (`setsebool`), and AVC denial triage (`audit2why`).
23. **Topic 23: Linux Kernel Hardening via sysctl** — SYN cookies, IP forwarding restrictions, spoofing defense (`rp_filter`), and ASLR.
24. **Topic 24: Performance Monitoring & The USE Method** — Demystifying load averages, I/O wait (`%wa`), memory saturation, and 60-second triage.
25. **Topic 25: Disaster Recovery & Chroot Rescue Mode** — Booting live rescue ISOs, bind-mounting pseudo-filesystems, chrooting into broken roots, and repairing GRUB2.

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📦 Build for Production / GitHub Pages

```bash
npm run build
```
Generates production-ready static assets in `dist/`. With `base: './'` configured in `vite.config.js` and `.github/workflows/deploy.yml` included, pushing to GitHub automatically deploys the site to GitHub Pages!
