import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Email là bắt buộc",
      "string.empty": "Email là bắt buộc",
      "string.email": "Email chưa đúng",
    }),
});

export default schema;
