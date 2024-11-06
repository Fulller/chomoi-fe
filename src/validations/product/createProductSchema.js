import Joi from "joi";

function createProductSchema({ attributes }) {
  return Joi.object({
    name: Joi.string().min(10).max(1000).required().messages({
      "string.empty": "Tiêu đề sản phẩm là bắt buộc.",
      "string.min": "Tiêu đề sản phẩm phải có ít nhất 10 ký tự.",
      "string.max": "Tiêu đề sản phẩm không được vượt quá 1000 ký tự.",
      "any.required": "Tiêu đề sản phẩm là bắt buộc.",
    }),
    description: Joi.string().min(100).max(10000).required().messages({
      "string.empty": "Mô tả sản phẩm là bắt buộc.",
      "string.min": "Mô tả sản phẩm phải có ít nhất 100 ký tự.",
      "string.max": "Mô tả sản phẩm không được vượt quá 10000 ký tự.",
      "any.required": "Mô tả sản phẩm là bắt buộc.",
    }),
    thumbnail: Joi.string().required().messages({
      "any.required": "Ảnh đại diện sản phẩm là bắt buộc.",
      "any.invalid": "Ảnh đại diện sản phẩm không hợp lệ.",
    }),
    video: Joi.any(),
    categoryId: Joi.string().uuid().required().messages({
      "any.required": "Danh mục sản phẩm là bắt buộc.",
      "string.empty": "Danh mục sản phẩm là bắt buộc.",
      "string.guid": "ID danh mục không hợp lệ.",
    }),
    isSimple: Joi.boolean().required().messages({
      "any.required": "Loại sản phẩm là bắt buộc.",
    }),
    status: Joi.string().valid("DRAFT", "PENDING").required().messages({
      "any.only": "Trạng thái sản phẩm phải là DRAFT hoặc PENDING.",
      "any.required": "Trạng thái sản phẩm là bắt buộc.",
    }),
    variations: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required().messages({
            "string.empty": "Tên phân loại là bắt buộc.",
            "any.required": "Tên phân loại là bắt buộc.",
          }),
          options: Joi.array().items(Joi.string().required()).min(1).messages({
            "array.min": "Phân loại phải có ít nhất 1 tuỳ chọn.",
          }),
          images: Joi.array().items(Joi.string().required()).optional(),
        })
      )
      .default([])
      .optional(),
    skus: Joi.array()
      .items(
        Joi.object({
          stock: Joi.number().min(0).required().messages({
            "number.min": "Số lượng sản phẩm phải lớn hơn hoặc bằng 0.",
            "any.required": "Số lượng sản phẩm là bắt buộc.",
          }),
          price: Joi.alternatives().conditional("stock", {
            is: 0,
            then: Joi.optional(),
            otherwise: Joi.number().min(1).required().messages({
              "number.min": "Giá sản phẩm phải lớn hơn hoặc bằng 1.",
              "any.required": "Giá sản phẩm là bắt buộc.",
            }),
          }),
          weight: Joi.alternatives().conditional("stock", {
            is: 0,
            then: Joi.optional(),
            otherwise: Joi.number().min(1).required().messages({
              "number.min": "Khối lượng sản phẩm phải lớn hơn hoặc bằng 1.",
              "any.required": "Khối lượng sản phẩm là bắt buộc.",
            }),
          }),
          image: Joi.optional(),
          key: Joi.any(),
          variation: Joi.any(),
        }).required()
      )
      .min(1)
      .custom((items, helpers) => {
        const hasStockGreaterThanZero = items.some((item) => item.stock > 0);
        if (!hasStockGreaterThanZero) {
          return helpers.message(
            "Ít nhất một sản phẩm phải có số lượng lớn hơn 0."
          );
        }
        return items;
      })
      .required(),
    imagePaths: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .max(8)
      .required()
      .messages({
        "array.min": "Phải có ít nhất một hình ảnh.",
        "array.max": "Không được quá 8 hình ảnh.",
        "any.required": "Hình ảnh sản phẩm là bắt buộc.",
      }),
    productAttributes: Joi.array()
      .items(
        Joi.object({
          attributeId: Joi.string().uuid().required().messages({
            "any.required": "ID thuộc tính là bắt buộc.",
            "string.guid": "ID thuộc tính không hợp lệ.",
          }),
          value: Joi.alternatives().conditional(
            Joi.object().keys({ required: true }).required(),
            {
              then: Joi.string().required().messages({
                "any.required":
                  "Giá trị thuộc tính là bắt buộc khi thuộc tính yêu cầu.",
                "string.empty":
                  "Giá trị thuộc tính là bắt buộc khi thuộc tính yêu cầu.",
              }),
              otherwise: Joi.string().allow(null),
            }
          ),
        }).custom((value, helpers) => {
          const attribute = attributes.find(
            (attr) => attr.id === value.attributeId
          );
          if (attribute && attribute.required) {
            if (!value.value) {
              return helpers.error("any.required", {
                message:
                  "Giá trị cho thuộc tính " + attribute.name + " là bắt buộc.",
              });
            }
          }
          return value;
        })
      )
      .required()
      .min(1)
      .messages({
        "array.min": "Phải có ít nhất một thuộc tính sản phẩm.",
        "any.required": "Thuộc tính sản phẩm là bắt buộc.",
      }),
  });
}

export default createProductSchema;
