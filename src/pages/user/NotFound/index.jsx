import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "@assets/images/not-found.gif";
import "./NotFound.scss"; // Thêm file CSS riêng nếu cần

function NotFound() {
  return (
    <div className="not-found-container flex flex-col items-center justify-center text-center">
      <img src={notFoundImg} alt="Page not found" className="w-1/2 mb-6" />
      <h1 className="text-4xl font-bold text-gray-700 mb-4">
        Ôiii! Không tìm thấy trang này!
      </h1>
      <p className="text-gray-600 mb-6">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link to="/" className="text-blue-500 hover:underline text-lg">
        Quay về trang chủ
      </Link>
    </div>
  );
}

export default NotFound;
