import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import soil from "@/assets/soil-closeup.jpg";
import traySprouts from "@/assets/tray-sprouts.jpg";
import harvestTop from "@/assets/harvest-top.jpg";

const SURFACE = 560; // soil surface y in SVG space (viewBox 1600x1000)

type SproutProps = {
  p: MotionValue<number>;
  x: number;
  height: number;
  stem: [number, number];
  leaf: [number, number];
  scale?: number;
  lean?: number;
};

function Sprout({ p, x, height, stem, leaf, scale = 1, lean = 0 }: SproutProps) {
  const len = useTransform(p, stem, [0, 1], { clamp: true });
  const leafS = useTransform(p, leaf, [0, 1], { clamp: true });
  const stemOpacity = useTransform(len, [0, 0.02], [0, 1]);
  const d = `M ${x} ${SURFACE + 20} C ${x} ${SURFACE - height * 0.4}, ${x + lean * 0.6} ${SURFACE - height * 0.7}, ${x + lean} ${SURFACE + 20 - height}`;
  const leafPath = (side: number) =>
    useTransform([len, leafS], ([l, o]: number[]) => {
      const tx = x + lean * l;
      const ty = SURFACE + 20 - height * l;
      const size = 135 * o;
      const ang = ((80 - 75 * o) * Math.PI) / 180; // from upright to open
      const ex = tx + side * Math.cos(ang) * size;
      const ey = ty - Math.sin(ang) * size;
      const nx = -Math.sin(ang) * side, ny = -Math.cos(ang);
      const w = size * 0.42;
      return `M ${tx} ${ty} C ${tx + (ex - tx) * 0.3 + nx * w} ${ty + (ey - ty) * 0.3 + ny * w}, ${ex + nx * w * 0.6} ${ey + ny * w * 0.6}, ${ex} ${ey} C ${ex - nx * w * 0.5} ${ey - ny * w * 0.5}, ${tx + (ex - tx) * 0.4 - nx * w * 0.3} ${ty + (ey - ty) * 0.4 - ny * w * 0.3}, ${tx} ${ty} Z`;
    });
  const left = leafPath(-1);
  const right = leafPath(1);

  return (
    <g style={{ transformOrigin: `${x}px ${SURFACE}px`, transform: `scale(${scale})` }}>
      <motion.path
        d={d}
        stroke="url(#stemGrad)"
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: len, opacity: stemOpacity }}
      />
      <motion.path d={left} fill="url(#leafGrad)" style={{ opacity: leafS }} />
      <motion.path d={right} fill="url(#leafGrad)" style={{ opacity: leafS }} />
    </g>
  );
}

const lines = [
  { t: ["Everything starts", "with a seed."], r: [0, 0.02, 0.12, 0.17] },
  { t: ["Small", "beginnings."], r: [0.17, 0.22, 0.32, 0.37] },
  { t: ["Growing", "with care."], r: [0.37, 0.42, 0.52, 0.57] },
  { t: ["Freshness", "takes root."], r: [0.57, 0.62, 0.72, 0.77] },
];

function Line({ p, t, r, first }: { p: MotionValue<number>; t: string[]; r: number[]; first?: boolean }) {
  const opacity = useTransform(p, r, first ? [1, 1, 1, 0] : [0, 1, 1, 0]);
  const y = useTransform(p, r, first ? [0, 0, 0, -30] : [30, 0, 0, -30]);
  return (
    <motion.h2 style={{ opacity, y }} className="absolute inset-x-0 px-5 text-5xl md:px-10 xl:px-16 leading-[0.98] sm:text-6xl lg:text-8xl">
      {t[0]}
      <br />
      <em className="text-primary">{t[1]}</em>
    </motion.h2>
  );
}

const stages = ["Seed", "Root", "Sprout", "Leaves", "Microgreens", "Harvest"];

