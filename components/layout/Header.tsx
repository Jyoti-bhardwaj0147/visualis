"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Eye, Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["Home", "/"],
  ["Exercises", "/exercises"],
  ["Progress", "/progress"],
  ["About", "/about"],
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

function MobilePanel({ pathname, reducedMotion, onNavigate }: {
  pathname: string;
  reducedMotion: boolean | null;
  onNavigate: (href: string) => void;
}) {
  const isPresent = useIsPresent();
  return (
    <motion.nav
      className="mobile-nav-panel"
      data-lenis-prevent
      aria-label="Mobile navigation"
      aria-hidden={!isPresent}
      inert={!isPresent}
      initial={reducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {links.map(([name, href]) => (
        <Link key={href} href={href} aria-current={isActive(pathname, href) ? (pathname === href ? "page" : "location") : undefined} onClick={() => onNavigate(href)}>
          {name}
        </Link>
      ))}
      <Link className="button primary mobile-nav-cta" href="/exercises" onClick={() => onNavigate("/exercises")}>
        Start Now <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </motion.nav>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const showHeader = ["/", "/exercises", "/progress", "/about", "/privacy"].includes(pathname) || pathname.startsWith("/exercises/");
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onChange = () => {
      const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
      if (header.getBoundingClientRect().width > 55 * rootFontSize) {
        const focusWasInPanel = !!headerRef.current?.querySelector(".mobile-nav-panel")?.contains(document.activeElement);
        setOpen(false);
        if (focusWasInPanel) headerRef.current?.querySelector<HTMLAnchorElement>(".nav-links a[aria-current], .nav-links a")?.focus();
      }
    };
    const observer = new ResizeObserver(onChange);
    observer.observe(header);
    window.addEventListener("resize", onChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onChange);
    };
  }, [showHeader]);

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  };

  if (!showHeader) return null;

  return (
    <header ref={headerRef} className="header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        closeMenu(true);
      }
    }}>
      <div className="shell nav">
        <Link href="/" className="brand" aria-label="Visualis home" onClick={() => closeMenu()}>
          <span className="brand-icon"><Eye size={23} /></span>
          visualis<span className="brand-period">.</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(([name, href]) => {
            const active = isActive(pathname, href);
            return (
              <Link key={href} href={href} aria-current={active ? (pathname === href ? "page" : "location") : undefined}>
                {active && (reducedMotion ? <span className="nav-active-pill" /> : <motion.span className="nav-active-pill" layoutId="header-active-pill" transition={{ type: "spring", stiffness: 350, damping: 35 }} />)}
                <span className="nav-link-label">{name}</span>
              </Link>
            );
          })}
        </nav>
        <Link className="button primary nav-cta" href="/exercises" onClick={() => closeMenu()}>
          Start Now <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button ref={toggleRef} type="button" className="icon-button mobile-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={panelId}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div id={panelId} className="mobile-nav-container">
        <AnimatePresence initial={false}>
          {open && <MobilePanel pathname={pathname} reducedMotion={reducedMotion} onNavigate={(href) => closeMenu(href === pathname)} />}
        </AnimatePresence>
      </div>
    </header>
  );
}
