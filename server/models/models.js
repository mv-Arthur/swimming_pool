const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  patronimyc: { type: DataTypes.STRING, allowNull: false },
  birthday: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING, allowNull: false },
  house: { type: DataTypes.INTEGER, allowNull: false },
  apartment: { type: DataTypes.INTEGER, allowNull: false },
  phone_number: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  login: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: false },
});

const Bid = sequelize.define("bid", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  visiting_time: { type: DataTypes.STRING, allowNull: false },
});

const Coach = sequelize.define("coach", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  coach_name: { type: DataTypes.STRING, allowNull: false },
  experience: { type: DataTypes.INTEGER },
  qualification: { type: DataTypes.STRING, allowNull: false },
  education: { type: DataTypes.STRING, allowNull: false },
  phone_number: { type: DataTypes.STRING, allowNull: false },
});

const Service = sequelize.define("service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  service_name: { type: DataTypes.STRING, allowNull: false },
  visit_qty: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

const ServiceCategory = sequelize.define("service_category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category_name: { type: DataTypes.STRING, allowNull: false },
});

const Review = sequelize.define("review", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  body: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Bid);
Bid.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Coach.hasMany(Bid);
Bid.belongsTo(Coach);

Service.hasMany(Bid);
Bid.belongsTo(Service);

ServiceCategory.hasMany(Service);
Service.belongsTo(ServiceCategory);

ServiceCategory.hasMany(Bid);
Bid.belongsTo(ServiceCategory);

module.exports = {
  User,
  Bid,
  Coach,
  Service,
  ServiceCategory,
  Review,
};
