import React from "react";
import { useStore } from "../../../context/StoreContext.jsx";
import OrderRows from "./OrderRows.jsx";

export default function OrdersTab() {
  const { orders } = useStore();
  return (
    <div>
      <h2>Orders</h2>
      <p className="sub">{orders.length} orders</p>
      <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflow: "auto" }}>
          <table className="tbl"><OrderRows orders={orders} /></table>
        </div>
      </div>
    </div>
  );
}
