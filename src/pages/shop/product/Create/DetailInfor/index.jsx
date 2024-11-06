import React, { useEffect, useState, memo } from "react";
import { Select, Input, Form, Button } from "antd";
import { FaStarOfLife } from "react-icons/fa";
const { Option } = Select;
import Required from "@components/Required";
import AttributeService from "@services/attribute.service";
import { useSelector, useDispatch } from "react-redux";
import createProductSelecetor from "@redux/selector/product.create.selector";
import createProductSlice from "@redux/slices/product.create.slice";
import { debounce } from "lodash";
import styles from "./DefailInfo.module.scss";

function DefailInfo() {
  const categoryId = useSelector(createProductSelecetor.getField("categoryId"));
  const dispatch = useDispatch();
  const errors = useSelector(createProductSelecetor.getErrors());

  const [attributes, setAttributes] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [newOptions, setNewOptions] = useState({});

  useEffect(() => {
    if (categoryId) {
      fetchAttributes();
    }
  }, [categoryId]);

  useEffect(() => {
    dispatch(
      createProductSlice.actions.setField({
        field: "productAttributes",
        value: Object.keys(selectedValues).map((key) => ({
          attributeId: key,
          value: selectedValues[key],
        })),
      })
    );
  }, [selectedValues]);

  async function fetchAttributes() {
    const [result, error] = await AttributeService.getAttributesByCategory(
      categoryId
    );
    if (error) return;

    setAttributes(result.data);

    const initialSelectedValues = result.data.reduce((acc, attr) => {
      acc[attr.id] = null;
      return acc;
    }, {});
    setSelectedValues(initialSelectedValues);
  }

  const handleAddOption = (attributeId) => {
    const newOption = newOptions[attributeId]?.trim();
    if (newOption) {
      setAttributes((prev) =>
        prev.map((attr) =>
          attr.id === attributeId
            ? {
                ...attr,
                options: [...attr.options, { id: newOption, value: newOption }],
              }
            : attr
        )
      );
      setNewOptions((prev) => ({ ...prev, [attributeId]: "" }));
    }
  };

  if (!categoryId) {
    return <div>Có thể thao tác sau khi ngọn ngành hàng</div>;
  }
  return (
    <Form className={styles.detailInfoContainer}>
      {attributes.map((attribute, attributeIndex) => (
        <div key={attribute.id}>
          <div className={styles.attributeItem}>
            <label className={styles.attributeLabel}>
              {attribute.required && <Required />}
              {attribute.name}
            </label>
            <div className={styles.attributeControl}>
              {attribute.options.length > 0 ? (
                <Select
                  placeholder={`Chọn ${attribute.name}`}
                  className="customSelect"
                  style={{ width: "100%" }}
                  value={selectedValues[attribute.id]}
                  onChange={(value) => {
                    dispatch(
                      createProductSlice.actions.setErrorField({
                        field: `productAttributes.${attributeIndex}`,
                        value: null,
                      })
                    );
                    setSelectedValues((prev) => ({
                      ...prev,
                      [attribute.id]: value,
                    }));
                  }}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      {attribute.isEnterByHand && (
                        <div className={styles.customOption}>
                          <Input
                            placeholder="Nhập tùy chọn mới"
                            defaultValue={newOptions[attribute.id] || ""}
                            onChange={debounce(
                              (e) =>
                                setNewOptions((prev) => ({
                                  ...prev,
                                  [attribute.id]: e.target.value,
                                })),
                              300
                            )}
                          />
                          <Button
                            type="primary"
                            onClick={() => {
                              handleAddOption(attribute.id);
                              setNewOptions((prev) => ({
                                ...prev,
                                [attribute.id]: "",
                              }));
                            }}
                          >
                            Thêm
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                >
                  {attribute.options.map((option) => (
                    <Option key={option.id} value={option.value}>
                      {option.value}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Input
                  placeholder={`Nhập ${attribute.name}`}
                  className="customInput"
                  onChange={(e) => {
                    dispatch(
                      createProductSlice.actions.setErrorField({
                        field: `productAttributes.${attributeIndex}`,
                        value: null,
                      })
                    );
                    debounce(
                      setSelectedValues((prev) => ({
                        ...prev,
                        [attribute.id]: e.target.value,
                      })),
                      300
                    );
                  }}
                />
              )}
            </div>
          </div>
          {errors[`productAttributes.${attributeIndex}`] && (
            <p className="error-validate-message">
              {errors[`productAttributes.${attributeIndex}`]}
            </p>
          )}
        </div>
      ))}
    </Form>
  );
}

export default memo(DefailInfo);
