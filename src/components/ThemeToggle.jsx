import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./ThemeToggle.module.css";

// Initial value comes from <html data-theme>, set pre-paint by index.html
function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* storage unavailable — theme still applies for this visit */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
