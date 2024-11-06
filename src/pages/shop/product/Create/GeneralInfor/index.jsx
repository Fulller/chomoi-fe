import React, { memo } from "react";
import { Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import Required from "@components/Required";
import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
import createProductSlice from "@redux/slices/product.create.slice";
import createProductSelector from "@redux/selector/product.create.selector";
import { debounce } from "lodash";
import "./GeneralInfo.scss";

function GeneralInfo() {
  const dispatch = useDispatch();

  const { name, description, thumbnail, video, imagePaths } = useSelector(
    createProductSelector.getFields([
      "name",
      "description",
      "thumbnail",
      "video",
      "imagePaths",
    ])
  );
  const errors = useSelector(
    createProductSelector.getErrorFields([
      "name",
      "description",
      "thumbnail",
      "video",
      "imagePaths",
      "categoryId",
    ])
  );

  const handleNameChange = debounce(({ target: { value } }) => {
    dispatch(createProductSlice.actions.setField({ field: "name", value }));
  }, 300);

  const handleDescriptionChange = debounce(({ target: { value } }) => {
    dispatch(
      createProductSlice.actions.setField({ field: "description", value })
    );
  }, 300);

  const handleCategoryChange = (categorySelectedId, categoryLevelLabel) => {
    dispatch(
      createProductSlice.actions.setField({
        field: "categoryId",
        value: categorySelectedId,
      })
    );
  };

  const handleThumbnailChange = (file) => {
    const fileUrl = file ? URL.createObjectURL(file) : null;
    dispatch(
      createProductSlice.actions.setField({
        field: "thumbnail",
        value: fileUrl,
      })
    );
  };

  const handleVideoChange = (file) => {
    const fileUrl = file ? URL.createObjectURL(file) : null;
    dispatch(
      createProductSlice.actions.setField({
        field: "video",
        value: fileUrl,
      })
    );
  };

  const handleImagesChange = (fileList) => {
    const fileUrls = fileList
      .map((file) =>
        file.originFileObj ? URL.createObjectURL(file.originFileObj) : null
      )
      .filter(Boolean);

    dispatch(
      createProductSlice.actions.setField({
        field: "imagePaths",
        value: fileUrls,
      })
    );
  };

  return (
    <div className="general-info">
      <div className="form-item">
        <div className="form-item-main">
          <label className="form-item-label">
            <Required></Required> <span>Tiêu đề</span>
          </label>
          <Input
            className="form-item-content"
            defaultValue={name}
            onChange={handleNameChange}
            placeholder="Nhập tiêu đề sản phẩm"
          />
        </div>
        <p className="error-validate-message">{errors.name}</p>
      </div>
      <div className="form-item">
        <div className="form-item-main">
          <label className="form-item-label">
            <Required></Required>
            <span>Mô tả chi tiết</span>
          </label>
          <TextArea
            className="form-item-content"
            defaultValue={description}
            onChange={handleDescriptionChange}
            rows={4}
            placeholder="Nhập mô tả chi tiết, ít nhất 100 ký tự"
          />
        </div>
        <p className="error-validate-message">{errors.description}</p>
      </div>
      <div className="form-item">
        <div className="form-item-main">
          <label className="form-item-label">
            <Required></Required> <span>Danh mục sản phẩm</span>
          </label>
          <Category
            className="form-item-content category"
            onSelect={handleCategoryChange}
          ></Category>
        </div>
        <p className="error-validate-message">{errors.categoryId}</p>
      </div>
      <div className="form-item">
        <div className="form-item-main">
          <label className="form-item-label">
            <Required></Required> <span>Ảnh bìa</span>
          </label>
          <Upload
            listType="picture-card"
            accept="image/*"
            maxCount={1}
            beforeUpload={() => false}
            onChange={({ file, fileList }) => {
              handleThumbnailChange(fileList.length === 0 ? null : file);
            }}
          >
            {!thumbnail && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        </div>
        <p className="error-validate-message">{errors.thumbnail}</p>
      </div>
      <div className="form-item">
        <div className="form-item-main">
          <label className="form-item-label">
            <span>Video</span>
          </label>
          <Upload
            listType="picture-card"
            accept="video/*"
            maxCount={1}
            beforeUpload={() => false}
            onChange={({ file, fileList }) => {
              handleVideoChange(fileList.length === 0 ? null : file);
            }}
          >
            {!video && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        </div>
        <p className="error-validate-message">{errors.video}</p>
      </div>
      <div className="form-item">
        <div className="form-item-main">
          <label className="form-item-label">
            <Required></Required> <span>Hình ảnh</span>
          </label>
          <Upload
            className="form-item-content"
            listType="picture-card"
            accept="image/*"
            onChange={({ fileList }) => handleImagesChange(fileList)}
            beforeUpload={() => false}
            multiple={true}
            maxCount={8}
          >
            {imagePaths.length < 8 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        </div>
        <p className="error-validate-message">{errors.imagePaths}</p>
      </div>
    </div>
  );
}

export default memo(GeneralInfo);
