import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "@/assets/css/tomorrow.css";
import Meteors from "@/components/ui/meteors";
import PortfolioPage from "@/pages/About/About";
import SparklesText from "@/components/ui/sparkles-text";
import { FlipWords } from "@/components/ui/flip-words";

// Grid Background - Replacing the HexagonBackground
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute inset-0"
        >
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="40"
              height="40"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              className="opacity-40 animate-gridPulse"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default function Hero() {
  const certifiedLabel = "Certified";
  const glitchCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const nameSourceText = "Taing Chongyean";
  const nameDecodeTarget = "y34n";
  const nameGlitchTarget = "Hacker 404";
  const nameGlitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  const words = [
    "Penetration Tester",
    "Web Application Hacking",
    "Software Engineer",
    "Cybersecurity Researcher",
    "ExploitDB",
    "League of Legends Mid Laner",
  ];

  const summaryWords = [
    "Penetration Tester ",
    "Red Team Practitioner",
    "Coding the future",
    "Ethical Hacker",
    "AI Enthusiast",
  ];

  const [summaryIndex, setSummaryIndex] = useState(0);
  const [isSummaryRolling, setIsSummaryRolling] = useState(false);
  const [contactButtonLabel, setContactButtonLabel] = useState("LinkedIn");
  const [isContactAnimating, setIsContactAnimating] = useState(false);
  const [isDoneGlitching, setIsDoneGlitching] = useState(false);
  const [interactiveName, setInteractiveName] = useState(nameSourceText);
  const [nameState, setNameState] = useState("idle");
  const contactIntervalRef = useRef(null);
  const contactTimeoutRef = useRef(null);
  const redirectTimeoutRef = useRef(null);
  const nameDecodeIntervalRef = useRef(null);
  const nameGlitchIntervalRef = useRef(null);
  const namePhaseTimeoutRef = useRef(null);
  const nameLandingTimeoutRef = useRef(null);
  const nameSequenceStartedRef = useRef(false);

  const [code] = useState(`
const profile = {
    name: 'Taing Chongyean',
    alias: 'y34n',
    title: 'Penetration Tester | Red Team | Software Engineer',
    location: 'Phnom Penh, Cambodia 🇰🇭',

    skills: [
        // Offensive
        'Web Pentesting', 'Red Team Ops', 'API Exploitation',
        'Burp Suite', 'Nmap', 'SQLMap', 'Metasploit',
        // Dev
        'React', 'NextJS', 'Spring Boot', 'Java', 'Python', 'JavaScript', 'C/C++',
        // Infra
        'Kali Linux', 'Docker', 'AWS', 'Git',
    ],

    traits: {
        hardWorker: true,
        quickLearner: true,
        problemSolver: true,
    },

    hireable: () => true, // obviously

    motto: 'Every system has a crack. I find it.',
};
  `);

  useEffect(() => {
    Prism.highlightAll();

    // Add CSS animation for grid and dots
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gridPulse {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      
      @keyframes dotPulse {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }

      @keyframes doneGlitch {
        0%, 100% { transform: translate(0, 0); text-shadow: 0 0 0 rgba(34, 197, 94, 0), 0 0 0 rgba(239, 68, 68, 0); }
        25% { transform: translate(1px, 0); text-shadow: -1px 0 rgba(34, 197, 94, 0.95), 1px 0 rgba(239, 68, 68, 0.85); }
        50% { transform: translate(-1px, 0); text-shadow: 1px 0 rgba(34, 197, 94, 0.95), -1px 0 rgba(239, 68, 68, 0.85); }
        75% { transform: translate(1px, 0); text-shadow: 0 0 10px rgba(34, 197, 94, 0.9), 0 0 12px rgba(239, 68, 68, 0.8); }
      }

      .done-glitch {
        animation: doneGlitch 0.16s steps(2, end) infinite;
      }

      @keyframes cutBoxGlitch {
        0%, 100% {
          clip-path: inset(0 0 0 0);
          box-shadow: 0 0 0 rgba(34, 197, 94, 0);
          transform: translate(0, 0);
        }
        25% {
          clip-path: inset(0 0 46% 0);
          box-shadow: 0 0 14px rgba(34, 197, 94, 0.65);
          transform: translate(1px, 0);
        }
        50% {
          clip-path: inset(34% 0 18% 0);
          box-shadow: 0 0 14px rgba(239, 68, 68, 0.65);
          transform: translate(-1px, 0);
        }
        75% {
          clip-path: inset(62% 0 0 0);
          box-shadow: 0 0 16px rgba(34, 197, 94, 0.75), 0 0 20px rgba(239, 68, 68, 0.55);
          transform: translate(1px, 0);
        }
      }

      .cut-box-animate {
        animation: cutBoxGlitch 0.2s steps(2, end) infinite;
      }

      @keyframes slicePieceTop {
        0% { opacity: 0.9; transform: translate(0, 0) rotate(0deg); }
        100% { opacity: 0; transform: translate(-22px, -10px) rotate(-8deg); }
      }

      @keyframes slicePieceMid {
        0% { opacity: 0.85; transform: translate(0, 0) rotate(0deg); }
        100% { opacity: 0; transform: translate(18px, 3px) rotate(6deg); }
      }

      @keyframes slicePieceBottom {
        0% { opacity: 0.9; transform: translate(0, 0) rotate(0deg); }
        100% { opacity: 0; transform: translate(-14px, 12px) rotate(-7deg); }
      }

      .slice-piece {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(34, 197, 94, 0.35), rgba(239, 68, 68, 0.35));
        mix-blend-mode: screen;
        pointer-events: none;
      }

      .slice-piece-top {
        clip-path: inset(0 0 67% 0);
        animation: slicePieceTop 0.7s ease-out forwards;
      }

      .slice-piece-mid {
        clip-path: inset(33% 0 33% 0);
        animation: slicePieceMid 0.7s ease-out forwards;
      }

      .slice-piece-bottom {
        clip-path: inset(67% 0 0 0);
        animation: slicePieceBottom 0.7s ease-out forwards;
      }

      @keyframes heroNameGlitch {
        0%, 100% { transform: translate(0, 0); text-shadow: 0 0 0 rgba(74, 222, 128, 0), 0 0 0 rgba(239, 68, 68, 0); }
        25% { transform: translate(1px, 0); text-shadow: -1px 0 rgba(74, 222, 128, 0.9), 1px 0 rgba(239, 68, 68, 0.8); }
        50% { transform: translate(-1px, 0); text-shadow: 1px 0 rgba(74, 222, 128, 0.9), -1px 0 rgba(239, 68, 68, 0.8); }
        75% { transform: translate(1px, 0); text-shadow: 0 0 10px rgba(74, 222, 128, 0.8), 0 0 14px rgba(239, 68, 68, 0.7); }
      }

      .hero-name-glitch {
        animation: heroNameGlitch 0.16s steps(2, end) infinite;
      }

      .summary-stack {
        will-change: transform, opacity, filter;
        transition-property: transform, opacity, filter;
        transition-duration: 1200ms;
        transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }

      .summary-stack-item {
        transition: opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1), filter 1200ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .summary-stack-item-active {
        filter: blur(0);
      }

      .summary-stack-item-muted {
        filter: blur(0.35px);
      }
      
      /* Media query for 1366x768 resolution */
      @media screen and (width: 1366px) and (height: 768px), 
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .hero {
          padding-top: 12rem !important;
        }
        .hero .container {
          padding-top: 10rem !important;
          margin-top: 5rem !important;
        }
        .hero-section-padding {
          padding-top: 12rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Apply extra padding for 1366x768 resolution
    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty(
          "--hero-padding-top",
          "12rem"
        );
      } else {
        document.documentElement.style.setProperty("--hero-padding-top", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, [code]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsSummaryRolling(true);

      setTimeout(() => {
        setSummaryIndex((prev) => (prev + 1) % summaryWords.length);
        setIsSummaryRolling(false);
      }, 850);
    }, 3400);

    return () => clearInterval(intervalId);
  }, [summaryWords.length]);

  useEffect(() => {
    return () => {
      if (contactIntervalRef.current) {
        clearInterval(contactIntervalRef.current);
      }

      if (contactTimeoutRef.current) {
        clearTimeout(contactTimeoutRef.current);
      }

      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }

      if (nameDecodeIntervalRef.current) {
        clearInterval(nameDecodeIntervalRef.current);
      }

      if (nameGlitchIntervalRef.current) {
        clearInterval(nameGlitchIntervalRef.current);
      }

      if (namePhaseTimeoutRef.current) {
        clearTimeout(namePhaseTimeoutRef.current);
      }

      if (nameLandingTimeoutRef.current) {
        clearTimeout(nameLandingTimeoutRef.current);
      }
    };
  }, []);

  const resetNameAnimation = () => {
    if (nameDecodeIntervalRef.current) {
      clearInterval(nameDecodeIntervalRef.current);
      nameDecodeIntervalRef.current = null;
    }

    if (nameGlitchIntervalRef.current) {
      clearInterval(nameGlitchIntervalRef.current);
      nameGlitchIntervalRef.current = null;
    }

    if (namePhaseTimeoutRef.current) {
      clearTimeout(namePhaseTimeoutRef.current);
      namePhaseTimeoutRef.current = null;
    }

    setInteractiveName(nameSourceText);
    setNameState("idle");
  };

  const startReturnGlitchToNormal = () => {
    const target = nameSourceText;
    let frame = 0;
    const totalFrames = 10;

    setNameState("returning");

    nameGlitchIntervalRef.current = setInterval(() => {
      frame += 1;
      const revealCount = Math.floor((frame / totalFrames) * target.length);

      const nextValue = target
        .split("")
        .map((character, index) => {
          if (character === " ") {
            return " ";
          }

          if (index < revealCount) {
            return character;
          }

          return nameGlitchChars[Math.floor(Math.random() * nameGlitchChars.length)];
        })
        .join("");

      setInteractiveName(nextValue);

      if (frame >= totalFrames) {
        clearInterval(nameGlitchIntervalRef.current);
        nameGlitchIntervalRef.current = null;
        setInteractiveName(nameSourceText);
        setNameState("idle");
      }
    }, 50);
  };

  const startNameErrorGlitch = () => {
    const target = nameGlitchTarget;
    let frame = 0;
    const totalFrames = 10;

    setNameState("glitching");

    nameGlitchIntervalRef.current = setInterval(() => {
      frame += 1;
      const revealCount = Math.floor((frame / totalFrames) * target.length);

      const nextValue = target
        .split("")
        .map((character, index) => {
          if (character === " ") {
            return " ";
          }

          if (index < revealCount) {
            return character;
          }

          return nameGlitchChars[Math.floor(Math.random() * nameGlitchChars.length)];
        })
        .join("");

      setInteractiveName(nextValue);

      if (frame >= totalFrames) {
        clearInterval(nameGlitchIntervalRef.current);
        nameGlitchIntervalRef.current = null;
        setInteractiveName(nameGlitchTarget);

        namePhaseTimeoutRef.current = setTimeout(() => {
          startReturnGlitchToNormal();
          namePhaseTimeoutRef.current = null;
        }, 120);
      }
    }, 50);
  };

  const handleNameHoverDecode = () => {
    if (nameState !== "idle") {
      return;
    }

    const target = nameDecodeTarget;
    const totalSteps = 16;
    let step = 0;
    let freezeTriggered = false;

    setNameState("decoding");

    nameDecodeIntervalRef.current = setInterval(() => {
      step += 1;
      const revealCount = Math.floor((step / totalSteps) * target.length);

      const nextValue = target
        .split("")
        .map((character, index) => {
          if (character === " ") {
            return " ";
          }

          if (index < revealCount) {
            return character;
          }

          return nameGlitchChars[Math.floor(Math.random() * nameGlitchChars.length)];
        })
        .join("");

      setInteractiveName(nextValue);

      if (!freezeTriggered && step >= totalSteps - 2) {
        freezeTriggered = true;
        clearInterval(nameDecodeIntervalRef.current);
        nameDecodeIntervalRef.current = null;
        setInteractiveName(nameDecodeTarget);
        setNameState("freeze");

        namePhaseTimeoutRef.current = setTimeout(() => {
          startNameErrorGlitch();
          namePhaseTimeoutRef.current = null;
        }, 850);
        return;
      }

      if (step >= totalSteps) {
        clearInterval(nameDecodeIntervalRef.current);
        nameDecodeIntervalRef.current = null;
        setInteractiveName(nameDecodeTarget);
        startNameErrorGlitch();
      }
    }, 38);
  };

  useEffect(() => {
    if (nameSequenceStartedRef.current) {
      return undefined;
    }

    nameSequenceStartedRef.current = true;

    nameLandingTimeoutRef.current = setTimeout(() => {
      handleNameHoverDecode();
      nameLandingTimeoutRef.current = null;
    }, 4000);

    return () => {
      if (nameLandingTimeoutRef.current) {
        clearTimeout(nameLandingTimeoutRef.current);
        nameLandingTimeoutRef.current = null;
      }
    };
  }, []);

  const handleCertifiedClick = (event) => {
    event.preventDefault();

    if (isContactAnimating) {
      return;
    }

    setIsContactAnimating(true);

    const totalDuration = 2000;
    const stepDuration = 90;
    const totalSteps = Math.ceil(totalDuration / stepDuration);
    let stepIndex = 0;

    setContactButtonLabel("LinkedIn");

    if (contactIntervalRef.current) {
      clearInterval(contactIntervalRef.current);
    }

    if (contactTimeoutRef.current) {
      clearTimeout(contactTimeoutRef.current);
    }

    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }

    setIsDoneGlitching(false);

    contactIntervalRef.current = setInterval(() => {
      stepIndex += 1;

      const revealCount = Math.min(
        certifiedLabel.length,
        Math.floor((stepIndex / totalSteps) * certifiedLabel.length)
      );

      const nextLabel = certifiedLabel
        .split("")
        .map((character, index) => {
          if (index < revealCount) {
            return character;
          }

          if (index === revealCount) {
            return character;
          }

          return glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)];
        })
        .join("");

      setContactButtonLabel(nextLabel);

      if (stepIndex >= totalSteps) {
        clearInterval(contactIntervalRef.current);
        contactIntervalRef.current = null;
      }
    }, stepDuration);

    contactTimeoutRef.current = setTimeout(() => {
      if (contactIntervalRef.current) {
        clearInterval(contactIntervalRef.current);
        contactIntervalRef.current = null;
      }

      setContactButtonLabel("Exploit Success");
      setIsDoneGlitching(true);

      redirectTimeoutRef.current = setTimeout(() => {
        window.location.href = "/education";
      }, 950);
    }, totalDuration);
  };

  const previousSummaryWord =
    summaryWords[(summaryIndex - 1 + summaryWords.length) % summaryWords.length];
  const currentSummaryWord = summaryWords[summaryIndex];
  const nextSummaryWord = summaryWords[(summaryIndex + 1) % summaryWords.length];
  const afterNextSummaryWord = summaryWords[(summaryIndex + 2) % summaryWords.length];

  return (
    <>
      <main className="bg-[#020617] text-white min-h-screen">
        <section
          className="hero min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-0 hero-section-padding"
          style={{ paddingTop: "var(--hero-padding-top, 0)" }}
        >
          <div className="absolute inset-0"></div>

          {/* Choose one of these background options */}
          <GridBackground />

          {/* Or keep the original backgrounds if you prefer */}
          {/* <HexagonBackground /> */}
          {/* <AnimatedGrid /> */}
          {/* <DotBackground /> */}

          {/* Meteors Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={10} />
          </div>

          {/* Main content container */}
          <div
            className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 py-8 md:py-10 lg:py-12 md:pt-28 xl:pt-28"
            style={{
              paddingTop:
                window.innerWidth >= 1360 &&
                window.innerWidth <= 1370 &&
                window.innerHeight >= 760 &&
                window.innerHeight <= 775
                  ? "12rem"
                  : "",
            }}
          >
            {/* Left column - Text content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 animate__animated animate__fadeInLeft relative">
              {/* Decorative blurs */}
              <div className="absolute hidden lg:-top-20 lg:-left-20 lg:block w-48 h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute hidden lg:block lg:top-40 lg:-right-20 w-48 h-48 lg:w-64 lg:h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

              {/* Welcome badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6 sm:mb-8 animate__animated animate__fadeInDown animate__delay-1s">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-gray-300 text-xs sm:text-sm font-medium">
                  Welcome to whoami
                </span>
              </div>

              {/* Name section */}
              <div className="relative mb-6 sm:mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                  <SparklesText text="Hello" />
                  <span className="relative inline-block">
                    I&apos;m
                    <span
                      className={`typing-effect gradient-text select-none ${
                        nameState === "glitching" ? "hero-name-glitch" : ""
                      }`}
                    >
                      {" "}
                      {interactiveName}
                    </span>
                  </span>
                </h1>
                <div className="absolute -z-10 top-1/2 -translate-y-1/2 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              </div>

              {/* Role badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20 mb-6 sm:mb-8 backdrop-blur-sm animate__animated animate__fadeInUp animate__delay-1s">
                <i className="fas fa-rocket text-blue-400 animate-bounce text-sm sm:text-base"></i>
                <span>
                  <FlipWords
                    className={"text-lg sm:text-xl text-blue-400 font-medium"}
                    words={words}
                  />
                </span>
              </div>

              {/* Description */}
              <div className="relative mb-8 sm:mb-12 max-w-xl mx-auto lg:mx-0">
                <div className="text-base sm:text-lg text-slate-300 text-center">
                  <div className="relative h-[84px] overflow-hidden rounded-lg mx-auto">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
                    <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 h-7 -translate-y-1/2 rounded-md bg-slate-300/5" />
                    <div
                      className={`summary-stack flex flex-col ${
                        isSummaryRolling
                          ? "-translate-y-[1.75rem] scale-100 opacity-100"
                          : "translate-y-0 scale-100 opacity-100"
                      }`}
                    >
                      <span
                        className={`summary-stack-item h-7 leading-7 text-white/50 text-center ${
                          isSummaryRolling ? "summary-stack-item-muted" : ""
                        }`}
                        style={{ transitionDelay: "0ms" }}
                      >
                        {previousSummaryWord}
                      </span>
                      <span
                        className={`summary-stack-item h-7 leading-7 font-semibold text-white text-center ${
                          isSummaryRolling ? "summary-stack-item-active" : ""
                        }`}
                        style={{ transitionDelay: "90ms" }}
                      >
                        {currentSummaryWord}
                      </span>
                      <span
                        className={`summary-stack-item h-7 leading-7 text-white/50 text-center ${
                          isSummaryRolling ? "summary-stack-item-active" : ""
                        }`}
                        style={{ transitionDelay: "180ms" }}
                      >
                        {nextSummaryWord}
                      </span>
                      <span
                        className={`summary-stack-item h-7 leading-7 text-white/50 text-center ${
                          isSummaryRolling ? "summary-stack-item-muted" : ""
                        }`}
                        style={{ transitionDelay: "270ms" }}
                      >
                        {afterNextSummaryWord}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate__animated animate__fadeInUp animate__delay-2s">
                {/* View Projects Button */}
                <a
                  href="https://github.com/Chongyean"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-teal-400 p-0.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#60A5FA]"
                >
                  <span className="block w-full px-6 sm:px-8 py-3 sm:py-4 rounded-[11px] bg-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400">
                    <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                      <span>Github</span>
                      <i className="fas fa-arrow-right transform transition-all duration-300 group-hover:translate-x-1"></i>
                    </span>
                  </span>
                </a>

                {/* Contact Button */}
                <a
                  href="/education"
                  onClick={handleCertifiedClick}
                  className="group relative inline-flex items-center justify-center gap-3 p-0.5 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#60A5FA]"
                >
                  <span className={`block w-full px-6 sm:px-8 py-3 sm:py-4 rounded-[11px] bg-gray-900 border border-gray-700/50 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-700 ${isDoneGlitching ? "cut-box-animate border-emerald-400/80" : ""}`}>
                    <span className="relative flex items-center justify-center gap-2 text-gray-300 font-medium group-hover:text-white">
                      <span className={isDoneGlitching ? "done-glitch text-emerald-300" : ""}>{contactButtonLabel}</span>
                      <i className="fas fa-envelope transform transition-all duration-300 group-hover:rotate-12"></i>
                    </span>

                    {isDoneGlitching && (
                      <>
                        <span className="slice-piece slice-piece-top" aria-hidden="true" />
                        <span className="slice-piece slice-piece-mid" aria-hidden="true" />
                        <span className="slice-piece slice-piece-bottom" aria-hidden="true" />
                      </>
                    )}
                  </span>
                </a>
              </div>

              {/* Floating badges */}
              <div className="hidden lg:block absolute left-[5.5rem] top-[2.3rem] animate-float-slow">
                <div className="px-4 py-2 rounded-lg bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 text-purple-400">
                  <i className="fas fa-wand-magic-sparkles"></i>&nbsp;&nbsp;Kali Linux 
                </div>
              </div>
              <div className="hidden lg:block absolute right-10 top-20 animate-float">
                <div className="px-4 py-2 rounded-lg bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400">
                  <i className="fas fa-code"></i>&nbsp;&nbsp;Clean Code
                </div>
              </div>
              <div className="hidden lg:block absolute top-[17rem] left-[70%] transform -translate-x-1/2 animate-float">
                <div className="px-4 py-2 rounded-lg bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 text-amber-400">
                  <i className="fas fa-lightbulb"></i>&nbsp;&nbsp;Innovation
                </div>
              </div>
            </div>

            {/* Right column - Code window */}
            <div className="w-full lg:w-1/2 animate__animated animate__fadeInDown animate__delay-0.1s">
              <div className="gradient-border">
                <div className="code-window bg-[#091121]">
                  <div className="window-header">
                    <div className="window-dot bg-red-500"></div>
                    <div className="window-dot bg-yellow-500"></div>
                    <div className="window-dot bg-green-500"></div>
                    <span className="ml-2 text-sm text-gray-400 flex items-center gap-2">
                      <i className="fas fa-code"></i>
                      developer.java
                    </span>
                  </div>
                  <pre className="language-javascript">
                    <code className="language-javascript">{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <i className="fas fa-mouse text-blue-400"></i>
            About me
          </span>
          <i className="fas fa-chevron-down text-blue-400 text-xl"></i>
        </div>
        <PortfolioPage />
      </main>
    </>
  );
}
