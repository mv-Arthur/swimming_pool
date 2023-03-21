const { Bid } = require("../models/models");

class BidController {
  async create(req, res) {
    const { serviceId, coachId, userId, serviceCategoryId, visiting_time } =
      req.body;
    const bid = await Bid.create({
      serviceId,
      coachId,
      userId,
      serviceCategoryId,
      visiting_time,
    });
    return res.json(bid);
  }
  async getAll(req, res) {
    const bids = await Bid.findAll();
    return res.json(bids);
  }
}

module.exports = new BidController();
