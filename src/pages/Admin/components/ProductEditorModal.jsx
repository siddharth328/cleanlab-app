import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../../context/StoreContext.jsx";
import { useToast } from "../../../context/ToastContext.jsx";
import { CATEGORIES } from "../../../data/categories.js";
import { supabase } from "../../../lib/supabase.js";

const MAX_IMAGES = 5;
const MAX_SIZE = 5 * 1024 * 1024;

export default function ProductEditorModal({ product, onClose }) {
  const { addProduct, updateProduct } = useStore();
  const { showToast } = useToast();
  const isNew = !product;

  const [form, setForm] = useState(() => ({
    name: product?.name ?? "",
    brand: product?.brand ?? "Cleanlab",
    cat: product?.cat ?? CATEGORIES[0].name,
    price: product ? product.price / 100 : "",
    sale: product?.sale ? product.sale / 100 : "",
    size: product?.size ?? "",
    flavour: product?.flavour ?? "—",
    protein: product?.protein ?? "—",
    servings: product?.servings ?? "",
    stock: product ? String(product.stock) : "0",
    tint: product?.tint ?? "#00a189",
    desc: product?.desc ?? "",
    published: product ? product.published : true,
    featured: product?.featured ?? false
  }));
  const [images, setImages] = useState(product?.images ? [...product.images] : []);
  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Open with a mounted state so the CSS transition (scale+fade) plays on entry.
  const [open, setOpen] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setOpen(true)); }, []);
  function requestClose() {
    setOpen(false);
    setTimeout(onClose, 250);
  }

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") requestClose(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })); }

async function handleFiles(fileList) {
  const remaining = MAX_IMAGES - images.length;
  const files = Array.from(fileList).slice(0, remaining);

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      showToast("Images only", "⚠");
      continue;
    }
    if (file.size > MAX_SIZE) {
      showToast(`${file.name} is over 5 MB`, "⚠");
      continue;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) {
      showToast(`Upload failed: ${uploadError.message}`, "⚠");
      console.error("Upload error:", uploadError);
      continue;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    setImages((imgs) => [...imgs, data.publicUrl]);
  }
}

  function removeImage(i) {
    setImages((imgs) => imgs.filter((_, idx) => idx !== i));
  }

  function handleSave() {
    const price = parseFloat(form.price);
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Product name is required";
    if (isNaN(price) || price <= 0) nextErrors.price = "Enter a valid price";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { showToast("Check the highlighted fields", "⚠"); return; }

    const sale = parseFloat(form.sale);
    const data = {
      name: form.name.trim(),
      brand: form.brand.trim() || "Cleanlab",
      cat: form.cat,
      price: Math.round(price * 100),
      sale: !isNaN(sale) && sale > 0 && sale < price ? Math.round(sale * 100) : null,
      size: form.size.trim() || "1 unit",
      flavour: form.flavour.trim() || "—",
      protein: form.protein.trim() || "—",
      servings: parseInt(form.servings) || 1,
      stock: parseInt(form.stock) || 0,
      tint: form.tint,
      desc: form.desc.trim() || "No description yet.",
      published: form.published,
      featured: form.featured,
      images: [...images]
    };

    if (isNew) addProduct(data);
    else updateProduct(product.id, data);

    showToast(isNew ? "Product added" : "Product saved", "✓");
    requestClose();
  }

  return (
    <div className={`modal ${open ? "on" : ""}`} onClick={(e) => { if (e.target.classList.contains("modal")) requestClose(); }}>
      <div className="sheet">
        <button className="sheet-close" onClick={requestClose}>✕</button>
        <div style={{ padding: 28 }}>
          <h2 style={{ margin: "0 0 3px", fontSize: 21, letterSpacing: "-.03em" }}>
            {isNew ? "Add product" : "Edit product"}
          </h2>
          <p className="hint">
            {isNew ? "Fill this in and it appears on the store straight away." : "Changes save to the store immediately."}
          </p>

          <div className="form">
            <TextField id="e_name" label="Product name" full value={form.name} onChange={(v) => set("name", v)} placeholder="Whey Protein Isolate" error={errors.name} />
            <TextField id="e_brand" label="Brand" value={form.brand} onChange={(v) => set("brand", v)} />
            <div className="f">
              <label htmlFor="e_cat">Category</label>
              <select id="e_cat" value={form.cat} onChange={(e) => set("cat", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
            </div>
            <TextField id="e_price" label="Price (₹)" value={form.price} onChange={(v) => set("price", v)} placeholder="2999" inputMode="numeric" error={errors.price} />
            <TextField id="e_sale" label="Sale price (₹) — optional" value={form.sale} onChange={(v) => set("sale", v)} placeholder="2499" inputMode="numeric" />
            <TextField id="e_size" label="Size / pack" value={form.size} onChange={(v) => set("size", v)} placeholder="1 kg" />
            <TextField id="e_flav" label="Flavour" value={form.flavour} onChange={(v) => set("flavour", v)} placeholder="Chocolate" />
            <TextField id="e_prot" label="Protein per serving" value={form.protein} onChange={(v) => set("protein", v)} placeholder="24g" />
            <TextField id="e_serv" label="Servings" value={form.servings} onChange={(v) => set("servings", v)} placeholder="33" inputMode="numeric" />
            <TextField id="e_stock" label="Stock quantity" value={form.stock} onChange={(v) => set("stock", v)} inputMode="numeric" />
            <div className="f">
              <label htmlFor="e_tint">Label colour</label>
              <input id="e_tint" type="color" value={form.tint} onChange={(e) => set("tint", e.target.value)} style={{ padding: 4, height: 42 }} />
            </div>
            <div className="f full">
              <label htmlFor="e_desc">Description</label>
              <textarea id="e_desc" rows={3} placeholder="What's in it and who it's for" value={form.desc} onChange={(e) => set("desc", e.target.value)} />
            </div>

            <div
              className={`dropzone ${dragging ? "hot" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
              onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            >
              <b>Drop product photos here</b>
              <p>or click to choose — JPG, PNG or WEBP, up to 5 images</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
              />
              {images.length > 0 && (
                <div className="shots">
                  {images.map((src, i) => (
                    <div className="shot-thumb" key={i}>
                      <img src={src} alt="" />
                      {i === 0 && <span className="main-flag">MAIN</span>}
                      <button className="x" onClick={(e) => { e.stopPropagation(); removeImage(i); }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="f full" style={{ flexDirection: "row", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
              <label style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 13.5, cursor: "pointer" }}>
                <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} /> Publish to store
              </label>
              <label style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 13.5, cursor: "pointer" }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} /> Show on homepage
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <button className="btn" onClick={handleSave}>{isNew ? "Add product" : "Save changes"}</button>
            <button className="btn ghost" onClick={requestClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextField({ id, label, value, onChange, placeholder, error, full, inputMode }) {
  return (
    <div className={`f ${full ? "full" : ""} ${error ? "bad" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} placeholder={placeholder} inputMode={inputMode} onChange={(e) => onChange(e.target.value)} />
      {error && <span className="err">{error}</span>}
    </div>
  );
}
