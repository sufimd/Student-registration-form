const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_URL;

console.log;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.log("Error connecting to DB: " + err.message);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
