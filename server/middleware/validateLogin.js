const Joi = require("joi");

const validateLogin = (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().messages({
        "any.required": "• Inserire un indirizzo email valido",
        "string.empty": "• Inserire un indirizzo email valido",
        "string.email": "• Inserire un indirizzo email valido",
      }),
      password: Joi.string().required().messages({
        "any.required": "• Inserire password",
        "string.empty": "• Inserire password",
      }),
      remember: Joi.bool(),
    });

    req.schema = schema;
    return next();
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

module.exports = { validateLogin };
