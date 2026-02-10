"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SciFiCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 800, mass: 0.1 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // ⚠️ FIX: Added '!!' to convert Element to Boolean
      const isLink = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        !!target.closest("button") || // <--- Fixed here
        !!target.closest("a") ||      // <--- Fixed here
        target.classList.contains("cursor-pointer");

      setIsHovering(isLink);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
        className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          height: isClicking ? 0 : isHovering ? 60 : 24,
          width: isClicking ? 0 : isHovering ? 60 : 24,
          borderColor: isHovering ? "#a855f7" : "#22d3ee",
          borderWidth: isHovering ? 1 : 1.5,
          opacity: isClicking ? 0.5 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: "easeInOut",
        }}
      />
    </>
  );
}