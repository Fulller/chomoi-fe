import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(200)
    .required()
    .messages({
      'string.base': 'Tên phải là một chuỗi',
      'string.empty': 'Tên không được để trống',
      'string.min': 'Tên phải dài ít nhất 4 ký tự',
      'string.max': 'Tên phải có tối đa 200 ký tự',
      'any.required': 'Tên là bắt buộc',
    }),
  avatar: Joi.alternatives()
    .try(
      Joi.string().uri().required(), // Kiểm tra nếu là một URL hợp lệ
      Joi.object().instance(File).required() // Kiểm tra nếu là một đối tượng File
    )
    .messages({
      'string.base': 'Avatar phải là một chuỗi',
      'string.empty': 'Avatar không được để trống',
      'any.required': 'Avatar là bắt buộc',
      'object.base': 'Avatar phải là một file hợp lệ',
    }),

  coverImage: Joi.alternatives()
    .try(
      Joi.string().uri().required(), // Kiểm tra nếu là một URL hợp lệ
      Joi.object().instance(File).required() // Kiểm tra nếu là một đối tượng File
    )
    .messages({
      'string.base': 'Hình ảnh bìa phải là một chuỗi',
      'string.empty': 'Hình ảnh bìa không được để trống',
      'any.required': 'Hình ảnh bìa là bắt buộc',
      'object.base': 'Hình ảnh bìa phải là một file hợp lệ',
    }),
});

export default schema;
