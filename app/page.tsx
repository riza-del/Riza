"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/* Ikon minimalis */
const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-emerald-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-300"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

/* Komponen TiltCard dengan rotasi halus (max 3 derajat) */
function TiltCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [3, -3]); // diturunkan
  const rotateY = useTransform(mouseX, [0, 1], [-3, 3]); // diturunkan
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
      {/* Background pattern & orbs */}
      <div className="grid-pattern" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Bento Grid */}
      <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl">
        {/* Kotak Nama (span 2 kolom, 2 baris) */}
        <TiltCard
          delay={0.1}
          className="col-span-1 md:col-span-2 md:row-span-2 p-8 md:p-12 flex flex-col justify-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] text-shimmer">
            Muhammad
            <br />
            Khusna
            <br />
            Ghoyriza
          </h1>
        </TiltCard>

        {/* Kotak Lokasi */}
        <TiltCard delay={0.2} className="col-span-1 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-emerald-400">Active</span>
          </div>
          <div className="flex items-center gap-3 text-slate-200">
            <MapPinIcon />
            <span className="text-lg md:text-xl font-medium">
              Wonosobo, Jawa Tengah
            </span>
          </div>
        </TiltCard>

        {/* Kotak Email */}
        <TiltCard delay={0.3} className="col-span-1 p-6 md:p-8 flex flex-col justify-center">
          <a
            href="mailto:muhammadkhusnaghoiriza@gmail.com"
            className="inline-flex items-center gap-3 text-slate-200 hover:text-white transition-colors group"
          >
            <EmailIcon />
            <span className="text-lg md:text-xl font-medium break-all">
              muhammadkhusnaghoiriza@gmail.com
            </span>
          </a>
        </TiltCard>
      </div>

      {/* Hak Cipta */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-slate-500"
      >
        © {new Date().getFullYear()} Muhammad Khusna Ghoyriza
      </motion.footer>
    </main>
  );
}
