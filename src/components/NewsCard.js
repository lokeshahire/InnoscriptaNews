import React from "react";
import "../App.css";

const NewsCard = ({ article }) => (
  <div className="news-card">
    <img
      src={
        article.image ||
        "https://via.placeholder.com/300x200?text=No+News+Image"
      }
      alt={article.title}
      className="news-image"
    />
    <div className="news-content">
      <h3>{article.title}</h3>
      <p>{article.description || "No description available."}</p>
      <p>
        <strong>Source:</strong>{" "}
        {typeof article.source === "object" && article.source !== null
          ? article.source.name
          : article.source || "Unknown Source"}
      </p>
      <p>
        <strong>Published At:</strong>{" "}
        {article.publishedAt
          ? new Date(article.publishedAt).toLocaleString()
          : "Not Available"}
      </p>
    </div>
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="read-more"
    >
      Read More
    </a>
  </div>
);

export default NewsCard;
