const axios = require("axios");

async function generateSecretCode(difficultyLevel) {
  let number;

  if (difficultyLevel === "easy") {
    number = 4;
  }
  if (difficultyLevel === "medium") {
    number = 5;
  }
  if (difficultyLevel === "hard") {
    number = 6;
  }

  const response = await axios.get("https://www.random.org/integers/", {
    params: {
      num: number,
      min: 0,
      max: 7,
      col: 1,
      base: 10,
      format: "plain",
      rnd: "new",
    },
  });
  const secretCode = response.data
    .trim()
    .replace(/\n/g, "")
    .split("")
    .map((d) => parseInt(d));

  return secretCode;
}

module.exports = { generateSecretCode };
