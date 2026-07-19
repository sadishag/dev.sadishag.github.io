import { Link } from "react-router-dom";
import { posts, formatDate } from "../lib/posts";
import styles from "./BlogList.module.css";

export default function BlogList() {
  return (
    <section id="blog" className="section">
      <h2 className="section__title">Blog</h2>
      <hr className="section__rule" />
      {posts.length === 0 && <p className="section__placeholder">No posts yet.</p>}
      <ul role="list">
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <div className={styles.heading}>
              <h3 className={styles.title}>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <time className={styles.date} dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
            <p className={styles.excerpt}>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
