import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import GameList from './components/GameList';
import gamesData from './data/gamesData'; // Importing the game data

function App() {
  const [list, setList] = useState([]);
  const [sortedAndFilteredGames, setSortedAndFilteredGames] = useState(gamesData);
  const [sortMethod, setSortMethod] = useState('alphabetical');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [listTitle, setListTitle] = useState('Favorite Games');
  const [isRenaming, setIsRenaming] = useState(false);

  const handleAddToList = (gameToAdd) => {
    if (!list.some((game) => game.id === gameToAdd.id)) {
      setList([...list, gameToAdd]);
    }
  };

  const handleRemoveFromList = (gameToRemove) => {
    setList(list.filter(game => game.id !== gameToRemove.id));
  };

  const handleResetList = () => {
    setList([]); // Clears the list
  };

  const resetFiltersAndSorting = () => {
    setSelectedGenres([]);
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setSortMethod('alphabetical'); // Set sorting back to default
  };

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  useEffect(() => {
    let gamesCopy = [...gamesData];

    // Filter
    if (selectedGenres.length > 0) {
      gamesCopy = gamesCopy.filter(game =>
        selectedGenres.every(selectedGenre => game.genre.includes(selectedGenre))
      );
    }

    if (minPrice !== '') {
      gamesCopy = gamesCopy.filter(game => parseFloat(game.price.substring(1)) >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      gamesCopy = gamesCopy.filter(game => parseFloat(game.price.substring(1)) <= parseFloat(maxPrice));
    }

    if (minRating !== '') {
      gamesCopy = gamesCopy.filter(game => parseFloat(game.ignRating) >= parseFloat(minRating));
    }

    // Sort
    switch (sortMethod) {
      case 'releaseDate':
        gamesCopy.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        break;
      case 'price':
        gamesCopy.sort((a, b) => parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1)));
        break;
      case 'ignRating':
        gamesCopy.sort((a, b) => b.ignRating - a.ignRating);
        break;
      case 'alphabetical': // This is now the default case
      default:
        gamesCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setSortedAndFilteredGames(gamesCopy);
  }, [sortMethod, selectedGenres, minPrice, maxPrice, minRating]);

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres(selectedGenres.includes(genre) 
      ? selectedGenres.filter(g => g !== genre) 
      : [...selectedGenres, genre]);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>Build Your Game List</h1>
      </div>
      <div className="content">
        <div className="left-content">
          <div className="sorting-filtering-container">
            <div className="sorting-filtering-header">
              <h3>Sort by:</h3>
              <button onClick={resetFiltersAndSorting} className="button reset-filters-btn">Reset</button>
            </div>
            <select value={sortMethod} className="form-control select" onChange={handleSortChange}>
              <option value="alphabetical">Alphabetical</option>
              <option value="releaseDate">Release Date</option>
              <option value="price">Price</option>
              <option value="ignRating">IGN Rating</option>
            </select>
            <h3>Filter by:</h3>
            <div className="custom-checkbox">
              {['Action', 'Adventure', 'Battle Royale', 'Hero Shooter', 'Multiplayer', 'Platform', 'Sandbox', 'Simulation', 'Strategy', 'Survival'].map(genre => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                  {genre}
                </label>
              ))}
            </div>
            <div className="filters-row">
              <div className="filter-group">
                <label htmlFor="minPrice" className="filter-label">Min Price</label>
                <input
                  id="minPrice"
                  type="number"
                  placeholder="Min"
                  className="form-control filter-input"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label htmlFor="maxPrice" className="filter-label">Max Price</label>
                <input
                  id="maxPrice"
                  type="number"
                  placeholder="Max"
                  className="form-control filter-input"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label htmlFor="minRating" className="filter-label">Min IGN Rating</label>
                <input
                  id="minRating"
                  type="number"
                  placeholder="Rating"
                  className="form-control filter-input"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                />
              </div>
            </div>
          </div>
          <GameList games={sortedAndFilteredGames} onAddToList={handleAddToList} onRemoveFromList={handleRemoveFromList} list={list} />
        </div>
        <div className="list-container">
          <div className="list-header">
            <h2>{listTitle}</h2>
            {isRenaming && ( // Only show the button if there are items in the list
              <input 
                type="text" 
                value={listTitle} 
                onChange={(e) => setListTitle(e.target.value)} 
                onBlur={() => setIsRenaming(false)}
                autoFocus
                className="list-title-input"
              />
            )}
           
            <button onClick={() => setIsRenaming(!isRenaming)} className="rename-list-btn button">
              {isRenaming ? "Done" : "Rename"}
            </button>
          </div>
          {list.length > 0 ? (
            <ul>
              {list.map((game) => (
                <li key={game.id}>{game.name}</li>
              ))}
            </ul>
          ) : (
            <div className="empty-list-reminder">
              <p>Your list is empty.</p>
            </div>
          )}
          {list.length > 0 && ( // Only show the button if there are items in the list
            <button onClick={handleShareClick} className="share-button button">Share</button>
          )}
          {isShareModalOpen && (
            <div className="share-modal">
              <h2>{listTitle}</h2>
              <p>Take a screenshot and share it with your friends!</p>
              <div className="game-images">
                {list.map(game => (
                  <img key={game.id} src={game.imageUrl} alt={game.name} />
                ))}
              </div>
              <button onClick={() => setIsShareModalOpen(false)} className='button'>Close</button>
            </div>
          )}
          {list.length > 0 && ( // Only show the button if there are items in the list
            <button onClick={handleResetList} className="reset-list-btn button">Reset</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;