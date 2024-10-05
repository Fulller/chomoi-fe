import React, { useState } from "react";
import Field from "./Field";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "./ErrorMessage";

const FormContext = React.createContext();

const Form = ({ children, schema, onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;

    const validationErrors = {};
    error.details.forEach((item) => {
      validationErrors[item.path[0]] = item.message;
    });

    return validationErrors;
  };

  const handleChange = (name, value) => {
    setErrors({
      ...errors,
      [name]: "",
    });
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validate();
    setErrors(validationErrors || {});

    if (!validationErrors) {
      await Promise.all([
        onSubmit(data),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
    }
    setLoading(false);
  };

  return (
    <FormContext.Provider value={{ data, errors, handleChange, loading }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export { FormContext, Form, Field, SubmitButton, ErrorMessage };
