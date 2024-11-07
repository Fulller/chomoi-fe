import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const ProductService = {
    getHomeProducts({page=0, size=2}){
        return service(axios.get(getApiUrl(`/products/home?page=${page}&size=${size}`)));
    },
    getProductById(id){
        return service(axios.get(getApiUrl(`/products/${id}`)));
    },
    create(data) {
      return service(axios.post("/products/shop", data));
    },
    getByIdOrSlug(productId) {
      return service(axios.get(`/products/${productId}`));
    },
}
export default ProductService;
