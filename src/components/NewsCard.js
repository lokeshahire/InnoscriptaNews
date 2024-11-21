import React from "react";
import "../App.css";

const NewsCard = ({ article }) => (
  <div className="news-card">
    {article.urlToImage && (
      <img
        src={article.urlToImage}
        alt={article.title}
        className="news-image"
      />
    )}
    <div className="news-content">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <p>
        <strong>Published At:</strong>{" "}
        {new Date(article.publishedAt).toLocaleString()}
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
