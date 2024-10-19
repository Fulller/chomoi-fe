import { getApiUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
const AddressService = {
  create({ province, district, ward, detail }) {
    return service(
      axios.post(getApiUrl("addresses"), { province, district, ward, detail })
    );
  },
  getAll() {
    return service(axios.get(getApiUrl("/addresses")), true);
  },
};
export default AddressService;