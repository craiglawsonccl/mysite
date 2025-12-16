import { useEffect, useState } from "react";
import {
  FaDumbbell,
  FaDownload,
  FaGlobe,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { useLeadModal } from "../context/LeadModalContext";

import heroImg from "../assets/imgs/hero.jpeg";
import heroImg2 from "../assets/imgs/hero2.jpeg";
import heroImg3 from "../assets/imgs/hero3.jpeg";

import DanPfp from "../assets/imgs/Danpfp.jpg";

const BASE_URL = import.meta.env.BASE_URL || "/";

const HERO_IMAGES = [heroImg, heroImg2, heroImg3];

export default function Links() {
  const ACCENT = "#0087e1";

  const [bgIndex, setBgIndex] = useState(0);

  const { open } = useLeadModal();

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000); // 8s like main hero
    return () => clearInterval(id);
  }, []);

  const links = [
    {
      label: "Interested? (Quick Questionnaire)",
      href: "#",
      icon: FaDumbbell,
      big: true,
      onClick: (e) => {
        e.preventDefault();
        open();
      },
    },
    {
      label: "Download Free Program (PDF)",
      href: `${BASE_URL}assets/free-program.pdf`,
      icon: FaDownload,
      big: true,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Visit Full Website",
      href: `${BASE_URL}#top`,
      icon: FaGlobe,
      big: true,
    },
  ];

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/mcmullen_fit/",
      icon: FaInstagram,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@mcmullen_fit1",
      icon: FaTiktok,
    },
  ];

  return (
    <div className="links-root">
      <LinksStyleTag />

      {/* Rotating background */}
      <div className="links-bg">
        {HERO_IMAGES.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            className={`links-bg-img ${idx === bgIndex ? "show" : ""}`}
            aria-hidden="true"
          />
        ))}
        <div className="links-bg-overlay" />
      </div>

      {/* Foreground content */}
      <div className="links-wrap">
        <div className="links-card">
          {/* Header / Profile */}
          <div className="links-header">
            <img
              src={DanPfp}
              alt="Daniel headshot"
              className="links-avatar"
            />

            <h1 className="links-title">Daniel McMullen</h1>
            <p className="links-subtitle">Personal Trainer • Sligo</p>

            {/* ROM endorsement link */}
            <a
              href="https://www.romsligo.net/personal-training"
              target="_blank"
              rel="noopener noreferrer"
              className="links-pill"
              style={{ border: `2px solid ${ACCENT}` }}
            >
              <span
                className="links-dot"
                style={{ background: ACCENT }}
              />
              Endorsed PT at ROM
            </a>
          </div>

          {/* CTAs */}
          <div style={{ display: "grid", gap: 12 }}>
            {links.map((l, i) => {
              const Icon = l.icon;
              const isExternal = /^https?:\/\//i.test(l.href);
              const href = isExternal
                ? `${l.href}?utm_source=instagram&utm_medium=bio&utm_campaign=links`
                : l.href;

              const target = l.target ?? (isExternal ? "_blank" : undefined);
              const rel =
                l.rel ?? (isExternal ? "noopener noreferrer" : undefined);

              const commonStyle = {
                display: "block",
                textDecoration: "none",
                color: "#111",
                background: "#fff",
                padding: l.big ? "16px 18px" : "12px 16px",
                borderRadius: 16,
                border: `2px solid ${ACCENT}`,
                boxShadow:
                  "0 8px 24px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.6)",
                textAlign: "center",
                fontWeight: 800,
                fontSize: l.big ? 18 : 16,
                cursor: "pointer",
              };

              // ✅ If it has an onClick, render a button (no href/hash navigation)
              if (l.onClick) {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={l.onClick}
                    className="links-cta"
                    style={{ ...commonStyle, width: "100%" }}
                  >
                    {Icon && (
                      <span
                        style={{
                          marginRight: 8,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <Icon />
                      </span>
                    )}
                    {l.label}
                  </button>
                );
              }

              // Normal links stay <a>
              return (
                <a
                  key={i}
                  href={href}
                  target={target}
                  rel={rel}
                  className="links-cta"
                  style={commonStyle}
                >
                  {Icon && (
                    <span
                      style={{
                        marginRight: 8,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <Icon />
                    </span>
                  )}
                  {l.label}
                </a>
              );
            })}
          </div>

          {/* Socials (IG + TikTok only) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
              marginTop: 18,
            }}
          >
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={`${s.href}?utm_source=instagram&utm_medium=bio&utm_campaign=links`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="links-social"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    textDecoration: "none",
                    color: "#fff",
                    borderRadius: 12,
                    padding: "10px 12px",
                    border: "1px solid rgba(255,255,255,.25)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02))",
                  }}
                >
                  {Icon && <Icon />}
                  <span style={{ opacity: 0.95 }}>{s.label}</span>
                </a>
              );
            })}
          </div>

          <p
            style={{
              textAlign: "center",
              opacity: 0.6,
              marginTop: 20,
              fontSize: 12,
            }}
          >
            © {new Date().getFullYear()} Daniel McMullen
          </p>
        </div>
      </div>
    </div>
  );
}

function LinksStyleTag() {
  return (
    <style>{`
      .links-root {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        color: #f5f7fa;
      }

      .links-bg {
        position: fixed;
        inset: 0;
        z-index: -1;
        overflow: hidden;
      }

      .links-bg-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transform: scale(1.05);
        transition: opacity 1.2s ease;
        filter: grayscale(.1) contrast(1.05) brightness(.75);
      }

      .links-bg-overlay {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(70% 60% at 50% 0%, rgba(0,0,0,.25), transparent 55%),
          linear-gradient(180deg, rgba(0,0,0,.55) 10%, rgba(0,0,0,.85) 85%);
      }

      .links-bg-img.show { opacity: 1; }

      .links-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 24px;
      }

      .links-card {
        max-width: 480px;
        width: 100%;
        background: rgba(15, 16, 19, 0.92);
        border-radius: 24px;
        border: 1px solid rgba(255,255,255,.08);
        box-shadow: 0 18px 50px rgba(0,0,0,.7);
        padding: 20px 20px 16px;
      }

      .links-header{
        text-align:center;
        margin-bottom:18px;
      }

      .links-avatar{
        width:96px;
        height:96px;
        border-radius:999px;
        object-fit:cover;
      }

      .links-title{
        margin:12px 0 4px;
        font-size:28px;
      }

      .links-subtitle{
        margin:0;
        opacity:.8;
      }

      .links-pill{
        display:inline-flex;
        align-items:center;
        gap:10px;
        margin-top:12px;
        padding:8px 12px;
        border-radius:999px;
        text-decoration:none;
        color:#111;
        background:#fff;
        font-weight:800;
      }

      .links-dot{
        width:10px;
        height:10px;
        border-radius:999px;
        display:inline-block;
      }

      /* Mobile tuning */
      @media (max-width: 480px) {
        .links-card {
          padding: 16px 14px 12px;
        }

        .links-avatar{
          width:84px;
          height:84px;
        }

        .links-title{
          font-size:24px;
        }

        .links-cta{
          font-size:15px !important;
          padding:12px 14px !important;
        }

        .links-social{
          font-size:14px !important;
          padding:9px 10px !important;
        }
      }
    `}</style>
  );
}
