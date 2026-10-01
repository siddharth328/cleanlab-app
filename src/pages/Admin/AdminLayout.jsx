import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import Dashboard from "./components/Dashboard.jsx";
import ProductsTab from "./components/ProductsTab.jsx";
import OrdersTab from "./components/OrdersTab.jsx";
import "./Admin.css";

export default function AdminLayout() {
  const [tab, setTab] = useState("dash");
  const [status, setStatus] = useState("checking"); // checking | admin | denied
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin — cleanlab";

    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setStatus("denied");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role === "admin") {
        setEmail(session.user.email);
        setStatus("admin");
      } else {
        setStatus("denied");
      }
    }
    checkAdmin();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  if (status === "checking") {
    return <div className="wrap" style={{ padding: "80px 20px" }}>Loading…</div>;
  }
  if (status === "denied") {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-who">
          <div className="avatar">A</div>
          <div>
            <b>Store owner</b>
            <small>{email}</small>
          </div>
        </div>
        <nav>
          <button className={tab === "dash" ? "on" : ""} onClick={() => setTab("dash")}>Dashboard</button>
          <button className={tab === "prods" ? "on" : ""} onClick={() => setTab("prods")}>Products</button>
          <button className={tab === "orders" ? "on" : ""} onClick={() => setTab("orders")}>Orders</button>
          <button onClick={() => navigate("/")}>View store</button>
          <button onClick={signOut}>Sign out</button>
        </nav>
      </aside>
      <div className="admin-main">
        {tab === "dash" && <Dashboard />}
        {tab === "prods" && <ProductsTab />}
        {tab === "orders" && <OrdersTab />}
      </div>
    </div>
  );
}