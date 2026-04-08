import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  FaHome,
  FaLaptopCode,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const homeHackerLabel = "Chongyean";
  const sectionHackerLabel = "Hacker";
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const brandFrameMs = 60;
  const brandHoldMs = 520;
  const location = useLocation();
  const routeBrandLabel = useMemo(() => {
    const path = location.pathname.toLowerCase();

    if (path === "/" || path === "/home") return "Home";
    if (path.startsWith("/skills")) return "Skills";
    if (path.startsWith("/experience")) return "Experience";
    if (path.startsWith("/education")) return "Education";
    if (path.startsWith("/projects")) return "Projects";
    if (path.startsWith("/contact")) return "Contact";

    return "Home";
  }, [location.pathname]);
  const routeHackerLabel = useMemo(
    () => (routeBrandLabel === "Home" ? homeHackerLabel : sectionHackerLabel),
    [routeBrandLabel]
  );
  const [activeLink, setActiveLink] = useState(() => {
    const path = location.pathname.substring(1) || "home";
    return path;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [brandText, setBrandText] = useState(routeBrandLabel);
  const [decodedNavText, setDecodedNavText] = useState({});
  const brandTimerRef = useRef(null);
  const isBrandAnimatingRef = useRef(false);
  const didMountRef = useRef(false);
  const navDecodeTimersRef = useRef([]);

  useEffect(() => {
    const path = location.pathname.substring(1) || "home";
    setActiveLink(path);
  }, [location.pathname]);

  const clearBrandTimer = useCallback(() => {
    if (brandTimerRef.current) {
      clearTimeout(brandTimerRef.current);
      brandTimerRef.current = null;
    }
  }, []);

  const runDecodeToLabel = useCallback(
    (targetLabel, onDone) => {
      let frame = 0;
      const totalFrames = targetLabel.length + 4;

      const step = () => {
        frame += 1;
        const revealedCount = Math.min(
          targetLabel.length,
          Math.floor((frame / totalFrames) * targetLabel.length)
        );

        const nextText = targetLabel
          .split("")
          .map((char, i) => {
            if (i < revealedCount) return char;
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("");

        setBrandText(nextText);

        if (frame >= totalFrames) {
          setBrandText(targetLabel);
          brandTimerRef.current = setTimeout(onDone, brandHoldMs);
          return;
        }

        brandTimerRef.current = setTimeout(step, brandFrameMs);
      };

      step();
    },
    [brandFrameMs, brandHoldMs, scrambleChars]
  );

  const runBackwardMorphToHacker = useCallback(
    (onDone) => {
      let stepIndex = 0;
      const totalSteps = routeBrandLabel.length;

      const step = () => {
        stepIndex += 1;

        const prefixLen = Math.max(routeBrandLabel.length - stepIndex, 0);
        const suffix =
          stepIndex <= routeHackerLabel.length
            ? routeHackerLabel.slice(routeHackerLabel.length - stepIndex)
            : routeHackerLabel;

        setBrandText(`${routeBrandLabel.slice(0, prefixLen)}${suffix}`);

        if (stepIndex >= totalSteps) {
          setBrandText(routeHackerLabel);
          brandTimerRef.current = setTimeout(onDone, brandHoldMs);
          return;
        }

        brandTimerRef.current = setTimeout(step, brandFrameMs);
      };

      step();
    },
    [brandFrameMs, brandHoldMs, routeBrandLabel, routeHackerLabel]
  );

  const runBrandRouteSequence = useCallback(() => {
    if (isBrandAnimatingRef.current) return;
    isBrandAnimatingRef.current = true;

    runDecodeToLabel(routeBrandLabel, () => {
      runBackwardMorphToHacker(() => {
        runDecodeToLabel(routeBrandLabel, () => {
          runBackwardMorphToHacker(() => {
            isBrandAnimatingRef.current = false;
          });
        });
      });
    });
  }, [routeBrandLabel, runBackwardMorphToHacker, runDecodeToLabel]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    clearBrandTimer();
    isBrandAnimatingRef.current = false;
    runBrandRouteSequence();

    return () => {
      clearBrandTimer();
      isBrandAnimatingRef.current = false;
    };
  }, [location.pathname, clearBrandTimer, runBrandRouteSequence]);

  useEffect(() => {
    return () => {
      isBrandAnimatingRef.current = false;
      clearBrandTimer();
    };
  }, [clearBrandTimer]);

  const navLinks = useMemo(
    () => [
      { id: "home", icon: FaHome, text: "Home", path: "/" },
      { id: "skills", icon: FaCode, text: "Skills", path: "/skills" },
      {
        id: "experience",
        icon: FaBriefcase,
        text: "Experience",
        path: "/experience",
      },
      {
        id: "education",
        icon: FaGraduationCap,
        text: "Education",
        path: "/education",
      },
      { id: "projects", icon: FaLaptopCode, text: "Projects", path: "/projects" },
      { id: "contact", icon: FaEnvelope, text: "Contact", path: "/contact" },
    ],
    []
  );

  const clearNavDecodeTimers = useCallback(() => {
    navDecodeTimersRef.current.forEach((timerId) => {
      clearTimeout(timerId);
      clearInterval(timerId);
    });
    navDecodeTimersRef.current = [];
  }, []);

  const startNavDecodeSequence = useCallback(() => {
    clearNavDecodeTimers();
    setDecodedNavText({});

    navLinks.forEach((link, index) => {
      const startDelay = 220 + index * 130;
      const frameMs = 42;
      const totalFrames = link.text.length + 4;

      const startTimerId = setTimeout(() => {
        let frame = 0;

        const intervalId = setInterval(() => {
          frame += 1;
          const revealedCount = Math.min(
            link.text.length,
            Math.floor((frame / totalFrames) * link.text.length)
          );

          const nextText = link.text
            .split("")
            .map((char, i) => {
              if (i < revealedCount) return char;
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join("");

          setDecodedNavText((prev) => ({ ...prev, [link.id]: nextText }));

          if (frame >= totalFrames) {
            clearInterval(intervalId);
            setDecodedNavText((prev) => ({ ...prev, [link.id]: link.text }));
          }
        }, frameMs);

        navDecodeTimersRef.current.push(intervalId);
      }, startDelay);

      navDecodeTimersRef.current.push(startTimerId);
    });
  }, [clearNavDecodeTimers, navLinks, scrambleChars]);

  useEffect(() => {
    if (isMenuOpen) {
      startNavDecodeSequence();
    } else {
      clearNavDecodeTimers();
      setDecodedNavText({});
    }
  }, [clearNavDecodeTimers, isMenuOpen, startNavDecodeSequence]);

  useEffect(() => {
    return () => {
      clearNavDecodeTimers();
    };
  }, [clearNavDecodeTimers]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="flex justify-center px-4 pt-4 md:pt-4">
        <div className="p-[2px] rounded-2xl md:rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 animate-gradient-x w-full md:w-auto">
          <nav className="bg-gray-900/90 backdrop-blur-md rounded-2xl md:rounded-full px-4 md:px-6 py-2.5">
            {/* Mobile Menu Button */}
            <div className="flex justify-between items-center md:hidden px-2">
              <Link
                to="/"
                className="text-white font-bold brand-yean"
                data-text={brandText}
              >
                {brandText}
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
                className="relative w-10 h-10 flex items-center justify-center text-white"
              >
                <span
                  className={`absolute h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-[6px]"
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-[6px]"
                  }`}
                />
              </button>
            </div>

            {/* Navigation Links */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out md:overflow-visible md:transition-none ${
                isMenuOpen
                  ? "max-h-[420px] opacity-100 mt-2"
                  : "max-h-0 opacity-0 mt-0 md:max-h-none md:opacity-100 md:mt-0"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 lg:gap-2 py-3 md:py-0">
                {navLinks.map(({ id, icon: Icon, text, path }, index) => (
                  <Link
                    key={id}
                    to={path}
                    onClick={() => {
                      setActiveLink(id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium
                      transition-all duration-300 flex items-center gap-2
                      ${
                        isMenuOpen
                          ? "opacity-0"
                          : "-translate-y-1 opacity-0 md:translate-y-0 md:opacity-100"
                      }
                      hover:bg-white/10 
                      ${
                        activeLink === id
                          ? "bg-white/15 text-white"
                          : "text-gray-300 hover:text-white"
                      }
                    `}
                    style={
                      isMenuOpen
                        ? {
                            animation: "menuItemIn 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
                            animationDelay: `${index * 90}ms`,
                          }
                        : { animation: "none", transitionDelay: "0ms" }
                    }
                  >
                    <Icon
                      className={`text-base flex-shrink-0 transition-transform ${
                        activeLink === id ? "brightness-150" : ""
                      }`}
                    />
                    <span className="inline">{decodedNavText[id] ?? text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
        @keyframes brand-bob-glow {
          0%,
          100% {
            transform: translateY(0);
            text-shadow: 0 0 0 rgba(34, 211, 238, 0);
          }
          50% {
            transform: translateY(-2px);
            text-shadow: 0 0 12px rgba(34, 211, 238, 0.45);
          }
        }
        .brand-yean {
          position: relative;
          display: inline-block;
          letter-spacing: 0.02em;
          color: #f8fbff;
          animation: brand-bob-glow 2.2s ease-in-out infinite,
            brand-shimmer 3.4s linear infinite;
          transition: color 0.25s ease, text-shadow 0.25s ease;
          text-shadow: 0 0 10px rgba(103, 232, 249, 0.18);
        }
        .brand-yean:hover {
          color: #67e8f9;
          text-shadow: 0 0 16px rgba(103, 232, 249, 0.45);
        }
        .brand-yean::before,
        .brand-yean::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.55;
        }
        .brand-yean::before {
          color: rgba(34, 211, 238, 0.7);
          transform: translateX(1px);
          clip-path: polygon(0 4%, 100% 0, 100% 42%, 0 46%);
          animation: brand-glitch-a 1.5s steps(2, end) infinite;
        }
        .brand-yean::after {
          color: rgba(56, 189, 248, 0.7);
          transform: translateX(-1px);
          clip-path: polygon(0 58%, 100% 54%, 100% 100%, 0 100%);
          animation: brand-glitch-b 1.8s steps(2, end) infinite;
        }
        @keyframes brand-shimmer {
          0%,
          100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }
        @keyframes brand-glitch-a {
          0%,
          100% {
            transform: translate(1px, 0);
            opacity: 0.45;
          }
          50% {
            transform: translate(2px, -1px);
            opacity: 0.75;
          }
        }
        @keyframes brand-glitch-b {
          0%,
          100% {
            transform: translate(-1px, 0);
            opacity: 0.35;
          }
          50% {
            transform: translate(-2px, 1px);
            opacity: 0.7;
          }
        }
        @keyframes menuItemIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </header>
  );
}
