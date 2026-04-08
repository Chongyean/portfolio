import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconCloudDemo from "@/components/globe";
import { Code2, Search, Bug, Zap, Terminal, Globe, Shield } from "lucide-react";
import {
  FaReact,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
} from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";
import { BsFileEarmarkCode, BsTerminal, BsShieldLock } from "react-icons/bs";
import { MdOutlinePolicy, MdOutlineBugReport } from "react-icons/md";
import { FcWorkflow } from "react-icons/fc";
import { BiNetworkChart } from "react-icons/bi";

// ── Inline tag for tools without a react-icon ─────────────────────────────────
const Ico = ({ label, color }) => (
  <span
    style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", fontWeight: 800 }}
    className={color}
  >
    {label}
  </span>
);

// ── SkillCard — original structure + new accent enhancements layered in ────────
const SkillCard = ({ icon: Icon, title, skills, color, accent }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <Card
      className="group relative overflow-hidden border border-white/10 bg-[linear-gradient(160deg,rgba(18,26,45,0.92),rgba(8,14,28,0.94))]
        backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.015]
        hover:shadow-[0_24px_60px_-30px_rgba(16,185,129,0.55)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-35 pointer-events-none" />
      <div className="absolute inset-x-8 -bottom-12 h-24 rounded-full bg-black/50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* NEW ── per-card colour accent bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: accent }}
      />

      {/* ORIGINAL ── shimmer sweep (colour shifted to green) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,255,160,0.05)] to-transparent group-hover:via-[rgba(100,255,160,0.12)] animate-shimmer pointer-events-none"></div>

      <CardContent className="p-6 relative z-10">
        {/* ORIGINAL ── icon + title row */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`p-3 rounded-xl bg-gray-800/50 ${color} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-8 h-8" />
          </div>
          {/* NEW ── monospace title, keeps original gradient clip */}
          <h3
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {title}
          </h3>
        </div>

        {/* ORIGINAL ── badge grid with hover scale */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="group/badge relative bg-gray-800/55 hover:bg-gray-700/85 text-gray-100
                border border-white/10 flex items-center gap-2 py-2 px-3 transition-all duration-300
                hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_10px_30px_-14px_rgba(96,165,250,0.85)]"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "12px",
                /* NEW ── per-card accent glow on individual badge hover */
                boxShadow: hovered === index ? `0 0 10px ${accent}55` : undefined,
                borderColor: hovered === index ? `${accent}66` : undefined,
              }}
            >
              <span className="transform group-hover/badge:scale-110 transition-transform duration-300">
                {skill.icon}
              </span>
              <span className="font-medium">{skill.name}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ── Main section ───────────────────────────────────────────────────────────────
const SkillsSection = () => {
  const skillCategories = [
    // ── 1. Recon & OSINT ──────────────────────────────────────────────────────
    {
      icon: Search,
      title: "Recon & OSINT",
      color: "text-emerald-400",
      accent: "#34d399",
      skills: [
        { name: "subfinder",     icon: <Ico label="go"   color="text-cyan-400" /> },
        { name: "httpx",         icon: <Ico label="go"   color="text-cyan-400" /> },
        { name: "nmap",          icon: <Ico label="c"    color="text-green-400" /> },
        { name: "shodan",        icon: <Ico label="api"  color="text-red-400" /> },
        { name: "waybackurls",   icon: <Ico label="go"   color="text-cyan-400" /> },
        { name: "amass",         icon: <Ico label="go"   color="text-cyan-400" /> },
        { name: "whois / OSINT", icon: <Ico label="~"    color="text-gray-400" /> },
      ],
    },

    // ── 2. Web App Testing ────────────────────────────────────────────────────
    {
      icon: Bug,
      title: "Web App Testing",
      color: "text-orange-400",
      accent: "#fb923c",
      skills: [
        { name: "Burp Suite",   icon: <MdOutlineBugReport className="w-4 h-4 text-orange-400" /> },
        { name: "sqlmap",       icon: <FaPython className="w-4 h-4 text-[#3776AB]" /> },
        { name: "ffuf",         icon: <Ico label="go"  color="text-cyan-400" /> },
        { name: "gobuster",     icon: <Ico label="go"  color="text-cyan-400" /> },
        { name: "nuclei",       icon: <Ico label="go"  color="text-cyan-400" /> },
        { name: "OWASP Top 10", icon: <BsShieldLock className="w-4 h-4 text-red-400" /> },
        { name: "XSS / CSRF",   icon: <Ico label="js"  color="text-yellow-300" /> },
        { name: "SQLi / IDOR",  icon: <Ico label="db"  color="text-blue-300" /> },
      ],
    },

    // ── 3. Exploitation ───────────────────────────────────────────────────────
    {
      icon: Zap,
      title: "Exploitation",
      color: "text-red-400",
      accent: "#f87171",
      skills: [
        { name: "Metasploit",    icon: <Ico label="msf" color="text-red-400" /> },
        { name: "CVE research",  icon: <MdOutlinePolicy className="w-4 h-4 text-orange-300" /> },
        { name: "Hydra",         icon: <Ico label="c"   color="text-green-400" /> },
        { name: "john / hashcat",icon: <Ico label="pw"  color="text-purple-300" /> },
        { name: "Docker labs",   icon: <FaDocker className="w-4 h-4 text-[#2496ED]" /> },
        { name: "Vulhub",        icon: <Ico label="⚡"  color="text-yellow-400" /> },
      ],
    },

    // ── 4. Post-Exploitation ──────────────────────────────────────────────────
    {
      icon: Terminal,
      title: "Post-Exploitation",
      color: "text-purple-400",
      accent: "#c084fc",
      skills: [
        { name: "Meterpreter",  icon: <BsTerminal className="w-4 h-4 text-red-300" /> },
        { name: "privesc",      icon: <Ico label="↑"    color="text-yellow-400" /> },
        { name: "Ligolo-ng",    icon: <BiNetworkChart className="w-4 h-4 text-cyan-400" /> },
        { name: "pivoting",     icon: <Ico label="⇄"    color="text-gray-300" /> },
        { name: "Nessus",       icon: <Ico label="scan" color="text-blue-300" /> },
        { name: "tcpdump",      icon: <Ico label="pcap" color="text-green-300" /> },
      ],
    },

    // ── 5. Bug Bounty ─────────────────────────────────────────────────────────
    {
      icon: Globe,
      title: "Bug Bounty",
      color: "text-yellow-400",
      accent: "#facc15",
      skills: [
        { name: "HackerOne",        icon: <Ico label="h1"  color="text-yellow-300" /> },
        { name: "Report writing",   icon: <BsFileEarmarkCode className="w-4 h-4 text-gray-300" /> },
        { name: "Recon automation", icon: <FcWorkflow className="w-4 h-4" /> },
        { name: "Grab program",     icon: <Ico label="🟢"  color="text-green-400" /> },
        { name: "Auth testing",     icon: <BsShieldLock className="w-4 h-4 text-yellow-400" /> },
        { name: "Triage & CVSS",    icon: <Ico label="★"   color="text-red-300" /> },
      ],
    },

    // ── 6. Dev & Automation ───────────────────────────────────────────────────
    {
      icon: Code2,
      title: "Dev & Automation",
      color: "text-blue-400",
      accent: "#60a5fa",
      skills: [
        { name: "Python",      icon: <FaPython className="w-4 h-4 text-[#3776AB]" /> },
        { name: "Bash",        icon: <Ico label="sh"  color="text-green-400" /> },
        { name: "React",       icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
        { name: "n8n",         icon: <FcWorkflow className="w-4 h-4" /> },
        { name: "Docker",      icon: <FaDocker className="w-4 h-4 text-[#2496ED]" /> },
        { name: "Git",         icon: <FaGitAlt className="w-4 h-4 text-[#F05032]" /> },
        { name: "Linux / Kali",icon: <FaLinux className="w-4 h-4 text-[#FCC624]" /> },
        { name: "VS Code",     icon: <TbBrandVscode className="w-4 h-4 text-[#007ACC]" /> },
      ],
    },
  ];

  return (
    <main className="pt-15 lg:pt-0 text-white min-h-screen bg-[#04081A] relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(56,189,248,0.2),transparent_38%),radial-gradient(circle_at_84%_24%,rgba(16,185,129,0.22),transparent_36%),radial-gradient(circle_at_52%_82%,rgba(251,146,60,0.18),transparent_40%)] pointer-events-none" />
      <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl animate-float-orb pointer-events-none" />
      <div className="absolute top-40 -right-24 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl animate-float-orb-delayed pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.7)_100%)] pointer-events-none" />

      {/* ORIGINAL ── grid background (tint shifted to green) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <section className="container mx-auto px-4 py-11 relative z-10">
        {/* ORIGINAL ── globe */}
        <div className="flex justify-center items-center">
          <IconCloudDemo />
        </div>

        {/* NEW ── section label */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span
            className="text-xs tracking-[0.3em] text-emerald-400/70 uppercase"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {"// attack surface"}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/20 to-transparent" />
        </div>

        {/* ORIGINAL ── 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              color={category.color}
              accent={category.accent}
            />
          ))}
        </div>
      </section>

      {/* ORIGINAL ── keyframes + grid, colour updated to green */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes floatOrb {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-16px) translateX(10px) scale(1.05);
          }
        }
        .animate-float-orb {
          animation: floatOrb 9s ease-in-out infinite;
        }
        .animate-float-orb-delayed {
          animation: floatOrb 12s ease-in-out infinite reverse;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(52, 211, 153, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(52, 211, 153, 0.1) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }
      `}</style>
    </main>
  );
};

export default SkillsSection;
