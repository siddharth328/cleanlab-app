import React from "react";
import { inr } from "../../../utils/format.js";

const STATUS_CLASS = { new: "warn", packed: "", shipped: "", delivered: "ok", cancelled: "bad" };

export default function OrderRows({ orders }) {
  return (
    <>
      <thead>
        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th className="hide-sm">Payment</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.num}>
            <td>
              <b className="mono">{o.num}</b><br />
              <small style={{ color: "var(--ink-3)" }}>
                {new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </small>
            </td>
            <td>{o.name}<br /><small style={{ color: "var(--ink-3)" }}>{o.city}</small></td>
            <td className="hide-sm">
              <span className={`chipst ${o.payStatus === "paid" ? "ok" : "warn"}`}>
                {o.payStatus === "paid" ? "Paid" : "COD pending"}
              </span>
            </td>
            <td><b>{inr(o.total)}</b></td>
            <td><span className={`chipst ${STATUS_CLASS[o.status] ?? ""}`}>{o.status}</span></td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
