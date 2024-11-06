import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";

const ProductService = {
    getProducts({page=0, size=2}){
        return service(axios.get(getApiUrl(`/products/home?page=${page}&size=${size}`)));
    },
    getProductById(id){
        return service(axios.get(getApiUrl(`/products/${id}`)));
    }
}
export default ProductService;