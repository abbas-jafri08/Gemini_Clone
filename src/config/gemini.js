// src/config/gemini.js
import axios from "axios";

// Free search/answer API (DuckDuckGo Instant Answer)
const API_URL = "https://api.duckduckgo.com/?format=json&no_redirect=1&no_html=1&q=";

async function runChat(prompt) {
  try {
    const url = API_URL + encodeURIComponent(prompt);
    const res = await axios.get(url, { timeout: 10000 });

    // DuckDuckGo returns multiple fields, prefer AbstractText
    const data = res.data;
    if (data.AbstractText && data.AbstractText.trim() !== "") {
      return data.AbstractText;
    }

    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      // Take first related topic with text
      const first = data.RelatedTopics[0];
      if (first.Text) return first.Text;
    }

    return "No direct answer found, please refine your search.";
  } catch (err) {
    console.error("Search API error:", err.message || err);
    return "Error: Could not fetch response.";
  }
}

export default runChat;
