import { produce } from "immer";

const defaultSku = {
  price: 0,
  stock: 0,
  weight: 0,
  variation: "",
  image: null,
};

const initialState = {
  data: {
    id: "",
    name: "",
    description: "",
    thumbnail: null,
    video: null,
    categoryId: null,
    isSimple: false,
    status: "DRAFT",
    variations: [
      // {
      //   id: "",
      //   name: "",
      //   options: [
      //     {
      //       id: "",
      //       value: "",
      //     },
      //   ],
      // },
    ],
    skus: [
      defaultSku,
      {
        id: "",
        price: 0,
        stock: 0,
        status: "PENDING",
        weight: 0,
        isDefault: false,
        slug: null,
        variation:
          "75a72d83-fd32-4256-90a3-f913a4324691 0545ab47-b493-4d6d-8066-cbc34ebdbc33",
        image:
          "https://res.cloudinary.com/dt2tfpjrm/image/upload/v1730777295/chomoi_v1/71344304-2220-44fb-9c74-ced939a76978/images/q2t7enco1agb45ofh1fd.webp",
      },
    ],
    images: [
      // {
      //   id: "",
      //   path: "",
      // },
    ],
    productAttributes: [{}],
  },
  error: {},
};

const dataReducers = {
  "FIELD/UPDATE": (state, payload) => {
    const { field, value } = payload;
    state.data[field] = value;
    state.error[field] = null;
  },
};

const errorReducers = {
  "ERROR/ALL/SET-EMPTY": (state) => {
    state.error = {};
  },
  "ERROR/FIELD/UPDATE": (state, payload) => {
    const { field, value } = payload;
    state.error[field] = value;
  },
};

function reducer(state, action) {
  const { type, payload } = action;
  return produce(state, (draft) =>
    ({ ...dataReducers, ...errorReducers }[type](draft, payload))
  );
}

export { initialState, reducer };
