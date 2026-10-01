import React from "react";
import { useStore } from "../../../context/StoreContext.jsx";
import { inr } from "../../../utils/format.js";
import OrderRows from "./OrderRows.jsx";

export default function Dashboard() {
  const { products, orders } = useStore();
  const revenue = orders.filter((o) => o.payStatus === "paid").reduce((s, o) => s + o.total, 0);
  const live = products.filter((p) => p.published).length;
  const out = products.filter((p) => p.stock <= 0).length;

  const tiles = [
    ["Orders", orders.length, "+3 this week"],
    ["Revenue", inr(revenue), "paid orders only"],
    ["Products live", live, `${products.length} total`],
    ["Out of stock", out, out ? "needs restock" : "all good"]
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <p className="sub">Here's how the store is doing today.</p>
      <div className="tiles">
        {tiles.map(([label, value, trend]) => (
          <div className="tile" key={label}>
            <small>{label}</small>
            <b>{value}</b>
            <span className="trend">{trend}</span>
          </div>
        ))}
      </div>
      <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)" }}>
          <b style={{ fontSize: 15 }}>Recent orders</b>
        </div>
        <div style={{ overflow: "auto" }}>
          <table className="tbl"><OrderRows orders={orders.slice(0, 5)} /></table>
        </div>
      </div>
    </div>
  );
}
