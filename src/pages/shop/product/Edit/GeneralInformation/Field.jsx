import { Input } from "antd";
import useProduct from "../.state/useProduct";
import { debounce } from "lodash";
import ErrorMessage from "../ErrorMessage";
import { useEffect, useState, useCallback } from "react";
import Required from "@components/Required";
import TextArea from "antd/es/input/TextArea";

function Field({ name, label, required, ...inputProps }) {
  const {
    data: { [name]: defaultValue },
    dispatch,
  } = useProduct();
  const [value, setValue] = useState(defaultValue);

  const debouncedDispatch = useCallback(
    debounce((value) => {
      dispatch({
        type: "FIELD/UPDATE",
        payload: { field: name, value },
      });
    }, 300),
    [dispatch, name]
  );

  useEffect(() => {
    debouncedDispatch(value);
  }, [value, debouncedDispatch]);

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div>
      <div>
        {required && <Required />}
        <label>{label}</label>
        {inputProps.type == "text-area" ? (
          <TextArea value={value} onChange={handleChange} {...inputProps} />
        ) : (
          <Input value={value} onChange={handleChange} {...inputProps} />
        )}
      </div>
      <ErrorMessage field={name} />
    </div>
  );
}
export default Field;
