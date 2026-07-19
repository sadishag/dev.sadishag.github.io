import { useState, useEffect, useRef } from "react";

const COLORS = {
  light: {
    bg: "#FAF9F7",
    surface: "#F0EEEB",
    text: "#1A1A1A",
    muted: "#6B6B6B",
    accent: "#2563EB",
    accentHover: "#1D4ED8",
    border: "#E2E0DC",
  },
  dark: {
    bg: "#111111",
    surface: "#1A1A1A",
    text: "#EBEBEB",
    muted: "#999999",
    accent: "#3B82F6",
    accentHover: "#60A5FA",
    border: "#2A2A2A",
  },
};

const experience = [
  {
    company: "Manulife",
    role: "Senior Full Stack Cloud Engineer",
    period: "2019 – Present",
    current: true,
    details: [
      "Implemented new features across React and Node.js services",
      "Led and coached cohorts in Manulife University",
      "Mentored engineers on Azure Cloud and engineering practices",
      "Adopted GitOps with Flux for Kubernetes deployments",
    ],
    tech: ["React", "Node.js", "GraphQL", "Kubernetes", "Helm", "Azure", "Terraform", "Flux"],
  },
  {
    company: "RBC",
    role: "Software Developer",
    period: "2017 – 2019",
    current: false,
    details: [
      "Deployed and maintained the API Gateway platform",
      "Built custom CI/CD pipelines for API deployments",
      "Created shared OAuth/OpenID Connect authorization flows",
      "Maintained shared logging infrastructure on Apigee",
    ],
    tech: ["Python", "Java", "Ansible", "Jenkins", "Apigee", "Bash"],
  },
  {
    company: "BlackBerry",
    role: "Software Development Student",
    period: "2016 – 2017",
    current: false,
    details: [
      "Built RESTful APIs for BlackBerry CloudConsole 2.0",
      "Developed dashboards for chargeback and OS patch monitoring",
      "Integrated Kafka and Grafana for observability",
    ],
    tech: ["Java", "REST APIs", "Kafka", "Grafana"],
  },
];

const projects = [
  {
    name: "sadishagalappatti.ca",
    desc: "Personal website built with React and Vite, deployed via GitHub Actions to GitHub Pages.",
    tech: ["React", "Vite", "GitHub Pages", "CI/CD"],
    link: "https://sadishagalappatti.ca",
  },
  {
    name: "Drive-Thru SPA",
    desc: "A library for web frameworks that watches for changes and seamlessly hot-updates the application. Built at YHACK (Yale).",
    tech: ["JavaScript", "SPA", "HMR", "Hackathon"],
    link: "#",
  },
  {
    name: "DeltaHacks",
    desc: "Co-President of McMaster's largest hackathon. Organized the 10th anniversary event with 500+ participants.",
    tech: ["Leadership", "Event Ops", "Community"],
    link: "#",
  },
  {
    name: "Asset Tracking CMDB",
    desc: "Configuration management platform for asset tracking. Created adoption courseware and onboarding documentation.",
    tech: ["CMDB", "Documentation", "Training"],
    link: "#",
  },
];

const skills = [
  "React", "Node.js", "GraphQL", "TypeScript", "Terraform",
  "Azure", "GCP", "Kubernetes", "Helm", "Flux",
  "GitOps", "CI/CD", "Python", "Docker",
];

const photos = [
  { color: "#8B7355", aspect: "4/3", label: "Golden Hour" },
  { color: "#4A6741", aspect: "3/4", label: "Forest Path" },
  { color: "#5B7C99", aspect: "16/9", label: "Harbour" },
  { color: "#9B8B7A", aspect: "1/1", label: "Architecture" },
  { color: "#6B5B73", aspect: "4/3", label: "City Lights" },
  { color: "#7A8B6B", aspect: "3/4", label: "Botanical" },
];

const blogPosts = [
  { title: "Building Reliable Cloud Infrastructure at Scale", date: "Jul 2026", excerpt: "Lessons from running Kubernetes workloads across multiple Azure regions for a Fortune 500 insurer." },
  { title: "Why I Still Bet on React in 2026", date: "Jun 2026", excerpt: "The ecosystem has matured in ways that make it hard to leave, even with strong alternatives emerging." },
  { title: "From Hackathons to Production", date: "May 2026", excerpt: "How organizing DeltaHacks taught me more about engineering leadership than any textbook." },
];

function TypeWriter({ strings, c }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const current = strings[idx];
    const speed = deleting ? 30 : 60;
    timerRef.current = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIdx((idx + 1) % strings.length);
        }
      }
    }, speed);
    return () => clearTimeout(timerRef.current);
  }, [text, deleting, idx, strings]);

  return (
    <span>
      {text}
      <span style={{ color: c.accent, animation: "blink 1s step-end infinite", fontWeight: 300 }}>|</span>
    </span>
  );
}

