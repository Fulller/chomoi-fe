import React, { useState, useEffect } from 'react';
import AccountService from "@services/account.service";
import UploadsService from "@services/uploads.service";
import ProfileInput from './ProfileInput';
import './Profile.scss';
import { toast } from "react-toastify";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import { ErrorMessage } from "@components/Form";
import { setUser } from "@redux/slices/auth.slice"
import AuthService from '@services/auth.service';
import { useDispatch } from 'react-redux';


function Profile() {
    const [errorMessage, setErrorMessage] = useState();
    const getMessage = useMessageByApiCode();
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState({});
    const [formData, setFormData] = useState({});
    const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch();



    useEffect(() => {
        fetchAccounts();
    }, []);

    async function fetchAccounts() {
        const [data, error] = await AccountService.getAccount();
        if (error) {
            console.log({ error });
            return;
        }
        setAccount(data);
        setFormData(data); // Khởi tạo formData từ account
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file); // Lưu file vào state
    }

    const fetchUser = async () => {
        const [result, error] = await AuthService.getUserInfo();
        if (error) {
            return;
        }
        dispatch(setUser(result.data));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Tạo DeleteFormData
        const deleteFormData = new FormData();
        deleteFormData.append('file_url', formData.avatar);
        console.log("file_url: " + formData.avatar);
        // Xóa 
        const response_delete = await UploadsService.deleteUploads(deleteFormData);
        console.log("response delete: " + response_delete);

        // Tạo FormData2
        const formData2 = new FormData();
        formData2.append('image', avatar); // Thêm file vào FormData
        const response = await UploadsService.uploads(formData2);
        const updatedFormData = {
            ...formData,
            avatar: response[0], // Giả sử response[0] là URL của avatar mới
        };
        setFormData(updatedFormData); // Cập nhật state formData
        if (response[0] != null) {
            formData.avatar = response[0];
        }
        else {
            formData.avatar = formData.avatar;
        }

        const [result, error] = await AccountService.updateAccount(formData);
        if (error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        } else {
            fetchUser();
            toast.success("Success", {
                autoClose: 3000,
            });
            setLoading(false);
        }
    }
    return (
        <div className="acc-card">
            <h1 class="header">Hồ sơ của tôi</h1>
            <h6>Quản lý thông tin hồ sơ để bảo mật tài khoản</h6>
            <hr />
            <img className="acc-avt" src={formData.avatar} alt="Avatar" />

            <form onSubmit={handleSubmit} className="acc-info">
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <ProfileInput
                    label="Ảnh đại diện"
                    type="file"
                    onChange={handleFileChange}
                    name="avatar"
                />
                <ProfileInput
                    label="Tên"
                    type="text"
                    value={formData.displayName || ''}
                    onChange={handleChange}
                    name="displayName"
                />
                <ProfileInput
                    label="Ngày sinh"
                    type="date"
                    value={formData.dob || ''}
                    onChange={handleChange}
                    name="dob"
                />
                <ProfileInput
                    label="Số điện thoại"
                    type="text"
                    value={formData.phoneNumber || ''}
                    onChange={handleChange}
                    name="phoneNumber"
                />
                <ProfileInput
                    label="Email"
                    type="text"
                    value={formData.email || ''}
                    name="email"
                />
                <ErrorMessage message={errorMessage}></ErrorMessage>
                <button
                    type="submit"
                    className='btn-save'
                    disabled={loading}
                >
                    {loading ? "Đang xử lý yêu cầu..." : "Lưu"}
                </button>
            </form>
        </div>
    );
}

export default Profile;
