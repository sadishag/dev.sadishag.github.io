import { Github, Linkedin, Mail } from "lucide-react";
import social from "../data/social.json";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.brand}>SG</span>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Sadisha Galappatti
          </span>
        </div>
        <div className={styles.right}>
          <span className={styles.stack}>React + Vite · GitHub Pages</span>
          <span className={styles.divider} aria-hidden="true">
            ·
          </span>
          <ul className={styles.socials} role="list">
            <li>
              <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
            </li>
            <li>
              <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </li>
            <li>
              <a href={`mailto:${social.email}`} aria-label="Email">
                <Mail size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
