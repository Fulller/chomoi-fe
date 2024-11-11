import useProduct from "../.state/useProduct";

function ErrorMessage({ field }) {
  const {
    error: { [field]: errorMessage },
  } = useProduct();
  return <p className="error-validate-message">{errorMessage}</p>;
}

export default ErrorMessage;
