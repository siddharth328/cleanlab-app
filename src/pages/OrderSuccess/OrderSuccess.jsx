import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const { state } = useLocation();
  if (!state?.orderNumber) return <Navigate to="/shop" replace />;

  return (
    <div className="wrap success-wrap">
      <svg className="tick" viewBox="0 0 84 84">
        <circle cx="42" cy="42" r="36" />
        <path d="M26 43l11 11 21-22" />
      </svg>
      <h2 className="success-title">Order placed</h2>
      <p className="success-sub">Your order number is <b className="mono">{state.orderNumber}</b></p>
      <p className="success-note">We've sent the details to your email. You'll get a tracking link once it ships.</p>
      <Link className="btn" to="/shop">Continue shopping</Link>
    </div>
  );
}
