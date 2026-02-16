"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  decimals = 0,
  className,
}: CountUpProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      const raw = eased * end;
      setCount(decimals > 0 ? parseFloat(raw.toFixed(decimals)) : Math.round(raw));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, decimals]);

  const displayValue = `${prefix}${decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}${suffix}`;
  const finalValue = `${prefix}${decimals > 0 ? end.toFixed(decimals) : end.toLocaleString()}${suffix}`;

  return (
    <div ref={ref} className={className} aria-label={finalValue}>
      {displayValue}
    </div>
  );
}
