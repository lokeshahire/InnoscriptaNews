import React from "react";
import NewsCard from "./NewsCard";
import "../App.css";

const NewsFeed = ({ articles }) => {
  return (
    <div className="news-feed">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsFeed;
