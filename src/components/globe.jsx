import IconCloud from "./ui/icon-cloud";

const kaliIconModules = import.meta.glob("../assets/kali icons/*.svg", {
    eager: true,
    import: "default",
  });

const toTitle = (value) =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const kaliIconImages = Object.entries(kaliIconModules)
  .filter(([path]) => !path.includes("kali-tools-icon-missing"))
  .map(([path, src]) => {
    const filename = path.split("/").pop()?.replace(".svg", "") || "kali-tool";
    const toolName = toTitle(filename.replace(/-logo$/, "").replace(/-framework$/, ""));

    return {
      src,
      name: toolName,
      about: `${toolName} is a Kali Linux security tool commonly used in offensive security workflows.`,
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

function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg  px-20 pb-20 pt-8 bg-transparent">
      <IconCloud iconSlugs={slugs} imageArray={iconImages} />
    </div>
  );
}

export default IconCloudDemo;
