const { Coach } = require("../models/models");

class CoachController {
  async post(req, res) {
    const { coach_name, experience, qualification, education, phone_number } =
      req.body;
    const coach = await Coach.create({
      coach_name,
      experience,
      qualification,
      education,
      phone_number,
    });
    return res.json(coach);
  }
  async getAll(req, res) {
    const coachs = await Coach.findAll();
    return res.json(coachs);
  }
}

module.exports = new CoachController();
