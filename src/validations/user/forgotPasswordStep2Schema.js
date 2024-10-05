import Joi from "joi";

const schema = Joi.object({
  code: Joi.string()
    .length(6) // Độ dài chính xác 6 ký tự
    .pattern(/^[0-9]+$/) // Chỉ cho phép các số
    .required()
    .messages({
      "any.required": "Mã xác thực là bắt buộc",
      "string.empty": "Mã xác thực là bắt buộc",
      "string.length": "Mã xác thực phải có 6 ký tự",
      "string.pattern.base": "Mã xác thực chỉ được chứa số",
    }),
  newPassword: Joi.string()
    .min(6) // Độ dài mật khẩu tối thiểu 6 ký tự
    .required()
    .messages({
      "any.required": "Mật khẩu mới là bắt buộc",
      "string.empty": "Mật khẩu mới là bắt buộc",
      "string.min": "Mật khẩu mới phải có ít nhất 6 ký tự",
    }),
  confirmNewPassword: Joi.string()
    .valid(Joi.ref("newPassword")) // Phải khớp với newPassword
    .required()
    .messages({
      "any.required": "Xác nhận mật khẩu mới là bắt buộc",
      "any.only": "Xác nhận mật khẩu mới không khớp",
      "string.empty": "Xác nhận mật khẩu mới là bắt buộc",
    }),
});

export default schema;
