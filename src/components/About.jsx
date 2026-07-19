import TechChip from "./TechChip";
import skills from "../data/skills.json";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="section__title">About</h2>
      <hr className="section__rule" />
      <p className={styles.paragraph}>
        I&apos;m Sadisha — most people call me Sid. I&apos;ve spent the last decade
        building cloud infrastructure and full-stack applications for Canada&apos;s
        biggest financial institutions. I care about reliable systems, clear
        documentation, and teams where people can do their best work.
      </p>
      <p className={styles.paragraph}>
        Currently I&apos;m a Lead Full Stack Engineer at Manulife, where I work on
        the Manulife Group Benefits website and serve as technical lead for
        Group Benefits Member Web Experiences — working with React, Node.js, and
        Terraform to ship products at scale. Before that, I built API gateway
        infrastructure at RBC and cut my teeth on microservices at BlackBerry.
      </p>
      <p className={styles.paragraph}>
        Outside of engineering, I co-founded and presided over DeltaHacks —
        McMaster&apos;s largest hackathon — and I&apos;m usually behind a camera when
        I&apos;m not behind a keyboard.
      </p>
      <ul className={styles.chips} role="list">
        {skills.map((skill) => (
          <li key={skill}>
            <TechChip label={skill} />
          </li>
        ))}
      </ul>
    </section>
  );
}
