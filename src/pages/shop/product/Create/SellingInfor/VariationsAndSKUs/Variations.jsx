import { Input, Upload, message } from "antd";
import { FiDelete } from "react-icons/fi";
import { CiCircleRemove } from "react-icons/ci";
import { PlusOutlined } from "@ant-design/icons";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import createProductSlice from "@redux/slices/product.create.slice";
import createProductSelecetor from "@redux/selector/product.create.selector";
import { debounce } from "lodash";

export default function Variations() {
  const variations = useSelector(createProductSelecetor.getField("variations"));
  const errors = useSelector(createProductSelecetor.getErrors());

  const dispatch = useDispatch();
  function handleAddVariation() {
    dispatch(createProductSlice.actions.addVariation());
  }
  function handleRemoveVariation(variationIndex) {
    dispatch(createProductSlice.actions.removeVariation({ variationIndex }));
  }
  const handleUpdateVariationName = debounce(
    (variationIndex, variationName) => {
      dispatch(
        createProductSlice.actions.updateVariationName({
          index: variationIndex,
          name: variationName,
        })
      );
    },
    300
  );

  const handleAddOption = (variationIndex) => {
    dispatch(createProductSlice.actions.addOptionToVariation(variationIndex));
  };

  const handleRemoveOption = (variationIndex, optionIndex) => {
    if (variations[variationIndex].options.length <= 1) {
      message.warning("Chỉ còn 1 tùy chọn cho phân loại này, không thể xóa ⛔");
      return;
    }
    dispatch(
      createProductSlice.actions.removeVariationOption({
        variationIndex,
        optionIndex,
      })
    );
  };

  const handleUpdateValueOption = debounce(function (
    variationIndex,
    optionIndex,
    value
  ) {
    dispatch(
      createProductSlice.actions.updateVariationOption({
        variationIndex,
        optionIndex,
        value,
      })
    );
  },
  300);

  const handleUpdateImageOption = debounce(function (
    variationIndex,
    optionIndex,
    value
  ) {
    dispatch(
      createProductSlice.actions.updateVariationOptionImage({
        variationIndex,
        optionIndex,
        value,
      })
    );
  },
  300);

  return (
    <div className="variations-skus-item">
      <h5 className="title">Phân loại hàng</h5>
      <div className="variations">
        {variations.map((variation, variationIndex) => {
          const variationKey = `variations.${variationIndex}.name`;
          const { name, options } = variation;
          const variationError = errors[variationKey];
          return (
            <div className="variation" key={variationKey}>
              <div className="variation-name">
                <span>Phân loại {variationIndex + 1}</span>
                <Input
                  type="text"
                  defaultValue={name}
                  onChange={({ target: { value } }) => {
                    dispatch(
                      createProductSlice.actions.setErrorField({
                        field: variationKey,
                        value: null,
                      })
                    );
                    handleUpdateVariationName(variationIndex, value);
                  }}
                  placeholder={`Nhập tên phân loại ${variationIndex + 1}`}
                />
                {variationError && (
                  <p className="error-validate-message">{variationError}</p>
                )}
              </div>
              <div className="options">
                <span>Các tùy chọn</span>
                {options.map((optionValue, optionIndex) => {
                  const optionKey = `variations.${variationIndex}.options.${optionIndex}`;
                  const optionImage = variation?.images?.[optionIndex];
                  const optionImageError =
                    errors[
                      `variations.${variationIndex}.images.${optionIndex}`
                    ];
                  const optionError = errors[optionKey];
                  return (
                    <div key={optionKey} className="wrap-option">
                      <div className="option">
                        <Input
                          type="text"
                          className="option-input"
                          defaultValue={optionValue}
                          onChange={({ target: { value } }) => {
                            dispatch(
                              createProductSlice.actions.setErrorField({
                                field: optionKey,
                                value: null,
                              })
                            );
                            handleUpdateValueOption(
                              variationIndex,
                              optionIndex,
                              value
                            );
                          }}
                          placeholder={`Nhập tùy chọn ${optionIndex + 1}`}
                        />
                        {variationIndex == 0 && (
                          <div className="option-image">
                            <Upload
                              className="form-item-content"
                              listType="picture-card"
                              accept="image/*"
                              maxCount={1}
                              fileList={
                                optionImage
                                  ? [{ url: optionImage, uid: "-1" }]
                                  : []
                              }
                              beforeUpload={() => false}
                              onChange={({ file, fileList }) => {
                                const newImage = fileList[0]
                                  ? fileList[0].thumbUrl ||
                                    URL.createObjectURL(
                                      fileList[0].originFileObj
                                    )
                                  : null;
                                handleUpdateImageOption(
                                  variationIndex,
                                  optionIndex,
                                  newImage
                                );
                              }}
                            >
                              {!optionImage && (
                                <div>
                                  <PlusOutlined />
                                  <div style={{ marginTop: 8 }}>Tải lên</div>
                                </div>
                              )}
                            </Upload>
                          </div>
                        )}
                        <Tooltip title="Xóa tùy chọn">
                          <CiCircleRemove
                            size={30}
                            className="delete-option-btn"
                            onClick={() =>
                              handleRemoveOption(variationIndex, optionIndex)
                            }
                          ></CiCircleRemove>
                        </Tooltip>
                      </div>

                      {optionError && (
                        <p className="error-validate-message">{optionError}</p>
                      )}
                      {optionImageError && (
                        <p className="error-validate-message">
                          {optionImageError}
                        </p>
                      )}
                    </div>
                  );
                })}
                <span>
                  <button
                    className="add-option"
                    disabled={options.length >= 10}
                    onClick={() => handleAddOption(variationIndex)}
                  >
                    <IoIosAddCircleOutline size={20} />
                    Thêm option
                  </button>
                </span>
              </div>
              <button onClick={() => handleRemoveVariation(variationIndex)}>
                <Tooltip title="Xóa phân loại">
                  <FiDelete
                    className="delete-varation-btn"
                    size={40}
                  ></FiDelete>
                </Tooltip>
              </button>
            </div>
          );
        })}
        {variations.length < 2 && (
          <span>
            <button
              className="add-variation"
              disabled={variations.length >= 2}
              onClick={handleAddVariation}
            >
              <IoIosAddCircleOutline size={20} /> Thêm phân loại
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
