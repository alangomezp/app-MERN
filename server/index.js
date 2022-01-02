const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tasks", () => {
  console.log("Database Connected");
}); // database connection

app.set("port", process.env.PORT || 9000);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello to my server");
});
app.use("/api/tasks", require("./routes/tasks.routes"));

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
