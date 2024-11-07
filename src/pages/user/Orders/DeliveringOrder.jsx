import { Fragment, useEffect, useState } from "react";
import Order from "./components/Order";
import OrderService from "@services/order.service";

const DeliveringOrder = () => {
    const [orders, setOrderes] = useState([]);

    useEffect(() => {
        fetchOrderByOrderStatus();
    }, [])

    async function fetchOrderByOrderStatus() {
        const [data] = await OrderService.getByOrderStatus("DELIVERING");
        setOrderes(data);
    }
    console.log(orders);

    return (
        <Fragment>
            <div className="flex ">
                <h1 className="mx-auto font-bold text-lg text-primary">Đang vận chuyển</h1>
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
        </Fragment>
    );
}
export default DeliveringOrder;