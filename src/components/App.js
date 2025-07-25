import { useState, useEffect } from 'react';
import Stock from './Stock';

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then(res => res.json())
      .then(data => {
        setStocks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching stocks:", error);
        setLoading(false);
      });
  }, []);

  const buyStock = (stock) => {
    if (!portfolio.some(s => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const sellStock = (stock) => {
    setPortfolio(portfolio.filter(s => s.id !== stock.id));
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.ticker.localeCompare(b.ticker);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = sortedStocks.filter(stock => 
    filter === 'All' ? true : stock.type === filter
  );

  const stockTypes = ['All', ...new Set(stocks.map(stock => stock.type))];

  if (loading) {
    return <div>Loading stocks...</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Flatiron Stock Exchange</h1>
      </header>

      <div className="portfolio">
        <h2>My Portfolio</h2>
        {portfolio.length === 0 ? (
          <p>Your portfolio is empty. Buy some stocks!</p>
        ) : (
          <div className="stock-container">
            {portfolio.map(stock => (
              <Stock key={stock.id} stock={stock} onStockClick={sellStock} isInPortfolio={true} />
            ))}
          </div>
        )}
      </div>

      <div className="all-stocks">
        <div className="controls">
          <div className="sort-controls">
            <button onClick={() => setSortBy('alphabetical')}>Sort Alphabetically</button>
            <button onClick={() => setSortBy('price')}>Sort by Price</button>
            <button onClick={() => setSortBy(null)}>Reset Sorting</button>
          </div>
          
          <div className="filter-controls">
            <label htmlFor="type-filter">Filter by type:</label>
            <select 
              id="type-filter"
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              {stockTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <h2>All Stocks</h2>
        <div className="stock-container">
          {filteredStocks.map(stock => (
            <Stock 
              key={stock.id} 
              stock={stock} 
              onStockClick={buyStock} 
              isInPortfolio={portfolio.some(s => s.id === stock.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;