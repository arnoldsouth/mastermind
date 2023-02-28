const axios = require("axios");

const { generateSecretCode } = require("../util/index");
const db = require("../database/db");

const Game = require("../models/Game");

const controller = {
  healthcheck: (req, res) => {
    res.status(200).send({ "health check": "good" });
  },

  getSecretCode: async (req, res) => {
    const { difficultyLevel } = req.params;
    console.log({ difficultyLevel });

    const code = await generateSecretCode(difficultyLevel);
    console.log({ secretCode: code });

    const game = new Game({ code });
    await game.save();
    Game.find({ code }, (err, result) => {
      if (err) {
        console.log("Error querying mongodb: ", err);
      } else {
        // console.log({ result });
        res.json({ id: result[0]._id });
      }
    });
  },

  evaluateGuess: async (req, res) => {
    const { guess, secretCodeId } = req.body;
    console.log({ guess, secretCodeId });

    Game.findById(secretCodeId, (err, result) => {
      if (err) {
        console.log("Error querying mongodb: ", err);
      } else {
        console.log({ result });
        const secretCode = result.code;
        const feedback = [];

        const usedIndexes = new Set();

        for (let i = 0; i < secretCode.length; i++) {
          if (guess[i] === secretCode[i]) {
            feedback.push("X");
            usedIndexes.add(i);
          }
        }

        for (let i = 0; i < secretCode.length; i++) {
          if (usedIndexes.has(i)) {
            continue;
          }

          const index = secretCode.indexOf(guess[i]);

          if (index >= 0 && !usedIndexes.has(index)) {
            feedback.push("O");
            usedIndexes.add(index);
          }
        }

        while (feedback.length < secretCode.length) {
          feedback.push("-");
        }

        res.json({ feedback });
      }
    });
  },

  getWinningCode: async (req, res) => {
    const { id } = req.params;
    console.log({ id });
    Game.findById(id, (err, winningresult) => {
      if (err) {
        console.log("Error querying winning code: ", err);
      } else {
        // console.log({ winningresult });
        res.json({ secretCode: winningresult.code });
      }
    });
  },
};

module.exports = controller;
