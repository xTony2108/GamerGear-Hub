const express = require("express");
const app = express.Router();

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/User");
const { verifyUserAuth } = require("../../middleware/verifyUserAuth");
const { validateRegister } = require("../../middleware/validateRegister");
const { validateLogin } = require("../../middleware/validateLogin");
const { SECRET_KEY } = process.env;

/**
 * @path /api/users/register
 */

app.post("/register", validateRegister, async (req, res) => {
  try {
    const user = await req.schema.validateAsync(req.body);

    user.email = user.email.toLowerCase();

    const comparePassword = user.password === user.confirmPassword;

    if (!comparePassword)
      return res
        .status(403)
        .json({ message: "Le password inserite non corrispondono!" });

    user.password = await bcrypt.hash(user.password, 12);

    const findUser = await User.findOne({ email: user.email }, "email", {
      lean: true,
    });

    if (findUser) {
      return res
        .status(403)
        .json({ message: "Indirizzo email già registrato" });
    }
    console.log(user, "USER");

    await User.create(user);

    return res
      .status(201)
      .json({ user, message: "Utente registrato con successo!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

app.post("/login", validateLogin, async (req, res) => {
  try {
    const data = await req.schema.validateAsync(req.body);

    data.email = data.email.toLowerCase();

    const user = await User.findOne(
      { email: data.email },
      "_id email password",
      {
        lean: true,
      }
    );

    if (!user) {
      return res.status(403).json({ message: "Credenziali errate!" });
    }

    const compare = await bcrypt.compare(data.password, user.password);

    if (!compare) {
      return res.status(403).json({ message: "Credenziali errate!" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
      expiresIn: data.remember ? "999y" : "5s",
    });

    return res.status(200).json({
      user: { email: user.email, id: user._id, token },
      message: "Login effettuato con successo!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

app.get("/me", verifyUserAuth, async (req, res) => {
  const { user } = req;
  try {
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = app;
