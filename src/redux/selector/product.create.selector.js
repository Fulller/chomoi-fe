import _ from "lodash";

const createProductSelecetor = {
  get: (state) => state.createProduct.data,
  getField: (field) => (state) => _.get(state.createProduct.data, field),
  getFields: (fields) => (state) => {
    return _.pick(state.createProduct.data, fields);
  },
  getErrors: (field) => (state) => state.createProduct.error,
  getErrorField: (field) => (state) => _.pick(state.createProduct.error, field),
  getErrorFields: (fields) => (state) =>
    _.pick(state.createProduct.error, fields),
};

export default createProductSelecetor;
