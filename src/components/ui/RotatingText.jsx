/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const getDelay = (index, total, staggerFrom, staggerDuration) => {
  if (staggerFrom === "last") {
    return (total - 1 - index) * staggerDuration;
  }

  if (staggerFrom === "center") {
    const center = (total - 1) / 2;
    return Math.abs(index - center) * staggerDuration;
  }

  return index * staggerDuration;
};

export default function RotatingText({
  texts = [],
  mainClassName,
  splitLevelClassName,
  staggerFrom = "first",
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  staggerDuration = 0.025,
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2000,
}) {
  const safeTexts = useMemo(() => texts.filter(Boolean), [texts]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (safeTexts.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeTexts.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [safeTexts.length, rotationInterval]);

  if (safeTexts.length === 0) {
    return null;
  }

  const text = safeTexts[currentIndex];
  const chars = Array.from(text);

  return (
    <div className={cn("inline-flex items-center justify-center", mainClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={`${text}-${currentIndex}`}
          className={cn("inline-flex", splitLevelClassName)}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
        >
          {chars.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block whitespace-pre"
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{ ...transition, delay: getDelay(index, chars.length, staggerFrom, staggerDuration) }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
