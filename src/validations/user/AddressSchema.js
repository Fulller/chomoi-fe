import Joi from "joi";

const schema = Joi.object({
  province: Joi.string().required().messages({
    "any.required": "Tỉnh/Thành phố là bắt buộc",
    "string.empty": "Tỉnh/Thành phố không được để trống",
  }),

  district: Joi.string().required().messages({
    "any.required": "Quận/Huyện là bắt buộc",
    "string.empty": "Quận/Huyện không được để trống",
  }),

  ward: Joi.string().required().messages({
    "any.required": "Phường/Xã là bắt buộc",
    "string.empty": "Phường/Xã không được để trống",
  }),

  detail: Joi.string().min(5).required().messages({
    "any.required": "Địa chỉ chi tiết là bắt buộc",
    "string.empty": "Địa chỉ chi tiết không được để trống",
    "string.min": "Địa chỉ chi tiết phải có ít nhất 5 ký tự",
  }),
  isDefault: Joi.boolean().optional().messages({
    "boolean.base": "Giá trị của isDefault phải là boolean",
  }),
  receiverName: Joi.string().min(3).required().messages({
    "any.required": "Tên người nhận là bắt buộc",
    "string.empty": "Tên người nhận không được để trống",
    "string.min": "Tên người nhận phải có ít nhất 3 ký tự",
  }),

  receiverPhone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(10)
    .required()
    .messages({
      "any.required": "Số điện thoại là bắt buộc",
      "string.empty": "Số điện thoại không được để trống",
      "string.min": "Số điện thoại phải có ít nhất 10 chữ số",
      "string.max": "Số điện thoại chỉ được tối đa 10 chữ số",
      "string.pattern.base": "Số điện thoại chỉ được chứa các chữ số",
    }),
});

export default schema;
