import axios from "axios";

const API_KEYS = {
  newsAPI: process.env.REACT_APP_NEWS_API_KEY,
  guardian: process.env.REACT_APP_GUARDIAN_API_KEY,
  nyTimes: process.env.REACT_APP_NYTIMES_API_KEY,
};

const BASE_URLS = {
  newsAPI: "https://gnews.io/api/v4",
  guardian: "https://content.guardianapis.com",
  nyTimes: "https://api.nytimes.com/svc/search/v2",
};
export const fetchArticlesBySearch = async (query, filters) => {
  const { date = "" } = filters;

  const searchQuery = query || "general";
  const endpoint = "search";
  const url = `${BASE_URLS.newsAPI}/${endpoint}?q=${searchQuery}&apikey=${API_KEYS.newsAPI}`;

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
  const url = `${BASE_URLS.newsAPI}/${endpoint}?category=${category}&country=${country}&apikey=${API_KEYS.newsAPI}`;

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
  const url = `${BASE_URLS.newsAPI}/${endpoint}?category=general&lang=en&country=in&max=30&apikey=${API_KEYS.newsAPI}`;

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
    return response.data.response.results.map((article) => ({
      title: article.webTitle,
      url: article.webUrl,
      source: "Guardian",
      publishedAt: article.webPublicationDate,
    }));
  } catch (error) {
    console.error("Error fetching articles from Guardian:", error.message);
    return [];
  }
};

// Fetch articles from NYTimes API
export const fetchFromNYTimes = async (query, filters) => {
  const { date = "" } = filters;
  const searchQuery = query || "news";
  const dateParam = date ? `&begin_date=${date.replace(/-/g, "")}` : "";

  const url = `${BASE_URLS.nyTimes}/articlesearch.json?q=${searchQuery}${dateParam}&api-key=${API_KEYS.nyTimes}`;
  try {
    const response = await axios.get(url);
    return response.data.response.docs.map((article) => ({
      title: article.headline.main,
      url: article.web_url,
      source: "NYTimes",
      publishedAt: article.pub_date,
    }));
  } catch (error) {
    console.error("Error fetching articles from NYTimes:", error.message);
    return [];
  }
};

// Aggregate results from Guardian and NYTimes
export const fetchAggregatedArticles = async (query, filters) => {
  try {
    const [newsapi, guardianArticles, nyTimesArticles] = await Promise.all([
      fetchFromGuardian(query, filters),
      fetchFromNYTimes(query, filters),
      fetchArticlesBySearch(query, filters),
    ]);
    return [...newsapi, ...guardianArticles, ...nyTimesArticles];
  } catch (error) {
    console.error("Error aggregating articles:", error.message);
    throw error;
  }
};
