import axios, { service } from "@tools/axios.tool";

const ProductService = {
  create(data) {
    return service(axios.post("/products/shop", data));
  },
  getByIdOrSlug(productId) {
    return service(axios.get(`/products/${productId}`));
  },
};

export default ProductService;
