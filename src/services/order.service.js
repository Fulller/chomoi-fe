import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const OrderService = {
  create(data) {
    return service(axios.post(getApiUrl("/orders"), data));
  },
  getAll() {
    return service(axios.get(getApiUrl("/orders")), true);
  },
  getByOrderStatus(status) {
    return service(
      axios.get(getApiUrl(`/orders/status?status=${status}`)),
      true
    );
  },
  getListOrderOfShop() {
    return service(axios.get(getApiUrl("/orders/shop")), true);
  },
  getListOrderByStatusOfShop(status) {
    return service(
      axios.get(getApiUrl(`/orders/shop/status?status=${status}`)),
      true
    );
  },
  updateOrderStatus(orderId, status) {
    return service(axios.put(getApiUrl(`/orders/${orderId}/shop`), status));
  },
  userUpdateOrderStatus(orderId, status) {
    return service(axios.put(getApiUrl(`/orders/${orderId}/user`), status));
  },
};

export default OrderService;
