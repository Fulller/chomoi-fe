import React, { useState } from "react";
import { Form, Field, SubmitButton, ErrorMessage } from "@components/Form";
import AuthService from "@services/auth.service";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import forgotPasswordStep1Schema from "@validations/forgotPasswordStep1Schema";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import HeaderForm from "../components/HeaderForm";

const ForgotPasswordStep1 = ({ onNext }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const getMessage = useMessageByApiCode();

  const handleSubmit = async ({ email }) => {
    const [result, error] = await AuthService.forgotPassword(email);
    if (error) {
      console.log({ error });
      setErrorMessage(getMessage(error.code));
      toast.error(getMessage(error.code), {
        autoClose: 3000,
      });
      return;
    }
    toast.error(getMessage(result.code), {
      autoClose: 3000,
    });
    onNext();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <HeaderForm>Quên mật khẩu</HeaderForm>
        <Form onSubmit={handleSubmit} schema={forgotPasswordStep1Schema}>
          <Field
            name="email"
            label="Email"
            type="email"
            placeholder="Nhập email"
          />
          <ErrorMessage message={errorMessage}></ErrorMessage>
          <SubmitButton loadingText="Đang xử lý yêu cầu...">
            Xác nhận
          </SubmitButton>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-4">
            <Link to="/home" className="text-indigo-500 hover:underline">
              Về trang chủ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordStep1;