export function GrowStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const p = reduce ? scrollYProgress : smooth;

  const seedOpacity = useTransform(p, [0, 0.04], [0.6, 1]);
  const soilY = useTransform(p, [0, 0.2], [0, -6]);
  const root = useTransform(p, [0.05, 0.38], [0, 1], { clamp: true });
  const rootSide = useTransform(p, [0.2, 0.45], [0, 1], { clamp: true });
  const sceneScale = useTransform(p, [0, 0.55, 0.82], [1.15, 1, 0.82]);
  const sceneOpacity = useTransform(p, [0.68, 0.78], [1, 0]);
  const trayOpacity = useTransform(p, [0.7, 0.8, 0.86, 0.9], [0, 1, 1, 0]);
  const trayScale = useTransform(p, [0.7, 0.9], [1.25, 1]);
  const harvestOpacity = useTransform(p, [0.86, 0.92], [0, 1]);
  const harvestScale = useTransform(p, [0.86, 1], [1.08, 1]);
  const finalOpacity = useTransform(p, [0.9, 0.95], [0, 1]);
  const finalY = useTransform(p, [0.9, 0.95], [30, 0]);
  const hint = useTransform(p, [0, 0.04], [1, 0]);
  const progressH = useTransform(p, [0, 1], ["0%", "100%"]);

  const extras = [
    { x: 560, h: 210, s: 0.75, lean: -14 },
    { x: 1040, h: 240, s: 0.8, lean: 18 },
    { x: 380, h: 180, s: 0.6, lean: -8 },
    { x: 1220, h: 190, s: 0.62, lean: 10 },
    { x: 690, h: 160, s: 0.55, lean: 6 },
    { x: 920, h: 170, s: 0.58, lean: -6 },
  ];

  return (
    <section id="home" ref={ref} className="relative h-[360vh] md:h-[520vh]" aria-label="From seed to harvest">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background">
        {/* Close-up scene */}
        <motion.div className="absolute inset-0" style={{ scale: sceneScale, opacity: sceneOpacity }}>
          <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="stemGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="oklch(0.9 0.04 110)" />
                <stop offset="1" stopColor="oklch(0.62 0.13 140)" />
              </linearGradient>
              <radialGradient id="leafGrad" cx="0.3" cy="0.4" r="0.9">
                <stop offset="0" stopColor="oklch(0.78 0.15 135)" />
                <stop offset="1" stopColor="oklch(0.5 0.12 148)" />
              </radialGradient>
              <radialGradient id="seedGrad" cx="0.35" cy="0.35" r="0.8">
                <stop offset="0" stopColor="oklch(0.86 0.06 80)" />
                <stop offset="1" stopColor="oklch(0.6 0.08 65)" />
              </radialGradient>
            </defs>
            <motion.g style={{ y: soilY }}>
              <rect x="0" y="0" width="1600" height="1000" fill="oklch(0.95 0.015 85)" />
              <image href={soil} x="-40" y={SURFACE - 290} width="1680" height="1058" preserveAspectRatio="xMidYMid slice" />
            </motion.g>
            {/* roots */}
            <motion.path d={`M 800 ${SURFACE + 45} C 805 ${SURFACE + 120}, 785 ${SURFACE + 200}, 798 ${SURFACE + 300} S 790 ${SURFACE + 420}, 802 ${SURFACE + 480}`} stroke="oklch(0.93 0.03 90)" strokeWidth={4} strokeLinecap="round" fill="none" style={{ pathLength: root }} />
            <motion.path d={`M 799 ${SURFACE + 160} C 770 ${SURFACE + 200}, 750 ${SURFACE + 240}, 735 ${SURFACE + 300}`} stroke="oklch(0.9 0.03 90)" strokeWidth={2} fill="none" style={{ pathLength: rootSide }} />
            <motion.path d={`M 797 ${SURFACE + 250} C 830 ${SURFACE + 290}, 850 ${SURFACE + 330}, 862 ${SURFACE + 390}`} stroke="oklch(0.9 0.03 90)" strokeWidth={2} fill="none" style={{ pathLength: rootSide }} />
            {/* extra sprouts */}
            {extras.map((e, i) => (
              <Sprout key={i} p={p} x={e.x} height={e.h} scale={e.s} lean={e.lean} stem={[0.52 + i * 0.025, 0.66 + i * 0.02]} leaf={[0.62 + i * 0.02, 0.74 + i * 0.01]} />
            ))}
            {/* hero sprout */}
            <Sprout p={p} x={800} height={300} stem={[0.24, 0.5]} leaf={[0.44, 0.6]} lean={6} />
            <motion.ellipse cx="800" cy={SURFACE + 32} rx="30" ry="20" fill="url(#seedGrad)" style={{ opacity: seedOpacity }} />
          </svg>
        </motion.div>

        {/* Tray photo */}
        <motion.img src={traySprouts} alt="" aria-hidden width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" style={{ opacity: trayOpacity, scale: trayScale }} />
        {/* Harvest photo */}
        <motion.img src={harvestTop} alt="A tray of fully grown microgreens beside a bowl of fresh harvest" width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: harvestOpacity, scale: harvestScale }} />

        {/* Headlines */}
        <div className="pointer-events-none absolute inset-x-0 top-24 md:top-28">
          <div className="relative mx-auto h-56 max-w-[88rem] md:h-72">
            {lines.map((l, i) => (
              <Line key={i} p={p} t={l.t} r={l.r} first={i === 0} />
            ))}
          </div>
        </div>

        {/* Final */}
        <motion.div style={{ opacity: finalOpacity, y: finalY }} className="absolute inset-x-0 bottom-8 md:bottom-14">
          <div className="container-x">
            <div className="max-w-lg rounded-[1.75rem] bg-background/90 p-7 shadow-soft backdrop-blur md:p-10">
              <p className="eyebrow">Harvest</p>
              <h2 className="mt-3 text-5xl leading-[1] md:text-6xl">Ready for <em className="text-primary">your plate.</em></h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">Fresh microgreens grown with care, harvested at their peak, and brought closer to you.</p>
              <a href="#microgreens" className="group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift">
                Shop Microgreens <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stage rail */}
        <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 md:block lg:right-10">
          <div className="relative flex h-72 flex-col justify-between pl-5">
            <div className="absolute left-0 top-0 h-full w-px bg-foreground/15" />
            <motion.div className="absolute left-0 top-0 w-px bg-primary" style={{ height: progressH }} />
            {stages.map((s) => (
              <span key={s} className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground/60">{s}</span>
            ))}
          </div>
        </div>

        {/* Hint */}
        <motion.div style={{ opacity: hint }} className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary-foreground">
          <span className="rounded-full bg-primary/80 px-4 py-2 backdrop-blur">Scroll to grow</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
