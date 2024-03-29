import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import GameList from './components/GameList';
import gamesData from './data/gamesData'; // Importing the game data

function App() {
  const [list, setList] = useState([]);
  const [sortedAndFilteredGames, setSortedAndFilteredGames] = useState(gamesData);
  const [sortMethod, setSortMethod] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleAddToList = (gameToAdd) => {
    if (!list.some((game) => game.id === gameToAdd.id)) {
      setList([...list, gameToAdd]);
    }
  };

  useEffect(() => {
    let gamesCopy = [...gamesData];

    // Filter
    if (selectedGenres.length > 0) {
      gamesCopy = gamesCopy.filter(game => 
        game.genre.some(genre => selectedGenres.includes(genre))
      );
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
      case 'alphabetical':
        gamesCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setSortedAndFilteredGames(gamesCopy);
  }, [sortMethod, selectedGenres]);

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
          <div className="sorting-and-filtering">
            <select value={sortMethod} onChange={handleSortChange}>
              <option value="">Select sorting method</option>
              <option value="releaseDate">Release Date</option>
              <option value="price">Price</option>
              <option value="ignRating">IGN Score</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            <div className="filter-block">
              <h3>Filter by:</h3>
              {/* Filter options remain the same */}
              {['Action', 'Adventure', 'Strategy', 'Puzzle'].map(genre => (
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
          </div>
          <GameList games={sortedAndFilteredGames} onAddToList={handleAddToList} />
        </div>
        <div className="list-container">
          <h2>Your List</h2>
          <ul>
            {list.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;