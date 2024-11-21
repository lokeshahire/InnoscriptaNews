import axios from "axios";

const API_KEYS = {
  newsAPI: process.env.REACT_APP_NEWS_API_KEY,
  guardian: process.env.REACT_APP_GUARDIAN_API_KEY,
  nyTimes: process.env.REACT_APP_NYTIMES_API_KEY,
};

console.log("API_KEYS", API_KEYS);

const BASE_URLS = {
  newsAPI: "https://newsapi.org/v2",
  guardian: "https://content.guardianapis.com",
  nyTimes: "https://api.nytimes.com/svc/search/v2",
};

export const fetchArticlesBySearch = async (query, filters) => {
  const { date = "" } = filters;

  const searchQuery = query || "general";
  const endpoint = "everything";

  const url = `${BASE_URLS.newsAPI}/${endpoint}?q=${searchQuery}&apiKey=${API_KEYS.newsAPI}`;

  try {
    const response = await axios.get(url);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles by search query:", error.message);
    throw error;
  }
};
export const fetchArticlesByCategory = async (filters) => {
  const { category = "", country = "us" } = filters;

  if (!category) {
    console.error("Category is required to fetch category-specific articles.");
    return [];
  }

  const endpoint = "top-headlines";
  const url = `${BASE_URLS.newsAPI}/${endpoint}?country=${country}&category=${category}&apiKey=${API_KEYS.newsAPI}`;

  try {
    const response = await axios.get(url);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles by category:", error.message);
    throw error;
  }
};

export const fetchTopHeadlines = async () => {
  const endpoint = "top-headlines";

  const url = `${BASE_URLS.newsAPI}/${endpoint}?country=us&pageSize=30&apiKey=${API_KEYS.newsAPI}`;

  try {
    const response = await axios.get(url);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching top headlines:", error.message);
    throw error;
  }
};

export const fetchFromGuardian = async (query, filters) => {
  const { date = "" } = filters;
  const searchQuery = query || "news";
  const dateParam = date ? `&from-date=${date}` : "";

  const url = `${BASE_URLS.guardian}/search?q=${searchQuery}${dateParam}&api-key=${API_KEYS.guardian}`;
  try {
    const response = await axios.get(url);
    return response.data.response.results;
  } catch (error) {
    console.error("Error fetching articles from Guardian:", error.message);
    throw error;
  }
};

export const fetchFromNYTimes = async (query, filters) => {
  const { date = "" } = filters;
  const searchQuery = query || "news";
  const dateParam = date ? `&begin_date=${date.replace(/-/g, "")}` : "";

  const url = `${BASE_URLS.nyTimes}/articlesearch.json?q=${searchQuery}${dateParam}&api-key=${API_KEYS.nyTimes}`;
  try {
    const response = await axios.get(url);
    return response.data.response.docs;
  } catch (error) {
    console.error("Error fetching articles from NYTimes:", error.message);
    throw error;
  }
};
