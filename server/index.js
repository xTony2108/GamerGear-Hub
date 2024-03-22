require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");

const helmet = require("helmet");
const cors = require("cors");
const db = require("./db");

const { SERVER_PORT } = process.env;

app.use(express.static(path.join(__dirname, "..", "/app")));

app.use(cors({ origin: "http://localhost:5173" }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @path /api
 */

app.use("/api", require("./api"));

db.connect();

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running on port ${SERVER_PORT}`);
});