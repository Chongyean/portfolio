/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Layers, Figma } from "lucide-react";

const TITLE_GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  icon: Icon,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
  >
    {/* Glass morphism effect */}
    <div className="absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg" />

    {/* Animated gradient border */}
    <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500" />

    <div className="relative bg-gray-900/90 rounded-lg p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl">
      {/* Floating icon with pulse effect */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-25 rounded-full blur-xl group-hover:opacity-75 animate-pulse transition-all duration-500" />
        <Icon className="w-12 h-12 text-cyan-400 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
      </div>

      {/* Content with improved typography */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <div className="flex justify-between items-center text-gray-300">
          <span className="font-semibold text-blue-400">{company}</span>
          <span className="text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full">
            {period}
          </span>
        </div>
        <span className="inline-flex w-fit rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs font-mono uppercase tracking-wide text-cyan-300">
          Featured Role
        </span>
        <p className="text-gray-300 border-l-4 border-blue-500/50 pl-4 mt-4 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20">
        <div className="absolute top-0 right-0 w-6 h-[2px] bg-cyan-500/50" />
        <div className="absolute top-0 right-0 w-[2px] h-6 bg-cyan-500/50" />
      </div>
      <div className="absolute bottom-4 left-4 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-purple-500/50" />
        <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-purple-500/50" />
      </div>
    </div>
  </motion.div>
);

const ExperienceSection = () => {
  const experienceTitle = "Professional Journey";
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
      })),
    []
  );
  const [decodedTitle, setDecodedTitle] = useState(() =>
    experienceTitle
      .split("")
      .map((character) =>
        character === " "
          ? " "
          : TITLE_GLITCH_CHARS[Math.floor(Math.random() * TITLE_GLITCH_CHARS.length)]
      )
      .join("")
  );

  useEffect(() => {
    const totalDuration = 2000;
    const stepDuration = 60;
    const totalSteps = Math.ceil(totalDuration / stepDuration);
    let stepIndex = 0;

    const intervalId = setInterval(() => {
      stepIndex += 1;

      const revealCount = Math.min(
        experienceTitle.length,
        Math.floor((stepIndex / totalSteps) * experienceTitle.length)
      );

      const nextTitle = experienceTitle
        .split("")
        .map((character, index) => {
          if (character === " ") {
            return " ";
          }

          if (index < revealCount) {
            return character;
          }

          return TITLE_GLITCH_CHARS[Math.floor(Math.random() * TITLE_GLITCH_CHARS.length)];
        })
        .join("");

      setDecodedTitle(nextTitle);

      if (stepIndex >= totalSteps) {
        clearInterval(intervalId);
        setDecodedTitle(experienceTitle);
      }
    }, stepDuration);

    return () => clearInterval(intervalId);
  }, []);

  const experiences = [
    {
      icon: Figma,
      title: "UX/UI Designer",
      company: "Figma",
      period: "2024 - Present",
      description:
        "Worked on designing user interfaces and experiences for various web applications, focusing on usability and aesthetics.",
    },
    {
      icon: Layers,
      title: "Junior Frontend Developer",
      company: "Taing Chongyean",
      period: "2025 - Present",
      description:
        "Developed responsive web applications using React and Tailwind CSS, ensuring cross-browser compatibility and performance optimization.",
    },
    {
      icon: Code2,
      title: "Java Developer",
      company: "Spring boot Framework",
      period: "2025 - Present",
      description:
        "Contributed to backend development using Java and Spring Boot, implementing RESTful APIs and integrating with frontend applications.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b relative overflow-hidden pt-32 pb-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[#04081A]" />

        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,70,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,70,0.15)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Animated particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float"
              style={{
                top: particle.top,
                left: particle.left,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <div className="relative container mx-auto px-6 mt-10">
          {/* Section header with enhanced effects */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8 mb-20"
          >
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-center">
                {decodedTitle}
              </h2>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
            </div>
            <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl">
              Transforming ideas into digital reality, one project at a time
            </p>
          </motion.div>

          {/* Experience grid with improved layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} index={index} {...exp} />
            ))}
          </div>
        </div>

        {/* Enhanced background effects */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>
    </>
  );
};

export default ExperienceSection;
