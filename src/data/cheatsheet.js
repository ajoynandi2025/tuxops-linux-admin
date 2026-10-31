export const CHEATSHEET_DATA = [
  // Storage & Disks
  {
    category: "Storage",
    command: "df -hT",
    description: "Display filesystem disk space usage and filesystem types in human-readable format",
    example: "df -hT | grep ext4",
    tag: "Essential"
  },
  {
    category: "Storage",
    command: "du -sh /var/* | sort -h",
    description: "Estimate directory space usage sorted by size to find disk hogs",
    example: "du -sh * | sort -h",
    tag: "Triage"
  },
  {
    category: "Storage",
    command: "lsblk -f",
    description: "List all block devices with filesystem UUIDs and mount points",
    example: "lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT,UUID",
    tag: "LVM/Disks"
  },
  {
    category: "Storage",
    command: "lvextend -L +20G /dev/vg0/lv_root -r",
    description: "Extend Logical Volume by 20GB and resize filesystem online in one command",
    example: "lvextend -l +100%FREE /dev/vg_data/lv_app -r",
    tag: "LVM"
  },
  {
    category: "Storage",
    command: "mount -o remount,rw /",
    description: "Remount root filesystem in read-write mode when booted in rescue/emergency shell",
    example: "mount -o remount,rw /",
    tag: "Rescue"
  },

  // Permissions & Users
  {
    category: "Permissions",
    command: "chmod 755 filename.sh",
    description: "Grant rwx to owner, rx to group, rx to others (octal 755)",
    example: "chmod +x deploy.sh",
    tag: "Security"
  },
  {
    category: "Permissions",
    command: "chown -R www-data:www-data /var/www/html",
    description: "Recursively change user and group ownership of directory",
    example: "chown nginx:nginx /srv/site",
    tag: "Essential"
  },
  {
    category: "Permissions",
    command: "chmod 2775 /shared_dir",
    description: "Set SGID bit so newly created files automatically inherit parent directory group",
    example: "chmod g+s /opt/dev_team",
    tag: "Advanced"
  },
  {
    category: "Permissions",
    command: "setfacl -m u:deploy:rwx /var/log/app",
    description: "Grant specific POSIX ACL access permissions to user without altering group owner",
    example: "getfacl /var/log/app",
    tag: "ACL"
  },
  {
    category: "Permissions",
    command: "usermod -aG sudo,docker username",
    description: "Append user to secondary groups without overwriting existing memberships",
    example: "usermod -aG wheel devops",
    tag: "Users"
  },

  // Systemd & Services
  {
    category: "Systemd",
    command: "systemctl status service_name",
    description: "Inspect live running status, PID, memory usage, and recent logs of a daemon",
    example: "systemctl status nginx -l",
    tag: "Essential"
  },
  {
    category: "Systemd",
    command: "systemctl daemon-reload",
    description: "Reload systemd manager configuration after editing unit files in /etc/systemd/system",
    example: "systemctl daemon-reload",
    tag: "Must Know"
  },
  {
    category: "Systemd",
    command: "systemctl mask bad-service",
    description: "Symlink unit file to /dev/null to make it impossible to start manually or automatically",
    example: "systemctl unmask bad-service",
    tag: "Security"
  },
  {
    category: "Systemd",
    command: "journalctl -u nginx --since '30m ago' -f",
    description: "Stream live logs for specific unit starting from 30 minutes ago",
    example: "journalctl -u docker.service -p err..alert",
    tag: "Logs"
  },
  {
    category: "Systemd",
    command: "systemd-analyze blame",
    description: "Print list of running units ordered by the time each took to initialize during boot",
    example: "systemd-analyze blame | head -n 10",
    tag: "Performance"
  },

  // Process & Diagnostics
  {
    category: "Processes",
    command: "ps aux --sort=-%mem | head -n 10",
    description: "Find the top 10 memory-consuming processes on the server",
    example: "ps aux --sort=-%cpu | head -n 10",
    tag: "Triage"
  },
  {
    category: "Processes",
    command: "fuser -k 8080/tcp",
    description: "Identify and immediately kill the process holding open TCP port 8080",
    example: "fuser 80/tcp",
    tag: "Emergency"
  },
  {
    category: "Processes",
    command: "lsof -i :443",
    description: "List all open files and active sockets associated with port 443",
    example: "lsof -u nginx",
    tag: "Sockets"
  },
  {
    category: "Processes",
    command: "kill -15 PID (SIGTERM) vs kill -9 PID (SIGKILL)",
    description: "Gracefully request process termination (15) vs forceful uncatchable kill (9)",
    example: "kill -SIGTERM 1402",
    tag: "Processes"
  },

  // Networking & Firewall
  {
    category: "Networking",
    command: "ss -tulpn",
    description: "Display all listening TCP & UDP sockets with process names and PIDs",
    example: "ss -tulpn | grep 3306",
    tag: "Networking"
  },
  {
    category: "Networking",
    command: "ip -br a",
    description: "Show brief, clean one-line status and IP addresses of all network interfaces",
    example: "ip -c a",
    tag: "Networking"
  },
  {
    category: "Networking",
    command: "ufw allow proto tcp from 192.168.1.0/24 to any port 22",
    description: "Allow SSH only from a specific internal CIDR subnet on Ubuntu/Debian",
    example: "ufw status numbered",
    tag: "Firewall"
  },
  {
    category: "Networking",
    command: "dig +short example.com @1.1.1.1",
    description: "Query DNS record against Cloudflare DNS returning only the IP address",
    example: "dig example.com ANY",
    tag: "DNS"
  },
  {
    category: "Networking",
    command: "curl -Iv https://api.production.com",
    description: "Test HTTP headers, TLS certificate validity, and SSL handshake details",
    example: "curl -I -k https://localhost:8443",
    tag: "HTTP/TLS"
  },

  // Security & Hardening
  {
    category: "Security",
    command: "fail2ban-client status sshd",
    description: "Check Fail2ban active jail status and count of currently banned IP addresses",
    example: "fail2ban-client set sshd unbanip 1.2.3.4",
    tag: "Security"
  },
  {
    category: "Security",
    command: "restorecon -Rv /var/www/html",
    description: "Restore default SELinux security contexts recursively across files",
    example: "ls -Z /var/www/html",
    tag: "SELinux"
  },
  {
    category: "Security",
    command: "last -n 15",
    description: "Show last 15 successfully logged-in users, reboot timestamps, and terminal types",
    example: "lastb # Failed login attempts",
    tag: "Auditing"
  },
  {
    category: "Security",
    command: "find / -perm -4000 -type f 2>/dev/null",
    description: "Find all SUID binaries on the filesystem that execute as root",
    example: "find / -perm -2000 -type f 2>/dev/null",
    tag: "Auditing"
  },

  // Search & Text Wrangling
  {
    category: "Search",
    command: "grep -rnw '/etc/' -e '192.168.1.10'",
    description: "Recursively search for exact whole word match across all files in /etc",
    example: "grep -i 'error' /var/log/syslog",
    tag: "Text"
  },
  {
    category: "Search",
    command: "find /var/log -type f -name '*.log' -mtime +30 -exec gzip {} \\;",
    description: "Find log files older than 30 days and compress them in place with gzip",
    example: "find . -type f -size +100M",
    tag: "Maintenance"
  },
  {
    category: "Search",
    command: "awk -F: '$3 >= 1000 {print $1, $3}' /etc/passwd",
    description: "Filter /etc/passwd and print standard non-system human user accounts (UID >= 1000)",
    example: "cut -d: -f1 /etc/passwd",
    tag: "Text"
  }
];
