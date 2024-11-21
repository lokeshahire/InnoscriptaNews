import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import NewsFeed from "../components/NewsFeed";
import {
  fetchAggregatedArticles,
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
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    fetchTopNews();
  }, []);

  useEffect(() => {
    if (!isSearchActive) {
      if (filters.category) {
        fetchCategoryArticles(filters);
      } else {
        fetchTopNews();
      }
    }
  }, [filters]);

  const fetchTopNews = async () => {
    try {
      const topArticles = await fetchTopHeadlines();
      setArticles(topArticles);
      setIsSearchActive(false);
    } catch (error) {
      console.error("Error fetching top news:", error.message);
    }
  };

  const fetchSearchArticles = async (query) => {
    try {
      setIsSearchActive(true);
      const searchArticles = await fetchAggregatedArticles(query, filters);
      setArticles(searchArticles);
    } catch (error) {
      console.error(
        "Error fetching aggregated search articles:",
        error.message
      );
    }
  };

  const fetchCategoryArticles = async (currentFilters) => {
    const { category } = currentFilters;
    try {
      if (category) {
        const categoryArticles = await fetchArticlesByCategory({ category });
        setArticles(categoryArticles);
      } else {
        console.warn("No category selected.");
        fetchTopNews();
      }
    } catch (error) {
      console.error("Error fetching category articles:", error.message);
    }
  };

  const handleSearch = (query) => {
    setFilters({ ...filters });
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
