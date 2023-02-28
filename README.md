# Mastermind Game

This is a simple implementation of the classic **Mastermind** game using React and Express.

## Getting Started

To run the application, you will need to have Node.js installed on your machine. Clone this repository and navigate to the root directory.

### Frontend

1. cd `/frontend`
2. Install dependencies with `npm install`.
3. Run the frontend with `npm start`.
4. The application will be available at `http://localhost:3000`.

### Backend

1. cd `/backend`
2. Install dependencies with npm install.
3. Create (or copy and rename the `.env-sample`) a `.env` file and add a `PORT` and `MONGO_URI` variable to specify the port and database you want the server to run on.
4. Run the server with `npm run dev`.
5. The server will be available at `http://localhost:PORT`.

### Game Rules

The objective of the game is to guess a secret code consisting of a series of colored pegs. The default settings are 10 rounds and a 4-digit code.

To play the game, enter your guess in the input field and submit. The computer will evaluate your guess in the form of X and O symbols, count them, and then display the number of digits (if any) that are correct and in the correct location:

- **_X: a correct number in the correct position_**
- **_O: a correct number in the wrong position_**
- **_-: incorrect number_**

You have 10 attempts to guess the code correctly. If you guess the code correctly before you run out of attempts, you win the game. Otherwise, the game is over and you lose.

## Technologies Used

- React
- Express
- Axios
- Mongoose

## Codebase Overview

### Frontend

The `Game` component is the main component for the game. It handles user input, displays feedback, and updates the game state.

The `axios` library is used to make HTTP requests to the backend API.

### Backend

The `routes.js` file defines the API routes and their corresponding controllers.

The `GameController` defines methods for the `/api/game` routes. The `healthcheck` method is used to check if the API is working correctly. The `getSecretCode` method generates a secret code and saves it to the database. The `evaluateGuess` method evaluates a user's guess and returns feedback. The `getWinningCode` method returns the secret code to be displayed if the user loses the game.

The `Game` model defines the schema for the games collection in the database.

The `db.js` file connects to the MongoDB database using Mongoose.

The `util/index.js` file contains the generateSecretCode function, which generates a random 4-digit code.
