import axios, { service } from "@tools/axios.tool";

const ShopService = {
  updateShopInfo({name, avatar, coverImage}) {
    return service(axios.put("/shops"), {name, avatar, coverImage});
  },
}

export default ShopService;