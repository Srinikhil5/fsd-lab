import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import './App.css';

function MiniChart({ points, color = '#61dafb' }) {
  const width = 220, height = 60, padding = 4;
  const max = Math.max(...points, 100);
  const min = Math.min(...points, 0);
  const scaleX = (i) => padding + (i / (points.length - 1)) * (width - 2*padding);
  const scaleY = (v) => padding + (1 - (v - min) / (max - min || 1)) * (height - 2*padding);
  const d = points.map((p, i) => `${i===0?'M':'L'}${scaleX(i)},${scaleY(p)}`).join(' ');
  return (
    <svg width={width} height={height} className="mini-chart" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Dashboard() {
  const [cpu, setCpu] = useState(20);
  const [memory, setMemory] = useState(40);
  const [points, setPoints] = useState(Array(20).fill(20));
  const [running, setRunning] = useState(true);
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setNow(new Date());
      if (!running) return;
      setCpu(prev => Math.max(0, Math.min(100, Math.round(prev + (Math.random()*10 - 5)))));
      setMemory(prev => Math.max(0, Math.min(100, Math.round(prev + (Math.random()*8 - 4)))));
      setPoints(prev => {
        const next = [...prev.slice(1), Math.round(10 + Math.random()*80)];
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const toggleRunning = () => setRunning(r => !r);

  const spike = () => {
    setCpu(95);
    setPoints(p => [...p.slice(1), 95]);
  }

  const refresh = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setCpu(Math.round(20 + Math.random()*60));
    setMemory(Math.round(20 + Math.random()*70));
    setPoints(p => [...p.slice(1), Math.round(20 + Math.random()*70)]);
    setLoading(false);
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Live Dashboard</h1>
        <div className="clock">{now.toLocaleTimeString()}</div>
      </div>

      <div className="controls">
        <button onClick={toggleRunning}>{running ? 'Pause' : 'Resume'}</button>
        <button onClick={spike}>Simulate Spike</button>
        <button onClick={refresh} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh Data'}</button>
      </div>

      <div className="metrics">
        <div className="card">
          <h3>CPU</h3>
          <div className="metric-value">{cpu}%</div>
          <div className="bar"><div className="bar-fill" style={{width: `${cpu}%`}}></div></div>
          <MiniChart points={points} color="#ff6b6b" />
        </div>

        <div className="card">
          <h3>Memory</h3>
          <div className="metric-value">{memory}%</div>
          <div className="bar"><div className="bar-fill mem" style={{width: `${memory}%`}}></div></div>
          <MiniChart points={Array.from({length: points.length}, (_,i)=> i%2? memory: memory-5)} color="#4ecdc4" />
        </div>

      </div>

      <div className="footer-note">Data is simulated for demo purposes. 🔧</div>
    </div>
  );
}

function Profile() {
  const [name, setName] = useState('Your Name');
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(false);
  const save = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setSaved(name);
    setLoading(false);
  }
  return (
    <div className="profile">
      <h1>Profile</h1>
      <label>
        Name: <input value={name} onChange={e=>setName(e.target.value)} />
      </label>
      <div className="profile-actions">
        <button onClick={save} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        {saved && <div className="saved">Saved: {saved}</div>}
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
