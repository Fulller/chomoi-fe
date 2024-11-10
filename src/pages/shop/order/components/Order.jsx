import { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiSquareCheck } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import { Tooltip, Modal } from "antd";
import { toast } from "react-toastify";
import OrderItem from "./OrderItem";
import OrderService from "@services/order.service";
import useMessageByApiCode from "@hooks/useMessageByApiCodeV2";
import apiCode from "../apiCode";
import addressesJson from "@assets/jsons/address.json";

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

    const { id, status, totalPrice, orderItems, note, address  } = order;
    const { detail, province, district, ward, receiverName, receiverPhone } = address;
    const [statusCurrent, setStatusCurrent] = useState(status);
    const getMessage = useMessageByApiCode({ apiCode });
    const { confirm } = Modal;

    const handleChangeOrderStatus = async (orderId, status) => {
        const [result, error] = await OrderService.updateOrderStatus(orderId, status);
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
    }

    const showCancelConfirm = (OrderId, status) => {
        confirm({
            title: 'Bạn có chắc muốn hủy đơn hàng này không',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Trở lại',
            onOk() {
                handleChangeOrderStatus(OrderId, status);
            },
        });
    }

    return (
        < div className="m-5" >
            <div className="bg-white mx-2 rounded w-full">
                <div className="flex flex-col p-5">
                    <div className="flex justify-end mb-2">
                        {status === "RECEIVED" &&
                            <div className="flex items-center">
                                <CiDeliveryTruck className={`size-6 mr-2 ${statusColor["RECEIVED"]}`} />
                                <span className={`mr-2 pr-2 border-r ${statusColor["RECEIVED"]}`}>Giao hàng thành công</span>
                            </div>
                        }
                        {
                            <span className={`${statusColor[statusCurrent]} font-semibold`}>{statusName[statusCurrent]}</span>
                        }
                    </div>
                    {orderItems.map((item) => {
                        return (
                            <OrderItem key={item.id} orderItem={item} />
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
                <div className="flex flex-1 flex-row">
                    <div className={`mx-4 my-2 ${statusCurrent === "CANCELLED" || statusCurrent === "DELIVERING" || statusCurrent === "CONFIRMED" || statusCurrent === "RECEIVED" || statusCurrent === "DELIVERED" ? 'cursor-not-allowed pointer-events-none opacity-50' : ""}`}>
                        <Tooltip title="Xác nhận">
                            <button onClick={() => handleChangeOrderStatus(id, { status: "CONFIRMED" })}>
                                <CiSquareCheck className="size-8 text-green-500" />
                            </button>
                        </Tooltip>
                    </div>
                    <div className={`mx-4 my-2 ${statusCurrent === "CANCELLED" || statusCurrent === "DELIVERING" || statusCurrent === "RECEIVED" || statusCurrent === "DELIVERED" ? 'cursor-not-allowed pointer-events-none opacity-50' : ""}`}>
                        <Tooltip title="Đang vận chuyển">
                            <button onClick={() => handleChangeOrderStatus(id, { status: "DELIVERING" })}>
                                <CiDeliveryTruck className="size-8 text-[#26aa99]" />
                            </button>
                        </Tooltip>
                    </div>
                    <div className={`mx-4 my-2 ${statusCurrent === "CANCELLED" || statusCurrent === "RECEIVED" || statusCurrent === "DELIVERED" ? 'cursor-not-allowed pointer-events-none opacity-50' : ""}`}>
                        <Tooltip title="Hủy đơn">
                            <button onClick={() => showCancelConfirm(id, { status: "CANCELLED" })}>
                                <CiSquareRemove className="size-8 text-red-600" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <div  className="p-5">
                    <span>Thành tiền: <span className="text-lg font-semibold text-primary">{totalPrice.toLocaleString('vi-VN')}đ</span></span>
                </div>
            </div>
        </div >
    );
}

export default Order;