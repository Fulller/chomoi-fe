import React, { useState } from "react";
import { Form, Field, SubmitButton, ErrorMessage } from "@components/Form";
import AuthService from "@services/auth.service";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import forgotPasswordStep2Schema from "@validations/forgotPasswordStep2Schema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokens } from "@redux/slices/auth.slice";
import { Link } from "react-router-dom";
import HeaderForm from "../components/HeaderForm";

const ForgotPasswordStep2 = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const getMessage = useMessageByApiCode();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async ({ code, newPassword }) => {
    const [result, error] = await AuthService.forgotPasswordVerify({
      code,
      newPassword,
    });
    if (error) {
      setErrorMessage(getMessage(error.code));
      toast.error(getMessage(error.code), {
        autoClose: 3000,
      });
      return;
    }
    dispatch(setTokens(result.data));
    toast.success(getMessage(result.code), {
      autoClose: 3000,
    });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <HeaderForm>Quên mật khẩu</HeaderForm>
        <Form onSubmit={handleSubmit} schema={forgotPasswordStep2Schema}>
          <Field
            name="code"
            label="Code"
            type="number"
            placeholder="Nhập Code"
          />
          <Field
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            placeholder="Nhập mật khẩu mới"
          />
          <Field
            name="confirmNewPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            placeholder="Nhập lại mật khẩu mới"
          />
          <ErrorMessage message={errorMessage}></ErrorMessage>
          <SubmitButton loadingText="Đang xử lý yêu cầu...">
            Xác nhận đổi mật khẩu
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

export default ForgotPasswordStep2;
