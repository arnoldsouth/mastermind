const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  code: {
    type: [],
    required: true,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
