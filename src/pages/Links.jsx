export default function Links() {
  const ACCENT = "#0087e1";

  const links = [
    { label: "Apply for Coaching", href: "https://forms.gle/your-form", emoji: "🏋️", big: true },
    // PDF: force new tab
    { label: "Download Free Program (PDF)", href: "/assets/free-program.pdf", emoji: "📥", big: true, target: "_blank", rel: "noopener noreferrer" },
    { label: "Visit Full Website", href: "/#top", emoji: "🌐", big: true },
  ];

  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/mcmullen_fit/", emoji: "📸" },
    { label: "TikTok",    href: "https://www.tiktok.com/@mcmullen_fit1",   emoji: "🎵" },
  ];

  return (
    <div className="links-wrap">
      <div className="links-card">
        {/* Header / Profile (ROM badge retained) */}
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <img
            src="src\assets\imgs\Danpfp.jpg"
            alt="Daniel headshot"
            style={{ width: 96, height: 96, borderRadius: 999, objectFit: "cover" }}
          />
          <h1 style={{ margin: "12px 0 4px", fontSize: 28 }}>Daniel McMullen</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>Personal Trainer • Sligo</p>

          {/* ROM endorsement link */}
          <a
            href="https://www.romsligo.net/personal-training"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginTop: 12,
              padding: "8px 12px", borderRadius: 999, textDecoration: "none",
              color: "#111", background: "#fff", fontWeight: 800, border: `2px solid ${ACCENT}`,
            }}
          >
            <span
              style={{ width: 10, height: 10, borderRadius: 999, background: ACCENT, display: "inline-block" }}
            />
            Endorsed PT at ROM
          </a>
        </div>

        {/* CTAs */}
        <div style={{ display: "grid", gap: 12 }}>
          {links.map((l, i) => {
            const isExternal = /^https?:\/\//i.test(l.href);
            const href = isExternal
              ? `${l.href}?utm_source=instagram&utm_medium=bio&utm_campaign=links`
              : l.href;
            const target = l.target ?? (isExternal ? "_blank" : undefined);
            const rel = l.rel ?? (isExternal ? "noopener noreferrer" : undefined);

            return (
              <a
                key={i}
                href={href}
                target={target}
                rel={rel}
                style={{
                  display: "block", textDecoration: "none", color: "#111",
                  background: "#fff", padding: l.big ? "16px 18px" : "12px 16px",
                  borderRadius: 16, border: `2px solid ${ACCENT}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.6)",
                  textAlign: "center", fontWeight: 800, fontSize: l.big ? 18 : 16,
                }}
              >
                <span style={{ marginRight: 8 }}>{l.emoji}</span>{l.label}
              </a>
            );
          })}
        </div>

        {/* Socials (IG + TikTok only) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginTop: 18 }}>
          {socials.map((s, i) => (
            <a
              key={i}
              href={`${s.href}?utm_source=instagram&utm_medium=bio&utm_campaign=links`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                textDecoration: "none", color: "#fff", borderRadius: 12, padding: "10px 12px",
                border: "1px solid rgba(255,255,255,.25)",
                background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02))",
              }}
            >
              <span>{s.emoji}</span><span style={{ opacity: .95 }}>{s.label}</span>
            </a>
          ))}
        </div>

        <p style={{ textAlign: "center", opacity: 0.6, marginTop: 20, fontSize: 12 }}>
          © {new Date().getFullYear()} Daniel McMullen
        </p>
      </div>
    </div>
  );
}
