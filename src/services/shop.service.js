import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
const ShopService = {
    getShopById(id){
        return service(axios.get(getApiUrl(`/shops/${id}/details`)));
    },
}
export default ShopService;