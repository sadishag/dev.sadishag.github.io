import videos from "../data/videos.json";
import styles from "./Videography.module.css";

export default function Videography() {
  return (
    <section id="videography" className="section section">
      <h2 className="section__title">Videography</h2>
      <hr className="section__rule" />
      <ul className={styles.list} role="list">
        {videos.map((video) => (
          <li key={video.id} className={styles.item}>
            <div className={styles.frame}>
              <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title || "YouTube video player"}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            {video.title && <p className={styles.caption}>{video.title}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
