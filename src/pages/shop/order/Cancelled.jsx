import { Fragment, useState, useEffect } from "react";
import Order from "./components/Order";
import OrderService from "@services/order.service";
import { Spin } from "antd";

const Cancelled = () => {
  const [orders, setOrderes] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    fetchOrderes();
  }, [])

  async function fetchOrderes() {
    setIsloading(true);
    const [data] = await OrderService.getListOrderByStatusOfShop("CANCELLED");
    setOrderes(data);
    setIsloading(false);
  }

  return (
    <Spin spinning={isLoading}>
      <div className="flex ">
        <h1 className="mx-auto font-bold text-lg text-primary">Đã hủy</h1>
      </div>
      {orders && orders.length > 0 ?
        orders.map((order) => (
          <Order key={order.id} order={order} />
        )) :
        <div className="m-5">
          <div className="flex items-center justify-center bg-white mx-2 rounded w-full h-96">
            <h2 className="text-primary text-lg">Chưa có đơn hàng</h2>
          </div>
        </div>
      }
    </Spin>
  );
}

export default Cancelled;
