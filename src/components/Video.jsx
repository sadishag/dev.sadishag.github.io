import videos from "../data/videos.json";
import styles from "./Video.module.css";

export default function Video() {
  return (
    <section id="video" className="section section">
      <h2 className="section__title">Video</h2>
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
