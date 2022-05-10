const express = require("express");
const connection = require("./connection");
const productRoute = require("./routes/product");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.send("CRUD Api using sql and node");
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
