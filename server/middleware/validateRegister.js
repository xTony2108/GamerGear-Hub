const Joi = require("joi");

const validateRegister = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required().messages({
        "any.required": "• Inserire nome",
        "string.empty": "• Inserire nome",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "• Inserire un indirizzo email valido",
        "string.empty": "• Inserire un indirizzo email valido",
        "string.email": "• Inserire un indirizzo email valido",
      }),
      password: Joi.string()
        .required()
        .pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
        )
        .messages({
          "any.required":
            "• La password deve contenere una lettera maiuscola, una minuscola, un numero e almeno 8 caratteri",
          "string.empty":
            "• La password deve contenere una lettera maiuscola, una minuscola, un numero e almeno 8 caratteri",
          "string.pattern.base":
            "• La password deve contenere una lettera maiuscola, una minuscola, un numero e almeno 8 caratteri",
        }),
      confirmPassword: Joi.string()
        .required()
        .pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
        )
        .messages({
          "any.required": "• Inserire conferma password",
          "string.empty": "• Inserire conferma password",
          "string.pattern.base":
            "• La password deve contenere una lettera maiuscola, una minuscola, un numero e almeno 8 caratteri",
        }),
      // country: Joi.string().required().messages({
      //   "any.required": "• Inserire paese",
      //   "string.empty": "• Inserire paese",
      // }),
      // address: Joi.string().required().messages({
      //   "any.required": "• Inserire un indirizzo valido",
      //   "string.empty": "• Inserire un indirizzo valido",
      // }),
      // civic: Joi.string().required().messages({
      //   "any.required": "• Inserire civico",
      //   "string.empty": "• Inserire civico",
      // }),
      // zipCode: Joi.string().required().min(5).messages({
      //   "any.required": "• Inserire cap valido",
      //   "string.empty": "• Inserire cap valido",
      //   "string.min": "• Inserire cap valido",
      // }),
      // phone: Joi.string()
      //   .required()
      //   .pattern(/^\+?(39|0039)?[ ]?[0-9]{2,4}[ ]?[0-9]{6,8}$/)
      //   .messages({
      //     "any.required": "• Inserire numero di cellulare valido",
      //     "string.empty": "• Inserire numero di cellulare valido",
      //     "string.pattern.base": "• Inserire numero di cellulare valido",
      //   }),
    });

    req.schema = schema;
    return next();
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

module.exports = { validateRegister };
