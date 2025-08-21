import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";

// API endpoint: fetches top 10 coins by market cap in USD
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]); // store fetched coins
  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(null); // capture fetch errors

  useEffect(() => {
    // Async function to fetch coin data
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false"`
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

    fetch(API_URL, {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_CG_KEY,
      },
      cache: "no-store", // avoid 304 cache issues
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch data (status ${res.status})`);
        return res.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}

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
