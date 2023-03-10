# Mastermind Game

This is a simple implementation of the classic **Mastermind** game using React and Express.

## Game Rules

The objective of the game is to guess a secret code.

To play the game, enter your guess in the input field and submit. The computer will evaluate your guess in the form of X and O symbols, count them, and then display the number of digits that are correct and/or in the correct location, if any.

You have 10 attempts to guess the code correctly. If you run out of guesses, the game is over and you lose.

## Features

- Difficulty levels of Easy, Medium, and Hard
- The computer generates a secret code consisting of 4 to 6 numbers based on the difficulty level
- The user has ten attempts to correctly guess the code
- After each guess, the computer provides feedback stating how many numbers were correct and/or how many numbers were in their correct location
- The application keeps track of how many attempts the user made before guessing the code
- The user can view the correct code after completing the game

## Getting Started

To run the application, you will need to have Node.js installed on your machine. Clone this repository and navigate to the respective frontend/backend directory.

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

## Technologies Used

### Frontend

- React
- Axios

### Backend

- Express
- Axios
- Mongoose

## Codebase Overview

### Frontend

The `Home.js` component is the landing page component where I wrote the game rules.

The `Game.js` component is the main component for the game. It handles user input, displays feedback, and updates the game state.

The `axios` library is used to make HTTP requests to the backend API.

When I revisited the application, I wanted to add the difficulty extension. However, I recognized that I was changing state within `Home.js` and needed to pass the selected difficulty in as a prop to `Game.js`. I chose to use React `context` because this is a lightweight application and I only needed to share one state across the app. This work can be found in the `/context` directory, where I created a custom hook for other components to use and wrapped the app inside of an `AppProvider`, allowing me to pass state across the app.

### Backend

I decided to go with a commonly-used pattern with routes and controller directories. If I had more time, I would have also added a database service inside of the `/database` directory to handle the Mongoose querying responsibilities in order to avoid performing those tasks inside of the controller. As separations of concerns practices go, that would organize the repo and make the code more readable, since each service is responsible for its own tasks.

The `routes.js` file defines the API routes and their corresponding controllers.

The `GameController` defines methods for the `/api/game` routes. The `healthcheck` method is used to check if the API is working correctly. The `getSecretCode` method generates a secret code and saves it to the database. The `evaluateGuess` method evaluates a user's guess and returns feedback. The `getWinningCode` method returns the secret code to be displayed if the user loses the game.

The `Game.js` model defines the schema for the games collection in the database.

The `db.js` file connects to the MongoDB database using Mongoose.

The `util/index.js` file contains the generateSecretCode function, which generates the random codes.

After properly handling state management on the frontend, I needed to pass the selected difficulty into the backend. I did so through params by editing the route to take a `:difficultLevel` param and changing the hardcoded 4-digit code random integer api call to dynamically generate anywhere from 4 to 6 digits, depending on the passed-in difficulty.

## API Endpoints

### GET /api

Returns a health check message to indicate that the server is running.

### GET /api/game/code/:difficultyLevel

Generates a secret code for the specified difficulty level and returns the ID of the corresponding game object in the database.

### POST /api/game/guess

Evaluates a guess made by the player and returns the feedback.

### GET /api/game/winningcode/:id

Returns the winning code for the specified game ID.

## Extensions Implemented

- Difficulty level option

#### Extensions I explored that didn't work out:

- A timer to measure how long a user has been playing and how long they've taken in between guesses
- User registration and login, so users can track leaderboard statistics
