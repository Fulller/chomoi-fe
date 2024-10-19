import Joi from "joi";

const schema = Joi.object({
  currentPassword: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": "Mật khẩu hiện tại là bắt buộc",
      "string.empty": "Mật khẩu hiện tại là bắt buộc.",
      "string.min": "Mật khẩu hiện tại phải có ít nhất 6 ký tự",
    }),
  newPassword: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": "Mật khẩu mới là bắt buộc",
      "string.empty": "Mật khẩu mới là bắt buộc.",
      "string.min": "Mật khẩu mới phải có ít nhất 6 ký tự",
    }),
});

export default schema;