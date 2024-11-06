import React, { useEffect } from "react";
import { Input, Table, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import createProductSlice from "@redux/slices/product.create.slice";
import createProductSelecetor from "@redux/selector/product.create.selector";
import { debounce } from "lodash";
import Required from "@components/Required";

export default function SKUGenerator() {
  const { variations, skus } = useSelector(
    createProductSelecetor.getFields(["variations", "skus"])
  );
  const errors = useSelector(createProductSelecetor.getErrors());

  const dispatch = useDispatch();

  const handleSKUDataChange = debounce((index, field, value) => {
    dispatch(
      createProductSlice.actions.setErrorField({
        field: `skus.${index}.${field}`,
        value: null,
      })
    );
    dispatch(createProductSlice.actions.updateSku({ index, field, value }));
  }, 300);

  const generateCombinations = (variations) => {
    if (!variations.length) return [];
    const recursiveCombine = (currentIndex, currentCombination) => {
      if (currentIndex === variations.length) {
        return [currentCombination];
      }
      const options = variations[currentIndex].options;
      let combinations = [];
      options.forEach((option, optionIndex) => {
        combinations = combinations.concat(
          recursiveCombine(currentIndex + 1, [
            ...currentCombination,
            { name: variations[currentIndex].name, option, index: optionIndex },
          ])
        );
      });
      return combinations;
    };
    return recursiveCombine(0, []);
  };

  const columns = [
    ...variations.map((variation, variationIndex) => ({
      title: variation.name || `Phân loại ${variationIndex + 1}`,
      dataIndex: `variation_${variationIndex}`,
      key: `variation_${variationIndex}`,
      render: (text) => (
        <span>{typeof text === "object" ? JSON.stringify(text) : text}</span>
      ),
    })),
    {
      title: (
        <p className="sku-column">
          <Required></Required> Kho hàng
        </p>
      ),
      dataIndex: "stock",
      key: "stock",
      render: (text, record, index) => (
        <div>
          <Input
            defaultValue={0}
            min={0}
            onChange={(e) =>
              handleSKUDataChange(index, "stock", e.target.value)
            }
            placeholder="Kho hàng"
            type="number"
          />
          <p className="error-validate-message">
            {errors[`skus.${index}.stock`]}
          </p>
        </div>
      ),
    },
    {
      title: (
        <p className="sku-column">
          <Required></Required> Giá (VND)
        </p>
      ),
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => (
        <div>
          <Input
            min={0}
            defaultValue={0}
            onChange={(e) =>
              handleSKUDataChange(index, "price", e.target.value)
            }
            placeholder="Giá"
            type="number"
          />
          <p className="error-validate-message">
            {errors[`skus.${index}.price`]}
          </p>
        </div>
      ),
    },
    {
      title: (
        <p className="sku-column">
          <Required></Required> Trọng lượng (gram)
        </p>
      ),
      dataIndex: "Trọng lượng",
      key: "weight",
      render: (text, record, index) => (
        <div>
          <Input
            min={0}
            defaultValue={0}
            onChange={(e) =>
              handleSKUDataChange(index, "weight", e.target.value)
            }
            placeholder="Weight"
            type="number"
          />
          <p className="error-validate-message">
            {errors[`skus.${index}.weight`]}
          </p>
        </div>
      ),
    },
  ];

  const dataSource = generateCombinations(variations).map(
    (combination, index) => {
      const skuData = skus[index] || {};
      const rowData = combination.reduce(
        (acc, item, itemIndex) => ({
          ...acc,
          [`variation_${itemIndex}`]: item.option,
        }),
        {
          key: index,
          variation: combination.map((item) => item.index).join(" "),
          ...skuData,
        }
      );
      return rowData;
    }
  );

  useEffect(() => {
    dispatch(
      createProductSlice.actions.generateSkusFromVariations(
        generateCombinations(variations)
      )
    );
  }, [variations]);

  return (
    <div className="variations-skus-item ">
      <h5 className="title">Danh sách phân loại hàng</h5>
      <p className="m-2">
        * Chú ý: Những sản phẩm có số lượng tồn kho là 0 thì sẽ không được tạo
        phân loại hàng
      </p>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
}
