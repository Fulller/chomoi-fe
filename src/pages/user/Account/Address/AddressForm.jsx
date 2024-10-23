import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ErrorMessage, Field, Form, SubmitButton } from "@components/Form";
import useMessageByApiCode from "@hooks/useMessageByApiCodeV2";
import SelectAddress from "./SelectAddress";
import AddressService from "@services/address.service";
import AddressSchema from "@validations/user/AddressSchema"
import apiCode from "./api.Code";

const AddressForm = ({ show, id = null, onClose, onSubmitCreate, onSubmiUpdate }) => {
    if (!show) return null; // Không hiển thị Form nếu trạng thái show là false

    const [errorMessage, setErrorMessage] = useState();
    const getMessage = useMessageByApiCode({ apiCode });
    const [address, setAddress] = useState({});
    const { detail, receiverName, isDefault = false, receiverPhone } = address;

    useEffect(() => {
        if (id) {
            fetchAddress();
        }
    }, [id]);

    async function fetchAddress() {
        const [result, error] = await AddressService.get(id);
        if (error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        }
        setAddress(result.data);
    }

    const handleSubmitCreate = async (data) => {
        if (!data.hasOwnProperty("isDefault")) {
            data.isDefault = false;
        }
        console.log(data)
        const [result, error] = await AddressService.create(data);
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
        onSubmitCreate()
    }

    const handleSubmitUpdate = async (data) => {

        if (!data.hasOwnProperty("id")) {
            data.id = id;
        }

        const [result, error] = await AddressService.update(data);
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
        onSubmiUpdate()
    }

    return (
        <div className="fixed top-10 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md h-5/6 w-auto max-w-full">
                <h2 className="text-2xl font-bold text-gray-700 w-full text-left">
                    Địa chỉ mới
                </h2>
                <Form schema={AddressSchema} onSubmit={id ? handleSubmitUpdate : handleSubmitCreate}>
                    <div className="flex items-center h-20">
                        <div className="mr-2 w-56">
                            <Field
                                name="receiverName"
                                placeholder="Họ và tên"
                                defaultValue={receiverName}
                            >
                            </Field>
                        </div>
                        <div className="ml-2 w-56">
                            <Field
                                name="receiverPhone"
                                placeholder="Số điện thoại"
                                defaultValue={receiverPhone}
                            >
                            </Field>
                        </div>
                    </div>
                    <div>
                        <SelectAddress address={address} />
                    </div>
                    <div className="h-16">
                        <Field
                            name="detail"
                            placeholder="Địa chỉ cụ thể"
                            defaultValue={detail}
                        />
                    </div>
                    <div className={`${isDefault && 'pointer-events-none opacity-50'}`}>
                        <label className="flex items-center h-8">
                            <div className="accent-blue-600" >
                                <Field
                                    type="checkbox"
                                    name="isDefault"
                                    defaultValue={isDefault}
                                />
                            </div>
                            <div className="ml-4 mb-2 select-none">
                                Đặt làm mặc định
                            </div>
                        </label>
                    </div>
                    <ErrorMessage message={errorMessage}></ErrorMessage>
                    <div className="flex justify-end items-end h-10">
                        <div className="flex justify-center items-center w-32 h-10 hover:bg-slate-100 rounded">
                            <button className="w-full h-full" type="button" onClick={onClose}>Trở lại</button>
                        </div>
                        <div className="w-40">
                            <SubmitButton loadingText="Đang xử lý...">
                                Hoàn thành
                            </SubmitButton>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddressForm