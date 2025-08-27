import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  // Grab the dynamic segment from /coin/:id
  const { id } = useParams();

  // Local state for fetched coin, loading spinner, and error message
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch details for a single coin when 'id' changes
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch coin data");
        const data = await res.json();

        // Update state with the fetched coin object
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Hide loading spinner in both success & error paths
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to="/">← Back to Home</Link>

      {/* Title shows coin name/symbol once loaded */}
      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>

      {/* Loading & error states */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">❌ {error}</p>}

      {/* Main content: render only when we have data and no error */}
      {!loading && !error && coin && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en.split(". ")[0] + "."}</p>

          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>
              24h High: ${coin.market_data.high_24h.usd.toLocaleString()}
            </h4>
            <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}{" "}
              ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Circulating Supply:{" "}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{" "}
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </h4>
            <h4>
              Max Supply:{" "}
              {coin.market_data.max_supply?.toLocaleString() || "N/A"}
            </h4>
            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleString()}
            </h4>
          </div>

          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <p>
                🌐{" "}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                {" "}
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}
            {coin.categories.length > 0 && (
              <p>Categories: {coin.categories.join(", ")}</p>
            )}
          </div>
        </>
      )}

      {!loading && !error && !coin && <p>No data found.</p>}
    </div>
  );
};

export default CoinDetailsPage;
