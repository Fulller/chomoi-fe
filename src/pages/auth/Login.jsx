import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link để điều hướng
import { Form, Field, SubmitButton, ErrorMessage } from "@components/Form";
import HeaderForm from "./components/HeaderForm";
import loginSchema from "@validations/loginSchema";
import AuthService from "@services/auth.service";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "@redux/slices/auth.slice";
import { SERVER_URL } from "@configs/const.config";
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState();
  const getMessage = useMessageByApiCode();
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.auth.redirect);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const [result, error] = await AuthService.login(data);
    if (error) {
      setErrorMessage(getMessage(error.code));
      toast.error(getMessage(error.code), {
        autoClose: 3000,
      });
      return;
    }
    toast.success(getMessage(result.code), {
      autoClose: 3000,
    });
    const tokens = result.data;
    dispatch(setTokens(tokens));
    navigate(redirect);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <HeaderForm>Đăng nhập</HeaderForm>
        <Form schema={loginSchema} onSubmit={handleSubmit}>
          <Field
            name="email"
            label="Email"
            type="email"
            placeholder="Nhập email"
          />
          <Field
            name="password"
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
          />
          <ErrorMessage message={errorMessage}></ErrorMessage>
          <SubmitButton loadingText="Đang xử lý yêu cầu...">
            Đăng nhập
          </SubmitButton>
        </Form>

        {/* Nút đăng nhập với Google */}
        <div className="mt-6">
          <a
            href={SERVER_URL.OAUTH2_GOOGLE}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Đăng nhập bằng Google
          </a>
        </div>

        {/* Điều hướng tới các trang khác */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Quên mật khẩu?{" "}
            <Link
              to="/forgot-password"
              className="text-indigo-500 hover:underline"
            >
              Lấy lại mật khẩu
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

export default LogIn;
