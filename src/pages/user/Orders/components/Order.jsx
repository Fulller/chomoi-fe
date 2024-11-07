import { Link } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import OrderItem from "./OrderItem";

const statusName = {
    PENDING: "ĐANG XỬ LÝ",
    CONFIRMED: "ĐÃ XÁC NHẬN",
    DELIVERING: "ĐANG VẬN CHUYỂN",
    DELIVERED: "HOÀN THÀNH",
    CANCELLED: "ĐÃ HỦY",
    REFUNDED: "TRẢ HÀNG/HOÀN TIỀN",
};

const statusColor = {
    PENDING: "text-orange-500",
    CONFIRMED: "text-green-500",
    DELIVERING: "text-[#26aa99]",
    CANCELLED: "text-red-600",
}

const Order = ({ order }) => {
    const { shop, status, totalPrice, orderItems } = order;
    const { id, name: shopName } = shop;
    return (
        < div className="m-5" >
            <div className="bg-white mx-2 rounded w-full">
                <div className="flex flex-col p-5">
                    <div className="flex flex-row">
                        <div className="flex-1 mx-3 my-3">
                            <Link to={`/shop/${id}`} className="flex flex-row font-bold w-44 hover:text-primary">
                                <CiShop className="size-5 mr-2" />
                                <span>{shopName}</span>
                            </Link>
                        </div>
                        <div className="flex flex-row mx-auto my-auto">
                            {status === "DELIVERED" &&
                                <div className="flex items-center">
                                    <CiDeliveryTruck className="size-6 mr-2" style={{ color: "#26aa99" }} />
                                    <span className="mr-2 pr-2 border-r" style={{ color: "#26aa99" }}>Giao hàng thành công</span>
                                </div>
                            }
                            {
                                <span className={`${statusColor[status]} font-semibold`}>{statusName[status]}</span>
                            }
                        </div>
                    </div>
                    {orderItems.map((item) => {
                        const { id } = item;
                        return (
                            <OrderItem key={id} orderItem={item} />
                        )
                    })}

                </div>
            </div>
            <div className="flex justify-end bg-white mx-2 mt-1 rounded w-full">
                <div className="p-5">
                    <span>Thành tiền: <span className="text-lg font-semibold text-primary">{totalPrice.toLocaleString('vi-VN')}đ</span></span>
                </div>
            </div>
        </div >
    );
}

export default Order;