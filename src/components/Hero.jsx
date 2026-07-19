import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import TypeWriter from "./TypeWriter";
import social from "../data/social.json";
import styles from "./Hero.module.css";

const ROLES = [
  "Lead Full Stack Engineer",
  "Building at Manulife",
  "McMaster Engineering Alum",
  "Photographer",
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: social.github, Icon: Github },
  { label: "LinkedIn", href: social.linkedin, Icon: Linkedin },
  { label: "X (Twitter)", href: social.twitter, Icon: Twitter },
  { label: "Email", href: `mailto:${social.email}`, Icon: Mail },
];

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.name}>Sadisha Galappatti</h1>
        <p className={styles.subtitle}>
          <TypeWriter strings={ROLES} />
        </p>
        <p className={styles.location}>
          <MapPin size={16} aria-hidden="true" />
          Toronto, Ontario, Canada
        </p>
        <ul className={styles.socials} role="list">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={scrolled ? styles.scrollHintHidden : styles.scrollHint}
        aria-hidden="true"
      >
        ↓
      </div>
    </section>
  );
}
