import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "@services/auth.service";
import {
  setAccessToken,
  setTokens,
  setUser,
  setIsLogin,
} from "@redux/slices/auth.slice";
import env from "@configs/env.config";

const useInitialApp = () => {
  const dispatch = useDispatch();
  const isLoging = useSelector((state) => state.auth.isLoging);
  const refreshTokenString = useSelector(
    (state) => state.auth.tokens.refreshToken
  );

  const refreshToken = async () => {
    const [result, error] = await AuthService.refreshToken();
    if (error) {
      dispatch(setIsLogin(false));
      dispatch(setTokens({ accessToken: "", refreshToken: "" }));
      return;
    }
    const { accessToken } = result.data;
    dispatch(setAccessToken(accessToken));
    dispatch(setIsLogin(true));
  };

  const fetchUser = async () => {
    const [result, error] = await AuthService.getUserInfo();
    if (error) {
      dispatch(setUser(null));
      return;
    }
    dispatch(setUser(result.data));
  };

  const fetchData = async () => {
    await refreshToken();
    if (!isLoging) return;
    await fetchUser();
  };

  useEffect(() => {
    fetchData();
    if (!isLoging) return;
    const intervalId = setInterval(refreshToken, env.interval_refresh_token);
    return () => clearInterval(intervalId);
  }, [dispatch, isLoging, refreshTokenString]);
};

export default useInitialApp;
