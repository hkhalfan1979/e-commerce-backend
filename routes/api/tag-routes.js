const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const categoryData = await Tag.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const categoryData = await Tag.update(req.body, {
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
  // delete on tag by its `id` value
  Tag.destroy({
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
