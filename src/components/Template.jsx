import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GlassNav from "./GlassNav";
import TagembedFeed from "./TagembedFeed";
import heroImg from "../assets/imgs/hero.jpeg";
import heroImg2 from "../assets/imgs/hero2.jpeg";
import heroImg3 from "../assets/imgs/hero3.jpeg";

import compareBefore from "../assets/imgs/Dan.png"; 
import compareAfter from "../assets/imgs/DanDegree.jpeg"; 

import dublinMarathonLogo from "../assets/imgs/InfiniteBanner/DublinMarathon.png";
import hyroxLogo from "../assets/imgs/InfiniteBanner/HYROX.png";
import makeAWishLogo from "../assets/imgs/InfiniteBanner/make-a-wish.png";
import sligosFittestLogo from "../assets/imgs/InfiniteBanner/SligosFittest.png";
import warriorsRunLogo from "../assets/imgs/InfiniteBanner/WarriorsRun.png";
import ROMLogo from "../assets/imgs/InfiniteBanner/ROM.png";

import story1 from "../assets/imgs/client-stories/story-1.jpg";


// Client transformation images
// import client1Before from "../assets/imgs/transformations/client1-before.jpg";
// import client1After  from "../assets/imgs/transformations/client1-after.jpg";

// import client2Before from "../assets/imgs/transformations/client2-before.jpg";
// import client2After  from "../assets/imgs/transformations/client2-after.jpg";

// import client3Before from "../assets/imgs/transformations/client3-before.jpg";
// import client3After  from "../assets/imgs/transformations/client3-after.jpg";

// Client transformation images (temp – update paths later)
import transform1Before from "../assets/imgs/transformations/transform1.png";
import transform1After from "../assets/imgs/transformations/transform1.1.png";


/**
 * Vlogger-style landing page in React
 */


// Example events – replace href/label with real ones
const EVENT_LOGOS = [
  {
    href: "https://irishlifedublinmarathon.ie/",
    label: "Dublin Marathon",
    src: dublinMarathonLogo,
  },
  {
    href: "https://hyrox.com/",
    label: "HYROX",
    src: hyroxLogo,
  },
  {
    href: "https://www.makeawish.ie/",
    label: "Make-A-Wish Foundation",
    src: makeAWishLogo,
  },
  {
    href: "https://www.facebook.com/p/Sligos-Fittest-Superstars-61557112118662/", // adjust if different
    label: "Sligo’s Fittest",
    src: sligosFittestLogo,
  },
  {
    href: "https://warriorsrun.ie/", // adjust if different
    label: "Warriors Run",
    src: warriorsRunLogo,
  },
  {
    href: "https://www.romsligo.net/personal-training", // adjust if different
    label: "ROM",
    src: ROMLogo,
  },

];

