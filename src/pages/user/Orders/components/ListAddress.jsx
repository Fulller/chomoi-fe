import { Checkbox } from 'antd';
import addressesJson from "@assets/jsons/address.json";
import { useEffect, useState } from 'react';


const ListAddress = ({ show, onClose, addresses, selectedAddress, changeAddress }) => {
    if (!show) return null;
    const [selectedAddressInList, setSelectedAddress] = useState();

    useEffect(() => {
        setSelectedAddress(selectedAddress);
    }, [])

    const onChangeAddress = (e, address) => {
        if (e.target.checked === true)
            setSelectedAddress(address);
    };

    return (
        <div className="fixed top-10 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md h-5/6 w-auto max-w-full">
                <h2 className="text-2xl font-bold text-gray-700 w-full border-b pb-3">
                    Địa chỉ của tôi
                </h2>
                <div className="h-[420px]">
                    {addresses.map((address) => {
                        const { id, detail, district, isDefault, province, receiverName, receiverPhone, ward } = address;
                        return (
                            <div key={id} className="flex flex-row">
                                <div className="my-auto mr-4">
                                    <Checkbox checked={selectedAddressInList?.id === id} {...isDefault && { defaultChecked: true }} onChange={(e) => onChangeAddress(e, address)} />
                                </div>
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
                                        </div>
                                        <div className="flex justify-between mb-1">
                                            <div className="flex flex-grow mr-2">
                                                <div className="text-sm leading-5 text-black/[54%]">
                                                    <div className="flex items-center">
                                                        {detail}
                                                    </div>
                                                    {/* {console.log(addressesJson[province].district[district].ward[ward].name_with_type)} */}
                                                    <div className="flex items-center">
                                                        {`  ${addressesJson[province].district[district].ward[ward].name_with_type}, 
                                                        ${addressesJson[province].district[district].name_with_type},
                                                        ${addressesJson[province].name_with_type}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {isDefault && (
                                            <div className="flex-wrap flex items-center mt-1">
                                                <span className="m-1 mr-0 px-1 border border-primary rounded-sm text-primary">
                                                    Mặc định
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end items-end">
                    <div className="flex justify-center items-center mt-3">
                        <button className="mx-4 border p-2" type="button" onClick={onClose}>Trở lại</button>
                        <button className="text-white bg-primary p-2" onClick={() => changeAddress(selectedAddressInList)}>Hoàn thành</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListAddress;