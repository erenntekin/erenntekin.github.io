"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedStat({ label, value }: { label: string; value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Match optional prefix, the first number, and any trailing suffix
  const match = value.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericStr = match ? match[2].replace(/,/g, "") : "";
  const suffix = match ? match[3] : "";
  const numeric = parseFloat(numericStr);
  const hasNumber = !Number.isNaN(numeric) && numeric > 0;

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(hasNumber ? `${prefix}0${suffix}` : value);

  useEffect(() => {
    if (isInView && hasNumber) {
      motionValue.set(numeric);
    }
  }, [isInView, hasNumber, numeric, motionValue]);

  useEffect(() => {
    if (!hasNumber) return;
    return spring.on("change", (v) => {
      setDisplay(prefix + Math.round(v).toLocaleString("en-US") + suffix);
    });
  }, [spring, hasNumber, prefix, suffix]);

  return (
    <div className="flex flex-col">
      <span ref={ref} className="font-mono text-2xl font-semibold text-foreground">
        {display}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
