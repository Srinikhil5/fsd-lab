import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Welcome to the Routing Demo</h1>
      <p>Navigate using the links above — the app uses client-side routing so pages feel instant.</p>
      <div style={{ marginTop: 16 }}>
        <button className="btn primary" onClick={() => navigate("/demo")}>Try Demo</button>
        <Link to="/about" className="btn" style={{ marginLeft: 8 }}>Learn more</Link>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h2>About</h2>
      <p>This project demonstrates basic routing with small interactive pieces to make the site look live.</p>
      <ul>
        <li>Instant navigation with React Router</li>
        <li>Demo page with a running counter simulation</li>
        <li>Contact form with client-side confirmation</li>
      </ul>
      <p>
        Back to <Link to="/">Home</Link>.
      </p>
    </div>
  );
}

function Demo() {
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (location.state && location.state.start) setRunning(true);
  }, [location.state]);

  return (
    <div className="page">
      <h2>Demo</h2>
      <p>Start the simulation to see the counter increment. This mimics live changing data.</p>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{count}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn primary" onClick={() => setRunning((r) => !r)}>{running ? "Stop" : "Start"}</button>
          <button className="btn" onClick={() => { setCount(0); setRunning(false); }}>Reset</button>
        </div>
      </div>
      <div style={{ marginTop: 18 }}>
        <details>
          <summary style={{ cursor: "pointer" }}>More about this demo</summary>
          <p style={{ color: "#6b7280" }}>The counter increments once per second while running. It demonstrates how UI updates feel live without reloading the page.</p>
        </details>
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="page">
      <h2>Contact</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 10 }}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name="message" value={form.message} onChange={handleChange} required />
          </label>
          <div>
            <button className="btn primary" type="submit">Send</button>
          </div>
        </form>
      ) : (
        <div className="thanks">
          <h4>Thanks — we'll get back to you soon!</h4>
          <p><strong>{form.name}</strong> — {form.email}</p>
          <p>Message preview: {form.message}</p>
        </div>
      )}
    </div>
  );
}

function NotFound() {
  return (
    <div className="page">
      <h2>404 — Page not found</h2>
      <p>Sorry, that route doesn't exist. Go back to <Link to="/">Home</Link>.</p>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">Routing Demo</div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/demo" className={({ isActive }) => (isActive ? "active" : "")}>Demo</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container small">© {new Date().getFullYear()} Routing Demo</div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;