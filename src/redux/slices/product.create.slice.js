import { createSlice } from "@reduxjs/toolkit";

const defaultSku = {
  price: 0,
  stock: 0,
  weight: 0,
  variation: "",
  image: null,
};

const initialState = {
  data: {
    name: "",
    description: "",
    thumbnail: null,
    video: null,
    categoryId: null,
    isSimple: false,
    status: "DRAFT",
    variations: [],
    skus: [
      {
        price: 0,
        stock: 0,
        weight: 5,
        variation: "",
        image: null,
      },
    ],
    imagePaths: [],
    productAttributes: [],
  },
  error: {},
};

const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    setDefault: (state) => {
      state.data = initialState.data;
      state.error = initialState.error;
    },
    setField: (state, { payload }) => {
      const { field, value } = payload;
      state.data[field] = value;
      state.error[field] = null;
    },
    setErrorField: (state, { payload }) => {
      const { field, value } = payload;
      state.error[field] = value;
    },
    setErrorEmpty: (state, { payload }) => {
      state.error = {};
    },
    changeMode: (state, { payload }) => {
      state.data.isSimple = payload;
      if (payload) {
        state.data.variations = [];
        state.data.skus = [defaultSku];
      } else {
        state.data.variations = [
          {
            name: "",
            options: [""],
            images: [""],
          },
        ];
        state.data.skus = [];
      }
    },
    addVariation: (state) => {
      state.data.variations.push({ name: "", options: [""] });
    },
    removeVariation: (state, { payload }) => {
      const { variationIndex } = payload;
      if (
        variationIndex >= 0 &&
        variationIndex < state.data.variations.length &&
        state.data.variations.length >= 1
      ) {
        state.data.variations.splice(variationIndex, 1);
        if (variationIndex === 0 && state.data.variations.length > 0) {
          const optionsLength = state.data.variations[0].options.length;
          state.data.variations[0].images = Array(optionsLength).fill("");
        }
      }
    },
    updateVariationName: (state, { payload }) => {
      const { index, name } = payload;
      state.data.variations[index].name = name;
    },
    addOptionToVariation: (state, { payload }) => {
      state.data.variations[payload].options.push("");
      if (payload == 0) {
        state.data.variations[payload].images.push("");
      }
    },
    updateVariationOption: (state, { payload }) => {
      const { variationIndex, optionIndex, value } = payload;
      state.data.variations[variationIndex].options[optionIndex] = value;
    },
    updateVariationOptionImage: (state, { payload }) => {
      const { variationIndex, optionIndex, value } = payload;
      state.data.variations[variationIndex].images[optionIndex] = value;
    },
    removeVariationOption: (state, { payload }) => {
      const { variationIndex, optionIndex } = payload;
      if (
        state.data.variations[variationIndex] &&
        state.data.variations[variationIndex].options[optionIndex] !==
          undefined &&
        state.data.variations[variationIndex].options.length >= 2
      ) {
        state.data.variations[variationIndex].options.splice(optionIndex, 1);
        state.data.variations[variationIndex]?.images?.splice(optionIndex, 1);
      }
    },
    updateSku: (state, { payload }) => {
      const { index, field, value } = payload;
      state.data.skus[index][field] = value;
    },
    generateSkusFromVariations: (state, { payload }) => {
      const combinations = payload;
      state.data.skus = combinations.map((combination, index) => ({
        key: index,
        variation: combination.map((option) => option.index).join(" "),
        price: 0,
        stock: 0,
        weight: 0,
        image: null,
      }));
    },
  },
});

export default createProductSlice;
