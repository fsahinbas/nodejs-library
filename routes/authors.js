import express from "express";
import Author from "../models/author.js";
const router = express.Router();

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.render("authors/detail", { author });
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const result = await author.save();
    //res.redirect(`/authors/${author.id}`);
    res.redirect("/authors");
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

export default router;
