"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import DottedMap from "dotted-map";

interface Point {
  lat: number;
  lng: number;
  label?: string;
  country?: string;
}

interface MapProps {
  dots?: Array<{ start: Point; end: Point }>;
  lineColor?: string;
}

interface Tooltip {
  x: number;
  y: number;
  label: string;
  country: string;
}

export default function WorldMap({ dots = [], lineColor = "#EE1C4D" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#FFFFFF25",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Convert SVG coords → container pixel coords for the tooltip
  const toPixel = (svgX: number, svgY: number) => {
    const el = svgRef.current;
    const container = containerRef.current;
    if (!el || !container) return { px: 0, py: 0 };
    const vb = el.viewBox.baseVal;
    const rect = container.getBoundingClientRect();
    const svgRect = el.getBoundingClientRect();
    const scaleX = svgRect.width / vb.width;
    const scaleY = svgRect.height / vb.height;
    return {
      px: (svgX * scaleX) + (svgRect.left - rect.left),
      py: (svgY * scaleY) + (svgRect.top - rect.top),
    };
  };

  const showTooltip = (point: Point, svgX: number, svgY: number) => {
    if (!point.label) return;
    const { px, py } = toPixel(svgX, svgY);
    setTooltip({ x: px, y: py, label: point.label, country: point.country ?? "" });
  };

  // Stagger offset per route so they don't all pulse together
  const CYCLE = 3; // seconds per loop
  const STAGGER = CYCLE / dots.length;

  return (
    <div ref={containerRef} className="relative aspect-[2/1] w-full select-none font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="30%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const sp = projectPoint(dot.start.lat, dot.start.lng);
          const ep = projectPoint(dot.end.lat, dot.end.lng);
          const delay = i * STAGGER;

          return (
            <g key={`route-${i}`}>
              {/* Animated arc, loops: draws in, fades out, repeats */}
              <motion.path
                d={createCurvedPath(sp, ep)}
                fill="none"
                stroke="url(#arc-gradient)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{
                  duration: CYCLE,
                  delay,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: "easeInOut",
                  times: [0, 0.65, 1],
                }}
              />

              {/* Origin dot, pulsing hub */}
              <circle
                cx={sp.x} cy={sp.y} r="3" fill={lineColor}
                className="cursor-pointer"
                onMouseEnter={() => showTooltip(dot.start, sp.x, sp.y)}
                onMouseLeave={() => setTooltip(null)}
              />
              <motion.circle
                cx={sp.x} cy={sp.y} r="3" fill={lineColor}
                style={{ pointerEvents: "none" }}
                animate={{ r: [3, 10], opacity: [0.5, 0] }}
                transition={{ duration: 2, delay: delay + 0.5, repeat: Infinity, ease: "easeOut" }}
              />

              {/* Destination dot */}
              <circle
                cx={ep.x} cy={ep.y} r="2.5" fill={lineColor}
                className="cursor-pointer"
                onMouseEnter={() => showTooltip(dot.end, ep.x, ep.y)}
                onMouseLeave={() => setTooltip(null)}
              />
              <motion.circle
                cx={ep.x} cy={ep.y} r="2.5" fill={lineColor}
                style={{ pointerEvents: "none" }}
                animate={{ r: [2.5, 8], opacity: [0.5, 0] }}
                transition={{
                  duration: 2,
                  delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full"
            style={{ left: tooltip.x, top: tooltip.y - 10 }}
          >
            <div className="rounded-lg bg-white px-3 py-2 shadow-lg shadow-black/20">
              <p className="whitespace-nowrap font-semibold text-[#242527] text-sm leading-none">
                {tooltip.label}
              </p>
              {tooltip.country && (
                <p className="mt-0.5 whitespace-nowrap text-neutral-400 text-xs">
                  {tooltip.country}
                </p>
              )}
            </div>
            {/* arrow */}
            <div className="mx-auto h-2 w-2 -translate-y-px rotate-45 bg-white shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
