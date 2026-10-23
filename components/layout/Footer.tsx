import Link from "next/link";
import { Eye, ArrowUpRight } from "lucide-react";
export function Footer() {
  return (
    <footer className="footer shell">
      <div className="footer-top">
        <div>
          <Link href="/" className="brand">
            <Eye /> visualis.
          </Link>
          <p>
            Visualis is designed for general wellness and visual-focus exercises. <br />
          It is not a medical diagnostic tool and does not replace professional
          eye care.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {[
            ["Exercises", "/exercises"],
            ["Progress", "/progress"],
            ["About", "/about"],
          ].map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
              <ArrowUpRight size={13} />
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Visualis. All rights reserved.
        </span>
        <p>
          
        </p>
      </div>
    </footer>
  );
}
