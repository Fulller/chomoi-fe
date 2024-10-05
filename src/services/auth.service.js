import { getAuthUrl } from "@tools/url.tool";
import axios, { service } from "@tools/axios.tool";
import store from "@redux/store.redux";

const AuthService = {
  login({ email, password }) {
    return service(axios.post(getAuthUrl("/login"), { email, password }));
  },
  register({ email, password }) {
    return service(axios.post(getAuthUrl("/register"), { email, password }));
  },
  refreshToken() {
    const { refreshToken } = store.getState().auth.tokens;
    return service(axios.post(getAuthUrl("/refresh-token"), { refreshToken }));
  },
  getUserInfo() {
    return service(axios.get(getAuthUrl("/info")));
  },
  forgotPassword(email) {
    return service(axios.post(getAuthUrl("/forgot-password"), { email }));
  },
  forgotPasswordVerify({ code, newPassword }) {
    return service(
      axios.post(getAuthUrl("/forgot-password/verify"), { code, newPassword })
    );
  },
};

export default AuthService;
