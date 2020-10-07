import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

import Coin from "./Coin";

function App() {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		Axios.get(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
		)
			.then((res) => {
				setCoins(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="coin-app">
			<div className="coin-search">
				<h1 className="coin-text">Search a currency</h1>
				<form>
					<input
						type="text"
						className="coin-input"
						placeholder="What cryptocurrency are you looking for?"
						onChange={handleSearch}
					/>
				</form>
			</div>
			{filteredCoins.map((coin) => {
				return (
					<Coin
						key={coin.id}
						name={coin.name}
						price={coin.currentPrice}
						symbol={coin.symbol}
						marketcap={coin.market_cap}
						volume={coin.total_volume}
						image={coin.image}
						priceChange={coin.price_change_percentage_24h}
					/>
				);
			})}
		</div>
	);
}

export default App;
