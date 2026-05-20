"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Target date: May 30, 2026, 9:00 PM (21:00)
    // Month is 0-indexed in Date constructor (4 = May)
    const targetDate = new Date(2026, 4, 30, 21, 0, 0).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="flex gap-4 md:gap-8 mt-12 text-center"
    >
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item, index) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cherry-900/40 backdrop-blur-sm border border-cherry-200/30 flex items-center justify-center mb-2 shadow-lg">
            <span className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-cream-100 drop-shadow-md">
              {item.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="font-[family-name:var(--font-cormorant)] text-sm md:text-base text-cherry-200 uppercase tracking-widest drop-shadow-md">
            {item.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
