const express = require("express");
const connection = require("../connection");
const router = express.Router();

router.post("/create", async (req, res, next) => {
  let product = req.body;
  let query = "insert into product (name,description,price) values (?,?,?)";
  await connection.query(
    query,
    [product.name, product.description, product.price],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Product added successfullty" });
      } else {
        return res.status(400).json(err);
      }
    }
  );
});

router.get("/all", async (req, res, next) => {
  let query = "select * from product";
  await connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({ data: results });
    } else {
      return res.status(400).json(err);
    }
  });
});

router.patch("/update/:id", async (req, res, next) => {
  const id = req.params.id;
  let product = req.body;
  let query = "update product set name=?,description=?,price=? where id=?";
  let getQuery = "select * from product where id=?";
  await connection.query(
    query,
    [product.name, product.description, product.price, id],
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Product id does not exist" });
        }
        connection.query(getQuery, [id], (err, results) => {
          if (!err) {
            return res.status(200).json({
              data: results,
              message: "Product has been updated successfullty"
            });
          }
        });
      } else {
        return res.status(400).json(err);
      }
    }
  );
});

router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  let query = "delete from product where id=?";
  await connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "Product id does not exist" });
      }
      return res.status(200).json({ message: "Product has been deleted" });
    } else {
      return res.status(400).json(err);
    }
  });
});
module.exports = router;
