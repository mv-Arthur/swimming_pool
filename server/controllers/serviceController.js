const { Service } = require("../models/models");
const ApiError = require("../error/ApiError");

class ServiceController {
  async create(req, res) {
    
      const { service_name, visit_qty, price,serviceCategoryId } = req.body;
      const service = await Service.create({ service_name, visit_qty, price,serviceCategoryId });
      return res.json(service);
    
  }
  async getAll(req, res) {
    const types = await Service.findAll();
    return res.json(types);
  }

  async delete(req,res) {
    const deletes = await Service.destroy({where:{}});
    return res.json(deletes)
  }
}

module.exports = new ServiceController();
