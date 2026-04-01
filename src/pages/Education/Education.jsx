import { useEffect, useRef, useState } from "react";

import {
  Award,
  Calendar,
  BookOpen,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gif200 from "../../assets/images/200.gif";
import salaCyberIcon from "../../assets/images/salaCyber_icon.jpg";
import hackerIcon from "../../assets/images/hacker_icon.jpg";
import instinctIcon from "../../assets/images/instinct_icon.jpg";
import ruppLogo from "../../assets/images/rupp_logo.png";

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
    <section className="min-h-screen relative overflow-hidden py-40 bg-[#04081A]">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04081A] via-transparent to-[#04081A]" />
        <div className="absolute inset-0 border border-white/[0.05] grid grid-cols-2 md:grid-cols-4" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Educational Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover how academic excellence shapes innovative thinking and
            professional growth.
          </p>
        </motion.div>

        <motion.div
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
                className={`relative overflow-hidden border rounded-xl p-8 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm ${
                  isHovered ? "border-teal-500 scale-[1.02]" : "border-blue-400/20"
                }`}
                onMouseEnter={() => startSalaCyberHover(index, edu.school)}
                onMouseLeave={() => endSalaCyberHover(edu.school)}
              >
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
                  className={`space-y-6 transition-all duration-200 ${
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
                          className="hover:text-teal-400 transition-colors"
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

                  <p className="text-gray-300 text-sm italic border-l-2 border-teal-500 pl-3">
                    {edu.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-500 shrink-0" />
                      Key Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 flex items-center gap-2 text-sm"
                        >
                          <Award size={16} className="shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-300"
                      >
                        {skill}
                      </span>
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
