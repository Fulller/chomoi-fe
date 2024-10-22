import { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import { toast } from "react-toastify";

import AddressService from "@services/address.service";
import AddressForm from "./AddressForm";
import addressesJson from "@assets/jsons/address.json";
import useMessageByApiCode from "@hooks/useMessageByApiCode";

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [idFormUpdate, setIdFormUpdate] = useState();
    const getMessage = useMessageByApiCode();
    const { confirm } = Modal;

    useEffect(() => {
        fetchAddresses();
    }, [])

    async function fetchAddresses() {
        const [data] = await AddressService.getAll();
        setAddresses(data)
    }

    async function deleteAddress(id) {
        const [result, error] = await AddressService.delete(id);
        if (error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        }
        toast.success(getMessage(result.code), {
            autoClose: 3000,
        })
        handleSubmitDelete();
    }

    const updateIsDefault = async (id) => {
        const [result, error] = await AddressService.updateIsDefault(id);
        if (error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        }
        toast.success(getMessage(result.code), {
            autoClose: 3000,
        })
        handleSubmitDelete();
    }

    //Sắp xếp đưa địa chỉ mặc định lên đầu
    addresses.sort((a, b) => {
        return (a.isDefault === b.isDefault) ? 0 : a.isDefault ? -1 : 1;
    });

    // Hàm mở và đóng Form
    const handleOpenFormCreate = () => setShowFormCreate(true);
    const handleOpenFormUpdate = (id) => {
        setIdFormUpdate(id);
        setShowFormUpdate(true);
    }

    const handleCloseFormCreate = () => setShowFormCreate(false);
    const handleCloseFormUpdate = () => setShowFormUpdate(false);


    const handleSubmitCreate = async () => {
        setShowFormCreate(false)
        await fetchAddresses()
    }

    const handleSubmitUpdate = async () => {
        setShowFormUpdate(false)
        await fetchAddresses()
    }

    const handleSubmitDelete = async () => {
        await fetchAddresses()
    }

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Bạn có chắc muốn xóa địa chỉ này không',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Trở lại',
            onOk() {
                deleteAddress(id);
            },
        });
    };

    return (
        <div className="flex flex-col min-h-full relative bg-white">
            <div className="border-b border-gray-200 box-border h-20 py-5 px-8 flex items-center">
                <div className="flex-1 text-gray-800 text-[1.225rem] font-medium leading-6">
                    Địa chỉ của tôi
                </div>
                <div>
                    <div id="button-add-address-wrapper" className="ml-2 flex bg-blue-600 rounded hover:bg-blue-400">
                        <button id="button-add-address" className="text-sm font-normal h-10 px-5 text-white flex items-center"
                            onClick={handleOpenFormCreate}>
                            + Thêm địa chỉ mới
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="px-8 pt-3">
                    <div className="text-[1.125rem] leading-7 mb-2">Địa chỉ</div>
                    {addresses.map((address) => {
                        const { id, detail, district, isDefault, province, receiverName, receiverPhone, ward } = address;
                        return (
                            <div key={id} className="flex border-b border-black/[9%] py-5">
                                <div className="min-w-0 w-full">
                                    <div className="flex justify-between mb-1">
                                        <div className="flex flex-grow mr-2">
                                            <span className="inline-flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-black/[87%] text-base leading-6 font-medium min-w-0">
                                                {receiverName}
                                            </span>
                                            <div className="border-l border-black/[26%] mx-2"></div>
                                            <div className="text-sm leading-5 text-black/[54%] whitespace-nowrap flex items-center">
                                                {receiverPhone}
                                            </div>
                                        </div>
                                        <div className="flex justify-end basis-10">
                                            <div>
                                                <button className="address-item-button-update bg-none border-0 text-blue-600 outline-none p-1 whitespace-nowrap"
                                                    onClick={() => handleOpenFormUpdate(id)}
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
                                            {!isDefault && (
                                                <div>
                                                    <Button className="address-item-button-delete bg-none border-0 text-blue-600 outline-none p-1 whitespace-nowrap"
                                                        onClick={() => showDeleteConfirm(id)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between mb-1">
                                        <div className="flex flex-grow mr-2">
                                            <div className="text-sm leading-5 text-black/[54%]">
                                                <div className="flex items-center">
                                                    {detail}
                                                </div>
                                                <div className="flex items-center">
                                                    {`  ${addressesJson[province].district[district].ward[ward].name_with_type}, 
                                                        ${addressesJson[province].district[district].name_with_type},
                                                        ${addressesJson[province].name_with_type}`}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end basis-10 pt-1">
                                            <button className={`address-item-card-button-is-default border border-black/[26%] text-black/[87%] text-sm h-7 leading-5 px-3 whitespace-nowrap rounded-md min-w-none
                                                ${isDefault ? 'cursor-not-allowed opacity-70' : ''}`} disabled={isDefault}
                                                onClick={() => updateIsDefault(id)}
                                            >
                                                Thiết lập mặc định
                                            </button>
                                        </div>
                                    </div>
                                    {isDefault && (
                                        <div className="flex-wrap flex items-center mt-1">
                                            <span className="m-1 mr-0 px-1 border border-blue-600 rounded-sm text-blue-600">
                                                Mặc định
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <AddressForm show={showFormCreate} onClose={handleCloseFormCreate} onSubmitCreate={handleSubmitCreate} />
            <AddressForm show={showFormUpdate} id={idFormUpdate} onClose={handleCloseFormUpdate} onSubmiUpdate={handleSubmitUpdate} />
        </div>
    );
}
export default Address;