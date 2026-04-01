import { useEffect, useRef, useState } from "react";
import HeroImg from "@/assets/images/hero.jpg";
import HackerPfImg from "@/assets/images/hacker_pf.jpg";
import MaskOnImg from "@/assets/images/maskOn.jpg";
import HackedImg from "@/assets/images/hacked.jpg";
// import OlovaLogo from "@/assets/images/olova.png";
import ShibaWithHeadPhone from "@/assets/images/shibaWithHeadphone.jpg";

const GLITCH_FRAMES = [HackerPfImg, MaskOnImg, HackedImg];
const GLITCH_BURST_DURATION = 1000;
const GLITCH_BURST_GAP = 220;
const GLITCH_BURST_COUNT = 2;
const HACKER_NOISE_LINES = [
  "0x7f_a9:://sys/ptr@ghost#null; chmod 000 /readable",
  "01101000 01100001 01100011 01101011 // payload.inject()",
  "<mem::scramble> [ERR_KEY] XOR{a9:ff:13} -> ???",
  "sudo nmap --stealth --spoof-mac 0A:DE:AD:BE:EF:01",
  "{cipher_loop} => SHA3(unknown_seed) :: ACCESS_DENIED",
  "$ ./breach --vector=logic --mask=on --trace=none",
  "kernel://thread[13] panic! stack=0x0000DEADC0DE",
  "[SIGINT] [SIGSEGV] [SIGKILL] // unreadable_stream",
];

