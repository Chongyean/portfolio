import IconCloud from "./ui/icon-cloud";

const kaliIconModules = import.meta.glob("../assets/kali icons/*.svg", {
    eager: true,
    import: "default",
  });

const toTitle = (value) =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

// Edit descriptions here for Kali tool icons.
// Key can be the file slug (e.g. "ghidra") or title form (e.g. "Ghidra").
const kaliIconDescriptions = {
  "aircrack-ng": "Aircrack-ng is used to audit and crack wireless network security.",
  bloodhound: "BloodHound maps Active Directory relationships to identify attack paths.",
  burpsuite: "Burp Suite is a web security testing platform for intercepting and analyzing HTTP traffic.",
  dirb: "DIRB brute-forces web directories and files on target web servers.",
  dirbuster: "DirBuster discovers hidden directories and files through wordlist-based fuzzing.",
  dnsrecon: "DNSRecon performs DNS enumeration to uncover hosts, records, and zone data.",
  enum4linux: "Enum4linux extracts SMB and Windows domain information from target systems.",
  exploitdb: "Exploit-DB is a public archive of exploits and security vulnerability references.",
  "gemini-cli": "Gemini CLI is a command-line AI assistant for coding and workflow tasks.",
  ghidra: "Ghidra is a reverse engineering suite for disassembly and binary analysis.",
  gobuster: "Gobuster performs fast directory, DNS, and virtual host brute-forcing.",
  hashcat: "Hashcat is a high-performance password recovery and hash cracking tool.",
  hydra: "Hydra performs parallelized online password attacks against many network protocols.",
  john: "John the Ripper audits password strength by cracking password hashes.",
  "ligolo-ng": "Ligolo-ng creates advanced tunnels and pivots during internal network assessments.",
  "metasploit-framework": "Metasploit Framework is used to develop, test, and execute exploit modules.",
  mimikatz: "Mimikatz extracts credentials and authentication material from Windows memory.",
  netcat: "Netcat is a networking utility for port listening, data transfer, and quick diagnostics.",
  nikto: "Nikto scans web servers for outdated software and common vulnerabilities.",
  nmap: "Nmap discovers hosts, open ports, and services for network reconnaissance.",
  "peass-ng": "PEASS-ng automates local privilege escalation checks on Linux and Windows.",
  seclists: "SecLists provides curated wordlists and payloads for security testing.",
  set: "Social-Engineer Toolkit simulates phishing and social engineering attack scenarios.",
  spiderfoot: "SpiderFoot automates OSINT collection and correlation for footprinting.",
  sqlmap: "sqlmap automates SQL injection detection and database takeover testing.",
  subfinder: "Subfinder discovers subdomains from passive intelligence sources.",
  theharvester: "theHarvester gathers emails, subdomains, and open-source intelligence data.",
  wifite: "Wifite automates wireless attack workflows for WEP/WPA auditing.",
  wireshark: "Wireshark captures and analyzes network packets for protocol-level investigation.",
  wordlists: "Wordlists are curated dictionaries used for fuzzing, brute-force, and enumeration tasks.",
};

const kaliIconImages = Object.entries(kaliIconModules)
  .filter(([path]) => !path.includes("kali-tools-icon-missing"))
  .map(([path, src]) => {
    const filename = path.split("/").pop()?.replace(".svg", "") || "kali-tool";
    const toolSlug = filename.replace(/-logo$/, "").replace(/-framework$/, "");
    const toolName = toTitle(toolSlug);
    const customAbout =
      kaliIconDescriptions[toolSlug] ||
      kaliIconDescriptions[toolName] ||
      "Add your custom description here.";

    return {
      src,
      name: toolName,
      about: customAbout,
    };
  });

const iconImages = [
  ...kaliIconImages,
  {
    src: "/vite.svg",
    name: "Vite",
    about: "Vite is a fast frontend build tool and dev server for modern web projects.",
  },
  {
    src: "/vercel.svg",
    name: "Vercel",
    about: "Vercel is a cloud platform for frontend deployment and edge-ready web apps.",
  },
];

const slugs = [
  "typescript",
  "javascript",
  "openjdk",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "postgresql",
  "mongodb",
  "firebase",
  "nginx",
  "docker",
  "kubernetes",
  "githubactions",
  "git",
  "github",
  "gitlab",
  "visualstudiocode",
  "figma",
  "linux",
  "kalilinux",
  "wireshark",
  "burpsuite",
  "metasploit",
  "postman",
  "python",
  "tailwindcss",
  "eslint",
];

const iconDescriptions = {
  typescript: "TypeScript adds static typing to JavaScript, helping build safer and scalable apps.",
  javascript: "JavaScript powers interactive behavior for web applications and modern frontends.",
  openjdk: "OpenJDK is the open-source Java platform used to build and run Java applications.",
  react: "React is the UI library used to build reusable component-based interfaces.",
  html5: "HTML5 provides the semantic structure of modern web pages and applications.",
  css3: "CSS3 styles and layouts responsive, polished user interfaces.",
  nextdotjs: "Next.js provides routing, rendering, and full-stack capabilities for React apps.",
  nodedotjs: "Node.js runs JavaScript on the server for APIs, tooling, and backend services.",
  express: "Express is a lightweight Node.js framework for building backend APIs and web services.",
  postgresql: "PostgreSQL is a relational database used for reliable structured data storage.",
  mongodb: "MongoDB is a document database that stores flexible JSON-like data structures.",
  firebase: "Firebase provides backend services such as authentication, hosting, and cloud databases.",
  nginx: "Nginx is used as a high-performance web server, reverse proxy, and load balancer.",
  docker: "Docker packages apps into portable containers for consistent deployments.",
  kubernetes: "Kubernetes orchestrates and scales containerized workloads across environments.",
  githubactions: "GitHub Actions automates CI/CD workflows for testing, building, and deployment.",
  git: "Git is the version control system used to track source code history and collaboration.",
  github: "GitHub hosts repositories and enables collaboration through pull requests and issues.",
  gitlab: "GitLab provides source control and DevOps pipelines for software delivery.",
  visualstudiocode: "Visual Studio Code is the primary editor for coding, debugging, and extensions.",
  figma: "Figma is used for interface design, prototyping, and collaboration.",
  linux: "Linux is the operating system foundation for servers, security tooling, and development.",
  kalilinux: "Kali Linux is a security-focused distribution with tools for penetration testing.",
  wireshark: "Wireshark captures and inspects network packets for troubleshooting and analysis.",
  burpsuite: "Burp Suite is used for web application security testing and traffic interception.",
  metasploit: "Metasploit is a penetration testing framework for exploit development and validation.",
  postman: "Postman is used to design, test, and document HTTP APIs.",
  python: "Python is used for automation, scripting, and security tooling in this stack.",
  tailwindcss: "Tailwind CSS is a utility-first framework for rapidly styling modern interfaces.",
  eslint: "ESLint enforces code quality and consistent JavaScript/TypeScript coding standards.",
};

function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg  px-20 pb-20 pt-8 bg-transparent">
      <IconCloud iconSlugs={slugs} imageArray={iconImages} iconDescriptions={iconDescriptions} />
    </div>
  );
}

export default IconCloudDemo;
