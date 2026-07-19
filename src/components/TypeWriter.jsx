import { useEffect, useState } from "react";
import styles from "./TypeWriter.module.css";

const TYPE_MS = 60;
const DELETE_MS = 30;
const HOLD_MS = 2000;

export default function TypeWriter({ strings }) {
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const current = strings[idx];
    let timer;
    if (!deleting) {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_MS);
      } else {
        timer = setTimeout(() => setDeleting(true), HOLD_MS);
      }
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_MS);
    } else {
      setDeleting(false);
      setIdx((idx + 1) % strings.length);
    }
    return () => clearTimeout(timer);
  }, [text, deleting, idx, strings, reduceMotion]);

  if (reduceMotion) {
    return <span>{strings[0]}</span>;
  }

  return (
    <>
      {/* Screen readers get the primary role once, not every keystroke */}
      <span className="sr-only">{strings[0]}</span>
      <span aria-hidden="true">
        {text}
        <span className={styles.cursor}>|</span>
      </span>
    </>
  );
}
