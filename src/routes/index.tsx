import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Leaf, MapPin, Sprout, Scissors, HeartHandshake, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Logo } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";
import { GrowStory } from "@/components/site/GrowStory";

import hero from "@/assets/hero.jpg";
import pBroccoli from "@/assets/p-broccoli.jpg";
import pRadish from "@/assets/p-radish.jpg";
import pSunflower from "@/assets/p-sunflower.jpg";
import pPea from "@/assets/p-pea.jpg";
import pMustard from "@/assets/p-mustard.jpg";
import pMix from "@/assets/p-mix.jpg";
import harvest from "@/assets/harvest.jpg";
import trays from "@/assets/trays.jpg";
import fresh from "@/assets/fresh.jpg";
import packaging from "@/assets/packaging.jpg";
import meal from "@/assets/meal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Little Leaf — Fresh, Local Microgreens" },
      { name: "description", content: "Nutrient-rich microgreens grown locally with care and harvested at their peak. Broccoli, radish, sunflower, pea shoots and more." },
      { property: "og:title", content: "Little Leaf — Small Greens. Big Nutrition." },
      { property: "og:description", content: "Fresh microgreens grown with care, harvested at their peak, and brought closer to your plate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  { name: "Broccoli", full: "Broccoli Microgreens", img: pBroccoli, desc: "Mild, crisp and quietly powerful — our everyday green.", note: "Mild · Crisp" },
  { name: "Radish", full: "Radish Microgreens", img: pRadish, desc: "Peppery bite with blush-pink stems that brighten any plate.", note: "Peppery · Vivid" },
  { name: "Sunflower", full: "Sunflower Microgreens", img: pSunflower, desc: "Nutty, juicy and satisfyingly crunchy. A chef favourite.", note: "Nutty · Crunchy" },
  { name: "Pea Shoots", full: "Pea Shoots", img: pPea, desc: "Sweet, tender tendrils that taste like early spring.", note: "Sweet · Tender" },
  { name: "Mustard", full: "Mustard Microgreens", img: pMustard, desc: "A warm, gentle heat for sandwiches, eggs and bowls.", note: "Warm · Bold" },
  { name: "Salad Mix", full: "Microgreen Salad Mix", img: pMix, desc: "A curated blend of our best greens, ready to toss.", note: "Balanced · Fresh" },
];

