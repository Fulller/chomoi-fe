import axios, { service } from "@tools/axios.tool";

const CategoryService = {
  getTree() {
    return service(axios.get("/categories"));
  },

  addCategory(data) {
    return service(axios.post("/categories", data));
  },

  updateCategory(categoryId, data) {
    return service(axios.put(`/categories/${categoryId}`, data));
  },

  deleteCategory(categoryId) {
    return service(axios.delete(`/categories/${categoryId}`));
  },
};

export default CategoryService;
