import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const OrderService = {
    getAll(){
        return service(axios.get(getApiUrl("/orders")), true);
    },
    getByOrderStatus(status){
        return service(axios.get(getApiUrl(`/orders/status?status=${status}`)), true)
    },
    getListOrderOfShop(){
        return service(axios.get(getApiUrl("/orders/shop")), true);
    },
    getListOrderByStatusOfShop(status){
        return service(axios.get(getApiUrl(`/orders/shop/status?status=${status}`)), true);
    },
    updateOrderStatus(OrderId, status){
        return service(axios.put(getApiUrl(`/orders/${OrderId}/shop`), status));
    },
}

export default OrderService;