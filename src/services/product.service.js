import axios, { service } from "@tools/axios.tool";

const ProductService = {
  create(data) {
    return service(axios.post("/products/shop", data));
  },
  getByIdOrSlug(productId) {
    return service(axios.get(`/products/${productId}`));
  },
  adminGetProducts({ status, page }) {
    return service(
      axios.get(`/products/admin/dashboard?status=${status}&page=${page}`)
    );
  },
  updateProductStatus(productId, status) {
    return service(axios.put(`products/admin/${productId}/change-status`, {status})
    );
  },
};

export default ProductService;