function Btn({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  const base = "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-all duration-300";
  const v = variant === "primary"
    ? "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lift"
    : "border border-foreground/20 text-foreground hover:border-primary hover:text-primary";
  return (
    <a href={href} className={`${base} ${v}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function SprigDecor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M60 200C60 140 58 80 62 10" />
      {[30, 60, 90, 120, 150].map((y, i) => (
        <g key={y}>
          <path d={`M61 ${y + 10}C${40 - i * 2} ${y} ${25} ${y - 10} ${18} ${y - 20}C${35} ${y - 18} ${55} ${y - 5} 61 ${y + 10}Z`} />
          <path d={`M61 ${y + 22}C${80 + i * 2} ${y + 12} ${95} ${y + 2} ${102} ${y - 8}C${85} ${y - 6} ${66} ${y + 8} 61 ${y + 22}Z`} />
        </g>
      ))}
    </svg>
  );
}

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <GrowStory />
        <Trust />
        <Products />
        <Why />
        <Process />
        <Story />
        <Freshness />
        <Testimonials />
        <ShopCta />
        <Social />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Trust() {
  const items = [
    { icon: Scissors, t: "Freshly Harvested" },
    { icon: MapPin, t: "Locally Grown" },
    { icon: Sprout, t: "Nutrient Rich" },
    { icon: HeartHandshake, t: "Grown With Care" },
  ];
  return (
    <section aria-label="Our promise" className="border-y border-border bg-card/60">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, t }, i) => (
          <Reveal key={t} delay={i * 80} className={`flex items-center gap-3 py-7 md:justify-center md:py-9 ${i % 2 ? "pl-4 md:pl-0" : ""}`}>
            <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.4} />
            <span className="text-sm font-medium md:text-base">{t}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="microgreens" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <Reveal>
            <p className="eyebrow">Our Microgreens</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Fresh greens, <em className="text-primary">grown with intention.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-muted-foreground md:ml-auto">
              Six varieties, each grown in small batches and cut to order — so what reaches your kitchen is as alive as the day it was harvested.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 120} as="article" className={`group ${i % 3 === 1 ? "lg:mt-16" : ""}`}>
              <a href="#contact" className="block" aria-label={`View details for ${p.full}`}>
                <div className="img-zoom relative rounded-[1.5rem] bg-muted">
                  <img src={p.img} alt={p.full} width={800} height={1008} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-[0.7rem] font-semibold tracking-widest text-primary backdrop-blur">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.note}</p>
                    <h3 className="mt-2 text-3xl">{p.full}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                  <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <span className="mt-4 inline-block border-b border-primary/40 pb-0.5 text-sm font-medium text-primary">View Details</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const points = [
    ["Nutrient Dense", "Packed with flavor and fresh plant nutrients."],
    ["Fresh & Flavorful", "Harvested young for vibrant taste and texture."],
    ["Easy to Enjoy", "Perfect for salads, sandwiches, bowls and everyday meals."],
    ["Grown With Care", "Produced in a controlled environment with attention to quality."],
  ];
  return (
    <section id="why" className="scroll-mt-20 bg-sage-light/50 py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className="img-zoom rounded-[2rem] shadow-soft">
          <img src={meal} alt="Grain bowl topped with fresh microgreens" width={1008} height={1008} loading="lazy" className="aspect-square w-full object-cover" />
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">Why Microgreens</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">More than just <em className="text-primary">a garnish.</em></h2>
          </Reveal>
          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {points.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100} className="border-t border-primary/20 pt-5">
                <dt className="font-serif text-2xl">{t}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "Select", "Carefully selected seeds."],
    ["02", "Grow", "Controlled growing conditions."],
    ["03", "Harvest", "Harvested at the right stage."],
    ["04", "Deliver", "Fresh greens delivered with care."],
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">How We Grow</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Four quiet steps, <em className="text-primary">done well.</em></h2>
        </Reveal>
        <ol className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="absolute left-[12%] right-[12%] top-8 hidden border-t border-dashed border-sage lg:block" aria-hidden />
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} as="li" delay={i * 120} className="relative text-center">
              <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-sage bg-background text-primary">
                <Sprout className="h-6 w-6" strokeWidth={1.2} style={{ transform: `scale(${0.7 + i * 0.12})` }} />
              </div>
              <p className="mt-6 font-serif text-lg italic text-muted-foreground">{n}</p>
              <h3 className="mt-1 text-sm font-semibold uppercase tracking-[0.22em] font-sans">{t}</h3>
              <p className="mx-auto mt-3 max-w-[14rem] text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Story() {
  const pillars = ["Freshness", "Quality", "Sustainable growing", "Local production", "Healthy food", "Modern agriculture"];
  return (
    <section id="story" className="scroll-mt-20 overflow-hidden bg-card py-24 md:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <Reveal className="img-zoom w-[82%] rounded-[2rem] shadow-soft">
            <img src={harvest} alt="Hands harvesting microgreens with scissors" width={1200} height={1408} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </Reveal>
          <Reveal delay={200} className="img-zoom absolute -bottom-10 right-0 w-[48%] rounded-[1.5rem] border-[6px] border-card shadow-lift">
            <img src={packaging} alt="Microgreens in compostable packaging" width={1008} height={1008} loading="lazy" className="aspect-square w-full object-cover" />
          </Reveal>
        </div>
        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 text-5xl leading-tight lg:text-6xl">From seed <em className="text-primary">to plate.</em></h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 font-serif text-2xl leading-snug">
              We believe fresh food should be closer, healthier and more thoughtfully grown.
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Little Leaf began on a single shelf of trays and a simple question: why does the freshest food travel the farthest? Today we grow in a clean, light-filled urban farm minutes from your kitchen — using modern growing methods, no pesticides and a fraction of the water of field farming.
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-8 flex flex-wrap gap-2">
            {pillars.map((p) => (
              <span key={p} className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium">{p}</span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Freshness() {
  return (
    <section className="relative">
      <div className="relative min-h-[36rem] overflow-hidden md:min-h-[44rem]">
        <img src={fresh} alt="Freshly harvested microgreens on linen" width={1920} height={1088} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:via-background/40" aria-hidden />
        <div className="container-x relative flex min-h-[36rem] items-center md:min-h-[44rem]">
          <Reveal className="max-w-lg">
            <p className="eyebrow">Freshness</p>
            <h2 className="mt-4 text-5xl leading-[1.02] md:text-7xl">Harvested fresh.<br /><em className="text-primary">Delivered with care.</em></h2>
            <p className="mt-6 max-w-sm text-muted-foreground md:text-lg">Every tray begins with a seed and ends with fresh greens ready for your plate.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    ["The sunflower shoots have become a non-negotiable in our kitchen. You can genuinely taste how fresh they are.", "Ananya R.", "Home cook, Indiranagar"],
    ["Consistent, beautiful and always on time. Our guests ask about the radish greens every single service.", "Karthik M.", "Head chef, Koramangala"],
    ["I bought them for my smoothies and ended up putting them on everything. Lasts far longer than supermarket greens.", "Meera S.", "Yoga instructor, Jayanagar"],
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">Kind Words</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Loved at <em className="text-primary">every table.</em></h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.map(([q, n, l], i) => (
            <Reveal key={n} as="figure" delay={i * 120} className="flex flex-col justify-between rounded-[1.5rem] border border-border bg-card p-8">
              <blockquote className="font-serif text-2xl leading-snug">“{q}”</blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <p className="text-sm font-semibold">{n}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopCta() {
  return (
    <section className="container-x">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-sage-light px-6 py-20 text-center md:px-16 md:py-28">
        <SprigDecor className="pointer-events-none absolute -left-4 bottom-0 h-56 text-primary/20" />
        <SprigDecor className="pointer-events-none absolute -right-4 top-0 h-56 rotate-180 text-primary/20" />
        <h2 className="relative mx-auto max-w-3xl text-4xl leading-tight sm:text-6xl">Bring more green <em className="text-primary">to your plate.</em></h2>
        <p className="relative mx-auto mt-6 max-w-md text-muted-foreground">Discover fresh microgreens grown locally and harvested with care.</p>
        <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Btn href="#microgreens">Shop Microgreens</Btn>
          <Btn href="#contact" variant="ghost">Contact Us</Btn>
        </div>
      </Reveal>
    </section>
  );
}

function Social() {
  const grid = [
    [trays, "Growing trays in our urban farm"],
    [harvest, "Harvesting by hand"],
    [pRadish, "Radish microgreens"],
    [packaging, "Compostable packaging"],
    [meal, "Healthy bowl with microgreens"],
    [hero, "Microgreens growing behind the scenes"],
  ] as const;
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">@littleleaf.farm</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Growing something <em className="text-primary">fresh.</em></h2>
          </Reveal>
          <Reveal delay={100}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
              <Instagram className="h-4 w-4" /> Follow our journey
            </a>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {grid.map(([src, alt], i) => (
            <Reveal key={alt} delay={(i % 4) * 80} className={`img-zoom rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover aspect-square" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  const field = "w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border bg-card py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Order, ask, <em className="text-primary">or say hello.</em></h2>
          <p className="mt-6 max-w-md text-muted-foreground">Weekly subscriptions, restaurant supply or a single box — tell us what you need and we'll get back within a day.</p>
          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> hello@littleleaf.farm</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Bengaluru, India</li>
          </ul>
        </Reveal>
        <Reveal delay={100}>
          {sent ? (
            <div className="flex h-full flex-col items-start justify-center rounded-[1.5rem] bg-sage-light p-10">
              <Leaf className="h-8 w-8 text-primary" />
              <p className="mt-4 font-serif text-3xl">Thank you — we'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <label className="sr-only" htmlFor="name">Name</label>
              <input id="name" required placeholder="Your name" className={field} />
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" type="email" required placeholder="Email address" className={field} />
              <label className="sr-only" htmlFor="interest">Interest</label>
              <select id="interest" className={`${field} sm:col-span-2`} defaultValue="">
                <option value="" disabled>I'm interested in…</option>
                {products.map((p) => <option key={p.name}>{p.full}</option>)}
                <option>Restaurant supply</option>
              </select>
              <label className="sr-only" htmlFor="msg">Message</label>
              <textarea id="msg" rows={5} placeholder="Message" className={`${field} sm:col-span-2`} />
              <button type="submit" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift sm:col-span-2 sm:justify-self-start">
                Send message <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const col = "text-sm text-muted-foreground transition-colors hover:text-primary";
  return (
    <footer className="bg-background pt-20 pb-10">
      <div className="container-x">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">Fresh, nutrient-rich microgreens grown locally with care and harvested at their peak.</p>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Instagram className="h-4 w-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 space-y-3">
              <li><a href="#home" className={col}>Home</a></li>
              <li><a href="#microgreens" className={col}>Microgreens</a></li>
              <li><a href="#story" className={col}>About</a></li>
              <li><a href="#contact" className={col}>Contact</a></li>
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <p className="eyebrow">Products</p>
            <ul className="mt-5 space-y-3">
              {["Broccoli", "Radish", "Sunflower", "Pea Shoots", "Salad Mix"].map((p) => (
                <li key={p}><a href="#microgreens" className={col}>{p}</a></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><a href="mailto:hello@littleleaf.farm" className={col}>hello@littleleaf.farm</a></li>
              <li><a href="tel:+919876543210" className={col}>+91 98765 43210</a></li>
              <li>Bengaluru, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Little Leaf Microgreens. All rights reserved.</p>
          <p>Grown with care, locally.</p>
        </div>
      </div>
    </footer>
  );
}
