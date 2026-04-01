import HeroImg from "@/assets/images/hero.jpg";
// import OlovaLogo from "@/assets/images/olova.png";
import ShibaWithHeadPhone from "@/assets/images/shibaWithHeadphone.jpg";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
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

          .hacker-glitch-layer-a {
            animation: hackerSliceA 2.6s infinite ease-in-out;
          }

          .hacker-glitch-layer-b {
            animation: hackerSliceB 2.3s infinite ease-in-out;
          }
        `}</style>

        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            <span className="hacker-glitch relative inline-block rounded-md border border-emerald-300/50 bg-emerald-400/10 px-3 py-1 font-extrabold tracking-wider text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.45)] transition duration-500 hover:scale-105 hover:shadow-[0_0_28px_rgba(52,211,153,0.6)]">
              <span className="relative z-10">Hacker</span>
              <span
                aria-hidden="true"
                className="hacker-glitch-layer-a absolute left-[2px] top-0 z-0 text-fuchsia-300 opacity-65"
              >
                Hacker
              </span>
              <span
                aria-hidden="true"
                className="hacker-glitch-layer-b absolute -left-[2px] top-0 z-0 text-cyan-300 opacity-65"
              >
                Hacker
              </span>
            </span>
            <span className="mt-3 block text-2xl font-medium text-white/90 lg:text-3xl">
              Developer, Creator, Innovator
            </span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block"
                  alt="payments illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-white">
                <span className="mb-2 inline-block rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-1 font-semibold tracking-wide text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.25)] backdrop-blur-sm transition duration-500 hover:scale-105 hover:shadow-[0_0_32px_rgba(56,189,248,0.5)]">
                  I find what others miss.
                </span>
                <br />
                I'm Chongyean Taing, a passionate IT student at the Royal University of Phnom Penh 
                majoring in Information Technology Engineering.{" "}
                <span className="inline-block bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 bg-clip-text font-extrabold text-transparent drop-shadow-[0_2px_10px_rgba(251,191,36,0.35)] transition duration-500 hover:scale-105 hover:drop-shadow-[0_4px_16px_rgba(34,211,238,0.45)] animate-pulse [animation-duration:2.2s]">
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
