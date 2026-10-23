"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Eye, Menu, X, ArrowUpRight } from "lucide-react";
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Exercises", "/exercises"],
    ["Progress", "/progress"],    
  ];
  return (
    <header className="header">
      <div className="shell nav">
        <Link href="/" className="brand" aria-label="Visualis home">
          <span className="brand-icon">
            <Eye size={23} />
          </span>
          visualis<span className="brand-period">.</span>
        </Link>
        <nav
          className={open ? "nav-links open" : "nav-links"}
          aria-label="Main navigation"
        >
          {links.map(([name, url]) => (
            <Link
              key={name}
              href={url}
              aria-current={pathname === url ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link className="button primary nav-cta" href="/exercises">
          Start Now <ArrowUpRight size={16} />
        </Link>
        <button
          className="icon-button mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
