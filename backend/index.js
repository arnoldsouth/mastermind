const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./.env" });
const axios = require("axios");
const db = require("./database/db");
const routes = require("./routes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", routes);

db();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
