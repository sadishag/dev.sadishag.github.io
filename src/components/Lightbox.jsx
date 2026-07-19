import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./Lightbox.module.css";

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const photo = photos[index];
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onClose, onNavigate]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <button
        type="button"
        className={styles.prev}
        onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
        aria-label="Previous photo"
      >
        <ChevronLeft size={32} />
      </button>
      <figure className={styles.figure}>
        {photo.src ? (
          <img src={import.meta.env.BASE_URL + photo.src} alt={photo.alt} className={styles.image} />
        ) : (
          <div
            className={styles.placeholder}
            style={{ background: photo.color, aspectRatio: photo.aspect }}
          />
        )}
        <figcaption className={styles.caption}>
          {photo.alt}
          <span className={styles.count}>
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>
      <button
        type="button"
        className={styles.next}
        onClick={() => onNavigate((index + 1) % photos.length)}
        aria-label="Next photo"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
