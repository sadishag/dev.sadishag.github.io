import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Photography from "./components/Photography";
import Videography from "./components/Videography";
import BlogList from "./components/BlogList";
import Footer from "./components/Footer";

export default function App() {
  const { hash } = useLocation();

  // Scroll to the section named in the hash — covers deep links
  // (content renders after the browser's native anchor pass) and
  // nav clicks arriving from the blog post route.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Photography />
        <Videography />
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
