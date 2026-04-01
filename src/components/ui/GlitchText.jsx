/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
const GLITCH_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GLITCH_LOWER = "abcdefghijklmnopqrstuvwxyz";
const GLITCH_DIGITS = "0123456789";

const pickRandom = (source) => source[Math.floor(Math.random() * source.length)];

const getMappedGlitchChar = (char) => {
  if (/[a-z]/.test(char)) {
    return pickRandom(GLITCH_LOWER);
  }

  if (/[A-Z]/.test(char)) {
    return pickRandom(GLITCH_UPPER);
  }

  if (/[0-9]/.test(char)) {
    return pickRandom(GLITCH_DIGITS);
  }

  return pickRandom(GLITCH_CHARS);
};

export default function GlitchText({
  children,
  speed = 1,
  active = true,
  enableShadows = false,
  enableOnHover = true,
  encryptedWhenIdle = false,
  autoLoop = false,
  onGlitchComplete,
  className,
  ...rest
}) {
  const targetText = useMemo(() => (typeof children === "string" ? children : String(children ?? "")), [children]);
  const [displayText, setDisplayText] = useState(targetText);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const onGlitchCompleteRef = useRef(onGlitchComplete);

  useEffect(() => {
    onGlitchCompleteRef.current = onGlitchComplete;
  }, [onGlitchComplete]);

  const getEncryptedText = useCallback(
    (text) =>
      text
        .split("")
        .map((char) => (char === " " ? " " : getMappedGlitchChar(char)))
        .join(""),
    []
  );

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  }, []);

  const runGlitch = useCallback(() => {
    clearTimers();
    setIsGlitching(true);

    let iteration = 0;
    const step = Math.max(0.2, speed * 0.22);
    const tickRate = Math.max(20, 52 - Math.floor(speed * 8));

    intervalRef.current = setInterval(() => {
      iteration += step;

      const nextText = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") {
            return " ";
          }

          if (index < iteration) {
            return targetText[index];
          }

          return getMappedGlitchChar(char);
        })
        .join("");

      setDisplayText(nextText);

      if (iteration >= targetText.length) {
        clearTimers();
        setDisplayText(targetText);
        setIsGlitching(false);
        if (typeof onGlitchCompleteRef.current === "function") {
          onGlitchCompleteRef.current();
        }
      }
    }, tickRate);
  }, [clearTimers, speed, targetText]);

  useEffect(() => {
    if (!targetText) {
      return undefined;
    }

    if (!active) {
      clearTimers();
      setIsGlitching(false);
      setDisplayText(encryptedWhenIdle ? getEncryptedText(targetText) : targetText);
      return undefined;
    }

    runGlitch();

    if (autoLoop) {
      restartTimeoutRef.current = setTimeout(function loop() {
        runGlitch();
        restartTimeoutRef.current = setTimeout(loop, 2200);
      }, 2200);
    }

    return () => {
      clearTimers();
    };
  }, [targetText, runGlitch, clearTimers, autoLoop, active, encryptedWhenIdle, getEncryptedText]);

  return (
    <span
      {...rest}
      className={cn(
        className,
        isGlitching && "tracking-[0.03em]",
        enableShadows && isGlitching && "[text-shadow:-1px_0_rgba(34,197,94,0.8),1px_0_rgba(239,68,68,0.8)]"
      )}
      onMouseEnter={() => {
        if (enableOnHover && active) {
          runGlitch();
        }
      }}
    >
      {displayText}
    </span>
  );
}
