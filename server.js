const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
connectDB();

// Routes Import
const list = require("./routes/list");
const task = require("./routes/task");

// Express configuration
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Uses the builted client html page (frontend)
app.use(express.static(path.join(__dirname, "client", "build")));

// API Routes
app.use("/api/v1/list", list);
app.use("/api/v1/task", task);

// if api is not being used then it use the client 
if (process.env.NODE_ENV === "production") {           
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server stlisted on port ${PORT}`));