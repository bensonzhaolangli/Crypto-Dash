import { useState, useEffect } from "react";
import HomePage from "./pages/home";
import { Routes, Route } from "react-router";
import AboutPage from "./pages/about";

// API endpoint: fetches top 10 coins by market cap in USD
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]); // store fetched coins
  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(null); // capture fetch errors
  const [limit, setLimit] = useState(10); // number of coins displayed
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    // Async function to fetch coin data
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false"`
        );
        if (!res.ok) throw new Error("failed to fetch data");
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            coins={coins}
            filter={filter}
            setFilter={setFilter}
            limit={limit}
            setLimit={setLimit}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            error={error}
          />
        }
      />
      <Route path="/about" element={<AboutPage />} /> 
    </Routes>
  );
};

export default App;
