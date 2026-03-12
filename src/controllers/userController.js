const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'user'
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!validPassword) {
      return res.status(400).json("Contraseña incorrecta");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "clave_secreta");

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json(error)
  }
};

module.exports = { registerUser, login };
