const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
 
  Category.findAll({
    include: [Product],
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.post("/", async (req, res) => {
   try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
    try {
    const categoryData = await Category.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
};
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((results) => {
      console.log(results);
      if (results === 0) {
        res.status(400).json({ message: "no changes made." });
      } else {
        res.json(results);
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
