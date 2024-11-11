import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { CiEdit } from "react-icons/ci";
import CategoryService from "@services/category.service";
import useProduct from "../.state/useProduct";
import ErrorMessage from "../ErrorMessage";

const { Option } = Select;

const CategoryLevelSelector = ({ level, categories, value, onChange }) => {
  const options = categories.map((cat) => (
    <Option key={cat.id} value={cat.id}>
      {cat.name}
    </Option>
  ));

  return (
    <Select
      placeholder={`Chọn level ${level + 1}`}
      style={{ width: "100%" }}
      onChange={(value) => onChange(value, level)}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflowY: "auto" }}
    >
      {options}
    </Select>
  );
};

const CategorySelector = () => {
  const { dispatch } = useProduct();
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([
    null,
    null,
    null,
  ]);
  const [isLeafCategory, setIsLeafCategory] = useState(false);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const [result, error] = await CategoryService.getTree();
    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }
    setCategories(result.data);
  };

  const showModal = () => {
    setVisible(true);
    setSelectedCategories([null, null, null]);
    setSelectedCategoryNames([]);
    setIsLeafCategory(false);
  };

  const handleOk = () => {
    setVisible(false);
    // handeSelectLeafCategory(
    //   selectedCategories.reverse().find((c) => c != null),
    //   selectedCategoryNames
    // );
    dispatch({
      type: "FIELD/UPDATE",
      payload: {
        field: "categoryId",
        value: selectedCategories.reverse().find((c) => c != null),
      },
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCategoryChange = (value, level) => {
    const newSelectedCategories = [...selectedCategories];
    const newSelectedCategoryNames = [...selectedCategoryNames];
    newSelectedCategories[level] = value;
    newSelectedCategoryNames[level] = getCategoryNameById(value);

    for (let i = level + 1; i < selectedCategories.length; i++) {
      newSelectedCategories[i] = null;
      newSelectedCategoryNames[i] = null;
    }

    setSelectedCategories(newSelectedCategories);
    setSelectedCategoryNames(newSelectedCategoryNames);
    checkIfLeafCategory(value);
  };

  const checkIfLeafCategory = (categoryId) => {
    const category = findCategoryById(categoryId, categories);
    setIsLeafCategory(category ? category.isLeaf : false);
  };

  const findCategoryById = (id, categoryList) => {
    for (let category of categoryList) {
      if (category.id === id) return category;
      if (category.children) {
        const found = findCategoryById(id, category.children);
        if (found) return found;
      }
    }
    return null;
  };

  const getCategoryNameById = (id) => {
    const category = findCategoryById(id, categories);
    return category ? category.name : "";
  };

  const getOptions = (level) => {
    if (level === 0) {
      return categories.filter((cat) => cat.level === 1);
    }

    const parentCategoryId = selectedCategories[level - 1];
    const parentCategory = findCategoryById(parentCategoryId, categories);

    return parentCategory?.children || [];
  };

  return (
    <div>
      <div className="category-field" onClick={showModal}>
        <div>
          {isLeafCategory ? (
            <span className="category-field-selected">
              {selectedCategoryNames.filter(Boolean).join(" > ")}
            </span>
          ) : (
            <span className="category-field-unselected">Chọn nghành hàng</span>
          )}
        </div>
        <CiEdit size={20} className="category-field-icon" />
      </div>
      <Modal
        title="Chọn danh mục"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !isLeafCategory }}
        width={800}
      >
        <div style={{ display: "flex", justifyContent: "left" }}>
          {[0, 1, 2].map((level) => (
            <div
              key={level}
              style={{
                width: "30%",
                paddingRight: level < 2 ? 16 : 0,
                borderRight: level < 2 ? "1px solid #d9d9d9" : "none",
              }}
            >
              {level === 0 ||
              (selectedCategories[level - 1] && getOptions(level)?.length) ? (
                <CategoryLevelSelector
                  level={level}
                  categories={getOptions(level)}
                  value={selectedCategories[level]}
                  onChange={handleCategoryChange}
                />
              ) : null}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <strong>Danh mục đã chọn:</strong>{" "}
          {selectedCategoryNames.filter(Boolean).join(" > ") ||
            "Chưa có danh mục nào được chọn"}
          <ErrorMessage field="categoryId" />
        </div>
      </Modal>
    </div>
  );
};

export default CategorySelector;