const CLIENT_STORIES = [
  { 
    s: "800/520",
    t: "Huge Confidence & Performance Boost",
    m: "Rebecca • PT Programme",
    imgSrc: null, // e.g. "/images/clients/rebecca.jpg"
    body: `Hey Daniel, 
I just wanted to say thank you for everything you’ve done for me. Your guidance, motivation, and expertise have made such a huge impact—not just on my fitness, but on my confidence and performance as well. I’ve never felt better, both in how I look and how I play on the field, and I owe so much of that to you.

Your workouts pushed me to levels I didn’t think I could reach, and your support kept me going even when it got tough. I truly appreciate all the effort you put into helping me improve, and I can’t thank you enough for helping me get to this point.

Looking forward to continuing my journey using everything you have taught me!!

Thanks again,
Rebecca`
  },
  { 
    s: "800/900",
    t: "Strength, Confidence & Effective Training",
    m: "Elaine • 1:1 Training",
    imgSrc: null, // e.g. "/images/clients/elaine.jpg"
    body: `Training with Daniel has completely changed my gym experience. I’ve gained strength, built confidence, and learned how to train effectively. He made the gym feel approachable and helped me push past limits I didn’t think I could.

I highly recommend Daniel to anyone looking to build strength, confidence, and a healthy relationship with fitness.`
  },
  { 
    s: "800/600",
    t: "Confidence Using Gym Equipment",
    m: "Muireann • Beginner PT",
    imgSrc: null, // e.g. "/images/clients/muireann.jpg"
    body: `Hi Daniel,
I have benefited greatly from your input over the past 4 sessions, and feel much more confident in using the gym equipment. Thanks for your help in getting me going.

Muireann`
  },
  { 
    s: "800/700",
    t: "Fantastic Trainer for Gym Beginners",
    m: "Stephen O'Neill • Nov 2025",
    imgSrc: null, // e.g. "/images/clients/stephen.jpg"
    body: `Daniel is a fantastic trainer, and an absolutely great help for me beginning my exercise in the gym. Dependable and very knowledgeable. Highly recommended!

Stephen O’Neill`
  },
  { 
    s: "800/650",
    t: "Three-Month Transformation & Sport Performance",
    m: "Eddie • 3-Month PT Programme",
    imgSrc: null, // e.g. "/images/clients/eddie.jpg"
    body: `I just finished up 3 month sessions with Daniel, and I cannot recommend him enough. I played sport all my life, but as I got older, I started slowing down, so I decided to join ROM to keep myself fit. I started the sessions with Daniel. 

Straight away, I noticed the difference. We met twice a week, and every session was different. Daniel would explain all the exercises thoroughly and help me with any mistakes I was making. He was very important at the start, showing me exercises I should be doing and helping build my confidence as, no matter who you are, anyone going to the gym for the first time would find it daunting.

I would highly recommend Daniel to anybody. He knows his stuff about every piece of equipment and every exercise, and he also supplies a meal plan to follow. He is very knowledgeable about every aspect of ROM.

Eddie`
  },
  { 
    s: "800/820",
    t: "Strength, Fitness & Motivation From Day One",
    m: "Rosemary • Beginner Strength Programme",
    imgSrc: null, // e.g. "/images/clients/rosemary.jpg"
    body: `Daniel is an excellent personal trainer and a great motivator and support! I am a beginner in the gym and his sessions are focused on your needs, and he encourages you all the way. 

I definitely feel I've improved strength and fitness with his programme and would definitely recommend Daniel for anyone looking for a personal trainer.

Rosemary`
  },
];
const TRANSFORMATIONS = [
  {
    before: transform1Before,
    after: transform1After,
    title: "12 Weeks Progress",
    subtitle: "Lean muscle, better definition and confidence.",
  },
  {
    before: transform1Before,
    after: transform1After,
    title: "Hybrid Training Results",
    subtitle: "Stronger, fitter and noticeably leaner.",
  },
  {
    before: transform1Before,
    after: transform1After,
    title: "Strength & Aesthetics",
    subtitle: "Performance and physique improved together.",
  },
];

const FALLBACK_STORY_IMAGES = [
  story1,
  story1,
  story1,
  story1,
  story1,
  story1,
];

function getStoryImage(story, index) {
  return (
    story.imgSrc ||
    FALLBACK_STORY_IMAGES[index % FALLBACK_STORY_IMAGES.length]
  );
}

