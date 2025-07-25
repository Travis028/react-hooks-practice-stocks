function Stock({ stock, onStockClick, isInPortfolio }) {
  const { ticker, name, price, type } = stock;

  const handleClick = () => {
    onStockClick(stock);
  };

  return (
    <div 
      className={`stock ${isInPortfolio ? 'in-portfolio' : ''}`} 
      onClick={handleClick}
    >
      <div className="stock-header">
        <h3>{ticker}</h3>
        <span className="price">${price.toFixed(2)}</span>
      </div>
      <p className="name">{name}</p>
      <p className="type">Type: {type}</p>
      <div className="action">
        {isInPortfolio ? 'Sell' : 'Buy'}
      </div>
    </div>
  );
}

export default Stock;