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

    const { id, status, totalPrice, orderItems } = order;
    const [statusCurrent, setStatusCurrent] = useState(status);
    const getMessage = useMessageByApiCode({ apiCode });
    const { confirm } = Modal;

    const handleOrderStatusChange = async (OrderId, status) => {
        const [result, error] = await OrderService.updateOrderStatus(OrderId, status);
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
                handleOrderStatusChange(OrderId, status);
            },
        });
    }

    return (
        < div className="m-5" >
            <div className="bg-white mx-2 rounded w-full">
                <div className="flex flex-col p-5">
                    <div className="flex justify-end mb-2">
                        {status === "DELIVERED" &&
                            <div className="flex items-center">
                                <CiDeliveryTruck className="size-6 mr-2 text-success" />
                                <span className="mr-2 pr-2 border-r text-success">Giao hàng thành công</span>
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
            <div className="flex items-center justify-between bg-white mx-2 mt-1 p-2 rounded w-full">
                <div className="flex flex-1 flex-row">
                    <div className={`mx-4 my-2 ${statusCurrent === "CANCELLED" || statusCurrent ==="DELIVERING" || statusCurrent ==="CONFIRMED"  ? 'cursor-not-allowed pointer-events-none opacity-50' : ""}`}>
                        <Tooltip title="Xác nhận">
                            <button onClick={() => handleOrderStatusChange(id, { status: "CONFIRMED" })}>
                                <CiSquareCheck className="size-8 text-green-500" />
                            </button>
                        </Tooltip>
                    </div>
                    <div className={`mx-4 my-2 ${statusCurrent === "CANCELLED" || statusCurrent ==="DELIVERING" ? 'cursor-not-allowed pointer-events-none opacity-50' : ""}`}>
                        <Tooltip title="Đang vận chuyển">
                            <button onClick={() => handleOrderStatusChange(id, { status: "DELIVERING" })}>
                                <CiDeliveryTruck className="size-8 text-[#26aa99]" />
                            </button>
                        </Tooltip>
                    </div>
                    <div className={`mx-4 my-2 ${statusCurrent === "CANCELLED" ? 'cursor-not-allowed pointer-events-none opacity-50' : ""}`}>
                        <Tooltip title="Hủy đơn">
                            <button onClick={() => showCancelConfirm(id, { status: "CANCELLED" })}>
                                <CiSquareRemove className="size-8 text-red-600" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <div className="">
                    <span>Thành tiền: <span className="text-lg font-semibold text-primary">{totalPrice.toLocaleString('vi-VN')}đ</span></span>
                </div>
            </div>
        </div >
    );
}

export default Order;