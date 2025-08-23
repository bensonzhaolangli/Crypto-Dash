import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";

// API endpoint: fetches top 10 coins by market cap in USD
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]); // store fetched coins
  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(null); // capture fetch errors
  const [limit, setLimit] = useState(10); // number of coins displayed
  const [filter, setFilter] = useState("");

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

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default App;
