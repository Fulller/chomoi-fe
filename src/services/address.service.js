import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
import { update } from "lodash";
const AddressService = {
  create({ province, district, ward, detail, isDefault , receiverName, receiverPhone}) {
    return service(
      axios.post(getApiUrl("/addresses"), { province, district, ward, detail, isDefault , receiverName, receiverPhone })
    );
  },
  get(id){
    return service(axios.get(getApiUrl(`/addresses/${id}`)));
  },
  getAll() {
    return service(axios.get(getApiUrl("/addresses")), true);
  },
  update({id, province, district, ward, detail, isDefault , receiverName, receiverPhone}){
    return service(
      axios.put(getApiUrl(`/addresses/${id}`), { province, district, ward, detail, isDefault , receiverName, receiverPhone })
    );
  },
  updateIsDefault(id){
    return service(
      axios.get(getApiUrl(`/addresses/isDefault/${id}`))
    );
  },
  delete(id){
    return service(axios.delete(getApiUrl(`/addresses/${id}`)));
  },
};
export default AddressService;