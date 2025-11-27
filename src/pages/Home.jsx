import { useEffect } from "react";
import VloggerTemplate from "../components/Template";

export default function Home() {
  // smooth-scroll when landing on /#section
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
  return <VloggerTemplate />;
}
