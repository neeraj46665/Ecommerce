const express = require("express");
require("dotenv").config({ path: "backend/config/config.env" });
const app = express();
const errorhander = require("./utils/errorhander");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
//Route imports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

app.all("*", (req, res, next) => {
  next(new errorhander(`Can't find ${req.originalUrl} on this server`, 404));
});

/** Global Error handling-Middleware */
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
