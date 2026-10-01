import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useStore } from "../../context/StoreContext.jsx";
import ProductTub from "../../components/ProductTub/ProductTub.jsx";
import { inr, effectivePrice } from "../../utils/format.js";
import "./Checkout.css";

const COD_FEE = 4000;

export default function Checkout() {
  const { lines, subtotal, shipping, clearCart } = useCart();
  const { decrementStock, addOrder, orders } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", phone: "", email: "", addr: "", city: "", pin: "" });
  const [errors, setErrors] = useState({});
  const [payMethod, setPayMethod] = useState("online");
  const [placing, setPlacing] = useState(false);
  const firstErrorRef = useRef(null);

  useEffect(() => {
    if (lines.length === 0 && !placing) navigate("/shop");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const codFee = payMethod === "cod" ? COD_FEE : 0;
  const total = subtotal + shipping + codFee;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const rules = {
      name: [form.name.trim().length > 1, "Enter your name"],
      phone: [/^\d{10}$/.test(form.phone.replace(/\s/g, "")), "Enter a 10-digit phone"],
      email: [/^\S+@\S+\.\S+$/.test(form.email), "Enter a valid email"],
      addr: [form.addr.trim().length > 5, "Enter your address"],
      city: [form.city.trim().length > 1, "Enter your city"],
      pin: [/^\d{6}$/.test(form.pin), "Enter a 6-digit pincode"]
    };
    const nextErrors = {};
    let firstBad = null;
    Object.entries(rules).forEach(([field, [ok, msg]]) => {
      if (!ok) {
        nextErrors[field] = msg;
        if (!firstBad) firstBad = field;
      }
    });
    setErrors(nextErrors);
    return firstBad;
  }

  function placeOrder() {
    const firstBad = validate();
    if (firstBad) {
      document.getElementById("c_" + firstBad)?.focus();
      document.getElementById("c_" + firstBad)?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setPlacing(true);
    setTimeout(async () => {

      const num = "CL-" + Date.now().toString().slice(-6);
      try {
        await addOrder({
          num,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          addr: form.addr.trim(),
          city: form.city.trim(),
          pin: form.pin.trim(),
          total,
          pay: payMethod,
          payStatus: payMethod === "cod" ? "pending" : "paid",
          status: "new",
          items: lines.map((l) => ({ name: l.product.name, qty: l.qty, price: effectivePrice(l.product) }))
        });
        await decrementStock(lines.map((l) => ({ id: l.id, qty: l.qty })));
        clearCart();
        setPlacing(false);
        navigate("/order-success", { state: { orderNumber: num } });
      } catch (err) {
        console.error("Order failed:", err);
        setPlacing(false);
        alert("Something went wrong placing your order. Please try again.");
      }
    }, 900);
  }

  if (lines.length === 0) return null;

  return (
    <section className="pad">
      <div className="wrap">
        <div className="sec-head">
          <div><h2>Checkout</h2><p>No account needed. We'll email your order details.</p></div>
          <Link className="btn ghost sm" to="/shop">← Keep shopping</Link>
        </div>

        <div className="checkout-grid">
          <div className="panel">
            <h3>Delivery details</h3>
            <p className="hint">Where should we send it?</p>
            <div className="form">
              <Field id="c_name" label="Full name" placeholder="Rahul Sharma" value={form.name} onChange={(v) => update("name", v)} error={errors.name} />
              <Field id="c_phone" label="Phone" placeholder="98765 43210" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} inputMode="numeric" />
              <Field id="c_email" label="Email" placeholder="you@email.com" value={form.email} onChange={(v) => update("email", v)} error={errors.email} full type="email" />
              <Field id="c_addr" label="Address" placeholder="Flat / house, street, area" value={form.addr} onChange={(v) => update("addr", v)} error={errors.addr} full />
              <Field id="c_city" label="City" placeholder="Indore" value={form.city} onChange={(v) => update("city", v)} error={errors.city} />
              <Field id="c_pin" label="Pincode" placeholder="452001" value={form.pin} onChange={(v) => update("pin", v)} error={errors.pin} inputMode="numeric" maxLength={6} />
            </div>

            <h3 style={{ marginTop: 26 }}>Payment</h3>
            <p className="hint">Frontend demo — no real payment is taken.</p>
            <div className="pay-opts">
              <label className={payMethod === "online" ? "on" : ""}>
                <input type="radio" name="pay" checked={payMethod === "online"} onChange={() => setPayMethod("online")} />
                <span><b>Pay online</b><small>UPI, cards, netbanking and wallets</small></span>
              </label>
              <label className={payMethod === "cod" ? "on" : ""}>
                <input type="radio" name="pay" checked={payMethod === "cod"} onChange={() => setPayMethod("cod")} />
                <span><b>Cash on delivery</b><small>Pay the courier when it arrives. ₹40 handling fee.</small></span>
              </label>
            </div>
          </div>

          <div className="panel">
            <h3>Your order</h3>
            <p className="hint">{lines.reduce((s, l) => s + l.qty, 0)} item(s)</p>
            <div>
              {lines.map((l) => (
                <div className="co-line" key={l.id}>
                  <div className="mini"><ProductTub product={l.product} size={40} /></div>
                  <div className="info"><b>{l.product.name}</b><small>Qty {l.qty} · {l.product.size}</small></div>
                  <div className="row-total">{inr(effectivePrice(l.product) * l.qty)}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <div className="sumline"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
              <div className="sumline"><span>Shipping</span><span>{shipping ? inr(shipping) : "Free"}</span></div>
              {codFee > 0 && <div className="sumline"><span>COD handling</span><span>{inr(codFee)}</span></div>}
              <div className="sumline total"><span>Total</span><span>{inr(total)}</span></div>
            </div>
            <button className="btn block" onClick={placeOrder} disabled={placing}>
              {placing ? "Processing…" : "Place order"}
            </button>
            <p className="hint" style={{ textAlign: "center", margin: "12px 0 0" }}>Free shipping over ₹1,499</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, placeholder, value, onChange, error, full, type = "text", inputMode, maxLength }) {
  return (
    <div className={`f ${full ? "full" : ""} ${error ? "bad" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="err">{error || ""}</span>
    </div>
  );
}
