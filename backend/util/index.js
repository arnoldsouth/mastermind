const axios = require("axios");

async function generateSecretCode() {
  const response = await axios.get("https://www.random.org/integers/", {
    params: {
      num: 4,
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
