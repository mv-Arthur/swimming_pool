const uuid = require("uuid");

const ApiError = require("../error/ApiError");
const path = require("path");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");
const process = require("process");

const generateJwt = (userId, email, role, login) => {
  return jwt.sign({ id: userId, email, role, login }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const {
      user_name,
      surname,
      patronimyc,
      birthday,
      city,
      street,
      house,
      apartment,
      phone_number,
      email,
      login,
      password,
      role,
    } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    if (
      !user_name ||
      !surname ||
      !patronimyc ||
      !birthday ||
      !city ||
      !street ||
      !house ||
      !apartment ||
      !phone_number ||
      !email ||
      !login ||
      !password
    ) {
      return next(ApiError.badRequest("некорректный ввод полей"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("пользователь с таким email существует"));
    }
    const userLogin = await User.findOne({ where: { login } });
    if (userLogin) {
      return next(
        ApiError.badRequest("пользователь с таким логином уже существует")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      user_name,
      surname,
      patronimyc,
      birthday,
      city,
      street,
      house,
      apartment,
      phone_number,
      email,
      login,
      password: hashPassword,
      role,
      img: fileName,
    });
    const token = generateJwt(user.id, user.email, user.role, login);

    return res.json(user);
  }
  async login(req, res, next) {
    const { email, login, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const currentUser = await User.findOne({ where: { login: login } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    let compareLogin = bcrypt.compareSync(login, user.login);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный логин или пароль"));
    }

    const token = generateJwt(user.id, user.email, user.role, user.login);
    return res.json({
      login,
      password,
      token,
      currentUser,
    });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
