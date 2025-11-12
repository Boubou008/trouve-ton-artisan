// src/components/Stars.jsx
export default function Stars({ rating = 0 }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <span
      className="stars"
      title={`Note : ${rating.toFixed(1)} sur 5`}
      style={{ color: "#f5a623", fontSize: "1.1rem" }}
    >
      {"★".repeat(fullStars)}
      {halfStar && "☆"}
      {"☆".repeat(emptyStars)}
      <span style={{ marginLeft: 6, color: "#555", fontSize: "0.9rem" }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}
