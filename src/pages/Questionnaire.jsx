import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import "../Questionnaire.css";
import { useNavigate } from "react-router-dom";

const DEFAULT_FORM = {
  service_type: "", // Online Coaching or 1-2-1 PT
  goals: "",
  start_date: "",
  age: "",
  full_name: "",
  gender: "",
  weight: "",
  height: "",
  experience: "",
  occupation: "",
  injuries: "",
  medication: "",
  sleep_hours: "",
  steps: "",
  phone: "",
  phone_confirm: "",
  email: "",
  nutrition_breakfast: "",
  nutrition_lunch: "",
  nutrition_dinner: "",
  nutrition_snacks: "",
  training_days_per_week: "",
  training_preferences: "",
  other_requests: "",
  honey: "", // honeypot
};

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // your template with {{questionnaire_block}}
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Questionnaire() {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  const [form, setForm] = useState(DEFAULT_FORM);
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const canSubmit = useMemo(() => {
    const required =
      form.service_type &&
      form.goals.trim() &&
      form.start_date.trim() &&
      form.full_name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.phone_confirm.trim();

    const phonesMatch = form.phone.trim() === form.phone_confirm.trim();

    return required && phonesMatch && status.type !== "sending" && !redirecting;
  }, [form, status.type, redirecting]);

  function update(key) {
    return (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    // honeypot trap (bots fill hidden fields)
    if (form.honey) return;

    if (form.phone.trim() !== form.phone_confirm.trim()) {
      setStatus({ type: "error", msg: "Phone numbers do not match." });
      return;
    }

    setStatus({ type: "sending", msg: "Sending..." });

    // Build a nicely formatted block for your EmailJS template:
    // <div>Questionnaire: {{questionnaire_block}}</div>
    const questionnaireBlock = [
      `Service Type: ${form.service_type || "-"}`,
      `Start Date: ${form.start_date || "-"}`,
      `Full Name: ${form.full_name || "-"}`,
      `Email: ${form.email || "-"}`,
      `Phone: ${form.phone || "-"}`,
      ``,
      `Age: ${form.age || "-"}`,
      `Gender: ${form.gender || "-"}`,
      `Weight: ${form.weight || "-"}`,
      `Height: ${form.height || "-"}`,
      `Experience Level: ${form.experience || "-"}`,
      `Occupation: ${form.occupation || "-"}`,
      ``,
      `Goals: ${form.goals || "-"}`,
      ``,
      `Injuries / Medical Conditions: ${form.injuries || "-"}`,
      `Medication: ${form.medication || "-"}`,
      ``,
      `Sleep (hrs/night): ${form.sleep_hours || "-"}`,
      `Steps/day: ${form.steps || "-"}`,
      ``,
      `Nutrition:`,
      `- Breakfast: ${form.nutrition_breakfast || "-"}`,
      `- Lunch: ${form.nutrition_lunch || "-"}`,
      `- Dinner: ${form.nutrition_dinner || "-"}`,
      `- Snacks: ${form.nutrition_snacks || "-"}`,
      ``,
      `Training Preferences: ${form.training_preferences || "-"}`,
      `Training Days/Week: ${form.training_days_per_week || "-"}`,
      `Other Requests: ${form.other_requests || "-"}`,
    ].join("\n");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // keep everything you already send (in case template references them)
          ...form,

          // add these for your existing “New website enquiry” template variables if needed
          source: "Questionnaire",
          name: form.full_name,
          goal: form.goals,
          availability: form.start_date,
          budget: "N/A",
          message:
            "Client submitted the full questionnaire (see Questionnaire section).",
          page_url: window.location.href,

          // 👇 THIS is the new block you added to the template
          questionnaire_block: questionnaireBlock,

          // optional separate summary too (if you want)
          nutrition_summary: `Breakfast: ${form.nutrition_breakfast || "-"}
Lunch: ${form.nutrition_lunch || "-"}
Dinner: ${form.nutrition_dinner || "-"}
Snacks: ${form.nutrition_snacks || "-"}`,
        },
        { publicKey: PUBLIC_KEY }
      );

      setStatus({ type: "success", msg: "Sent! Daniel will be in touch soon." });
      setRedirecting(true);
      setForm(DEFAULT_FORM);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: "Something went wrong sending the form. Please try again.",
      });
    }
  }

  return (
    <main className="questionnaire-page">
      <section className="container questionnaire">
        <div className="questionnaire-topbar">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/")}
            aria-label="Go back to home page"
          >
            ← Back
          </button>
        </div>

        <h1>Coaching Questionnaire</h1>
        <p className="lead">
          Fill this out and Daniel will reply with the next steps.
        </p>

        <form className="questionnaire-form" onSubmit={onSubmit}>
          {/* Honeypot (keep hidden) */}
          <input
            type="text"
            value={form.honey}
            onChange={update("honey")}
            autoComplete="off"
            tabIndex={-1}
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
            aria-hidden="true"
          />

          <label>
            Online Coaching or 1-2-1 Personal Training?
            <select
              value={form.service_type}
              onChange={update("service_type")}
              required
            >
              <option value="">Select…</option>
              <option value="Online Coaching">Online Coaching</option>
              <option value="1-2-1 Personal Training">
                1-2-1 Personal Training
              </option>
            </select>
          </label>

          <label>
            What are your main goals for this coaching block?
            <textarea
              value={form.goals}
              onChange={update("goals")}
              required
              placeholder="e.g. fat loss, build muscle, improve fitness, strength targets…"
            />
          </label>

          <label>
            When are you looking to start?
            <input
              type="text"
              value={form.start_date}
              onChange={update("start_date")}
              required
              placeholder="e.g. ASAP / next Monday / January 2026"
            />
          </label>

          <div className="form-row">
            <label>
              Age
              <input
                type="number"
                min="12"
                max="100"
                value={form.age}
                onChange={update("age")}
                placeholder="e.g. 28"
              />
            </label>

            <label>
              Full name
              <input
                type="text"
                value={form.full_name}
                onChange={update("full_name")}
                required
                placeholder="e.g. John Smith"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Gender
              <select value={form.gender} onChange={update("gender")}>
                <option value="">Select…</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </label>

            <label>
              Experience level
              <select value={form.experience} onChange={update("experience")}>
                <option value="">Select…</option>
                <option value="Complete beginner">Complete beginner</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Weight
              <input
                type="text"
                value={form.weight}
                onChange={update("weight")}
                placeholder="e.g. 82kg"
              />
            </label>

            <label>
              Height
              <input
                type="text"
                value={form.height}
                onChange={update("height")}
                placeholder="e.g. 180cm"
              />
            </label>
          </div>

          <label>
            What is your occupation?
            <input
              type="text"
              value={form.occupation}
              onChange={update("occupation")}
              placeholder="e.g. office job, shift work, student…"
            />
          </label>

          <label>
            Any current injuries or medical conditions?
            <textarea
              value={form.injuries}
              onChange={update("injuries")}
              placeholder="e.g. knee pain, lower back issues, shoulder impingement…"
            />
          </label>

          <label>
            Are you taking any medication your coach should know about?
            <textarea
              value={form.medication}
              onChange={update("medication")}
              placeholder="e.g. asthma inhaler, blood pressure meds (or 'none')"
            />
          </label>

          <label>
            How many times per week can you train?
            <select
              value={form.training_days_per_week}
              onChange={update("training_days_per_week")}
            >
              <option value="">Select…</option>
              <option value="0">0 days/week</option>
              <option value="1">1 days/week</option>
              <option value="2">2 days/week</option>
              <option value="3">3 days/week</option>
              <option value="4">4 days/week</option>
              <option value="5">5 days/week</option>
              <option value="6">6 days/week</option>
              <option value="7">7 days/week</option>
            </select>
          </label>

          <div className="form-row">
            <label>
              How many hours do you sleep per night?
              <input
                type="number"
                value={form.sleep_hours}
                onChange={update("sleep_hours")}
                placeholder="e.g. 7"
              />
            </label>

            <label>
              If you track steps, how many per day on average?
              <input
                type="number"
                value={form.steps}
                onChange={update("steps")}
                placeholder="e.g. 8000"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Phone number
              <input
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                required
                placeholder="e.g. +353 87 123 4567"
              />
            </label>

            <label>
              Confirm phone number
              <input
                type="tel"
                value={form.phone_confirm}
                onChange={update("phone_confirm")}
                required
                placeholder="re-type your phone number"
              />
            </label>
          </div>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              required
              placeholder="e.g. you@example.com"
            />
          </label>

          <h3>Nutrition</h3>

          <label>
            Breakfast
            <input
              type="text"
              value={form.nutrition_breakfast}
              onChange={update("nutrition_breakfast")}
              placeholder="e.g. eggs + toast / protein oats / usually skip"
            />
          </label>

          <label>
            Lunch
            <input
              type="text"
              value={form.nutrition_lunch}
              onChange={update("nutrition_lunch")}
              placeholder="e.g. chicken wrap / salad / meal prep"
            />
          </label>

          <label>
            Dinner
            <input
              type="text"
              value={form.nutrition_dinner}
              onChange={update("nutrition_dinner")}
              placeholder="e.g. pasta / rice + meat / takeaways"
            />
          </label>

          <label>
            Snacks
            <input
              type="text"
              value={form.nutrition_snacks}
              onChange={update("nutrition_snacks")}
              placeholder="e.g. chocolate, fruit, protein bars, none"
            />
          </label>

          <label>
            Any specific exercises or training styles you’d like included?
            <textarea
              value={form.training_preferences}
              onChange={update("training_preferences")}
              placeholder="e.g. bodybuilding, powerlifting, running, HIIT, CrossFit style…"
            />
          </label>

          <label>
            Any other requests?
            <textarea
              value={form.other_requests}
              onChange={update("other_requests")}
              placeholder="e.g. gym access, schedule limits, preferences, anything else…"
            />
          </label>

          <button className="btn-primary" type="submit" disabled={!canSubmit}>
            {status.type === "sending" ? "Sending..." : "Submit questionnaire"}
          </button>

          {status.type !== "idle" && (
            <p className={`form-status ${status.type}`}>
              {status.msg}
              {status.type === "success" && redirecting && (
                <>
                  <br />
                  <em>You’ll be redirected to the home page in 5 seconds…</em>
                </>
              )}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
