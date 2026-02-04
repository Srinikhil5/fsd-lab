import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import './App.css';

function Navbar() {
  return (
    <header className="site-header">
      <div className="container">
        <h1 className="brand"><Link to="/">My Demo Site</Link></h1>
        <nav className="nav">
          <NavLink to="/" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink>
          <NavLink to="/demo" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Demo</NavLink>
          <NavLink to="/about" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
          <NavLink to="/contact" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <main className="hero container">
      <h2>Useful Links</h2>
      <p className="lead">Quick links to documentation and resources.</p>
      <ul className="link-list">
        <li><a href="https://reactjs.org" target="_blank" rel="noreferrer">React — Official docs</a></li>
        <li><a href="https://reactrouter.com" target="_blank" rel="noreferrer">React Router — Guides</a></li>
        <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub — Explore projects</a></li>
      </ul>
    </main>
  );
} 

function About() {
  return (
    <section className="container">
      <h2>About this Project</h2>
      <p>This project demonstrates client-side routing using React Router, how to build interactive components, and how to style a small single-page app to look "live".</p>
      <ul>
        <li>React Router navigation (Home / Demo / About / Contact)</li>
        <li>Interactive demo (counter)</li>
        <li>Responsive layout and accessible links</li>
      </ul>
    </section>
  );
}

function Demo() {
  const [count, setCount] = useState(0);
  const items = ['Feature A', 'Feature B', 'Feature C'];
  return (
    <section className="container demo">
      <h2>Live Demo</h2>
      <div className="demo-grid">
        <div className="card">
          <h3>Interactive Counter</h3>
          <p>Current count: <strong>{count}</strong></p>
          <div className="btn-group">
            <button className="btn" onClick={() => setCount(c => c + 1)}>+1</button>
            <button className="btn" onClick={() => setCount(c => c - 1)}>-1</button>
            <button className="btn muted" onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>
        <div className="card">
          <h3>Features</h3>
          <ul>
            {items.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    setStatus('Thanks! (demo form — no data was sent)');
  }
  return (
    <section className="container">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form">
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="4" />
        </label>
        <button className="btn" type="submit">Send message</button>
        {status && <p className="status">{status}</p>}
      </form>
    </section>
  );
}

function NotFound() {
  return (
    <section className="container">
      <h2>404 — Not Found</h2>
      <p>The page you're looking for doesn't exist. Try the <Link to="/">home page</Link>.</p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="site-footer">
          <div className="container">
            <small>© Demo Site • Built with React</small>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
