// components/LiveClock.tsx
"use client"; // اگر از App Router استفاده می‌کنی

import { Clock } from "iconsax-reactjs";
import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleTimeString("fa-IR");
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("fa-IR"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="flex items-center gap-2 ">{time}</div>;
}
