import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
const CartService = {
    getAllCartItems(){
        return service(axios.get(`/carts`));
    },

    async addToCart({skuId, quantity}){
        return await service(axios.post(`/carts`, { skuId, quantity }), true);
    },
    
    async updateCartItemQuantity({skuId, quantity}){
        console.log(skuId, quantity);
        return await service(axios.put(`/carts`, { skuId, quantity }), true);
    },

    async deleteCartItem(id){
        return await service(axios.delete(`/carts/${id}`, true)); 
    }
}
export default CartService;