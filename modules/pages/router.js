const express = require("express");
const pageRouter = express.Router();
const products = require("../products/func");

pageRouter.get("/", async (request, response) => {
  product = await products.getProducts();
  comments = await products.getComments();
  response.render("index", { title: "Home", product: product,comment: comments});
});

pageRouter.get("/detail", async (request, response) => {
  if (request.query.linkId) {
    let id = request.query.linkId;
  productLink = await products.getSingleProducts(id);
  product = await products.getProducts();
  response.render("detail", { title: "Detail", getLink: productLink, product: product });
  }
});

pageRouter.get("/comment", async (request,response) => {
 comments = await products.getComments();
  response.render("comment", {title: "Comment", comment: comments});
});

// Admin FORM PROCESSING PATH

pageRouter.post("/comment/submit", async(request,response) => {
  // for POST data, retrieve field data  using request.body.
  // retrieve values form submitted POST form
  let fname = request.body.fname;
  let lname = request.body.lname;
  let comment = request.body.comment;
  let newComment = {
      "fname": fname,
      "lname": lname,
      "comment": comment
  };
  await products.addComment(newComment);
  response.redirect("/"); // redirect back to home page
})
module.exports = pageRouter;