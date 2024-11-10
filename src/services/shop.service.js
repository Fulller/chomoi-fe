import axios, { service } from "@tools/axios.tool";

const ShopService = {
  updateShopInfo({name, avatar, coverImage}) {
    return service(axios.put("/shops", {name, avatar, coverImage}));
  },
  getShopByOwner(){
    return service(axios.get("/shops/owner"));
  },
  changeShopStatus(status){
    return service(axios.put("/shops/changeShopStatus", {status}));
  }
}

export default ShopService;
