import axios, { service } from "@tools/axios.tool";
import { getApiUrl } from "@tools/url.tool";

const AttributeService = {
  getAttributesByCategory(categoryId) {
    return service(
      axios.get(getApiUrl(`/categories/${categoryId}/attributes`))
    );
  },

  addAttribute(categoryId, data) {
    return service(
      axios.post(getApiUrl(`/categories/${categoryId}/attributes`), data)
    );
  },

  updateAttribute(id, data) {
    return service(axios.put(getApiUrl(`/attributes/${id}`), data));
  },

  deleteAttribute(id) {
    return service(axios.delete(getApiUrl(`/attributes/${id}`)));
  },

  addOption(attributeId, data) {
    return service(
      axios.post(getApiUrl(`/attributes/${attributeId}/options`), data)
    );
  },

  updateOption(optionId, data) {
    return service(
      axios.put(getApiUrl(`/attributes/options/${optionId}`), data)
    );
  },

  deleteOption(optionId) {
    return service(axios.delete(getApiUrl(`/attributes/options/${optionId}`)));
  },
};

export default AttributeService;
