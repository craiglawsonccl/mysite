// src/components/GlassNav.jsx
import { useEffect, useState } from "react";
import "./GlassSurface.css";

const NAV_ITEMS = [
  { id: "features", label: "Coaching", href: "#features" },
  { id: "about", label: "About Me", href: "#about" },
  { id: "videos", label: "Client Stories", href: "#videos" },
  { id: "awards", label: "Events", href: "#awards" },
  { id: "contact", label: "Contact", href: "#contact", cta: true },
];

export default function GlassNav() {
  const [activeId, setActiveId] = useState("features");
  const [open, setOpen] = useState(false);

  // Highlight active section on scroll
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((i) => i.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (sectionIds.includes(id)) {
              setActiveId(id);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when resizing back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const handleNavClick = (href) => {
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="site-header">
      <div className="nav-inner">
        {/* Brand */}
        <a href="#top" className="nav-brand">
          <span className="brand-dot" />
          <span>Daniel McMullen</span>
        </a>

        {/* Desktop links */}
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                "nav-link" +
                (item.cta ? " nav-link-cta" : "") +
                (activeId === item.id ? " nav-link-active" : "")
              }
              onClick={() => handleNavClick(item.href)}
            >
              {item.label}
            </button>
          ))}

          <a href="/links" className="nav-link nav-link-alt">
            Links
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        {/* Mobile dropdown */}
        <nav className={`nav-drawer ${open ? "open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                "nav-drawer-link" +
                (item.cta ? " nav-drawer-link-cta" : "") +
                (activeId === item.id ? " nav-drawer-link-active" : "")
              }
              onClick={() => handleNavClick(item.href)}
            >
              {item.label}
            </button>
          ))}

          <a href="/links" className="nav-drawer-link nav-drawer-link-alt">
            Links
          </a>
        </nav>
      </div>
    </header>
  );
}
