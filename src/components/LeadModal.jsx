import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLeadModal } from "../context/LeadModalContext";

const DEFAULT_FORM = {
  name: "",
  email: "",
  goal: "",
  experience: "Beginner",
  availability: "",
  budget: "",
  message: "",
  honey: "", // honeypot
};

export default function LeadModal() {
  const { isOpen, close } = useLeadModal();

  const [form, setForm] = useState(DEFAULT_FORM);
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  // ✅ Keep modal mounted long enough for close animation to play
  const [isVisible, setIsVisible] = useState(false);

  const canSubmit = useMemo(
    () => form.name.trim() && form.email.trim() && form.goal.trim(),
    [form]
  );

  // ✅ mount/unmount timing for animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      return;
    }
    const t = setTimeout(() => setIsVisible(false), 220); // match CSS duration
    return () => clearTimeout(t);
  }, [isOpen]);

  const locked = status.type === "loading" || status.type === "success";

  // Close on ESC + lock body scroll (only when open)
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

  // Reset status when modal opens
  useEffect(() => {
    if (isOpen) setStatus({ type: "idle", msg: "" });
  }, [isOpen]);

  // ✅ Don't unmount instantly — allow closing animation
  if (!isOpen && !isVisible) return null;

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
      setForm(DEFAULT_FORM);
      setTimeout(() => {
        close();
        setStatus({ type: "idle", msg: "" });
      }, 2000);
      return;
    }

    setStatus({ type: "loading", msg: "Sending..." });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          goal: form.goal,
          experience: form.experience,
          availability: form.availability,
          budget: form.budget,
          message: form.message,
          source: window.location.href,
          form_type: "lead_modal",
        },
        publicKey
      );

      setStatus({ type: "success", msg: "✅ Sent! Daniel will get back to you soon." });
      setForm(DEFAULT_FORM);

      setTimeout(() => {
        close();
        setStatus({ type: "idle", msg: "" });
      }, 4000);
    } catch (err) {
      setStatus({ type: "error", msg: "Failed to send. Please try again in a moment." });

      // keep error visible, then clear it
      setTimeout(() => setStatus({ type: "idle", msg: "" }), 4000);
    }
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
          <h3>Quick Coaching Questionnaire</h3>
          <button className="lead-modal-x" onClick={close} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className="lead-form">
          <input
            name="honey"
            value={form.honey}
            onChange={onChange}
            className="hp"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid2">
            <label>
              Name*
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                disabled={locked}
              />
            </label>

            <label>
              Email*
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                type="email"
                required
                disabled={locked}
              />
            </label>
          </div>

          <label>
            Main goal*
            <input
              name="goal"
              value={form.goal}
              onChange={onChange}
              required
              disabled={locked}
            />
          </label>

          <div className="grid2">
            <label>
              Training level
              <select
                name="experience"
                value={form.experience}
                onChange={onChange}
                disabled={locked}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>

            <label>
              Weekly availability
              <input
                name="availability"
                value={form.availability}
                onChange={onChange}
                placeholder="e.g. 3x/week"
                disabled={locked}
              />
            </label>
          </div>

          <div className="grid2">
            <label>
              Budget (optional)
              <input
                name="budget"
                value={form.budget}
                onChange={onChange}
                placeholder="e.g. €100/mo"
                disabled={locked}
              />
            </label>

            <label>
              Notes (injuries / timeline / etc.)
              <input
                name="message"
                value={form.message}
                onChange={onChange}
                disabled={locked}
              />
            </label>
          </div>

          <div className="lead-actions">
            <button type="button" className="ghost" onClick={close}>
              {status.type === "success" ? "Close" : "Not now"}
            </button>

            <button type="submit" disabled={!canSubmit || locked}>
              {status.type === "loading"
                ? "Sending..."
                : status.type === "success"
                ? "Sent ✓"
                : "Send"}
            </button>
          </div>

          {status.type !== "idle" && (
            <p role="status" aria-live="polite" className={`status ${status.type}`}>
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
