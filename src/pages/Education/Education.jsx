import { useEffect, useRef, useState } from "react";

import {
  Award,
  Calendar,
  BookOpen,
  GraduationCap,
  Trophy,
  Binary,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import gif200 from "../../assets/images/200.gif";
import salaCyberIcon from "../../assets/images/salaCyber_icon.jpg";
import hackerIcon from "../../assets/images/hacker_icon.jpg";
import instinctIcon from "../../assets/images/instinct_icon.jpg";
import ruppLogo from "../../assets/images/rupp_logo.png";

// Floating Enchanted Particles Component
const EnchantedParticles = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-emerald-300 via-lime-300 to-cyan-300 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight - 500,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(16, 185, 129, 0.7)`,
          }}
        />
      ))}
    </div>
  );
};

EnchantedParticles.propTypes = {
  count: PropTypes.number,
};

// Hacker Glyph Component
const HackerGlyph = () => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.3 }}
      className="inline-block"
    >
      <Binary size={20} className="text-emerald-300" />
    </motion.span>
  );
};

const EducationSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [salaCyberPhase, setSalaCyberPhase] = useState("idle");
  const salaCyberTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (salaCyberTimerRef.current) {
        clearTimeout(salaCyberTimerRef.current);
      }
    };
  }, []);

  const startSalaCyberHover = (index, school) => {
    setHoveredIndex(index);

    if (school !== "SalaCyber Academy") {
      return;
    }

    if (salaCyberTimerRef.current) {
      clearTimeout(salaCyberTimerRef.current);
    }

    setSalaCyberPhase("glitching");
    salaCyberTimerRef.current = setTimeout(() => {
      setSalaCyberPhase("jumpscare");
      // Auto-reset after 1.5 seconds
      const resetTimer = setTimeout(() => {
        setSalaCyberPhase("idle");
      }, 1500);
      return () => clearTimeout(resetTimer);
    }, 3000);
  };

  const endSalaCyberHover = (school) => {
    setHoveredIndex(null);

    if (school !== "SalaCyber Academy") {
      return;
    }

    if (salaCyberTimerRef.current) {
      clearTimeout(salaCyberTimerRef.current);
      salaCyberTimerRef.current = null;
    }

    setSalaCyberPhase("idle");
  };

  const educationData = [
    {
      degree: "Information Technology Engineering",
      school: "Royal University of Phnom Penh",
      Icon: GraduationCap,
      logo: ruppLogo,
      schoolLink: "https://www.facebook.com/ruppedu.kh",
      year: "2023 - 2027",
      achievements: ["GPA: 3.8", "Subject: ITE"],
      skills: [
        "Networking", "Programming", "Database Management", "Web Development", 
        "Cybersecurity", "Cloud Computing", "Mobile Development", "Data Science",
        "Machine Learning", "AI", "Blockchain","Professionalism Computing & Ethics",
        "Software Engineering"
      ],
      description:
        "Currently pursuing a degree in Information Technology Engineering, focusing on various aspects of IT including networking, programming, and cybersecurity. Engaged in hands-on projects and collaborative learning.",
    },
    {
      degree: "SalaCyber Ethical Hacking Essentials",
      school: "SalaCyber Academy",
      Icon: BookOpen,
      logo: salaCyberIcon,
      schoolLink: "https://www.facebook.com/salacyber",
      year: "2026",
      achievements: ["Certified", "SEHE v2"],
      skills: ["Ethical Hacking", "Penetration Testing", "Cybersecurity Best Practices", "Vulnerability Assessment", "Network Security", "Web Application Security", "Cryptography", "Incident Response"],
      description:
        "Completed a specialist course in Ethical Hacking Essentials, gaining practical skills in penetration testing and cybersecurity best practices. This program provided a strong foundation in ethical hacking techniques and methodologies.",
    },
    {
      degree: "Frontend Development",
      school: "Instinct Institute",
      Icon: BookOpen,
      logo: instinctIcon,
      schoolLink: "https://www.facebook.com/instinct.institute",
      year: "2024",
      achievements: ["Certified", "Completion"],
      skills: ["React.js", "Next.js", "JavaScript", "Responsive Design", "UI/UX Principles", "Frontend Frameworks", "Version Control", "Web Performance Optimization"],
      description:
        "Completed a comprehensive course in Frontend Development, covering essential technologies such as HTML, CSS, and JavaScript. This program enhanced my ability to create responsive and visually appealing web interfaces.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen relative overflow-hidden py-40 bg-[#040A0A]">
      {/* Enchanted Particle Background */}
      <EnchantedParticles count={30} />

      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.11)_0%,rgba(0,0,0,0)_65%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.04] bg-[length:44px_44px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020505] via-transparent to-[#040A0A]" />
        <div className="absolute inset-0 border border-emerald-400/[0.08] grid grid-cols-2 md:grid-cols-4" />
        
        {/* Enchanted Glow Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-lime-500/15 rounded-full mix-blend-screen filter blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPositionY: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(16,185,129,0.04) 0px, rgba(16,185,129,0.04) 1px, transparent 2px, transparent 6px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            <HackerGlyph />
            <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-[0.14em] uppercase bg-gradient-to-r from-emerald-300 via-lime-300 to-cyan-300 bg-clip-text text-transparent mb-0 drop-shadow-[0_0_14px_rgba(52,211,153,0.6)]">
              Educational Journey
            </h2>
            <HackerGlyph />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100/80 max-w-2xl mx-auto text-lg"
          >
            Tracing the exploit-to-engineer path through rigorous training, systems thinking, and practical security craft.
          </motion.p>
        </motion.div>

        <motion.div
          id="certified"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {educationData.map((edu, index) => {
            const isHovered = hoveredIndex === index;
            const isSalaCyberHovered =
              isHovered && edu.school === "SalaCyber Academy";
            const isGlitching =
              isSalaCyberHovered && salaCyberPhase === "glitching";
            const isJumpscare =
              isSalaCyberHovered && salaCyberPhase === "jumpscare";

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`relative overflow-hidden border rounded-xl p-8 transition-all duration-300 group ${
                  isHovered ? "border-emerald-400/60 scale-[1.02]" : "border-cyan-400/20"
                }`}
                onMouseEnter={() => startSalaCyberHover(index, edu.school)}
                onMouseLeave={() => endSalaCyberHover(edu.school)}
              >
                {/* Enchanted Glow Background */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 via-lime-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100"
                  animate={{ opacity: isHovered ? 0.6 : 0.1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: isHovered
                      ? "radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.2), rgba(132, 204, 22, 0.1), rgba(34, 211, 238, 0.1))"
                      : "transparent",
                  }}
                />

                {/* Shimmer Effect */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-30"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                )}

                {/* Magical Border Glow */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)",
                        "0 0 40px rgba(132, 204, 22, 0.4), inset 0 0 20px rgba(132, 204, 22, 0.2)",
                        "0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)",
                        "0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Floating Sparkles on Hover */}
                {isHovered && (
                  <>
                    <motion.div
                      className="absolute -top-2 -right-2 w-2 h-2 bg-emerald-300 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        x: [0, 5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ filter: "drop-shadow(0 0 4px rgba(16, 185, 129, 0.9))" }}
                    />
                    <motion.div
                      className="absolute top-1/4 -right-1 w-1.5 h-1.5 bg-lime-300 rounded-full"
                      animate={{
                        y: [-10, 10, -10],
                        x: [0, -8, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      style={{ filter: "drop-shadow(0 0 3px rgba(132, 204, 22, 0.9))" }}
                    />
                    <motion.div
                      className="absolute -bottom-2 left-1/3 w-1 h-1 bg-cyan-400 rounded-full"
                      animate={{
                        y: [0, 15, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
                      style={{ filter: "drop-shadow(0 0 3px rgba(34, 211, 238, 0.8))" }}
                    />
                  </>
                )}

                <AnimatePresence>
                  {isJumpscare && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="absolute inset-0 z-20 overflow-hidden rounded-xl bg-black pointer-events-none"
                    >
                      {/* Main 200.gif with aggressive jumpscare shake */}
                      <motion.div
                        animate={{
                          x: [-12, 18, -15, 12, -8, 10, -5, 0],
                          y: [-10, 14, -12, 8, -6, 5, -2, 0],
                          scale: [1.3, 1.15, 1.4, 1.1, 1.35, 1.05, 1.25, 1.2],
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                      >
                        <motion.img
                          src={gif200}
                          alt="JUMPSCARE"
                          animate={{ rotate: [0, -2, 3, -1, 2, 0] }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="w-full h-full object-cover filter saturate-300 brightness-150 contrast-150"
                        />
                      </motion.div>

                      {/* Aggressive red glitch layer */}
                      <motion.div
                        animate={{
                          opacity: [0, 0.6, 0.3, 0.7, 0.4, 0.8, 0],
                          x: [-8, 10, -6, 4, 0],
                          y: [-6, 8, -4, 2, 0],
                        }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute inset-0 mix-blend-screen pointer-events-none"
                      >
                        <div className="w-full h-full bg-red-600/40 mix-blend-hard-light" />
                      </motion.div>

                      {/* Green glitch layer - intense */}
                      <motion.div
                        animate={{
                          opacity: [0.3, 0.8, 0.2, 0.9, 0.4, 0.85, 0.1],
                          x: [6, -12, 8, -4, 0],
                          y: [4, -10, 6, -2, 0],
                        }}
                        transition={{ duration: 0.38, ease: "easeInOut" }}
                        className="absolute inset-0 mix-blend-screen pointer-events-none"
                      >
                        <img src={gif200} alt="" className="w-full h-full object-cover hue-rotate-90 opacity-70" />
                      </motion.div>

                      {/* Rapid horizontal scan lines - very fast */}
                      <motion.div
                        animate={{
                          opacity: [0, 1, 0.5, 1, 0.3, 1, 0],
                          scaleX: [0.8, 1.1, 0.9, 1.2, 0.85, 1.1, 1],
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-x-0 top-1/4 h-2 bg-lime-400/90 shadow-[0_0_30px_rgba(163,230,53,1),inset_0_0_20px_rgba(163,230,53,0.8)]"
                      />

                      <motion.div
                        animate={{
                          opacity: [0.2, 0.9, 0.4, 0.95, 0.2, 0.9, 0],
                          scaleX: [0.9, 1.15, 0.88, 1.1, 0.92, 1.05, 1],
                          y: [-3, 3, -2, 2, -1, 1, 0],
                        }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-x-0 top-1/2 h-1.5 bg-emerald-300/95 shadow-[0_0_25px_rgba(16,185,129,1)]"
                      />

                      <motion.div
                        animate={{
                          opacity: [0.1, 0.85, 0.3, 0.9, 0.2, 0.85, 0],
                          scaleX: [0.85, 1.2, 0.92, 1.15, 0.88, 1.08, 1],
                        }}
                        transition={{ duration: 0.42, ease: "easeInOut" }}
                        className="absolute inset-x-0 bottom-1/4 h-2 bg-cyan-400/80 shadow-[0_0_28px_rgba(34,211,238,1)]"
                      />

                      {/* Vertical glitch stabs */}
                      <motion.div
                        animate={{
                          opacity: [0.4, 1, 0.5, 0.9, 0.3, 1, 0],
                          scaleY: [0.7, 1.3, 0.8, 1.2, 0.75, 1.25, 1],
                        }}
                        transition={{ duration: 0.38, ease: "easeInOut" }}
                        className="absolute inset-y-0 left-1/3 w-2 bg-lime-400/90 shadow-[0_0_25px_rgba(163,230,53,1)]"
                      />

                      <motion.div
                        animate={{
                          opacity: [0.3, 0.9, 0.4, 0.85, 0.2, 0.95, 0],
                          scaleY: [0.8, 1.25, 0.85, 1.3, 0.8, 1.2, 1],
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-y-0 right-1/3 w-1.5 bg-emerald-300/85 shadow-[0_0_22px_rgba(16,185,129,1)]"
                      />

                      {/* Flash overlay - intense white flashes */}
                      <motion.div
                        animate={{
                          opacity: [0, 0.9, 0, 0.8, 0, 0.85, 0],
                        }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute inset-0 bg-white/80 pointer-events-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className={`space-y-6 relative z-10 bg-[#05110F]/75 backdrop-blur-md rounded-lg p-4 -m-4 transition-all duration-200 ${
                    isJumpscare
                      ? "opacity-5 blur-[3px]"
                      : "opacity-100"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {edu.logo ? (
                        <div className="relative w-11 h-11 md:w-12 md:h-12 shrink-0">
                          <AnimatePresence mode="wait" initial={false}>
                            {isGlitching ? (
                              <motion.img
                                key="hacker"
                                src={hackerIcon}
                                alt="SalaCyber hacker icon"
                                initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0, x: [0, -1, 2, -2, 1, 0] }}
                                exit={{ opacity: 0, scale: 1.08, rotate: 5 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full rounded-md object-cover"
                              />
                            ) : (
                              <motion.img
                                key="edu-logo"
                                src={edu.logo}
                                alt={`${edu.school} logo`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full rounded-md object-cover"
                              />
                            )}
                          </AnimatePresence>

                          {isGlitching && (
                            <>
                              <motion.img
                                key="hacker-glitch-left"
                                src={hackerIcon}
                                alt=""
                                aria-hidden="true"
                                animate={{
                                  x: [-2, 2, -1, 1, 0],
                                  y: [0, -1, 1, -1, 0],
                                  opacity: [0.35, 0.7, 0.4, 0.8, 0.45],
                                }}
                                transition={{ duration: 0.32, repeat: Infinity, repeatType: "mirror" }}
                                className="absolute inset-0 w-full h-full rounded-md object-cover mix-blend-screen saturate-200 hue-rotate-90 opacity-60"
                              />
                              <motion.img
                                key="hacker-glitch-right"
                                src={hackerIcon}
                                alt=""
                                aria-hidden="true"
                                animate={{
                                  x: [2, -2, 1, -1, 0],
                                  y: [0, 1, -1, 1, 0],
                                  opacity: [0.25, 0.65, 0.35, 0.75, 0.4],
                                }}
                                transition={{ duration: 0.26, repeat: Infinity, repeatType: "mirror" }}
                                className="absolute inset-0 w-full h-full rounded-md object-cover mix-blend-screen saturate-200 hue-rotate-[190deg] opacity-50"
                              />
                            </>
                          )}
                        </div>
                      ) : (
                        <edu.Icon size={32} className="text-teal-500 shrink-0" />
                      )}
                      <h3
                        className={`text-2xl font-bold ${
                          edu.degree === "SalaCyber Ethical Hacking Essentials"
                            ? "font-mono uppercase tracking-[0.2em] bg-gradient-to-r from-lime-300 via-emerald-400 to-green-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,197,94,0.75)]"
                            : "text-white"
                        }`}
                      >
                        {edu.degree}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-300">
                      {edu.schoolLink ? (
                        <a
                          href={edu.schoolLink}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-emerald-300 transition-colors"
                        >
                          {edu.school}
                        </a>
                      ) : (
                        edu.school
                      )}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Calendar size={16} className="shrink-0" />
                      {edu.year}
                    </p>
                  </div>

                  <p className="text-emerald-100/75 text-sm italic border-l-2 border-emerald-500 pl-3">
                    {edu.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-500 shrink-0" />
                      Key Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -2 }}
                          className="relative px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-200 flex items-center gap-2 text-sm border border-emerald-400/30 cursor-pointer group"
                        >
                          <motion.span
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Award size={16} className="shrink-0 group-hover:text-lime-300 transition-colors" />
                          </motion.span>
                          <span>{achievement}</span>
                          <motion.div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50"
                            animate={{ boxShadow: ["0 0 0px rgba(16, 185, 129, 0)", "0 0 15px rgba(16, 185, 129, 0.7)", "0 0 0px rgba(16, 185, 129, 0)"] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ pointerEvents: "none" }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-2 py-1 text-xs rounded bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/20 cursor-pointer hover:border-cyan-400/50 transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
