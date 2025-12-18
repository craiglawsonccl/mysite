import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import emailjs from "@emailjs/browser";


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

import transform2Before from "../assets/imgs/transformations/transform2.jpg";
import transform2After from "../assets/imgs/transformations/transform2.2.jpg";

import transform3Before from "../assets/imgs/transformations/transform3.png";
import transform3After from "../assets/imgs/transformations/transform3.1.png";

import StickyInterestedButton from "./StickyInterestedButton";
import LeadModal from "./LeadModal";


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

const GYM_STOCK_FALLBACKS = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=80",
];

const withWidth = (url, s) => {
  const [w] = String(s || "1000/700").split("/");
  return url.replace("w=1600", `w=${w}`);
};


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

export const CLIENT_STORIES_MAPPED = CLIENT_STORIES.map((story, i) => {
  const fallback = GYM_STOCK_FALLBACKS[i % GYM_STOCK_FALLBACKS.length];
  return {
    ...story,
    imgSrc: story.imgSrc || withWidth(fallback, story.s),
  };
});

const TRANSFORMATIONS = [
  {
    before: transform1Before,
    after: transform1After,
    title: "12 Weeks Progress",
    subtitle: "Lean muscle, better definition and confidence.",
  },
  {
    before: transform2Before,
    after: transform2After,
    title: "Hybrid Training Results",
    subtitle: "Stronger, fitter and noticeably leaner.",
  },
  {
    before: transform3Before,
    after: transform3After,
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
  if (story?.imgSrc) return story.imgSrc;

  const fallback = GYM_STOCK_FALLBACKS[index % GYM_STOCK_FALLBACKS.length];
  return withWidth(fallback, story?.s);
}

export default function VloggerTemplate() {
  const headerRef = useRef(null);
  const parallaxImgRef = useRef(null);
  const tickerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const isPausedRef = useRef(false);        // paused while drag / hover
  const resumeTimeoutRef = useRef(null);
  const rafRef = useRef(null);
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
      ? CLIENT_STORIES_MAPPED
      : CLIENT_STORIES_MAPPED.slice(0, 3);

      const [activeStoryIndex, setActiveStoryIndex] = useState(null);

      useEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        const prevBodyOverflow = body.style.overflow;
        const prevHtmlOverflow = html.style.overflow;

        if (activeStoryIndex !== null) {
          body.style.overflow = "hidden";
          html.style.overflow = "hidden";
        } else {
          body.style.overflow = prevBodyOverflow || "";
          html.style.overflow = prevHtmlOverflow || "";
        }

        return () => {
          body.style.overflow = prevBodyOverflow || "";
          html.style.overflow = prevHtmlOverflow || "";
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

    const totalStories = CLIENT_STORIES_MAPPED.length;

      const openStory = (index) => {
        setActiveStoryIndex(index);
      };

      const closeStory = () => {
        setActiveStoryIndex(null);
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
  // ---- Logo ticker: auto-scroll + drag-to-scroll ----
  const pauseTicker = () => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const resumeTickerDebounced = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1000); // 1s after user stops
  };

  const handleTickerDragStart = (e) => {
    const el = tickerRef.current;
    if (!el) return;

    pauseTicker();
    isDraggingRef.current = true;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartXRef.current = clientX;
    dragStartScrollRef.current = el.scrollLeft;

    // prevent text selection while dragging
    document.body.style.userSelect = "none";
  };

  const handleTickerDragMove = (e) => {
    if (!isDraggingRef.current) return;
    const el = tickerRef.current;
    if (!el) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const dx = dragStartXRef.current - clientX;
    el.scrollLeft = dragStartScrollRef.current + dx;

    if ("touches" in e) {
      e.preventDefault();
    }
  };

  const handleTickerDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    document.body.style.userSelect = "";
    resumeTickerDebounced();
  };

  // Auto-scroll using requestAnimationFrame
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;

    let lastTime = 0;
    const speed = 40; // px per second

    const step = (time) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (!isPausedRef.current && !isDraggingRef.current) {
        const baseWidth = el.scrollWidth / 3; // logos repeated 3x
        el.scrollLeft += (speed * dt) / 1000;
        if (el.scrollLeft >= baseWidth) {
          el.scrollLeft -= baseWidth; // loop seamlessly
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  function ContactForm() {
    const CONTACT_DEFAULT = { name: "", email: "", message: "", honey: "" };

    const [form, setForm] = useState(CONTACT_DEFAULT);
    const [status, setStatus] = useState({ type: "idle", msg: "" });

    const locked = status.type === "loading" || status.type === "success";

    const canSubmit =
      form.name.trim() && form.email.trim() && form.message.trim();

    const onChange = (e) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
    };

    const onSubmit = async (e) => {
      e.preventDefault();

      // prevent double sends
      if (locked) return;

      // honeypot -> silently succeed
      if (form.honey) {
        setStatus({ type: "success", msg: "✅ Sent! Daniel will get back to you soon." });
        setTimeout(() => setStatus({ type: "idle", msg: "" }), 4000);
        return;
      }

      setStatus({ type: "loading", msg: "Sending..." });

      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId =
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT ||
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        await emailjs.send(
          serviceId,
          templateId,
          {
            name: form.name,
            email: form.email,
            message: form.message,
            source: window.location.href,
            form_type: "contact",
          },
          publicKey
        );

        setStatus({ type: "success", msg: "✅ Sent! Daniel will get back to you soon." });

        // keep visible ~4s, then reset + unlock
        setTimeout(() => {
          setForm(CONTACT_DEFAULT);
          setStatus({ type: "idle", msg: "" });
        }, 4000);
      } catch (err) {
        setStatus({ type: "error", msg: "Failed to send. Please try again in a moment." });
        setTimeout(() => setStatus({ type: "idle", msg: "" }), 4000);
      }
    };

    return (
      <form className="reveal show" onSubmit={onSubmit}>
        {/* honeypot */}
        <input
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          name="honey"
          value={form.honey}
          onChange={onChange}
        />

        <input
          name="name"
          placeholder="Your name"
          required
          value={form.name}
          onChange={onChange}
          disabled={locked}
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          value={form.email}
          onChange={onChange}
          disabled={locked}
        />

        <textarea
          name="message"
          placeholder="Your message"
          required
          value={form.message}
          onChange={onChange}
          disabled={locked}
        />

        <div>
          <button
            className="btn"
            type="submit"
            disabled={!canSubmit || locked}
          >
            {status.type === "loading" ? "Sending..." : "Send"}
          </button>
        </div>

        {status.type !== "idle" && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <p
              role="status"
              aria-live="polite"
              className={`status ${status.type}`}
            >
              {status.msg}
            </p>
          </div>
        )}
      </form>
    );
  }



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
        <h2 className="reveal">About Me</h2>
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
            <span className="eyebrow">From Client to Hybrid Coach</span>
            

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
              const indexInAll = CLIENT_STORIES_MAPPED.findIndex(
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

            {(() => {
              const story = CLIENT_STORIES_MAPPED[activeStoryIndex];
              const imgSrc = story.imgSrc; // already gym placeholder if null originally

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
      <section id="socials">
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
          <div
            className="logo-ticker reveal"
            ref={tickerRef}
            onMouseDown={handleTickerDragStart}
            onMouseMove={handleTickerDragMove}
            onMouseUp={handleTickerDragEnd}
            onMouseLeave={handleTickerDragEnd}
            onTouchStart={handleTickerDragStart}
            onTouchMove={handleTickerDragMove}
            onTouchEnd={handleTickerDragEnd}
          >
            <div className="logo-track">
              {EVENT_LOGOS.concat(EVENT_LOGOS, EVENT_LOGOS).map((event, idx) => (
                <a
                  key={idx}
                  href={event.href}
                  target="_blank"
                  rel="noreferrer"
                  className="logo-item"
                  aria-label={event.label}
                >
                  <img src={event.src} alt={event.label} className="logo-img" />
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
          <ContactForm />
        </div>
      </section>


      {/* FOOTER */}
      <footer>
        <div className="foot">
          <div>
            © <span>{year}</span> Craig Lawson Design
          </div>

          <div className="social">
            <a
              href="https://www.youtube.com/"   // <-- put the real URL here
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>

            <a
              href="https://www.instagram.com/mcmullen_fit/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@mcmullen_fit1"
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </footer>
            
            {/* Sticky CTA + Modal */}
            <StickyInterestedButton />
            <LeadModal />
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
      :root {
        --bg:#0f0f10;
        --bg-soft:#17181b;
        --text:#f5f7fa;
        --muted:#c7cbd1;
        --brand:#ffffff;
        --brand-2:#111;
        --radius:28px;
        --shadow:0 10px 30px rgba(0,0,0,.25);
      }

      * { box-sizing:border-box }
      html { scroll-behavior:smooth }
      body {
        margin:0;
        background:linear-gradient(180deg,#0d0e10 0%, #111317 80%);
        color:var(--text);
        font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Inter,"Helvetica Neue",Arial,Noto Sans,"Apple Color Emoji","Segoe UI Emoji";
      }

      /* Header (GlassNav handles main nav styling) */
      .header {
        position:fixed;
        inset:0 0 auto;
        z-index:1000;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .header-inner {
        width:100%;
        max-width:var(--max);
        display:flex;
        align-items:center;
        gap:16px;
        padding:18px 22px;
        transition:all .3s ease;
      }
      .header.scrolled .header-inner {
        backdrop-filter:saturate(120%) blur(10px);
        background:rgba(15,16,19,.55);
        border-bottom:1px solid rgba(255,255,255,.08);
      }

      /* Generic nav bits (GlassNav overrides) */
      .brand {
        display:flex;
        align-items:center;
        gap:10px;
        text-decoration:none;
        color:var(--text);
        font-weight:700;
        letter-spacing:.4px;
      }
      .brand-logo {
        width:36px;
        height:36px;
        border-radius:10px;
        background:linear-gradient(135deg,#fff, #9aa4ff);
        box-shadow:0 6px 16px rgba(154,164,255,.35);
      }

      /* Sections */
      section { padding:96px 22px }
      .container { max-width:var(--max); margin:0 auto }
      .eyebrow {
        display:inline-block;
        font-size:1rem;
        letter-spacing:.18em;
        text-transform:uppercase;
        color:var(--muted);
        margin-bottom:10px;
      }
      h1,h2,h3 { margin:0 0 16px }
      h1 { font-size:clamp(40px,8vw,96px); line-height:1.05; letter-spacing:-.02em }
      h2 { font-size:clamp(28px,4vw,48px); letter-spacing:-.015em }
      p.lead {
        font-size:clamp(16px,2.2vw,20px);
        color:#dfe3ea;
        max-width:70ch;
      }

      /* Hero */
      .hero {
        position:relative;
        display:grid;
        min-height:100svh;
        place-items:center;
        padding:0;
      }
      .hero-media {
        position:absolute;
        inset:-10% -10% 0 -10%;
        z-index:0;
        overflow:hidden;
      }
      .hero-media img {
        width:100%;
        height:120%;
        object-fit:cover;
        object-position:center 20%;
        filter:grayscale(.1) contrast(1.05) brightness(.75);
      }
      .hero-img { opacity:0; transition: opacity 1s ease; }
      .hero-img.loaded { opacity:1; }
      .hero-overlay {
        position:absolute;
        inset:0;
        background:
          radial-gradient(70% 60% at 50% 20%, rgba(255,255,255,.05), transparent 60%),
          linear-gradient(180deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.85) 90%);
      }
      .hero .container {
        position:relative;
        z-index:1;
        padding:140px 22px 110px;
        text-align:center;
      }
      .hero-actions {
        margin-top:22px;
        display:flex;
        gap:12px;
        justify-content:center;
        flex-wrap:wrap;
      }
      .btn {
        display:inline-flex;
        align-items:center;
        gap:10px;
        border-radius:999px;
        padding:14px 22px;
        border:2px solid #fff;
        background:#fff;
        color:#111;
        font-weight:800;
        text-decoration:none;
      }
      .btn.alt { background:transparent; color:#fff }

      /* Grid / Features */
      .features { background:linear-gradient(180deg,var(--bg-soft),transparent) }
      .grid { display:grid; gap:18px }
      .grid.four { grid-template-columns:repeat(4, minmax(0,1fr)) }
      .grid.three{ grid-template-columns:repeat(3, minmax(0,1fr)) }

      @media(max-width:1024px){
        .grid.four{ grid-template-columns:repeat(2,1fr) }
        .grid.three{ grid-template-columns:repeat(2,1fr) }
      }
      @media(max-width:640px){
        .grid.four{ grid-template-columns:repeat(2,1fr); }
        .grid.three{ grid-template-columns:1fr; }
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

      @media (max-width: 640px) {
        .features .grid.four {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .card {
          flex-direction: column;
          align-items:flex-start;
          min-height:auto;
          padding:14px 12px;
        }
        .icon {
          flex:0 0 44px;
          width:44px;
          height:44px;
          margin-bottom:8px;
        }
        .card h3 {
          font-size:1rem;
          line-height:1.2;
          margin-bottom:6px;
        }
        .card p {
          font-size:0.86rem;
          line-height:1.4;
        }
      }

      /* About split */
      .split{
        display:grid;
        grid-template-columns:1.2fr 1fr;
        gap:28px;
        align-items:center;
      }
      @media(max-width:900px){ .split{ grid-template-columns:1fr; } }

      .media{
        position:relative;
        border-radius:var(--radius);
        overflow:hidden;
        box-shadow:var(--shadow);
      }
      .media img{
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
      }

      /* Client story tiles */
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
      }
      .tile:focus-visible{
        outline:2px solid #fff;
        outline-offset:3px;
      }
      /* Client story tiles – uniform image sizing */
      .tile img{
        width: 100%;
        aspect-ratio: 4 / 4;   /* ✅ choose your ratio */
        object-fit: cover;     
        display: block;
      }

      /* Optional: if you want slightly less tall */
      @media (max-width: 640px){
        .tile img{
          aspect-ratio: 1 / 1; /* mobile squares look super clean */
        }
      }

      .tile .tile-body{ padding:16px }

      /* Awards basic grid (older style – kept for safety) */
      .logos{
        display:grid;
        grid-template-columns:repeat(6,1fr);
        gap:18px;
        align-items:center;
      }
      @media(max-width:900px){
        .logos{ grid-template-columns:repeat(3,1fr) }
      }

      /* Contact */
      form{
        display:grid;
        gap:12px;
        max-width:720px;
        margin:0 auto;
      }
      input, textarea{
        border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.06);
        padding:14px 14px;
        border-radius:12px;
        color:var(--text);
      }
      textarea{ min-height:140px }

      /* Footer */
      footer{
        padding:38px 22px;
        border-top:1px solid rgba(255,255,255,.08);
        background:rgba(255,255,255,.02);
      }
      .foot{
        max-width:var(--max);
        margin:0 auto;
        display:flex;
        gap:16px;
        align-items:center;
        justify-content:space-between;
        flex-wrap:wrap;
      }
      .social a{
        display:inline-grid;
        place-items:center;
        width:40px;
        height:40px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.2);
        text-decoration:none;
        color:var(--text);
        margin-left:8px;
      }

      /* Reveals */
      .reveal{
        opacity:0;
        transform:translateY(18px);
        transition:all .8s cubic-bezier(.2,.7,0,1);
      }
      .reveal.show{
        opacity:1;
        transform:none;
      }

      /* Center content in sections by default */
      section .container{
        display:grid;
        justify-items:center;
      }
      section h1,
      section h2,
      section p.lead{
        text-align:center;
      }
      .grid,
      .split,
      .logos{
        width:100%;
      }

      /* Social feeds / Tagembed */
      #videos .videos-container{
        display:block;
        max-width:1200px;
        margin:0 auto;
        text-align:left;
      }
      #videos h2{ text-align:center; }

      .social-feeds{
        width:100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        gap:40px;
        margin-top:24px;
      }
      .social-feed-card{
        width:100%;
        background:transparent;
        border-radius:18px;
        padding:0;
      }
      .social-feed-card h3{
        margin:0 0 12px;
        font-size:1.25rem;
      }
      .tagembed-wrapper{ width:100%; }
      .tagembed-widget{
        width:100% !important;
        min-height:550px;
        overflow:hidden;
      }
      @media (max-width: 768px){
        .tagembed-widget{ min-height:450px; }
      }

      /* Events ticker - draggable track (scroll logic in JS) */
      .logo-ticker{
        width:100%;
        overflow:hidden;
        position:relative;
        padding:20px 0;
        cursor:grab;
        touch-action:pan-y;
      }
      .logo-ticker:active{ cursor:grabbing; }
      .logo-track{
        display:inline-flex;
        gap:28px;
        white-space:nowrap;
        will-change:transform;
      }
      .logo-item{
        flex:0 0 auto;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:10px 24px;
        border-radius:999px;
        background:rgba(255,255,255,.06);
        border:1px solid rgba(255,255,255,.14);
        box-shadow:0 8px 24px rgba(0,0,0,.35);
        text-decoration:none;
      }
      .logo-img{
        max-height:80px;
        width:auto;
        display:block;
        filter:drop-shadow(0 2px 6px rgba(0,0,0,.6));
        transition:transform .25s ease, filter .25s ease;
      }
      .logo-item:hover .logo-img{
        transform:translateY(-2px) scale(1.03);
        filter:drop-shadow(0 4px 10px rgba(0,0,0,.8));
      }

      /* Before / After comparison */
      .compare-wrapper{
        position:relative;
        width:100%;
        aspect-ratio:4 / 5;
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
      .compare-before{ z-index:1; }
      .compare-after{ z-index:2; }

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

      /* About text alignment */
      #about .container{ justify-items:stretch; }
      #about .about-copy,
      #about .about-copy p.lead{
        text-align:left;
      }
      .about-list{
        margin:16px 0 0;
        padding-left:1.2rem;
        color:var(--muted);
        font-size:0.95rem;
      }
      .about-list li + li{ margin-top:4px; }

      /* Transformations */
      #transformations .container{ justify-items:center; }
      .transformation-grid{
        width:100%;
        display:grid;
        gap:20px;
        margin-top:26px;
        grid-template-columns:repeat(3, minmax(0, 1fr));
      }
      @media (max-width:1024px){
        .transformation-grid{
          grid-template-columns:repeat(2, minmax(0,1fr));
        }
      }
      @media (max-width:640px){
        .transformation-grid{
          grid-template-columns:1fr;
          overflow-x:auto;
          padding-bottom:4px;
        }
      }
      .transformation-card{
        background:rgba(255,255,255,.04);
        border:1px solid rgba(255,255,255,.08);
        border-radius:20px;
        padding:14px 14px 16px;
        box-shadow:var(--shadow);
        display:flex;
        flex-direction:column;
        gap:10px;
      }
      .transformation-images{
        aspect-ratio: 4 / 4;
        display:grid;
        grid-template-columns:repeat(2, minmax(0,1fr));
        gap:8px;
      }
      .transformation-image-wrapper{
        position:relative;
        overflow:hidden;
        border-radius:16px;
        background:#000;
      }
      .transformation-image-wrapper img{
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
      }
      .badge{
        position:absolute;
        top:8px;
        left:8px;
        padding:4px 9px;
        border-radius:999px;
        font-size:0.7rem;
        letter-spacing:.12em;
        text-transform:uppercase;
        background:rgba(0,0,0,.75);
        color:#f5f7fa;
      }
      .badge-alt{
        background:#ffffff;
        color:#111317;
      }
      .transformation-copy h3{
        margin:6px 0 2px;
        font-size:1rem;
      }
      .transformation-copy p{
        margin:0;
        font-size:0.9rem;
        color:var(--muted);
      }

/* ─── Client Story Modal (single source of truth) ───────────────── */
/* Lock page scroll only when modal is open */
body.modal-open {
  overflow: hidden;
}

/* ===== MODAL OVERLAY ===== */
.story-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  overflow-y: auto;          /* overlay can scroll on small screens */
}

/* ===== MODAL CARD ===== */
.story-modal {
  position: relative;
  width: min(1000px, 100%);
  background: radial-gradient(circle at top left, #1b2027, #05070a);
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.7);
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  max-height: 90vh;          /* never taller than screen */
}

/* image side */
.story-modal-media {
  position: relative;
  background: #000;
}
.story-modal-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* text side – this is what scrolls */
.story-modal-body {
  padding: 24px 28px 26px;
  overflow-y: auto;        /* 🔹 scroll INSIDE card */
  min-height: 0;           /* 🔹 critical for grid – allow shrinking */
}
.story-modal-body h3 {
  margin: 0 0 8px;
  font-size: 1.6rem;
}
.story-meta {
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 0.9rem;
}

/* close button */
.client-story-close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.4);
  background: rgba(0,0,0,.6);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;         
  align-items: center;
  justify-content: center;
  padding: 0;          
  z-index: 5;
  line-height: 1;
}


/* hide nav arrows completely for now */
.client-story-navbtn {
  display: none !important;
}

/* mobile layout */
@media (max-width: 768px) {
  .story-modal {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr); 
    max-height: calc(100vh - 32px);  
    border-radius: 20px;
    width: 100%;
  }

  .story-modal-media {
    height: 230px;         /* fixed image area */
  }

  .story-modal-body {
    padding: 18px 18px 20px;
    /* min-height: 0;  already set above, keep it */
  }

  .client-story-close {
    top: 10px;
    right: 12px;
  }
}
.tagembed-wrapper {
  background: #000;           /* or transparent */
  border-radius: 18px;
  overflow: hidden;           /* clip iframe corners */
}

.tagembed-wrapper iframe {
  display: block;
  width: 100%;
  height: 650px;              /* match your inline height */
  border: 0;
  background: transparent;    /* won’t change inside, but safe */
}
/* Sticky Interested button */
.sticky-interested{
  position: fixed !important;
  right: 18px !important;
  bottom: 18px !important;
  left: auto !important;
  top: auto !important;

  z-index: 9999 !important;

  padding: 12px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.15);
  background: rgba(0,0,0,.7);
  color: #fff;
  backdrop-filter: blur(10px);
  cursor: pointer;
  font-weight: 800;

  /* prevent layout weirdness */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(0);
}

@media (prefers-reduced-motion: reduce){
  .interested-shimmer::before{
    animation: none;
    opacity: 0;
  }
}
  .hp{
  position:absolute;
  left:-9999px;
  width:1px;
  height:1px;
  opacity:0;
}

.status{
  margin: 10px 0 0;
  font-weight: 700;
}
.status.success{ color: #b6ffcf; }
.status.error{ color: #ffb6b6; }
.status.loading{ color: #cfd6dd; }

.status{
  margin: 10px 0 0;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(0,0,0,.35);
  font-weight: 800;
}

.status.success{ color: #b6ffcf; }
.status.error{ color: #ffb6b6; }
.status.loading{ color: #cfd6dd; }

.status {
  margin-top: 14px;
  width: 100%;
  text-align: center;
  animation: statusFadeIn 0.25s ease-out;
}

@keyframes statusFadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.lead-modal-overlay{
  opacity: 0;
  transition: opacity 220ms ease;
}

.lead-modal{
  opacity: 0;
  transform: translateY(14px) scale(0.98);
  transition: transform 220ms ease, opacity 220ms ease;
  will-change: transform, opacity;
}

.lead-modal-overlay.is-open{ opacity: 1; }
.lead-modal.is-open{
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (prefers-reduced-motion: reduce){
  .lead-modal-overlay,
  .lead-modal{
    transition: none;
  }
}
.lead-modal-overlay{
  opacity: 0;
  transition: opacity 220ms ease;
}

.lead-modal{
  opacity: 0;
  transform: translateY(14px) scale(0.98);
  transition: transform 220ms ease, opacity 220ms ease;
  will-change: transform, opacity;
}

.lead-modal-overlay.is-open{ opacity: 1; }
.lead-modal.is-open{
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (prefers-reduced-motion: reduce){
  .lead-modal-overlay,
  .lead-modal{
    transition: none;
  }
}

    `}</style>
  );
}

