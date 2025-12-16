// src/components/TagembedFeed.jsx
import { SOCIAL_FEEDS } from "../config/socialFeeds";

export default function TagembedFeed({ platform }) {
  const feed = SOCIAL_FEEDS[platform];

  if (!feed) return null;

  return (
    <div className="tagembed-wrapper">
      <iframe
        title={`${platform}-feed`}
        src={`https://widget.tagembed.com/${feed.widgetId}?website=1`}
        style={{ width: "100%", height: "650px", border: "none", overflow: "hidden" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      />
    </div>
  );
}
