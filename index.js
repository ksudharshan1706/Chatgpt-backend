const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

//routes path
const authRoute = require("./routes/authRoute");
const openaiRoute = require("./routes/openaiRoute");
dotenv.config();

//can create  REST object
const app = express();

//mongodb connection
connectDB();

//middleware
app.use(cors());
app.use(express.json()); //transfer json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);
const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/openai", openaiRoute);
app.use("/api/v1/openai", require("./routes/openaiRoute"));
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on PORT NO. ${PORT}`.bgCyan
      .white
  );
});
