const { Review } = require("../models/models");
const ApiError = require("../error/ApiError");

class ReviewController {
  async create(req, res) {
    const { body,userId } = req.body;
    const review = await Review.create({ body, userId});
    return res.json(review);
  }
  async getAll(req, res) {
    const types = await Review.findAll();
    return res.json(types);
  }
}

module.exports = new ReviewController();
