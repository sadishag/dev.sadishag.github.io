import styles from "./TechChip.module.css";

export default function TechChip({ label }) {
  return <span className={styles.chip}>{label}</span>;
}
