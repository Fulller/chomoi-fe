import createProductSelecetor from "@redux/selector/product.create.selector";
import createProductSlice from "@redux/slices/product.create.slice";
import { Input } from "antd";
import Required from "@components/Required";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import skuFields from "./fields";
import ".scss";

function Simple() {
  const errors = useSelector(createProductSelecetor.getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      createProductSlice.actions.updateSku({
        index: 0,
        field: "image",
        value: "temp",
      })
    );
  }, []);

  const handleSKUDataChange = debounce((index, field, value) => {
    dispatch(
      createProductSlice.actions.setErrorField({
        field: `skus.${index}.${field}`,
        value: null,
      })
    );
    dispatch(createProductSlice.actions.updateSku({ index, field, value }));
  }, 300);
  return (
    <div className="simple-sku">
      {skuFields.map(({ label, field }) => (
        <div key={`sku-${field}`} className="sku-field">
          <div className="sku-field-input">
            <label>
              <Required></Required>
              {label}
            </label>
            <Input
              defaultValue={0}
              min={0}
              onChange={(e) => handleSKUDataChange(0, field, e.target.value)}
              placeholder={`Nhập ${label}`}
              type="number"
            />
          </div>
          {errors[`skus.${0}.${field}`] && (
            <p className="error-validate-message">
              {errors[`skus.${0}.${field}`]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Simple;