function TechChip({ label, c }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "999px",
      background: c.surface,
      color: c.text,
      fontSize: "13px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      border: `1px solid ${c.border}`,
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function NavLink({ label, active, c, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "none", border: "none", cursor: "pointer",
      fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: active ? 500 : 400,
      color: active ? c.accent : c.muted, padding: "8px 0",
      borderBottom: active ? `2px solid ${c.accent}` : "2px solid transparent",
      transition: "color 0.2s, border-color 0.2s",
    }}>{label}</button>
  );
}

function SocialIcon({ type, c }) {
  const icons = {
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></>,
    twitter: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>,
    mail: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
    mappin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={c.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ cursor: "pointer", transition: "stroke 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.stroke = c.accent}
      onMouseLeave={e => e.currentTarget.style.stroke = c.muted}
    >{icons[type]}</svg>
  );
}

function ExperienceItem({ item, c, isLast }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", gap: "20px", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "20px" }}>
        <div style={{
          width: "12px", height: "12px", borderRadius: "50%", flexShrink: 0,
          background: item.current ? c.accent : c.border,
          border: item.current ? "none" : `2px solid ${c.border}`,
          marginTop: "6px",
        }} />
        {!isLast && <div style={{ width: "2px", flex: 1, background: c.border, marginTop: "4px" }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : "32px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "18px", color: c.text }}>{item.company}</span>
            <span style={{ color: c.muted, fontSize: "14px", marginLeft: "12px" }}>{item.role}</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: c.muted }}>{item.period}</span>
        </div>
        <button onClick={() => setOpen(!open)} style={{
          background: "none", border: "none", cursor: "pointer",
          color: c.accent, fontSize: "13px", fontFamily: "'Inter', sans-serif",
          padding: "4px 0", marginTop: "4px",
        }}>{open ? "Hide details ↑" : "Show details ↓"}</button>
        {open && (
          <div style={{ marginTop: "8px" }}>
            <ul style={{ margin: 0, paddingLeft: "18px", listStyle: "disc" }}>
              {item.details.map((d, i) => (
                <li key={i} style={{ fontSize: "14px", color: c.muted, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{d}</li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
              {item.tech.map(t => <TechChip key={t} label={t} c={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const c = dark ? COLORS.dark : COLORS.light;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "photography", "blog"];
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(s);
          break;
        }
      }
    };
    const container = document.getElementById("site-root");
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="site-root" style={{
      background: c.bg, color: c.text, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif", transition: "background 0.3s, color 0.3s",
      overflowY: "auto", height: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&family=Space+Grotesk:wght@500;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 3px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: dark ? "rgba(17,17,17,0.92)" : "rgba(250,249,247,0.92)",
        backdropFilter: "blur(12px)", borderBottom: `1px solid ${c.border}`,
        padding: "0 24px",
      }}>
        <div style={{
          maxWidth: "1080px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "56px",
        }}>
          <span onClick={() => scrollTo("hero")} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "18px",
            color: c.text, cursor: "pointer", letterSpacing: "-0.5px",
          }}>SG</span>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {["About", "Experience", "Projects", "Photography", "Blog"].map(s => (
              <NavLink key={s} label={s} active={activeSection === s.toLowerCase()} c={c}
                onClick={() => scrollTo(s.toLowerCase())} />
            ))}
            <button onClick={() => setDark(!dark)} style={{
              background: c.surface, border: `1px solid ${c.border}`, borderRadius: "8px",
              width: "36px", height: "36px", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "16px",
              transition: "background 0.2s",
            }}>{dark ? "☀️" : "🌙"}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{
        minHeight: "calc(100vh - 56px)", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "80px 24px",
        textAlign: "center",
      }}>
        <div style={{ animation: "fadeInUp 0.8s ease" }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: "clamp(36px, 6vw, 56px)", letterSpacing: "-1.5px",
            lineHeight: 1.1, color: c.text, marginBottom: "16px",
          }}>Sadisha Galappatti</h1>
          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)", color: c.muted,
            fontWeight: 400, height: "28px", lineHeight: "28px",
          }}>
            <TypeWriter strings={[
              "Senior Full Stack Cloud Engineer",
              "Building at Manulife",
              "McMaster Engineering Alum",
              "Photographer",
            ]} c={c} />
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "20px", color: c.muted, fontSize: "14px" }}>
            <SocialIcon type="mappin" c={c} />
            <span>Toronto, Ontario, Canada</span>
          </div>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "20px" }}>
            <SocialIcon type="github" c={c} />
            <SocialIcon type="linkedin" c={c} />
            <SocialIcon type="twitter" c={c} />
            <SocialIcon type="mail" c={c} />
          </div>
          <div style={{ marginTop: "60px", color: c.border, fontSize: "24px", animation: "fadeInUp 1.5s ease" }}>↓</div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "28px", letterSpacing: "-0.5px", marginBottom: "24px" }}>About</h2>
        <div style={{ borderTop: `2px solid ${c.accent}`, width: "40px", marginBottom: "24px" }} />
        <p style={{ fontSize: "16px", lineHeight: 1.8, color: c.muted, marginBottom: "16px" }}>
          I'm Sadisha — most people call me Sid. I've spent the last six years building cloud infrastructure and full-stack applications for Canada's biggest financial institutions. I care about reliable systems, clear documentation, and teams where people can do their best work.
        </p>
        <p style={{ fontSize: "16px", lineHeight: 1.8, color: c.muted, marginBottom: "16px" }}>
          Currently I'm a Senior Full Stack Cloud Engineer at Manulife, where I work with React, Node.js, and Terraform to build and ship products at scale. Before that, I built API gateway infrastructure at RBC and cut my teeth on microservices at BlackBerry.
        </p>
        <p style={{ fontSize: "16px", lineHeight: 1.8, color: c.muted, marginBottom: "28px" }}>
          Outside of engineering, I co-founded and presided over DeltaHacks — McMaster's largest hackathon — and I'm usually behind a camera when I'm not behind a keyboard.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {skills.map(s => <TechChip key={s} label={s} c={c} />)}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{
        padding: "80px 24px", maxWidth: "720px", margin: "0 auto",
      }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "28px", letterSpacing: "-0.5px", marginBottom: "24px" }}>Experience</h2>
        <div style={{ borderTop: `2px solid ${c.accent}`, width: "40px", marginBottom: "32px" }} />
        {experience.map((item, i) => (
          <ExperienceItem key={i} item={item} c={c} isLast={i === experience.length - 1} />
        ))}
        <div style={{ marginTop: "40px", padding: "20px", background: c.surface, borderRadius: "12px", border: `1px solid ${c.border}` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "16px" }}>McMaster University</span>
            <span style={{ fontSize: "13px", color: c.muted }}>B.Eng — Software Engineering & Co-op</span>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "80px 24px", maxWidth: "1080px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "28px", letterSpacing: "-0.5px", marginBottom: "24px" }}>Projects</h2>
        <div style={{ borderTop: `2px solid ${c.accent}`, width: "40px", marginBottom: "32px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {projects.map((p, i) => (
            <div key={i} style={{
              background: c.surface, borderRadius: "12px", padding: "24px",
              border: `1px solid ${c.border}`, transition: "box-shadow 0.2s, transform 0.2s",
              cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 24px ${dark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)"}`;  e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "18px", marginBottom: "8px" }}>{p.name}</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </div>
              <p style={{ fontSize: "14px", color: c.muted, lineHeight: 1.6, marginBottom: "16px" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {p.tech.map(t => <TechChip key={t} label={t} c={c} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      <section id="photography" style={{ padding: "80px 24px", maxWidth: "1080px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "28px", letterSpacing: "-0.5px", marginBottom: "24px" }}>Photography</h2>
        <div style={{ borderTop: `2px solid ${c.accent}`, width: "40px", marginBottom: "32px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {photos.map((p, i) => (
            <div key={i} style={{
              background: p.color, borderRadius: "8px", aspectRatio: p.aspect,
              display: "flex", alignItems: "flex-end", justifyContent: "flex-start",
              padding: "12px", cursor: "pointer", position: "relative",
              overflow: "hidden", transition: "transform 0.3s",
              border: dark ? `1px solid ${c.border}` : "none",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
              }} />
              <span style={{
                position: "relative", color: "#fff", fontSize: "13px",
                fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}>{p.label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: c.muted, marginTop: "16px", textAlign: "center", fontStyle: "italic" }}>
          Click any image to view full size · Placeholder colors shown — your actual photos go here
        </p>
      </section>

      {/* BLOG */}
      <section id="blog" style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "28px", letterSpacing: "-0.5px", marginBottom: "24px" }}>Blog</h2>
        <div style={{ borderTop: `2px solid ${c.accent}`, width: "40px", marginBottom: "32px" }} />
        {blogPosts.map((post, i) => (
          <div key={i} style={{
            padding: "20px 0",
            borderBottom: i < blogPosts.length - 1 ? `1px solid ${c.border}` : "none",
            cursor: "pointer",
          }}
            onMouseEnter={e => e.currentTarget.querySelector("h3").style.color = c.accent}
            onMouseLeave={e => e.currentTarget.querySelector("h3").style.color = c.text}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "18px",
                color: c.text, transition: "color 0.2s", flex: 1,
              }}>{post.title}</h3>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: c.muted, flexShrink: 0 }}>{post.date}</span>
            </div>
            <p style={{ fontSize: "14px", color: c.muted, lineHeight: 1.6, marginTop: "6px" }}>{post.excerpt}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${c.border}`, padding: "32px 24px",
        maxWidth: "1080px", margin: "0 auto",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "16px", color: c.text }}>SG</span>
            <span style={{ fontSize: "13px", color: c.muted }}>© 2026 Sadisha Galappatti</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: c.muted, fontFamily: "'JetBrains Mono', monospace" }}>
              React + Vite · GitHub Pages
            </span>
            <span style={{ color: c.border, margin: "0 4px" }}>·</span>
            <div style={{ display: "flex", gap: "12px" }}>
              <SocialIcon type="github" c={c} />
              <SocialIcon type="linkedin" c={c} />
              <SocialIcon type="mail" c={c} />
            </div>
          </div>
        </div>
      </footer>

      <div style={{ height: "40px" }} />
    </div>
  );
}
