"use client";

import CategoryButtons from "@/components/CategoryButtons/page";
import Hero from "@/components/Hirosection/page";
import HeroSection from "@/components/Hirosection/page";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const titleRef = useRef(null);
  const boxRef = useRef(null);
  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      scale: 0.5,
      delay: 0.5,
      duration: 1,
      ease: "back.out(1.7)",
    });
    gsap.from(boxRef.current, {
      opacity: 0,
      scale: 0.5,
      delay: 1.5, 
      duration: 1,
      ease: "bounce.out",
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">

      <Hero  />
      <CategoryButtons  />
    </div>
  );
}
