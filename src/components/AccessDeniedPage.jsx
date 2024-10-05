import React, { useEffect, useState } from "react";
import { useHref, useNavigate } from "react-router-dom";
import { setRedirect } from "@redux/slices/auth.slice";
import { useDispatch } from "react-redux";

const AccessDeniedPage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  const href = useHref();
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          dispatch(setRedirect(href));
          navigate("/login"); // Điều hướng đến trang đăng nhập sau 5 giây
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(timer); // Dọn dẹp khi component unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Không có quyền truy cập</h1>
      <p className="mb-4">Bạn cần đăng nhập để truy cập trang này.</p>
      <p className="mb-4">
        Đợi <span className="text-3xl font-bold">{countdown} </span> giây để
        chuyển đến trang đăng nhập.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => {
            dispatch(setRedirect(href));
            navigate("/login");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Đăng Nhập
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Về Trang Chính
        </button>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
