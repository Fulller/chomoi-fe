import React, { useContext } from "react";
import { FormContext } from "./index";

const SubmitButton = ({ children, loadingText }) => {
  const { loading } = useContext(FormContext);
  return (
    <button
      type="submit"
      className={`w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      {loading ? loadingText || "Đang xử lý..." : children}
    </button>
  );
};

export default SubmitButton;
