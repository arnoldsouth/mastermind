import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useApp } from '../context/appContext';

const Home = () => {
  // custom hook
  const { difficultyLevel, setDifficultyLevel } = useApp();
  const [gameStarted, setGameStarted] = useState(false);
  // const [difficultyLevel, setDifficultyLevel] = useState("easy");

  function handleStartGame() {
    setGameStarted(true);
  }

  function handleDifficultyChange(event) {
    setDifficultyLevel(event.target.value);
  }

  return (
    <div className="App">
      <div className="bebas-neue font-3rem margin-all">
        <a href="/">MASTERMIND</a>
      </div>

      <div className="bebas-neue font-1-25rem align-left margin-top-1rem margin-left-1rem">
        Game Rules
      </div>
      <div className="align-left margin-top-1rem margin-left-1rem">
        At the start of the game the computer will randomly select a pattern of
        four different numbers from a total of 8 different numbers
      </div>
      <div className="align-left margin-top-1rem margin-left-1rem">
        A player will have 10 attempts to guess the number combinations
      </div>
      <div className="align-left margin-top-1rem margin-left-1rem">
        At the end of each guess, computer will provide one of the following
        response as feedback:
      </div>
      <div className="align-left margin-left-1rem">
        - The player had guess a correct number
      </div>
      <div className="align-left margin-left-1rem">
        - The player had guessed a correct number and its correct location
      </div>
      <div className="align-left margin-left-1rem">
        - The player’s guess was incorrect
      </div>

      {!gameStarted && (
        <div className="margin-top-1rem">
          <label
            htmlFor="difficultyLevel"
            className="bebas-neue font-1-25rem margin-right-1rem"
          >
            Difficulty level:
          </label>
          <select
            id="difficultyLevel"
            value={difficultyLevel}
            onChange={handleDifficultyChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
            className="bebas-neue font-1rem margin-top-1rem padding-button"
            onClick={handleStartGame}
          >
            <Link className="button" to="/game">
              Start
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
