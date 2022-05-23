const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));

app.use("/monster/img", express.static(path.join(__dirname, "monster", "img")));

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/monster", require("./routes/monster.routes"));

app.use("/api/groups", require("./routes/groups.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    );
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
}

start();
