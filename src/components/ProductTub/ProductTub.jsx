// Renders the product's uploaded photo if it has one, otherwise a generated
// SVG tub tinted with the product's chosen colour — so the grid never looks
// broken before real photos are uploaded in admin.
export default function ProductTub({ product, size = 200 }) {
  if (product.images && product.images.length > 0) {
    return <img src={product.images[0]} alt={product.name} />;
  }
  const tint = product.tint || "#00a189";
  const gradId = "g" + tint.replace("#", "");
  return (
    <svg viewBox="0 0 100 120" width={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tint} stopOpacity="0.95" />
          <stop offset="1" stopColor={tint} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="114" rx="34" ry="5" fill="rgba(0,0,0,.08)" />
      <rect x="23" y="4" width="54" height="14" rx="5" fill={tint} opacity=".45" />
      <rect x="15" y="15" width="70" height="99" rx="13" fill={`url(#${gradId})`} />
      <rect x="15" y="52" width="70" height="30" fill="#fff" opacity=".93" />
      <rect x="25" y="60" width="38" height="5.5" rx="2.75" fill={tint} />
      <rect x="25" y="69" width="22" height="4" rx="2" fill={tint} opacity=".5" />
      <rect x="15" y="15" width="16" height="99" rx="13" fill="#fff" opacity=".13" />
    </svg>
  );
}
