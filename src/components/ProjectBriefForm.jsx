import { useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { CITIES, COUNTRIES, REQUIREMENTS, START_TIMES } from "../lib/constants.js";
import { getReferralCode } from "../lib/referral.js";
import { trackConversion, trackEvent } from "../lib/analytics.js";
import { PROJECT_BRIEF_FIELDS, projectBriefSchema, readProjectBrief } from "../lib/projectBrief.js";

const IDS = { name: "name", email: "email", phone: "phone", company: "company", country: "country", city: "city", requirements: "requirements", start_time: "start", budget: "budget", message: "message" };

export default function ProjectBriefForm({ formLocation = "contact_page", heading = true }) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const prefix = formLocation === "homepage" ? "home-brief" : "contact-brief";
  const id = (field) => `${prefix}-${IDS[field]}`;

  const clearError = (field) => {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const result = projectBriefSchema.safeParse(readProjectBrief(form));
    if (!result.success) {
      const nextErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      setStatus("idle");
      const first = PROJECT_BRIEF_FIELDS.find((field) => nextErrors[field]);
      if (first) form.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    setSubmitError("");
    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, referral_code: getReferralCode() }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.ok) throw new Error(body.error || "Something went wrong. Please try again.");
      setStatus("success");
      trackConversion("contact_lead", { form_location: formLocation, budget: result.data.budget, requirements: result.data.requirements, start_time: result.data.start_time });
      form.reset();
    } catch (error) {
      setStatus("error");
      trackEvent("contact_lead_error", { form_location: formLocation });
      setSubmitError(error?.message || "Something went wrong. Please try again.");
    }
  };

  const fieldClass = (field, full = false) => `oz-field${errors[field] ? " is-invalid" : ""}${full ? " oz-field--full" : ""}`;
  const describedBy = (field) => errors[field] ? `${id(field)}-error` : undefined;
  const errorFor = (field) => errors[field] ? <span id={`${id(field)}-error`} className="oz-field__error">{errors[field]}</span> : null;

  return (
    <form className="oz-form oz-form--neumorphic" onSubmit={submit} noValidate aria-label="Contact Ozeonix Infinity">
      {heading && (
        <div className="oz-form__heading oz-field--full">
          <div className="oz-form__brand-mark" aria-hidden="true"><span /></div>
          <div><h2>Tell us about your project</h2><p>Share the essentials and we’ll reply within one business day.</p></div>
        </div>
      )}
      {status === "success" && <div className="oz-field oz-field--full" role="status" aria-live="polite"><div className="oz-form__status oz-form__status--ok">Thanks — we’ve received your brief and will reply within one business day.</div></div>}
      {status === "error" && <div className="oz-field oz-field--full" role="alert" aria-live="assertive"><div className="oz-form__status oz-form__status--error">{submitError || "Something went wrong. Please try again or WhatsApp us."}</div></div>}

      <div className={fieldClass("name")}><label htmlFor={id("name")}>Name</label><input id={id("name")} name="name" autoComplete="name" placeholder="e.g. Priya Sharma" aria-invalid={!!errors.name} aria-describedby={describedBy("name")} onChange={() => clearError("name")} />{errorFor("name")}</div>
      <div className={fieldClass("email")}><label htmlFor={id("email")}>Email</label><input id={id("email")} name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} onChange={() => clearError("email")} />{errorFor("email")}</div>
      <div className={fieldClass("phone")}><label htmlFor={id("phone")}>Phone <span className="oz-muted">(optional)</span></label><input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+977 98765 43210" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} onChange={() => clearError("phone")} />{errorFor("phone")}</div>
      <div className={fieldClass("company")}><label htmlFor={id("company")}>Company <span className="oz-muted">(optional)</span></label><input id={id("company")} name="company" autoComplete="organization" placeholder="Company or institution name" aria-invalid={!!errors.company} aria-describedby={describedBy("company")} onChange={() => clearError("company")} />{errorFor("company")}</div>
      <div className={fieldClass("country")}><label htmlFor={id("country")}>Country</label><select id={id("country")} name="country" autoComplete="country-name" defaultValue="" aria-invalid={!!errors.country} aria-describedby={describedBy("country")} onChange={() => clearError("country")}><option value="" disabled>Select your country</option>{COUNTRIES.map((item) => <option key={item}>{item}</option>)}</select>{errorFor("country")}</div>
      <div className={fieldClass("city")}><label htmlFor={id("city")}>City / Region</label><select id={id("city")} name="city" autoComplete="address-level2" defaultValue="" aria-invalid={!!errors.city} aria-describedby={describedBy("city")} onChange={() => clearError("city")}><option value="" disabled>Select your city / region</option>{CITIES.map((item) => <option key={item}>{item}</option>)}</select>{errorFor("city")}</div>
      <div className={fieldClass("requirements", true)}><label htmlFor={id("requirements")}>Requirements</label><select id={id("requirements")} name="requirements" defaultValue="" aria-invalid={!!errors.requirements} aria-describedby={describedBy("requirements")} onChange={() => clearError("requirements")}><option value="" disabled>What do you need?</option>{REQUIREMENTS.map((item) => <option key={item}>{item}</option>)}</select>{errorFor("requirements")}</div>
      <div className={fieldClass("start_time", true)}><label htmlFor={id("start_time")}>When do you want to start?</label><select id={id("start_time")} name="start_time" defaultValue="" aria-invalid={!!errors.start_time} aria-describedby={describedBy("start_time")} onChange={() => clearError("start_time")}><option value="" disabled>Select a start timeframe</option>{START_TIMES.map((item) => <option key={item}>{item}</option>)}</select>{errorFor("start_time")}</div>
      <div className={fieldClass("budget", true)}><label htmlFor={id("budget")}>Approximate budget</label><input id={id("budget")} name="budget" type="text" inputMode="text" maxLength={80} placeholder="e.g. Rs 2,00,000 or Not sure yet" aria-invalid={!!errors.budget} aria-describedby={describedBy("budget")} onChange={() => clearError("budget")} />{errorFor("budget")}</div>
      <div className={fieldClass("message", true)}><label htmlFor={id("message")}>Project details</label><textarea id={id("message")} name="message" rows="5" maxLength={1200} placeholder="What do you want to build, who is it for, and what should it improve?" aria-invalid={!!errors.message} aria-describedby={describedBy("message")} onChange={() => clearError("message")} />{errorFor("message")}</div>

      {Object.keys(errors).some((field) => errors[field]) && <div className="oz-field oz-field--full oz-form__error-summary" role="alert"><strong>Please correct the highlighted fields.</strong></div>}
      <div className="oz-field oz-field--full oz-form__submit-row">
        <span className="oz-form__privacy"><ShieldCheck size={16} aria-hidden="true" /> Your details stay private.</span>
        <button type="submit" className="oz-btn oz-btn--primary oz-form__submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Send project brief <Send size={16} aria-hidden="true" /></>}</button>
      </div>
    </form>
  );
}