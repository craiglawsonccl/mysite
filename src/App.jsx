import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Links from "./pages/Links";
import "./styles.css";
import LeadModal from "./components/LeadModal";

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, hash]);
  return null;
}

const BASENAME =
  (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<Links />} />
      </Routes>

      {/* Mount globally so Links page can open it */}
      <LeadModal />

      {/* Optional: if you want the sticky button on Links too */}
      {/* <StickyInterestedButton /> */}
    </BrowserRouter>
  );
}
