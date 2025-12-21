import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LeadModalProvider } from "./context/LeadModalContext.jsx";

// --- GitHub Pages SPA deep-link fix (BrowserRouter) ---
const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");
if (redirect) {
  // Update the URL to the originally requested route (no page reload)
  window.history.replaceState(null, "", redirect);

  // Optional: clean up ?redirect=... so it doesn't stick around
  params.delete("redirect");
  const cleaned =
    window.location.pathname +
    (params.toString() ? `?${params.toString()}` : "") +
    window.location.hash;
  window.history.replaceState(null, "", cleaned);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadModalProvider>
      <App />
    </LeadModalProvider>
  </StrictMode>
);
