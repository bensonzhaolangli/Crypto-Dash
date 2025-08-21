import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";

// API endpoint: fetches top 10 coins by market cap in USD
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]); // store fetched coins
  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(null); // capture fetch errors
  const [limit, setLimit] = useState(10); // number of coins displayed

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
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}

      <div className="controls">
        <label htmlFor="limit">Show: </label>
        <select
          value={limit}
          id="limit"
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
