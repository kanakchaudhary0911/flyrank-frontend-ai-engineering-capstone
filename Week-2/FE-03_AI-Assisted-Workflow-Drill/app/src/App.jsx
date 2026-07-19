import React, { useState } from "react";
import "./App.css";

// Regex for basic email format validation (local@domain.tld)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a single field and returns an error message string,
 * or an empty string if the field is valid.
 * Keeping this separate from the component makes the rules easy
 * to test and reuse (e.g. on submit and on blur).
 */
function validateField(name, value) {
  switch (name) {
    case "fullName":
      return value.trim().length === 0 ? "Full name is required." : "";

    case "email":
      if (value.trim().length === 0) return "Email is required.";
      if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address.";
      return "";

    default:
      return "";
  }
}

/**
 * Runs validation across every field that has a rule and
 * returns an { fieldName: errorMessage } map.
 */
function validateForm(formData) {
  return {
    fullName: validateField("fullName", formData.fullName),
    email: validateField("email", formData.email),
  };
}

export default function App() {
  // Single source of truth for all form fields (controlled inputs)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    theme: "Light",
    enableNotifications: false,
  });

  // Field-level error messages, keyed by field name
  const [errors, setErrors] = useState({ fullName: "", email: "" });

  // Tracks whether a field has been touched, so we don't show
  // "required" errors before the user has had a chance to type
  const [touched, setTouched] = useState({ fullName: false, email: false });

  // Whether the form has been saved successfully at least once
  const [saved, setSaved] = useState(false);

  // Generic change handler shared by all inputs.
  // Reads type/checked for checkboxes, value for everything else.
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    // Re-validate this field as the user types, but only surface
    // the error once the field has been touched
    if (name === "fullName" || name === "email") {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValue) }));
    }

    // Saving again after an edit should clear the success message
    if (saved) setSaved(false);
  };

  // Marks a field as touched when the user leaves it, so errors
  // appear at a natural moment instead of on first render
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default browser form submission/page reload

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setTouched({ fullName: true, email: true });

    const isValid = Object.values(validationErrors).every((message) => message === "");
    if (!isValid) return;

    // eslint-disable-next-line no-console
    console.log("Submitted settings:", formData);
    setSaved(true);
  };

  // The Save button stays disabled until both required fields are
  // present and pass validation, independent of "touched" state
  const isFormValid =
    formData.fullName.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    EMAIL_REGEX.test(formData.email.trim());

  return (
    <div className="page">
      <div className="card">
        <header className="card-header">
          <h1>Account Settings</h1>
          <p>Update your profile details and preferences.</p>
        </header>

        <form className="settings-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jane Doe"
              aria-invalid={Boolean(touched.fullName && errors.fullName)}
              aria-describedby="fullName-error"
            />
            {touched.fullName && errors.fullName && (
              <span className="error-message" id="fullName-error" role="alert">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="jane@example.com"
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby="email-error"
            />
            {touched.email && errors.email && (
              <span className="error-message" id="email-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Theme */}
          <div className="field">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          {/* Enable Notifications */}
          <div className="field field-checkbox">
            <input
              id="enableNotifications"
              name="enableNotifications"
              type="checkbox"
              checked={formData.enableNotifications}
              onChange={handleChange}
            />
            <label htmlFor="enableNotifications">Enable notifications</label>
          </div>

          <button type="submit" className="save-button" disabled={!isFormValid}>
            Save Settings
          </button>

          {saved && (
            <p className="success-message" role="status">
              Settings saved successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}