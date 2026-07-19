import { useState } from "react";
import "./App.css";

function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("Light");
  const [notifications, setNotifications] = useState(false);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSaved(true);
      console.log("Saved Settings:", { fullName, email, theme, notifications });
    } else {
      setSaved(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            {" "}Enable Notifications
          </label>
        </div>

        <button type="submit">Save</button>

        {saved && <p className="success-text">Settings saved successfully!</p>}
      </form>
    </div>
  );
}

export default App;