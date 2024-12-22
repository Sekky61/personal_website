'use client';

import type React from "react";
import { useRef, type ReactNode } from "react";

interface MouseOffsetWrapperProps {
  children: ReactNode;
}

const offsetDefault = "0.5";

const MouseOffsetWrapper: React.FC<MouseOffsetWrapperProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const offsetX = Math.min(Math.max((e.clientX - left) / width, 0), 1);
    const offsetY = Math.min(Math.max((e.clientY - top) / height, 0), 1);

    containerRef.current.style.setProperty("--offset-x", offsetX.toString());
    containerRef.current.style.setProperty("--offset-y", offsetY.toString());
  };

  // If leaves, set to default
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    containerRef.current.style.setProperty("--offset-x", offsetDefault);
    containerRef.current.style.setProperty("--offset-y", offsetDefault);
  };


  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default MouseOffsetWrapper;