export default function About() {
  const imageTriggerRef = useRef(null);
  const delayTimerRef = useRef(null);
  const glitchCycleRef = useRef(null);
  const sequenceTimeoutsRef = useRef([]);
  const hasBackgroundGlitchedRef = useRef(false);
  const isSequenceRunningRef = useRef(false);
  const [isImageGlitching, setIsImageGlitching] = useState(false);
  const [isBackgroundGlitching, setIsBackgroundGlitching] = useState(false);
  const [showHackerImage, setShowHackerImage] = useState(false);
  const [glitchFrameIndex, setGlitchFrameIndex] = useState(0);

  useEffect(() => {
    const target = imageTriggerRef.current;
    if (!target) {
      return undefined;
    }

    const clearSequence = () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }

      if (glitchCycleRef.current) {
        clearInterval(glitchCycleRef.current);
        glitchCycleRef.current = null;
      }

      if (sequenceTimeoutsRef.current.length > 0) {
        sequenceTimeoutsRef.current.forEach((timeoutId) => {
          clearTimeout(timeoutId);
        });
        sequenceTimeoutsRef.current = [];
      }

      isSequenceRunningRef.current = false;
      setIsImageGlitching(false);
      setIsBackgroundGlitching(false);
      setShowHackerImage(false);
      setGlitchFrameIndex(0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isSequenceRunningRef.current) {
            return;
          }

          isSequenceRunningRef.current = true;

          delayTimerRef.current = setTimeout(() => {
            setShowHackerImage(true);
            setGlitchFrameIndex(0);
            const shouldGlitchBackground = !hasBackgroundGlitchedRef.current;

            if (shouldGlitchBackground) {
              hasBackgroundGlitchedRef.current = true;
            }

            glitchCycleRef.current = setInterval(() => {
              setGlitchFrameIndex((prev) => (prev + 1) % GLITCH_FRAMES.length);
            }, 333);

            const runGlitchBurst = (burstNumber) => {
              setIsImageGlitching(true);
              if (shouldGlitchBackground) {
                setIsBackgroundGlitching(true);
              }

              const stopBurstTimeout = setTimeout(() => {
                setIsImageGlitching(false);
                if (shouldGlitchBackground) {
                  setIsBackgroundGlitching(false);
                }

                if (burstNumber < GLITCH_BURST_COUNT) {
                  const nextBurstTimeout = setTimeout(() => {
                    runGlitchBurst(burstNumber + 1);
                  }, GLITCH_BURST_GAP);
                  sequenceTimeoutsRef.current.push(nextBurstTimeout);
                  return;
                }

                if (glitchCycleRef.current) {
                  clearInterval(glitchCycleRef.current);
                  glitchCycleRef.current = null;
                }

                setShowHackerImage(false);
                setGlitchFrameIndex(0);
                isSequenceRunningRef.current = false;
              }, GLITCH_BURST_DURATION);

              sequenceTimeoutsRef.current.push(stopBurstTimeout);
            };

            runGlitchBurst(1);
          }, 2000);
          return;
        }

        clearSequence();
      },
      { threshold: 0.55 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      clearSequence();
    };
  }, []);

  const primaryGlitchImage = GLITCH_FRAMES[glitchFrameIndex];
  const secondaryGlitchImage =
    GLITCH_FRAMES[(glitchFrameIndex + 1) % GLITCH_FRAMES.length];
  const tertiaryGlitchImage =
    GLITCH_FRAMES[(glitchFrameIndex + 2) % GLITCH_FRAMES.length];
  const glitchTitle = isImageGlitching ? "Hacker" : "Penetration tester";

  return (
    <>
      <section id="about" className="relative overflow-hidden py-16 md:py-32 text-white bg-[#04081A]">
        <style>{`
          @keyframes hackerGlitch {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-0.5px, 0.5px); }
            50% { transform: translate(0.5px, -0.5px); }
            75% { transform: translate(-0.5px, 0); }
          }

          @keyframes hackerSliceA {
            0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); }
            30% { clip-path: inset(0 0 52% 0); transform: translate(1px, -0.5px); }
            60% { clip-path: inset(36% 0 24% 0); transform: translate(-1px, 0.5px); }
            85% { clip-path: inset(62% 0 0 0); transform: translate(0.5px, -0.5px); }
          }

          @keyframes hackerSliceB {
            0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); }
            25% { clip-path: inset(68% 0 0 0); transform: translate(-0.5px, 0.5px); }
            55% { clip-path: inset(26% 0 40% 0); transform: translate(1px, 0); }
            80% { clip-path: inset(0 0 60% 0); transform: translate(-1px, -0.5px); }
          }

          .hacker-glitch {
            animation: hackerGlitch 3.2s infinite ease-in-out;
          }

          @keyframes cyberpunkFlicker {
            0%, 100% {
              opacity: 1;
              text-shadow: 0 0 8px rgba(34, 197, 94, 0.7), 0 0 16px rgba(239, 68, 68, 0.5);
            }
            25% {
              opacity: 0.92;
              text-shadow: 0 0 10px rgba(34, 197, 94, 0.85), 0 0 22px rgba(239, 68, 68, 0.75);
            }
            50% {
              opacity: 0.85;
              text-shadow: 0 0 6px rgba(34, 197, 94, 0.5), 0 0 12px rgba(239, 68, 68, 0.4);
            }
            75% {
              opacity: 0.95;
              text-shadow: 0 0 12px rgba(34, 197, 94, 0.95), 0 0 24px rgba(239, 68, 68, 0.8);
            }
          }

          .cyberpunk-main-text {
            background: linear-gradient(90deg, #4ade80 0%, #ef4444 52%, #22c55e 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: cyberpunkFlicker 1.4s steps(2, end) infinite;
          }

          .hacker-glitch-active {
            animation: profileIntenseGlitch 0.22s steps(2, end) infinite;
          }

          .hacker-glitch-layer-a {
            animation: hackerSliceA 2.6s infinite ease-in-out;
            color: #4ade80;
          }

          .hacker-glitch-layer-b {
            animation: hackerSliceB 2.3s infinite ease-in-out;
            color: #ef4444;
          }

          .hacker-glitch-layer-a-active {
            animation: hackerSliceA 0.95s steps(2, end) infinite;
            filter: hue-rotate(95deg) saturate(1.45);
            transform: translate(2px, 0);
          }

          .hacker-glitch-layer-b-active {
            animation: hackerSliceB 0.82s steps(2, end) infinite;
            filter: hue-rotate(-18deg) saturate(1.4);
            transform: translate(-2px, 0);
          }

          @keyframes profileIntenseGlitch {
            0% { transform: scale(1); filter: contrast(1) saturate(1); }
            16% { transform: scale(1.01); filter: contrast(1.25) saturate(1.3); }
            34% { transform: scale(0.995); filter: contrast(1.35) saturate(1.45); }
            50% { transform: scale(1.01); filter: contrast(1.5) saturate(1.7); }
            68% { transform: scale(0.995); filter: contrast(1.3) saturate(1.4); }
            82% { transform: scale(1.005); filter: contrast(1.2) saturate(1.2); }
            100% { transform: scale(1); filter: contrast(1) saturate(1); }
          }

          @keyframes profileScanline {
            from { background-position-y: 0px; }
            to { background-position-y: 110px; }
          }

          .profile-intense-glitch {
            animation: profileIntenseGlitch 0.22s steps(2, end) infinite;
          }

          .profile-glitch-layer-a {
            animation: hackerSliceA 0.95s steps(2, end) infinite;
            filter: hue-rotate(185deg) saturate(1.4);
            transform: translate(2px, 0);
          }

          .profile-glitch-layer-b {
            animation: hackerSliceB 0.82s steps(2, end) infinite;
            filter: hue-rotate(305deg) saturate(1.35);
            transform: translate(-2px, 0);
          }

          .profile-scanline {
            background: repeating-linear-gradient(
              180deg,
              rgba(52, 211, 153, 0.16) 0px,
              rgba(52, 211, 153, 0.16) 1px,
              transparent 3px,
              transparent 7px
            );
            animation: profileScanline 0.25s linear infinite;
          }

          @keyframes aboutBackgroundGlitch {
            0% { transform: translate(0, 0); opacity: 0.1; }
            20% { transform: translate(1px, 0); opacity: 0.35; }
            40% { transform: translate(-1px, 0); opacity: 0.18; }
            60% { transform: translate(1px, 0); opacity: 0.4; }
            80% { transform: translate(-1px, 0); opacity: 0.2; }
            100% { transform: translate(0, 0); opacity: 0.1; }
          }

          .about-bg-glitch {
            animation: aboutBackgroundGlitch 0.14s steps(2, end) infinite;
          }
        `}</style>

        {isBackgroundGlitching && (
          <div className="pointer-events-none absolute inset-0 z-0 about-bg-glitch">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.28),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.2),transparent_48%)]" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(16,185,129,0.14)_0px,rgba(16,185,129,0.14)_1px,transparent_3px,transparent_8px)]" />
            <div className="absolute inset-0 mix-blend-screen bg-cyan-400/10" style={{ transform: "translate(2px, 0)" }} />
            <div className="absolute inset-0 mix-blend-screen bg-fuchsia-400/10" style={{ transform: "translate(-2px, 0)" }} />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            <span
              className={`relative inline-block whitespace-nowrap leading-none font-extrabold tracking-wider transition duration-500 ${
                isImageGlitching ? "hacker-glitch-active" : "hacker-glitch"
              }`}
            >
              <span className="cyberpunk-main-text relative z-10">{glitchTitle}</span>
              <span
                aria-hidden="true"
                className={`absolute left-[2px] top-0 z-0 opacity-65 ${
                  isImageGlitching ? "hacker-glitch-layer-a-active" : "hacker-glitch-layer-a"
                }`}
              >
                {glitchTitle}
              </span>
              <span
                aria-hidden="true"
                className={`absolute -left-[2px] top-0 z-0 opacity-65 ${
                  isImageGlitching ? "hacker-glitch-layer-b-active" : "hacker-glitch-layer-b"
                }`}
              >
                {glitchTitle}
              </span>
            </span>
            <span className="mt-3 block text-2xl font-medium text-white/90 lg:text-3xl">
              Developer, Creator, Innovator
            </span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <div
                  ref={imageTriggerRef}
                  className={`relative h-full w-full overflow-hidden rounded-[15px] shadow ${
                    isImageGlitching ? "profile-intense-glitch" : ""
                  }`}
                >
                  <img
                    src={showHackerImage ? primaryGlitchImage : HeroImg}
                    className="h-full w-full rounded-[15px] object-cover block"
                    alt="profile"
                    width={1207}
                    height={929}
                  />

                  {isImageGlitching && (
                    <>
                      <img
                        src={secondaryGlitchImage}
                        alt=""
                        aria-hidden="true"
                        className="profile-glitch-layer-a absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-55"
                      />
                      <img
                        src={tertiaryGlitchImage}
                        alt=""
                        aria-hidden="true"
                        className="profile-glitch-layer-b absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-45"
                      />
                      <div className="absolute inset-0 profile-scanline pointer-events-none opacity-45" />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="relative space-y-4">
              {isBackgroundGlitching ? (
                <div className="rounded-xl border border-emerald-300/25 bg-[#02110d]/70 p-4 font-mono text-xs leading-6 text-emerald-200 shadow-[0_0_24px_rgba(16,185,129,0.25)] backdrop-blur-sm">
                  {HACKER_NOISE_LINES.map((line) => (
                    <p key={line} className="whitespace-pre-wrap break-all">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-white">
                    <span className="mb-2 inline-block rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-1 font-semibold tracking-wide text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.25)] backdrop-blur-sm transition duration-500 hover:shadow-[0_0_32px_rgba(56,189,248,0.5)]">
                      I find what others miss.
                    </span>
                    <br />
                    I'm Chongyean Taing, a passionate IT student at the Royal University of Phnom Penh 
                    majoring in Information Technology Engineering.{" "}
                    <span className="inline-block bg-gradient-to-r from-emerald-300 via-red-400 to-lime-300 bg-clip-text font-extrabold text-transparent drop-shadow-[0_0_8px_rgba(34,197,94,0.7)] transition duration-500 hover:drop-shadow-[0_0_16px_rgba(239,68,68,0.65)] animate-pulse [animation-duration:2.2s]">
                      As Penetration Tester with a Red Team mindset
                    </span>
                    , focused on web application security, API abuse, and business logic vulnerabilities.
                  </p>
                  <p className="text-white">
                    I approach every target methodically and mapping attack surfaces, chaining weaknesses, and documenting impact the way real adversaries think.
                  </p>
                  <p className="text-white leading-relaxed">
                    My development background gives me a deeper lens into how applications fail from the inside out.
                    <br />
                    <span className="mt-2 block text-left text-lg font-semibold italic tracking-wide text-cyan-200">
                      Every system has a crack. <br />I find it.
                    </span>
                  </p>
                </>
              )}

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I'm a lifelong learner and innovator, driven by a desire to

                    contribute to the developer community and Hacking flow.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Taing Chongyean, Creator of y34n
                    </cite>
                    <div className="flex items-center gap-2">
                      <img
                        className="h-5 w-fit"
                        src={ShibaWithHeadPhone}
                        alt="shibaWithHeadphone"
                        height="20"
                        width="auto"
                      />
                      <span className="text-white">Rork Rark</span>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
