import React from "react";
import NewsCard from "./NewsCard";
import "../App.css";

const NewsFeed = ({ articles }) => {
  const validArticles = articles.filter(
    (article) =>
      article.urlToImage &&
      article.title !== "[Removed]" &&
      article.description !== "[Removed]" &&
      article.content !== "[Removed]"
  );

  return (
    <div className="news-feed">
      {validArticles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsFeed;
