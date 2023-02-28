const express = require("express");
const axios = require("axios");
const router = express.Router();

const GameController = require("../controller/GameController.js");

router.get("/api", GameController.healthcheck);
router.get("/api/game/code", GameController.getSecretCode);
router.get("/api/game/winningcode/:id", GameController.getWinningCode);
router.post("/api/game/guess", GameController.evaluateGuess);

module.exports = router;
