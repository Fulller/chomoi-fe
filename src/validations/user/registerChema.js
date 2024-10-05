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
  password: Joi.string().min(6).required().messages({
    "any.required": "Mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
  }),
});

export default schema;
