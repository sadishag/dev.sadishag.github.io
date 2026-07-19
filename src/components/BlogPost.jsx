import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import { getPost, formatDate } from "../lib/posts";
import styles from "./BlogPost.module.css";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = post
      ? `${post.title} — Sadisha Galappatti`
      : "Post not found — Sadisha Galappatti";
    return () => {
      document.title = "Sadisha Galappatti — Lead Full Stack Engineer";
    };
  }, [post]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className={styles.page}>
        <Link to="/#blog" className={styles.back}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to all posts
        </Link>
        {post ? (
          <article>
            <header className={styles.header}>
              <h1 className={styles.title}>{post.title}</h1>
              <time className={styles.date} dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </header>
            {/* Post HTML is rendered at build time from trusted in-repo markdown */}
            <div className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        ) : (
          <div className={styles.notFound}>
            <h1 className={styles.title}>Post not found</h1>
            <p>
              There&apos;s no post at this address. It may have moved —{" "}
              <Link to="/#blog">see all posts</Link>.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
