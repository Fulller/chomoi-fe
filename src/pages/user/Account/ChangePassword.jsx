import React, { useState } from "react";
import { Form, Field, SubmitButton, ErrorMessage } from "@components/Form";
import AuthService from "@services/auth.service";
import HeaderForm from "@pages/user/auth/components/HeaderForm";
import { toast } from "react-toastify";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import changepasswordSchema from "@validations/account/changepasswordSchema";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const getMessage = useMessageByApiCode();

    const handleSubmit = async (data) => {
        const { currentPassword, newPassword } = data;

        try {
            const [response, apiError] = await AuthService.changePassword({
                currentPassword,
                newPassword,
            });

            if (apiError) {
                if (apiError.code === "auth-e-07") {
                    toast.error("Mật khẩu hiện tại không đúng");
                    return;
                }
            }

            toast.success("Mật khẩu đã được thay đổi thành công!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            const errorMsg = getMessage(err.response?.data?.code) || err.message || "Đã xảy ra lỗi ngoài ý muốn.";
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <HeaderForm>Đổi Mật Khẩu</HeaderForm>

                <ErrorMessage message={errorMessage}></ErrorMessage>

                <Form schema={changepasswordSchema} onSubmit={handleSubmit}>
                    <Field
                        name="currentPassword"
                        label="Mật khẩu hiện tại"
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <Field
                        name="newPassword"
                        label="Mật khẩu mới"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <SubmitButton>
                        Đổi mật khẩu
                    </SubmitButton>
                </Form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Quay lại{" "}
                        <a href="/account/profile" className="text-indigo-500 hover:underline">
                            trang hồ sơ
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;












