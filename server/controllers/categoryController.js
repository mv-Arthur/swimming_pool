const { ServiceCategory } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async create(req, res) {
    const { category_name } = req.body;
    const category = await ServiceCategory.create({ category_name });
    return res.json(category);
  }
  async getAll(req, res) {
    const categoryes = await ServiceCategory.findAll();
    return res.json(categoryes);
  }
}

module.exports = new CategoryController();
