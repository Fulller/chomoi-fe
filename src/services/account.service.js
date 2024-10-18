import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const AccountService = {
  getUserInfo() {
    return service(axios.get(getApiUrl("/accounts")));
  },
};

export default AccountService;
