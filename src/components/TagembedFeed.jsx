import { useEffect } from "react";
import { SOCIAL_FEEDS } from "../config/socialFeeds";

export default function TagembedFeed({ platform }) {
  const feed = SOCIAL_FEEDS[platform];

  if (!feed) {
    console.warn(`No Tagembed config found for platform: ${platform}`);
    return null;
  }

  useEffect(() => {
    // Only add Tagembed script once
    if (!document.getElementById("tagembed-script")) {
      const script = document.createElement("script");
      script.id = "tagembed-script";
      script.src = "https://widget.tagembed.com/embed.min.js";
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="tagembed-wrapper">
      <div
        className="tagembed-widget"
        data-widget-id={feed.widgetId}
        data-website="1"
      />
    </div>
  );
}
