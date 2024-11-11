import useProduct from "../.state/useProduct";
import productSchema from "../.state/productSchema";
import { message } from "antd";

function SubmitButton() {
  const { data, dispatch } = useProduct();

  function handleValidate() {
    const { error } = productSchema(data.productAttributes).validate(data, {
      abortEarly: false,
    });
    if (!error) return true;
    dispatch({ type: "ERROR/ALL/SET-EMPTY" });
    error.details.forEach(({ path, message }) => {
      const field = path.join(".");
      dispatch({
        type: "ERROR/FIELD/UPDATE",
        payload: { field, value: message },
      });
    });
    return false;
  }

  async function handleSubmit() {
    const isValid = handleValidate();
    if (!isValid) return;
    message.info("SUBMITED 👌");
  }

  return <div onClick={handleSubmit}>SubmitButton</div>;
}

export default SubmitButton;
