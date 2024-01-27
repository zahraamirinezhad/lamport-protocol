const express = require("express");
const db = require("./database");
const authRoute = require("./routes/auth");
const cors = require("cors");

const app = express();

db.authenticate()
  .then(() => {
    console.log("database connection successfull");
  })
  .catch((err) => {
    console.log("database connection unsuccessfull");
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);

// db.sync({ alter: true });

const port = 8800;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
