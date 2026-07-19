import { ExternalLink } from "lucide-react";
import TechChip from "./TechChip";
import projects from "../data/projects.json";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className="section section">
      <h2 className="section__title">Projects</h2>
      <hr className="section__rule" />
      <ul className={styles.grid} role="list">
        {projects.map((project) => (
          <li key={project.name} className={styles.card}>
            <div className={styles.cardHeading}>
              <h3 className={styles.cardTitle}>{project.name}</h3>
              {project.link && (
                <a
                  className={styles.cardLink}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name}`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
            <p className={styles.cardDesc}>{project.desc}</p>
            <ul className={styles.chips} role="list">
              {project.tech.map((tech) => (
                <li key={tech}>
                  <TechChip label={tech} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
