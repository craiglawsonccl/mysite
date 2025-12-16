import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LeadModalProvider } from "./context/LeadModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadModalProvider>
      <App />
    </LeadModalProvider>
  </StrictMode>
);
