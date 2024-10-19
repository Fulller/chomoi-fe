import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const AccountService = {
    getAccount() {
        return service(axios.get(getApiUrl("/accounts")), true);
    },

    async updateAccount({displayName, dob, phoneNumber, avatar}) {
        try {
            const response = await service(axios.put(getApiUrl("/accounts"), {displayName, dob, phoneNumber, avatar}), true);
            console.log("Update response:", response);
            return [response.data, null]; // Trả về dữ liệu và lỗi là null
        } catch (error) {
            console.error("Error updating account:", error.response ? error.response.data : error);
            return [null, error]; // Trả về null và lỗi nếu có
        }
    }   
}

export default AccountService;
