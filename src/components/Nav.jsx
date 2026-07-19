import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import styles from "./Nav.module.css";

const SECTIONS = ["About", "Experience", "Projects", "Photography", "Videography", "Blog"];

// On the home page, section links are native anchors (smooth scroll).
// On other routes they become router Links back to "/" with a hash,
// which App's hash effect scrolls to after render.
function SectionLink({ id, className, children, onHome, onClick, current }) {
  const ariaCurrent = current ? "true" : undefined;
  return onHome ? (
    <a href={`#${id}`} className={className} onClick={onClick} aria-current={ariaCurrent}>
      {children}
    </a>
  ) : (
    <Link to={`/#${id}`} className={className} onClick={onClick} aria-current={ariaCurrent}>
      {children}
    </Link>
  );
}

export default function Nav() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }
    const ids = SECTIONS.map((s) => s.toLowerCase());
    let ticking = false;

    const update = () => {
      ticking = false;
      // Active section = the last one whose top has passed under the nav
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.nav}>
      <nav className={styles.inner} aria-label="Main">
        {onHome ? (
          <a href="#hero" className={styles.brand} onClick={closeMenu}>
            SG
          </a>
        ) : (
          <Link to="/" className={styles.brand} onClick={closeMenu}>
            SG
          </Link>
        )}
        <div className={styles.controls}>
          <ul className={styles.links} role="list">
            {SECTIONS.map((label) => {
              const id = label.toLowerCase();
              return (
                <li key={id}>
                  <SectionLink
                    id={id}
                    onHome={onHome}
                    current={active === id}
                    className={active === id ? styles.linkActive : styles.link}
                  >
                    {label}
                  </SectionLink>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <nav aria-label="Mobile">
          <ul className={styles.mobileMenu} role="list">
            {SECTIONS.map((label) => {
              const id = label.toLowerCase();
              return (
                <li key={id}>
                  <SectionLink
                    id={id}
                    onHome={onHome}
                    className={active === id ? styles.mobileLinkActive : styles.mobileLink}
                    onClick={closeMenu}
                  >
                    {label}
                  </SectionLink>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
