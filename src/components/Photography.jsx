import { useRef, useState } from "react";
import Lightbox from "./Lightbox";
import photos from "../data/photos.json";
import styles from "./Photography.module.css";

export default function Photography() {
  const [openIndex, setOpenIndex] = useState(null);
  const lastTriggerRef = useRef(null);

  const close = () => {
    setOpenIndex(null);
    lastTriggerRef.current?.focus();
  };

  return (
    <section id="photography" className="section section--wide">
      <h2 className="section__title">Photography</h2>
      <hr className="section__rule" />
      <ul className={styles.grid} role="list">
        {photos.map((photo, i) => (
          <li key={photo.alt}>
            <button
              type="button"
              className={styles.tile}
              style={{ aspectRatio: photo.aspect, background: photo.color }}
              onClick={(e) => {
                lastTriggerRef.current = e.currentTarget;
                setOpenIndex(i);
              }}
              aria-label={`View ${photo.alt}`}
            >
              {photo.src ? (
                <img src={photo.src} alt="" loading="lazy" className={styles.image} />
              ) : null}
              <span className={styles.label}>{photo.alt}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        Placeholder tiles — real photographs coming soon.
      </p>
      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={close}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}