export default function VloggerTemplate() {
  const headerRef = useRef(null);
  const parallaxImgRef = useRef(null);
  const [year] = useState(() => new Date().getFullYear());

  // Hero image rotation
  const heroImages = [heroImg, heroImg2, heroImg3];
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const [activeSection, setActiveSection] = useState("top");

    // Highlight nav item based on section in view
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry = null;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        });

        if (bestEntry) {
          setActiveSection(bestEntry.target.id); // "features", "about", "videos", "awards", "contact", etc.
        }
      },
      {
        threshold: [0.25, 0.5, 0.75], // triggers as more/less of a section is in view
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

    // Before / after comparison slider
    const compareRef = useRef(null);
    const compareDragging = useRef(false);
    const [comparePos, setComparePos] = useState(50); // percentage (0–100)

    const updateComparePos = (clientX) => {
      const rect = compareRef.current?.getBoundingClientRect();
      if (!rect) return;
      let x = clientX - rect.left;
      let pct = (x / rect.width) * 100;
      if (pct < 0) pct = 0;
      if (pct > 100) pct = 100;
      setComparePos(pct);
    };

    const startCompareDrag = (e) => {
      compareDragging.current = true;
      document.body.style.userSelect = "none";
      if ("touches" in e) {
        updateComparePos(e.touches[0].clientX);
      } else {
        updateComparePos(e.clientX);
      }
    };

    useEffect(() => {
      const handleMove = (e) => {
        if (!compareDragging.current) return;
        if ("touches" in e) {
          updateComparePos(e.touches[0].clientX);
        } else {
          updateComparePos(e.clientX);
        }
      };

      const handleUp = () => {
        if (!compareDragging.current) return;
        compareDragging.current = false;
        document.body.style.userSelect = "";
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchend", handleUp);

      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        window.removeEventListener("touchend", handleUp);
      };
    }, []);

    const [showAllStories, setShowAllStories] = useState(false);

    const visibleStories = showAllStories
      ? CLIENT_STORIES
      : CLIENT_STORIES.slice(0, 3);

    const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (activeStoryIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }

    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [activeStoryIndex]);

  // Header blur when scrolling
  useEffect(() => {
    const onScroll = () => {
      const hdr = headerRef.current;
      if (!hdr) return;
      if (window.scrollY > 20) hdr.classList.add("scrolled");
      else hdr.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll – rerun when we show/hide extra client stories
  useEffect(() => {
    // Only pick elements that are not already revealed
    const els = document.querySelectorAll(".reveal:not(.show)");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [showAllStories]); // 👈 depend on showAllStories

    const totalStories = CLIENT_STORIES.length;

    const openStory = (index) => {
      setActiveStoryIndex(index);
      document.body.style.overflow = "hidden"; // lock scroll behind modal
    };

    const closeStory = () => {
      setActiveStoryIndex(null);
      document.body.style.overflow = "";
    };

    const goNextStory = () => {
      setActiveStoryIndex((prev) =>
        prev === null ? 0 : (prev + 1) % totalStories
      );
    };

    const goPrevStory = () => {
      setActiveStoryIndex((prev) =>
        prev === null ? 0 : (prev - 1 + totalStories) % totalStories
      );
    };

    // Optional: keyboard support (Esc / arrow keys)
    useEffect(() => {
      if (activeStoryIndex === null) return;

      const onKeyDown = (e) => {
        if (e.key === "Escape") closeStory();
        if (e.key === "ArrowRight") goNextStory();
        if (e.key === "ArrowLeft") goPrevStory();
      };

      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeStoryIndex]);


  // Lightweight parallax for hero image
  useEffect(() => {
    const img = parallaxImgRef.current;
    if (!img) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        img.style.transform = `translateY(${y * 0.15}px) scale(1.05)`;
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cycle hero image every 8 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setHeroLoaded(false); // reset fade before switching
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(id);
  }, [heroImages.length]);

  return (
    <div>
      <StyleTag />

      {/* Header */}
      <GlassNav activeSection={activeSection} />

      {/* HERO */}
      <section className="hero" aria-label="Hero">
        <div className="hero-media" data-parallax>
          <img
            ref={parallaxImgRef}
            src={heroImages[heroIndex]}
            alt="Daniel McMullen Personal Training"
            className={heroLoaded ? "hero-img loaded" : "hero-img"}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="hero-overlay" aria-hidden="true" />
        </div>
        <div className="container">
          <span className="eyebrow">Hybrid Coaching</span>
          <h1>Daniel McMullen</h1>
          <p className="lead">
            Hybrid coaching that blends strength, endurance and aesthetics. 
            Become a hybrid athlete – strong, fit and capable – without losing the muscle 
            you’ve worked hard to build. Look like an athlete and perform like one.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#videos">
              Watch Featured
            </a>
            <a className="btn alt" href="#about">
              About Me
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="reveal">Coaching</h2>
          <div className="grid four">
            <FeatureCard
              letter="H"
              title="Hybrid Coaching"
              text="Strength + endurance + aesthetics in one programme."
            />
            <FeatureCard
              letter="S"
              title="Strength & Muscle"
              text="Build serious strength and muscle without living in the gym."
            />
            <FeatureCard
              letter="E"
              title="Endurance & Engine"
              text="Run, row or bike further and faster while keeping your size."
            />
            <FeatureCard
              letter="N"
              title="Nutrition & Lifestyle"
              text="Simple nutrition and habits to support hybrid performance."
            />

          </div>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section id="about">
        <div className="container split">
          {/* LEFT – before / after slider */}
          <div className="media reveal">
            <div
              className="compare-wrapper"
              ref={compareRef}
              onMouseDown={startCompareDrag}
              onTouchStart={startCompareDrag}
            >
              {/* BEFORE – full image underneath */}
              <img
                src={compareBefore}
                alt="Daniel before training"
                className="compare-img compare-before"
              />

              {/* AFTER – full image on top, clipped by slider */}
              <img
                src={compareAfter}
                alt="Daniel after training"
                className="compare-img compare-after"
                style={{
                  clipPath: `inset(0 0 0 ${comparePos}%)`,
                }}
              />

              {/* Handle */}
              <div
                className="compare-handle"
                style={{ left: `${comparePos}%` }}
                onMouseDown={startCompareDrag}
                onTouchStart={startCompareDrag}
              >
                <span className="compare-line" />
                <span className="compare-knob" />
              </div>
            </div>
          </div>


          {/* RIGHT – deeper description */}
          <div className="about-copy">
            <span className="eyebrow">About Me</span>
            <h2 className="reveal">From Client to Hybrid Coach</h2>

            <p className="lead reveal">
              I’m a Sligo-based personal trainer who specialises in hybrid coaching – helping
              busy people build strength, an athletic physique and real endurance without
              living in the gym or starving themselves.
            </p>

            <p className="reveal">
              This isn’t theory for me. I’ve completed my first HYROX, run a marathon, and
              I’m currently training for an Ironman 70.3 – all while holding onto the
              muscle mass I’ve built over the years and being the strongest I’ve ever been.
              My goal is to show you how to build the engine of an endurance athlete,
              without having to look like a typical endurance athlete.
            </p>

            <ul className="about-list reveal">
              <li>Hybrid coaching that blends strength, conditioning and endurance.</li>
              <li>1:1 in-person coaching and fully online coaching options.</li>
              <li>Training plans tailored to your goals, schedule and any injuries.</li>
              <li>Simple, sustainable nutrition guidance – no extreme diets.</li>
              <li>Regular check-ins and support so you’re never doing this alone.</li>
            </ul>

            <div className="hero-actions reveal">
              <a className="btn" href="#contact">
                Book a Free Chat
              </a>
              <a className="btn alt" href="#videos">
                See Client Results
              </a>
            </div>
          </div>

        </div>
      </section>
      
      {/* CLIENT TRANSFORMATIONS */}
      <section id="transformations">
        <div className="container">
          <h2 className="reveal">Client Transformations</h2>
          <p className="lead reveal">
            Real results from real people. These are examples of clients who
            committed to hybrid coaching – combining strength training, conditioning
            and simple nutrition habits to change how they look, feel and perform.
          </p>

          <div className="transformation-grid">
            {TRANSFORMATIONS.map((t, idx) => (
              <TransformationCard key={idx} {...t} />
            ))}
          </div>
        </div>
      </section>
      

      {/* FEATURED / MASONRY */}
      <section id="videos">
        <div className="container">
          <h2 className="reveal">Client Stories</h2>
          <div className="masonry">
            {visibleStories.map((story, i) => {
              // Find this story’s index in the full CLIENT_STORIES array
              const indexInAll = CLIENT_STORIES.findIndex(
                (s) => s.t === story.t && s.m === story.m
              );

              const imgSrc = getStoryImage(
                story,
                indexInAll === -1 ? i : indexInAll
              );

              return (
                <button
                  key={story.t}
                  type="button"
                  className="tile reveal"
                  onClick={() => openStory(indexInAll === -1 ? i : indexInAll)}
                >
                  <img src={imgSrc} alt="Client story" />
                  <div className="tile-body">
                    <strong>{story.t}</strong>
                    <br />
                    <span style={{ color: "#cfd6dd" }}>{story.m}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="client-stories-actions">
            <button
              type="button"
              className="btn alt"
              onClick={() => setShowAllStories((prev) => !prev)}
            >
              {showAllStories ? "Show fewer stories" : "See more stories"}
            </button>
          </div>
        </div>
      </section>

      
      {/* CLIENT STORY MODAL */}
      {activeStoryIndex !== null && (
        <div className="story-modal-overlay" onClick={closeStory}>
          <div
            className="story-modal"
            onClick={(e) => e.stopPropagation()} // don't close when clicking inside
          >
            {/* Close button */}
            <button
              type="button"
              className="client-story-close"
              onClick={() => setActiveStoryIndex(null)}
            >
              <span>×</span>
            </button>

            {/* Left / right arrows */}
            <button
              type="button"
              className="client-story-navbtn left"
              onClick={goPrevStory}   // whatever your handler is called
            >
              <span>‹</span>
            </button>

            <button
              type="button"
              className="client-story-navbtn right"
              onClick={goNextStory}
            >
              <span>›</span>
            </button>


            {(() => {
              const story = CLIENT_STORIES[activeStoryIndex];

              const imgSrc =
                story.imgSrc ||
                FALLBACK_STORY_IMAGES[activeStoryIndex % FALLBACK_STORY_IMAGES.length];

              return (
                <>
                  <div className="story-modal-media">
                    <img src={imgSrc} alt={story.t} />
                  </div>
                  <div className="story-modal-body">
                    <span className="eyebrow">Client Story</span>
                    <h3>{story.t}</h3>
                    <p className="story-meta">{story.m}</p>

                    {story.body.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* SOCIAL FEEDS */}
      <section id="videos">
        <div className="container videos-container">
          <h2 className="reveal">My Socials</h2>

          <div className="social-feeds">
            <div className="social-feed-card reveal">
              <h3>Instagram</h3>
              <TagembedFeed platform="instagram" />
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS / LOGO TICKER */}
      <section id="awards" className="features">
        <div className="container">
          <h2 className="reveal">Events & Collaborations</h2>

          <div className="logo-ticker reveal">
            <div className="logo-track">
              {EVENT_LOGOS
                .concat(EVENT_LOGOS, EVENT_LOGOS)
                .map((event, idx) => (
                  <a
                    key={idx}
                    href={event.href}
                    target="_blank"
                    rel="noreferrer"
                    className="logo-item"
                    aria-label={event.label}
                  >
                    <img
                      src={event.src}
                      alt={event.label}
                      className="logo-img"
                    />
                  </a>
                ))}
            </div>

          </div>
        </div>
      </section>


      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <h2 className="reveal">Send Me a Message</h2>
          <form
            className="reveal"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Thanks! This is a static template — wire this to your form service."
              );
            }}
          >
            <input placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Your message" />
            <div>
              <button className="btn" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot">
          <div>
            © <span>{year}</span> Craig Lawson Design
          </div>
          <div className="social">
            <a href="#" aria-label="YouTube">
              ▶
            </a>
            <a
              href="https://www.instagram.com/mcmullen_fit/"
              aria-label="Instagram"
            >
              ★
            </a>
            <a
              href="https://www.tiktok.com/@mcmullen_fit1"
              aria-label="TikTok"
            >
              ♪
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ letter, title, text }) {
  return (
    <div className="card reveal">
      <div className="icon">{letter}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
function TransformationCard({ before, after, title, subtitle }) {
  return (
    <div className="transformation-card reveal">
      <div className="transformation-images">
        <div className="transformation-image-wrapper">
          <span className="badge">Before</span>
          <img src={before} alt={`${title} – before`} />
        </div>
        <div className="transformation-image-wrapper">
          <span className="badge badge-alt">After</span>
          <img src={after} alt={`${title} – after`} />
        </div>
      </div>
      <div className="transformation-copy">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}


function StyleTag() {
  return (
    <style>{`
      :root{ --bg:#0f0f10; --bg-soft:#17181b; --text:#f5f7fa; --muted:#c7cbd1; --brand:#ffffff; --brand-2:#111; --radius:28px; --shadow:0 10px 30px rgba(0,0,0,.25); }
      *{ box-sizing:border-box }
      html{ scroll-behavior:smooth }
      body{ margin:0; background:linear-gradient(180deg,#0d0e10 0%, #111317 80%); color:var(--text); font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Inter,"Helvetica Neue",Arial,Noto Sans,"Apple Color Emoji","Segoe UI Emoji" }

      /* Header */
      .header{ position:fixed; inset:0 0 auto; z-index:50; display:flex; align-items:center; justify-content:center }
      .header-inner{ width:100%; max-width:var(--max); display:flex; align-items:center; gap:16px; padding:18px 22px; transition:all .3s ease }
      .header.scrolled .header-inner{ backdrop-filter:saturate(120%) blur(10px); background:rgba(15,16,19,.55); border-bottom:1px solid rgba(255,255,255,.08) }
      .brand{ display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--text); font-weight:700; letter-spacing:.4px }
      .brand-logo{ width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#fff, #9aa4ff); box-shadow:0 6px 16px rgba(154,164,255,.35) }
      nav{ margin-left:auto }
      nav a{ color:var(--text); text-decoration:none; margin:0 12px; opacity:.9 }
      nav a:hover{ opacity:1 }
      .cta{ margin-left:6px; border:2px solid #fff; color:#111; background:#fff; padding:10px 16px; border-radius:999px; font-weight:700; text-decoration:none }

      /* Sections */
      section{ padding:96px 22px }
      .container{ max-width:var(--max); margin:0 auto }
      .eyebrow{ display:inline-block; font-size:1rem; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:10px }
      h1,h2,h3{ margin:0 0 16px }
      h1{ font-size:clamp(40px,8vw,96px); line-height:1.05; letter-spacing:-.02em }
      h2{ font-size:clamp(28px,4vw,48px); letter-spacing:-.015em }
      p.lead{ font-size:clamp(16px,2.2vw,20px); color:#dfe3ea; max-width:70ch }

      /* Hero */
      .hero{ position:relative; display:grid; min-height:100svh; place-items:center; padding:0 }
      .hero-media{ position:absolute; inset:-10% -10% 0 -10%; z-index:0; overflow:hidden }
      .hero-media img{
        width:100%;
        height:120%;
        object-fit:cover;
        object-position:center 20%;
        filter:grayscale(.1) contrast(1.05) brightness(.75);
      }
      .hero-img{
        opacity:0;
        transition: opacity 1s ease;
      }
      .hero-img.loaded{
        opacity:1;
      }
      .hero-overlay{ position:absolute; inset:0; background:radial-gradient(70% 60% at 50% 20%, rgba(255,255,255,.05), transparent 60%), linear-gradient(180deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.85) 90%) }
      .hero .container{
        position:relative;
        z-index:1;
        padding:140px 22px 110px;
        text-align:center;
      }
      .hero-actions{ margin-top:22px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap }
      .btn{ display:inline-flex; align-items:center; gap:10px; border-radius:999px; padding:14px 22px; border:2px solid #fff; background:#fff; color:#111; font-weight:800; text-decoration:none }
      .btn.alt{ background:transparent; color:#fff }

      /* Grid / Features */
      .features{ background:linear-gradient(180deg,var(--bg-soft),transparent) }
      .grid{ display:grid; gap:18px }
      .grid.four{ grid-template-columns:repeat(4, minmax(0,1fr)) }
      .grid.three{ grid-template-columns:repeat(3, minmax(0,1fr)) }

      @media(max-width:1024px){
        .grid.four{ grid-template-columns:repeat(2,1fr) }
        .grid.three{ grid-template-columns:repeat(2,1fr) }
      }

      /* ⬇️ updated */
      @media(max-width:640px){
        .grid.four{
          grid-template-columns:repeat(2,1fr);  /* 2×2 on phones */
        }
        .grid.three{
          grid-template-columns:1fr;            /* keep 3-card grids stacked */
        }
      }

      .card{
        background:rgba(255,255,255,.04);
        border:1px solid rgba(255,255,255,.08);
        border-radius:var(--radius);
        padding:20px;
        box-shadow:var(--shadow);
        min-height:160px;
        display:flex;
        gap:16px;
      }
      .icon{
        flex:0 0 56px;
        height:56px;
        border-radius:16px;
        background:linear-gradient(135deg,#ffffff,#8bd1ff);
        display:grid;
        place-items:center;
        color:#111;
        font-weight:900;
      }
      /* Mobile tweaks for Coaching cards */
      @media (max-width: 640px) {
        /* 2-column layout stays, but cards become more compact */
        .features .grid.four {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px; /* a bit tighter */
        }

        .card {
          flex-direction: column;        /* icon on top, text below */
          align-items: flex-start;
          min-height: auto;              /* let height shrink to fit content */
          padding: 14px 12px;
        }

        .icon {
          flex: 0 0 44px;
          width: 44px;
          height: 44px;
          margin-bottom: 8px;           /* space between icon and heading */
        }

        .card h3 {
          font-size: 1rem;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .card p {
          font-size: 0.86rem;
          line-height: 1.4;
        }
      }

      /* About split */
      .split{ display:grid; grid-template-columns:1.2fr 1fr; gap:28px; align-items:center }
      @media(max-width:900px){ .split{ grid-template-columns:1fr; } }
      .media{ position:relative; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow) }
      .media img{ display:block; width:100%; height:100%; object-fit:cover }

            .tile {
        margin: 0;
        break-inside: auto;
      }

      .tile{
        break-inside:avoid;
        background:rgba(255,255,255,.04);
        border:1px solid rgba(255,255,255,.08);
        border-radius:18px;
        overflow:hidden;
        display:block;
        margin:0 0 18px;
        text-decoration:none;
        color:inherit;
        cursor:pointer;
        padding:0;
        border-width:1px;
        border-style:solid;
      }

      .tile:focus-visible{
        outline:2px solid #fff;
        outline-offset:3px;
      }
      .tile img{ width:100%; height:auto; display:block }
      .tile .tile-body{ padding:16px }

      /* Awards */
      .logos{ display:grid; grid-template-columns:repeat(6,1fr); gap:18px; align-items:center }
      @media(max-width:900px){ .logos{ grid-template-columns:repeat(3,1fr) } }
      .logo{ height:66px; border-radius:14px; background:linear-gradient(180deg,#fff,#dbe2ff); display:grid; place-items:center; mix-blend:screen }

      /* Contact */
      form{ display:grid; gap:12px; max-width:720px }
      input, textarea{ border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.06); padding:14px 14px; border-radius:12px; color:var(--text) }
      textarea{ min-height:140px }

      /* Footer */
      footer{ padding:38px 22px; border-top:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.02) }
      .foot{ max-width:var(--max); margin:0 auto; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap }
      .social a{ display:inline-grid; place-items:center; width:40px; height:40px; border-radius:999px; border:1px solid rgba(255,255,255,.2); text-decoration:none; color:var(--text); margin-left:8px }

      /* Reveals */
      .reveal{ opacity:0; transform:translateY(18px); transition:all .8s cubic-bezier(.2,.7,0,1) }
      .reveal.show{ opacity:1; transform:none }

      /* Center content and text inside each section */
      section .container {
        display: grid;
        justify-items: center;
      }

      /* Center headings/paragraphs */
      section h1, section h2, section p.lead { text-align: center; }

      /* Center the contact form block (it already has max-width) */
      form { margin: 0 auto; }

      /* Keep feature cards/grids constrained but centered */
      .grid, .split, .logos { width: 100%; }

      /* Social feeds / Client Stories */
      #videos .videos-container {
        display: block;
        max-width: 1200px;
        margin: 0 auto;
        text-align: left;
      }

      #videos h2 {
        text-align: center;
      }

      .social-feeds {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 40px;
        margin-top: 24px;
      }

      .social-feed-card {
        width: 100%;
        background: transparent;
        border-radius: 18px;
        padding: 0;
      }

      .social-feed-card h3 {
        margin: 0 0 12px;
        font-size: 1.25rem;
      }

      .tagembed-wrapper {
        width: 100%;
      }

      .tagembed-widget {
        width: 100% !important;
        min-height: 550px;
        overflow: hidden;
      }

      @media (max-width: 768px) {
        .tagembed-widget {
          min-height: 450px;
        }
      }
            .logo-ticker {
        width: 100%;
        overflow: hidden;
        position: relative;
        padding: 20px 0;
      }

      .logo-track {
        display: inline-flex;
        gap: 28px;
        white-space: nowrap;
        animation: logo-scroll 30s linear infinite;
      }

      .logo-ticker:hover .logo-track {
        animation-play-state: paused;
      }

      .logo-item {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 24px;
        border-radius: 999px;
        background: rgba(255,255,255,.06);
        border: 1px solid rgba(255,255,255,.14);
        box-shadow: 0 8px 24px rgba(0,0,0,.35);
        text-decoration: none;
      }

      .logo-img {
        max-height: 80px;
        width: auto;
        display: block;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,.6));
        transition: transform 0.25s ease, filter 0.25s ease;
      }

      .logo-item:hover .logo-img {
        transform: translateY(-2px) scale(1.03);
        filter: drop-shadow(0 4px 10px rgba(0,0,0,.8));
      }

      @keyframes logo-scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-33.3333%);
        }
      }
            /* Before / After comparison */
      .compare-wrapper{
        position:relative;
        width:100%;
        aspect-ratio: 4 / 5;      /* tweak to match your images */
        overflow:hidden;
        border-radius:var(--radius);
        background:#000;
        cursor:ew-resize;
      }

      .compare-img{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }

      .compare-before{
        z-index:1;
      }

      .compare-after{
        z-index:2;
        /* clip-path is set inline from React via style prop */
      }

      .compare-handle{
      position:absolute;
      top:0;
      bottom:0;
      transform:translateX(-50%);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:3;
      pointer-events:auto;        
      cursor:ew-resize;
    }


      .compare-line{
        position:absolute;
        top:0;
        bottom:0;
        width:2px;
        background:rgba(255,255,255,.9);
      }

      .compare-knob{
        position:relative;
        width:32px;
        height:32px;
        border-radius:999px;
        background:#ffffff;
        box-shadow:0 6px 18px rgba(0,0,0,.6);
      }

      .compare-wrapper::after{
        content:"Drag";
        position:absolute;
        bottom:12px;
        right:14px;
        font-size:11px;
        letter-spacing:.16em;
        text-transform:uppercase;
        background:rgba(0,0,0,.55);
        padding:4px 8px;
        border-radius:999px;
      }

      /* Make About copy left-aligned instead of centered */
      #about .container{
        justify-items:stretch;
      }

      #about .about-copy{
        text-align:left;
      }

      #about .about-copy p.lead{
        text-align:left;
      }

      .about-list{
        margin:16px 0 0;
        padding-left:1.2rem;
        color:var(--muted);
        font-size:0.95rem;
      }

      .about-list li + li{
        margin-top:4px;
      }
      
            /* Client Story Modal */
      .story-modal-overlay{
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.8);
        z-index:80;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
      }

      .story-modal{
        position:relative;
        width:100%;
        max-width:1000px;
        max-height:90vh;
        background:radial-gradient(circle at top left, #1b2027, #05070a);
        border-radius:24px;
        box-shadow:0 24px 80px rgba(0,0,0,.7);
        display:grid;
        grid-template-columns:1.3fr 1fr;
        overflow:hidden;
      }

      .story-modal-media{
        position:relative;
        background:#000;
      }

      .story-modal-media img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }

      .story-modal-body{
        padding:24px 28px 26px;
        overflow-y:auto;
      }

      .story-modal-body h3{
        margin:0 0 8px;
        font-size:1.6rem;
      }

      .story-meta{
        margin:0 0 14px;
        color:var(--muted);
        font-size:0.9rem;
      }

      .story-modal-close{
        position:absolute;
        top:14px;
        right:16px;
        width:32px;
        height:32px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.4);
        background:rgba(0,0,0,.6);
        color:#fff;
        font-size:20px;
        line-height:1;
        cursor:pointer;
        display:grid;
        place-items:center;
      }

      .story-modal-arrow{
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        width:40px;
        height:40px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.4);
        background:rgba(0,0,0,.6);
        color:#fff;
        font-size:26px;
        line-height:1;
        cursor:pointer;
        display:grid;
        place-items:center;
      }

      .story-modal-arrow.left{
        left:14px;
      }

      .story-modal-arrow.right{
        right:14px;
      }

      @media (max-width: 768px){
        .story-modal{
          grid-template-columns:1fr;
          max-height:90vh;
        }

        .story-modal-media{
          height:260px;
        }

        .story-modal-body{
          padding:18px 18px 20px;
        }

        .story-modal-arrow{
          width:34px;
          height:34px;
          font-size:22px;
        }

        .story-modal-arrow.left{
          left:10px;
        }

        .story-modal-arrow.right{
          right:10px;
        }
      }
            /* Transformations */
      #transformations .container {
        justify-items: center;
      }

      .transformation-grid {
        width: 100%;
        display: grid;
        gap: 20px;
        margin-top: 26px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      @media (max-width: 1024px) {
        .transformation-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 640px) {
        .transformation-grid {
          grid-template-columns: 1fr;
          overflow-x: auto;           /* optional horizontal scroll on very small screens */
          padding-bottom: 4px;
        }
      }

      .transformation-card {
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 20px;
        padding: 14px 14px 16px;
        box-shadow: var(--shadow);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .transformation-images {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }

      .transformation-image-wrapper {
        position: relative;
        overflow: hidden;
        border-radius: 16px;
        background: #000;
      }

      .transformation-image-wrapper img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .badge {
        position: absolute;
        top: 8px;
        left: 8px;
        padding: 4px 9px;
        border-radius: 999px;
        font-size: 0.7rem;
        letter-spacing: .12em;
        text-transform: uppercase;
        background: rgba(0,0,0,.75);
        color: #f5f7fa;
      }

      .badge-alt {
        background: #ffffff;
        color: #111317;
      }

      .transformation-copy h3 {
        margin: 6px 0 2px;
        font-size: 1rem;
      }

      .transformation-copy p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--muted);
      }


    `}</style>
  );
}
