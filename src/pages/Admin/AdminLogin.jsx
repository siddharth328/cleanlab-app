import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import "./Admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signIn() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate("/admin");
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-mark">C</div>
        <h2>Admin sign in</h2>
        <p className="hint">Sign in with your admin account.</p>
        <div className="form" style={{ gridTemplateColumns: "1fr" }}>
          <div className="f">
            <label htmlFor="l_email">Email</label>
            <input id="l_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="f">
            <label htmlFor="l_pass">Password</label>
            <input
              id="l_pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") signIn(); }}
            />
          </div>
        </div>
        {error && <p style={{ color: "var(--sale)", fontSize: 13, margin: "12px 0 0" }}>{error}</p>}
        <button className="btn block" style={{ marginTop: 18 }} onClick={signIn} disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <Link className="btn ghost block" style={{ marginTop: 9 }} to="/">Back to store</Link>
      </div>
    </div>
  );
}