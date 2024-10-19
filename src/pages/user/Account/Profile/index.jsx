import React, { useState, useEffect } from 'react';
import AccountService from "@services/account.service";
import ProfileInput from './ProfileInput'; 
import './Profile.scss';
import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
import { toast } from "react-toastify";
import useMessageByApiCode from "@hooks/useMessageByApiCode";



function Profile() {
    const [errorMessage, setErrorMessage] = useState();
    const getMessage = useMessageByApiCode();
    const [account, setAccount] = useState({});
    const [formData, setFormData] = useState({});
    const [avatar, setAvatar] = useState(null);


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
    

    const handleSubmit = async (e) => {
        let imgPath = ''; // Biến để lưu trữ URL của avatar
        e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

        // Tạo FormData
        const formData2 = new FormData();
        formData2.append('image', avatar); // Thêm file vào FormData
        console.log("avt " + avatar);
        try {
            if(avatar){
                const response = await service(axios.post(getApiUrl("/uploads/image"), formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }), true);
                console.log("avt " + avatar);
                console.log("Success:", response[0]);
                const updatedFormData = {
                    ...formData,
                    avatar: response[0], // Giả sử response[0] là URL của avatar mới
                };
                setFormData(updatedFormData); // Cập nhật state formData
                formData.avatar = response[0];
            }
        } catch (error) {
            console.error("Error uploading avatar:", error.response ? error.response.data : error);
        }
        const [result, error] = await AccountService.updateAccount(formData);
        if (error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
              autoClose: 3000,
            });
            return;
        }else{
            toast.success("Success", {
                autoClose: 3000,
            });
          }
    }
    return (
        <div className="acc-card">
            <h1>Hồ sơ của tôi</h1>
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
                <button type="submit" className='btn-save'>Lưu</button>
            </form>
        </div>
    );
}

export default Profile;
