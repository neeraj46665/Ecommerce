const express = require("express");
require("dotenv").config({ path: "backend/config/config.env" });
const app = express();
const cookieParser = require("cookie-parser");
const errorhander = require("./utils/errorhander");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.all("*", (req, res, next) => {
  next(new errorhander(`Can't find ${req.originalUrl} on this server`, 404));
});

/** Global Error handling-Middleware */
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
