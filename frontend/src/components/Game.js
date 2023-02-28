import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

function Game() {
  const [secretCodeId, setSecretCodeId] = useState([]);
  const [guess, setGuess] = useState("");
  const [guessHistory, setGuessHistory] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [feedback, setFeedback] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winningSecretCode, setWinningSecretCode] = useState([]);

  useEffect(() => {
    generateSecretCode();
  }, []);

  const generateSecretCode = async () => {
    try {
      const response = await axios.get("/api/game/code");
      setSecretCodeId(response.data.id);
      setGuessHistory([]);
      setRemainingGuesses(10);
      setFeedback([]);
      setGameOver(false);

      console.log({ secretCodeId: response.data.id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGuessInput = (event) => {
    setGuess(event.target.value.split("").map(Number));
  };

  const getSecretCode = async () => {
    const response = await axios.get(`/api/game/winningcode/${secretCodeId}`);
    console.log({ response });

    setWinningSecretCode(response.data.secretCode);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();

    if (validateGuess(guess)) {
      evaluateGuess(guess).then(async (feedback) => {
        setGuessHistory([...guessHistory, { guess, feedback }]);
        setFeedback(feedback);

        if (feedback.join("") === "XXXX") {
          setGameOver(true);
        } else {
          setRemainingGuesses(remainingGuesses - 1);
          if (remainingGuesses === 1) {
            await getSecretCode();
            setGameOver(true);
          }
        }
      });
    }
  };

  const validateGuess = (guess) => {
    if (guess.length !== 4) {
      return false;
    }
    for (const num of guess) {
      if (num < 0 || num > 7) {
        return false;
      }
    }
    return true;
  };

  const evaluateGuess = async (guess) => {
    try {
      const response = await axios.post("/api/game/guess", {
        guess,
        secretCodeId,
      });

      console.log({ feedback: response.data.feedback });
      return response.data.feedback;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleRestart = async () => {
    await generateSecretCode();
  };

  const handleNewGame = () => {
    window.location.reload();
  };

  const formatFeedback = (feedback) => {
    let numCorrectLocation = 0;
    let numCorrectNum = 0;

    for (let i = 0; i < feedback.length; i++) {
      if (feedback[i] === "X" && "O") {
        numCorrectLocation++;
        numCorrectNum++;
      } else if (feedback[i] === "X") {
        numCorrectLocation++;
      } else if (feedback[i] === "O") {
        numCorrectNum++;
      }
    }

    return `${numCorrectNum} correct numbers and ${numCorrectLocation} correct location.`;
  };

  return (
    <div className="App">
      <div className="bebas-neue font-3rem margin-all">
        <a href="/">MASTERMIND</a>
      </div>

      {!gameOver && (
        <>
          <div>
            <button
              className="bebas-neue font-1rem padding-button button"
              onClick={handleNewGame}
            >
              New Game{" "}
            </button>
          </div>

          <div className="bebas-neue font-1-25rem align-left margin-left-1rem">
            Note
          </div>

          <div className="align-left margin-left-1rem">
            The computer will generate random four digits from 0 to 7.
          </div>
        </>
      )}

      <br />

      {!gameOver && (
        <div>
          <div className="bebas-neue font-1-25rem margin-top-1rem margin-left-1rem">
            Enter Your Guess
          </div>

          <div className="margin-top-1rem margin-left-1rem">
            <form onSubmit={handleGuessSubmit}>
              <input
                className="quicksand padding-all input-box"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength="4"
                onChange={handleGuessInput}
              />
              <button
                className="bebas-neue font-1rem margin-all padding-button button"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>

          {feedback.length > 0 && (
            <div className="feedback-previous-guess">
              {formatFeedback(feedback)}
            </div>
          )}

          <br />

          <div className="bebas-neue font-1-25rem margin-top-1rem">
            Number of guesses remaining:{" "}
            <div className="quicksand font-3rem">{remainingGuesses}</div>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="bebas-neue font-2rem margin-top-1rem">
          <p>
            {feedback.join("") === "XXXX"
              ? "Congratulations, you won!"
              : `Game over. The secret code was ${winningSecretCode.join(" ")}`}
          </p>
          <button
            className="bebas-neue font-1rem margin-all padding-button button"
            onClick={handleRestart}
          >
            New Game
          </button>
        </div>
      )}

      <div className="border"></div>

      {guessHistory.length > 0 && (
        <div>
          <div className="bebas-neue font-2rem margin-top-1rem">
            Guess History
          </div>
          <div className="center margin-top-1rem">
            <table className="margin-top-1rem">
              <thead>
                <tr>
                  <th className="bebas-neue font-1-25rem feedback-header-guess">
                    Guess
                  </th>
                  <th className="bebas-neue font-1-25rem padding-left">
                    Feedback
                  </th>
                </tr>
              </thead>
              <tbody>
                {guessHistory.map((guess, index) => (
                  <tr key={index}>
                    <td className="feedback-header-guess">
                      {guess.guess.join(" ")}
                    </td>
                    <td className="padding-left">
                      {formatFeedback(guess.feedback)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
