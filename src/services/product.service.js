import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const ProductService = {
  getAllByShopId({ shopId, page, size }) {
    return service(
      axios.get(`/products/${shopId}/shop?page=${page}&size=${size}`)
    );
  },
  adminGetProducts({ status, page }) {
    return service(
      axios.get(`/products/admin/dashboard?status=${status}&page=${page}`)
    );
  },
  updateProductStatus(productId, status) {
    return service(
      axios.put(`products/admin/${productId}/change-status`, { status })
    );
  },
  getHomeProducts({ page = 0, size = 2 }) {
    return service(
      axios.get(getApiUrl(`/products/home?page=${page}&size=${size}`))
    );
  },
  getProductById(id) {
    return service(axios.get(getApiUrl(`/products/${id}`)));
  },
  create(data) {
    return service(axios.post("/products/shop", data));
  },
  getByIdOrSlug(productId) {
    return service(axios.get(`/products/${productId}`));
  },
  getAllByRoleShop() {
    return service(axios.get(`/products/shop`));
  },
  shopChangeStatus(productId, status) {
    return service(
      axios.put(`products/shop/${productId}/change-status`, { status })
    );
  },
  updateStock(skuId, quantity) {
    console.log({ skuId, quantity });
    return service(axios.put(`products/sku/${skuId}/stock`, { quantity }));
  },
};
export default ProductService;
