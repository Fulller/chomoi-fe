import { createSlice } from "@reduxjs/toolkit";
import { getLS } from "@tools/localStorage.tool";

const settingSlice = createSlice({
  name: "setting",
  initialState: getLS("settings", { theme: "light" }),
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = settingSlice.actions;
export default settingSlice.reducer;
