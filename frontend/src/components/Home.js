import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
  const [gameStarted, setGameStarted] = useState(false);

  function handleStartGame() {
    setGameStarted(true);
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
          <button
            className="bebas-neue font-1rem margin-top-1rem padding-button"
            onClick={handleStartGame}
          >
            <Link className="button" to="/game">
              {/* <Link className="button" to={`/game/${difficultyLevel}`}> */}
              Start
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
