import { useState } from "react";
import TechChip from "./TechChip";
import experience from "../data/experience.json";
import styles from "./Experience.module.css";

function TimelineEntry({ entry, isLast }) {
  const [open, setOpen] = useState(false);
  const detailsId = `experience-${entry.company.toLowerCase().replace(/\W+/g, "-")}`;

  return (
    <li className={styles.entry}>
      <div className={styles.rail} aria-hidden="true">
        <span className={entry.current ? styles.dotCurrent : styles.dot} />
        {!isLast && <span className={styles.line} />}
      </div>
      <div className={isLast ? styles.bodyLast : styles.body}>
        <div className={styles.heading}>
          <div>
            <a
              className={styles.company}
              href={entry.url}
              target="_blank"
              rel="noreferrer"
            >
              {entry.company}
            </a>
            <span className={styles.role}>{entry.role}</span>
          </div>
          <span className={styles.period}>{entry.period}</span>
        </div>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={detailsId}
        >
          {open ? "Hide details ↑" : "Show details ↓"}
        </button>
        {open && (
          <div id={detailsId} className={styles.details}>
            <ul className={styles.bullets}>
              {entry.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <ul className={styles.chips} role="list">
              {entry.tech.map((tech) => (
                <li key={tech}>
                  <TechChip label={tech} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section__title">Experience</h2>
      <hr className="section__rule" />
      <ul className={styles.timeline} role="list">
        {experience.roles.map((entry, i) => (
          <TimelineEntry
            key={entry.company}
            entry={entry}
            isLast={i === experience.roles.length - 1}
          />
        ))}
      </ul>
      {experience.education.map(({ school, credential }) => (
        <div key={school} className={styles.education}>
          <span className={styles.school}>{school}</span>
          <span className={styles.credential}>{credential}</span>
        </div>
      ))}
    </section>
  );
}
