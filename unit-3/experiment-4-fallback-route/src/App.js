import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

function Home() {
  return <h2>Home (Default)</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

function NotFound() {
  return (
    <div>
      <h2>404 — Page Not Found</h2>
      <p>The page you requested doesn't exist.</p>
      <p>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  );
}

function Layout() {
  return (
    <>
      <nav style={{ marginBottom: "0.5rem" }}>
        <Link to="/">Home</Link> |
        <Link to="/about" style={{ marginLeft: "0.5rem" }}>
          About
        </Link> |
        <Link to="/contact" style={{ marginLeft: "0.5rem" }}>
          Contact
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route wraps nested routes and provides a default (index) route */}
        <Route path="/" element={<Layout />}>
          {/* Default route (index) — loads when the parent path is matched exactly */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* Fallback route — catches any unmatched paths */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
