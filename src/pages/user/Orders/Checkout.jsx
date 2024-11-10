import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { CiShop } from "react-icons/ci";
import { Spin, Tabs } from 'antd';
import addressesJson from "@assets/jsons/address.json";
import AddressService from "@services/address.service";
import ListAddress from "./components/ListAddress";
import OrderService from "@services/order.service";
import useMessageByApiCode from "@hooks/useMessageByApiCodeV2";
import apiCode from "./api.Code";
import { toast } from "react-toastify";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedCartItems } = location.state || { selectedCartItems: [] };
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [showListAddress, setShowListAddress] = useState(false);
    const [data, setData] = useState({});
    const getMessage = useMessageByApiCode({ apiCode });
    const [isLoading, setIsloading] = useState(false);
    const [isSelectedAddressLoading, setIsSelectedAddressLoading] = useState(false);

    let totalPrice = 0;

    useEffect(() => {
        if (!selectedCartItems || selectedCartItems.length === 0) {
            navigate("/cart");
        }
    }, [selectedCartItems, navigate]);

    const { shopId, shopName, items = [] } = selectedCartItems;

    useEffect(() => {
        fetchAddresses();
    }, [])

    async function fetchAddresses() {
        setIsSelectedAddressLoading(true);
        const [data] = await AddressService.getAll();
        setAddresses(data)
        setIsSelectedAddressLoading(false);
    }

    addresses.sort((a, b) => {
        return (a.isDefault === b.isDefault) ? 0 : a.isDefault ? -1 : 1;
    });

    useEffect(() => {

        const addressIsDefault = addresses.find(address => address.isDefault === true);
        setSelectedAddress(addressIsDefault);

    }, [addresses])

    useEffect(() => {
        data["note"] = "";
        data["addressId"] = selectedAddress?.id;
        data["shopId"] = shopId;
        data["items"] = items.map((item) => {
            const cartItemIdKey = Object.keys(item).find((key) => key.startsWith("cartItemId"));
            return { [cartItemIdKey]: item[cartItemIdKey] };
        });
        setData(data);
    }, [selectedAddress, selectedCartItems])

    const { detail, province, district, ward, receiverName, receiverPhone, isDefault } = selectedAddress || {};

    const listPaymentMethod = [
        {
            key: '1',
            label: 'Ví điện tử',
            children: 'Ví điện tử',
        },
        {
            key: '2',
            label: 'Thanh toán khi nhận hàng',
            children: 'Thanh toán khi nhận hàng',
        },
    ];

    const handleOpenListAddress = () => {
        setShowListAddress(true);
    }

    const handleCloseListAddress = () => {
        setShowListAddress(false);
    }

    const handleChangeAddress = (address) => {
        setSelectedAddress(address);
        setShowListAddress(false);
    }

    const handleChange = (name, value) => {
        data[name] = value;
        setData(data);
    }

    const handleChangeNote = (e) => {
        handleChange("note", e.target.value);
    }

    const onSubmit = async (data) => {
        const [result, error] = await OrderService.create(data);
        if (error) {
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        }
        toast.success(getMessage(result.code), {
            autoClose: 3000,
        })
        navigate("/orders");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);
        await onSubmit(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsloading(false);
    }

    return (
        <Spin spinning={isLoading}>
            <div className="">
                <div className="flex flex-row items-center bg-white w-full p-5">
                    <span className="text-xl text-primary whitespace-nowrap mx-auto">Thanh Toán</span>
                </div>
                <div className="bg-white my-2 p-5">
                    <div className="flex flex-row items-center">
                        <FaLocationDot className="size-5 mx-3 text-primary" />
                        <span className="text-primary text-xl">Địa chỉ nhận hàng</span>
                    </div>
                    <div className="flex flex-row items-center">
                        {isSelectedAddressLoading ? <Spin spinning={true} className="m-3"/> :
                            <Fragment>
                                <span className="text-xl text-center font-bold m-2">{receiverName} {receiverPhone}</span>
                                <span className="text-lg text-center m-2 w-[500] tracking-tighter">
                                    {` ${detail || ''}, ${addressesJson[province]?.district[district]?.ward[ward]?.name_with_type || ''}, 
                                ${addressesJson?.[province]?.district[district]?.name_with_type || ''},
                                ${addressesJson?.[province]?.name_with_type || ''}`}
                                </span>
                                {isDefault && <div className="text-sm border border-primary text-primary p-1 text-center m-2">Mặc định</div>}
                                <button className="text-sm ml-4 text-success hover:text-[#649bf3]" onClick={handleOpenListAddress}>Thay đổi</button>
                            </Fragment>
                        }
                    </div>
                </div>
                <div className="my-2 bg-white p-5">
                    <div className="grid grid-cols-8 gap-4">
                        <span className="col-span-5 text-lg">Sản phẩm</span>
                        <span>Đơn giá</span>
                        <span>Số lượng</span>
                        <span>Thành tiền</span>
                    </div>
                    <div className="flex flex-row my-6">
                        <CiShop className="size-5 mr-2" />
                        <span className="font-semibold">{shopName}</span>
                    </div>
                    <div className="grid grid-cols-8 gap-4 border-b pb-6">
                        {items && items.map((item) => {
                            const { id, name, image, quantity, price, selectedVariation } = item;
                            totalPrice += (price * quantity);
                            return (
                                <Fragment key={id}>
                                    <div className="col-span-5 flex flex-row">
                                        <img src={image} className="size-12 rounded" />
                                        <span className="w-80 my-auto truncate">{name}</span>
                                        <span className="mx-10 my-auto">{selectedVariation}</span>
                                    </div>
                                    <span>{price.toLocaleString('vi-VN')}đ</span>
                                    <span>{quantity}</span>
                                    <span>{(price * quantity).toLocaleString('vi-VN')}đ</span>
                                </Fragment>
                            );
                        })}
                    </div>
                    <div className="flex flex-row border-b">
                        <label htmlFor="note" className="m-3 my-auto">Lời nhắn:</label>
                        <input className="m-3 border w-96 p-3" placeholder="Lưu ý cho người bán" id="note" type="text" onChange={(e) => handleChangeNote(e)} />
                    </div>
                    <div className="flex justify-end pt-3">
                        <span>Tổng số tiền: {totalPrice.toLocaleString()}đ</span>
                    </div>
                </div>
                <div className="my-2 bg-white p-5">
                    <div className="flex flex-row border-b p-4">
                        <span className="my-auto font-medium text-lg">Phương thức thanh toán</span>
                    </div>
                    <div>
                        <Tabs defaultActiveKey="1" items={listPaymentMethod} />
                    </div>
                </div>
                <div className="flex justify-end my-2 bg-white p-5">
                    <button className="bg-primary text-white py-2 px-10 mr-4 hover:bg-[#ff88b1]" onClick={handleSubmit}>Đặt hàng</button>
                </div>
                <ListAddress
                    show={showListAddress}
                    onClose={handleCloseListAddress}
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    changeAddress={handleChangeAddress}
                />
            </div>
        </Spin>
    );
}

export default Checkout;