import { animate, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_EASE = [0.22, 1, 0.36, 1];

export default function SmoothScrollController() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const animationRef = useRef(null);

  const stopCurrentAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  }, []);

  const animateToY = useCallback(
    (targetY, duration = 0.75) => {
      stopCurrentAnimation();

      if (shouldReduceMotion) {
        window.scrollTo(0, targetY);
        return;
      }

      const startY = window.scrollY;

      animationRef.current = animate(startY, targetY, {
        duration,
        ease: SCROLL_EASE,
        onUpdate: (latestY) => window.scrollTo(0, latestY),
        onComplete: () => {
          animationRef.current = null;
        },
      });
    },
    [shouldReduceMotion, stopCurrentAnimation]
  );

  useEffect(() => {
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();

      const targetTop =
        target.getBoundingClientRect().top + window.scrollY;

      animateToY(targetTop);
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      stopCurrentAnimation();
    };
  }, [animateToY, stopCurrentAnimation]);

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const targetTop =
          target.getBoundingClientRect().top + window.scrollY;

        animateToY(targetTop);
        return;
      }
    }

    animateToY(0, 0.55);
  }, [animateToY, location.pathname, location.hash]);

  return null;
}
