import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import NewsFeed from "../components/NewsFeed";
import {
  fetchArticlesBySearch,
  fetchArticlesByCategory,
  fetchTopHeadlines,
} from "../services/newsApi";
import "../App.css";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    date: "",
  });

  useEffect(() => {
    fetchTopNews();
  }, []);

  useEffect(() => {
    if (filters.category) {
      fetchCategoryArticles(filters);
    }
  }, [filters]);

  const fetchTopNews = async () => {
    try {
      const topArticles = await fetchTopHeadlines();
      setArticles(topArticles);
    } catch (error) {
      console.error("Error fetching top news:", error.message);
    }
  };

  const fetchSearchArticles = async (query) => {
    try {
      const searchArticles = await fetchArticlesBySearch(query, filters);
      setArticles(searchArticles);
    } catch (error) {
      console.error("Error fetching search articles:", error.message);
    }
  };

  const fetchCategoryArticles = async (currentFilters) => {
    try {
      const { category } = currentFilters;
      if (category) {
        const categoryArticles = await fetchArticlesByCategory({ category });
        setArticles(categoryArticles);
      } else {
        console.warn("No category selected.");
      }
    } catch (error) {
      console.error("Error fetching category articles:", error.message);
    }
  };

  const handleSearch = (query) => {
    setFilters({ ...filters, category: "" });
    fetchSearchArticles(query);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container">
      <div className="search-filter-container">
        <SearchBar onSearch={handleSearch} />
        <FilterPanel onFilter={handleFilter} />
      </div>

      <NewsFeed articles={articles} />
    </div>
  );
};

export default HomePage;
