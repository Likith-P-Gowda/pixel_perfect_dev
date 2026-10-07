import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#home", label: "Home" },
  { href: "#microgreens", label: "Our Microgreens" },
  { href: "#why", label: "Why Microgreens" },
  { href: "#story", label: "Our Story" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border/70 bg-background/85 py-3 backdrop-blur-md" : "py-5"
      }`}
    >
      <nav className="container-x flex items-center justify-between gap-4">
        <a href="#home" aria-label="Little Leaf home" className="shrink-0">
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#microgreens"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex"
          >
            Shop Fresh
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-background transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-x flex items-center justify-between py-5">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="container-x mt-10 flex flex-col gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 font-serif text-3xl"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="container-x mt-10">
          <a
            href="#microgreens"
            onClick={() => setOpen(false)}
            className="flex w-full justify-center rounded-full bg-primary py-4 font-medium text-primary-foreground"
          >
            Shop Fresh
          </a>
        </div>
      </div>
    </header>
  );
}
