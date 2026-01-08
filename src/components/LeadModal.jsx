import { useEffect, useState } from "react";
import { useLeadModal } from "../context/LeadModalContext";

const PHONE_DISPLAY = "+353 83 809 7589";
const PHONE_TEL = "+353838097589";
const SMS_BODY = encodeURIComponent(
  "Hi Daniel, I have a quick question about coaching."
);

export default function LeadModal() {
  const { isOpen, close } = useLeadModal();

  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // mount/unmount timing for animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      return;
    }
    const t = setTimeout(() => setIsVisible(false), 220);
    return () => clearTimeout(t);
  }, [isOpen]);

  // ESC + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen && !isVisible) return null;

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
    } catch {
      const el = document.createElement("textarea");
      el.value = PHONE_DISPLAY;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`lead-modal-overlay ${isOpen ? "is-open" : "is-closing"}`}
      onMouseDown={close}
    >
      <div
        className={`lead-modal ${isOpen ? "is-open" : "is-closing"}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="lead-modal-head">
          <h3>Quick Contact</h3>
          <button className="lead-modal-x" onClick={close} aria-label="Close">
            ×
          </button>
        </div>

        <div className="lead-form">
          <p className="lead-subtitle">
            Prefer to reach Daniel directly? Call, message, or copy his number.
          </p>

          <div className="contact-card">
            <div className="contact-number-row">
              <span className="contact-number">{PHONE_DISPLAY}</span>

              <button
                type="button"
                className="iconBtn"
                onClick={copyNumber}
                aria-label="Copy phone number"
              >
                📋
              </button>
            </div>

            <div className="lead-actions">
              <a className="ghost" href={`tel:${PHONE_TEL}`}>
                Call
              </a>

              <a className="ghost" href={`sms:${PHONE_TEL}?&body=${SMS_BODY}`}>
                Message
              </a>

              <button type="button" onClick={close}>
                Close
              </button>
            </div>

            {copied && (
              <p role="status" aria-live="polite" className="status success">
                Copied ✓
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
