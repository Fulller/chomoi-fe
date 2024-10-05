import { configureStore } from "@reduxjs/toolkit";
import { setLS } from "@tools/localStorage.tool";

import authReducer from "./slices/auth.slice";
import settingReducer from "./slices/setting.slice";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  // Đây là các slide sẽ được lưu ở localStogare khi thay đổi, để khi load lại trang
  // Thì vẫn còn dữ liệu trước đó.
  setLS("auth", state.auth);
  setLS("settings", state.setting);
  return result;
};

export default configureStore({
  reducer: {
    auth: authReducer,
    setting: settingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
