import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const AccountService = {
  getAccount() {
    return service(axios.get(getApiUrl("/accounts")), true);
  },

  getUserInfo() {
    return service(axios.get(getApiUrl("/accounts")));
  },

  async updateAccount({ displayName, dob, phoneNumber, avatar }) {
    const response = await service(axios.put(getApiUrl("/accounts"), { displayName, dob, phoneNumber, avatar }), true);
    console.log("Update response:", response);
    return response;
    //return [response.data, null]; // Trả về dữ liệu và lỗi là null
  }
}

export default AccountService;
