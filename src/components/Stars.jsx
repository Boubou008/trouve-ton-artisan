// src/components/Stars.jsx

export default function Stars({ rating }) {
  // On convertit tout en nombre de façon robuste
  let num =
    typeof rating === "string"
      ? Number(rating.replace(",", "."))
      : Number(rating);

  if (!Number.isFinite(num)) {
    num = 0;
  }

  // On borne entre 0 et 5
  const r = Math.max(0, Math.min(5, num));

  const full = Math.floor(r);
  const half = r - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <span
      className="stars"
      title={`Note : ${r.toFixed(1)} / 5`}
      style={{ color: "#f5a623" }}
    >
      {"★".repeat(full)}
      {half === 1 && "☆"}
      {"☆".repeat(empty)}
      <span style={{ marginLeft: 6, color: "#555", fontSize: "0.9rem" }}>
        {r.toFixed(1)}
      </span>
    </span>
  );
}
