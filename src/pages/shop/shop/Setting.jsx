import { useState, useEffect } from "react";
import ShopService from "@services/shop.service";
import { Button, message } from "antd";

const STATUS_ACTION = {
  ACTIVE: {
    title: "Đang hoạt động",
    action: {
      title: "Khóa tài khoản",
      status: "SELF_BLOCKED",
    },
  },
  SELF_BLOCKED: {
    title: "Đang tạm khóa",
    action: {
      title: "Hoạt động lại",
      status: "ACTIVE",
    },
  },
  ADMIN_BLOCK: {
    title: "Đang bị khóa bởi quản trị viên",
    action: {},
  },
};

function Setting() {
  const [shopInfo, setShopInfo] = useState({});
  const [status, setStatus] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    fetchShopInfo();
  }, []);

  useEffect(() => {
    if (shopInfo.status) {
      setStatus(shopInfo.status);
    }
  }, [shopInfo]);

  async function fetchShopInfo() {
    const [result] = await ShopService.getShopByOwner();
    setShopInfo(result.data);
  }

  const toggleStatus = async () => {
    const newStatus = STATUS_ACTION[status]?.action?.status;
    if (!newStatus) {
      message.error("Không có hành động nào khả dụng");
      return;
    }
    setIsloading(true);
    const [, error] = await ShopService.changeShopStatus(newStatus);
    setIsloading(false);
    if (error) {
      message.error("Không thể thay đổi trạng thái");
      return;
    }
    setStatus(newStatus);
    message.success("Thay đổi trạng thái cửa hàng thành công");
  };

  if (!status) return null;

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center mt-10">
      <h3
        className={`text-lg font-semibold ${
          status === "ACTIVE" ? "text-green-600" : "text-red-600"
        }`}
      >
        {STATUS_ACTION[status].title}
      </h3>
      {STATUS_ACTION[status].action.title && (
        <Button
          type="primary"
          danger={status === "ACTIVE"}
          loading={isLoading}
          onClick={toggleStatus}
          className="mt-4 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {STATUS_ACTION[status].action.title}
        </Button>
      )}
    </div>
  );
}

export default Setting;
