import { Link, useNavigate } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import OrderItem from "./OrderItem";
import addressesJson from "@assets/jsons/address.json";
import OrderService from "@services/order.service";
import apiCode from "../api.Code";
import { useState } from "react";
import useMessageByApiCodeV2 from "@hooks/useMessageByApiCodeV2";
import { toast } from "react-toastify";
import { Spin } from "antd";

const statusName = {
    PENDING: "CHỜ XÁC NHẬN",
    CONFIRMED: "ĐÃ XÁC NHẬN",
    DELIVERING: "ĐANG VẬN CHUYỂN",
    DELIVERED: "ĐÃ VẬN CHUYỂN",
    RECEIVED: "ĐÃ NHẬN HÀNG",
    CANCELLED: "ĐÃ HỦY",
    REFUNDED: "TRẢ HÀNG/HOÀN TIỀN",
};

const statusColor = {
    PENDING: "text-[#FFCC00]",
    CONFIRMED: "text-[#4CAF50]",
    DELIVERING: "text-[#2196F3]",
    DELIVERED: "text-[#9C27B0]",
    RECEIVED: "text-[#4CAF50]",
    CANCELLED: "text-[#FF5722]",
    REFUNDED: "text-[#607D8B]",
}

const Order = ({ order }) => {
    const { id: orderId, shop, status, totalPrice, orderItems, note, address } = order;
    const { id, name: shopName } = shop;
    const { detail, province, district, ward, receiverName, receiverPhone } = address;
    const getMessage = useMessageByApiCodeV2({ apiCode });
    const [statusCurrent, setStatusCurrent] = useState(status);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();

    const handleReceived = async (orderId, status) => {
        setIsloading(true)
        const [result, error] = await OrderService.userUpdateOrderStatus(orderId, status);
        if (error) {
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            })
            return;
        }
        toast.success(getMessage(result.code), {
            autoClose: 3000,
        })
        setStatusCurrent(result.data.status);
        setIsloading(false);
        navigate("/orders/received")
    }

    return (
        <Spin spinning={isLoading}>
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
                                {status === "RECEIVED" &&
                                    <div className="flex items-center">
                                        <CiDeliveryTruck className={`size-6 mr-2 ${statusColor["RECEIVED"]}`} />
                                        <span className={`mr-2 pr-2 border-r ${statusColor["RECEIVED"]}`}>Giao hàng thành công</span>
                                    </div>
                                }
                                {
                                    <span className={`${statusColor[status]} font-semibold mt-1`}>{statusName[statusCurrent]}</span>
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
                <div className="flex flex-col bg-white mx-2 px-8 my-1 rounded w-full p-3">
                    <span className="text-lg">Địa Chỉ Nhận Hàng:</span>
                    <span className="my-2">{receiverName}</span>
                    <span className="my-2 ">{receiverPhone}</span>
                    <span className="my-2">{`${detail}, ${addressesJson[province]?.district[district]?.ward[ward]?.name_with_type}, 
                            ${addressesJson?.[province]?.district[district]?.name_with_type},
                            ${addressesJson?.[province]?.name_with_type}`}</span>
                    <span>Lời nhắn: {note ? note : "Không có"}</span>
                </div>
                <div className="flex items-center justify-between bg-white mx-2 mt-1 p-2 rounded w-full">
                    {status === "DELIVERED" ?
                        <div className="flex flex-1 flex-row">
                            <button className="p-2 ml-4 bg-primary text-white rounded hover:bg-[#f985ae]" onClick={() => handleReceived(orderId, { status: "RECEIVED" })}>Đã nhận hàng</button>
                        </div> :
                        <div className="flex flex-1 flex-row"></div>
                    }
                    <div className="p-5">
                        <span>Thành tiền: <span className="text-lg font-semibold text-primary">{totalPrice.toLocaleString('vi-VN')}đ</span></span>
                    </div>
                </div>
            </div >
        </Spin>
    );
}

export default Order;