import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "@services/auth.service";
import CartService from "@services/cart.service";
import OrderService from "@services/order.service";
import {
  setAccessToken,
  setTokens,
  setUser,
  setIsLogin,
} from "@redux/slices/auth.slice";
import commonSlice from "@redux/slices/common.slice";
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
      dispatch(setUser(null));
      return;
    }
    const { accessToken } = result.data;
    dispatch(setAccessToken(accessToken));
    dispatch(setIsLogin(true));
  };

  const fetchUser = async () => {
    const [getUserInfoResult, getUserInfoError] =
      await AuthService.getUserInfo();
    if (getUserInfoError) {
      dispatch(setUser(null));
      return;
    }
    dispatch(setUser(getUserInfoResult.data));
  };

  const fetchTotalCartItem = async () => {
    const [result, error] = await CartService.getAllCartItems();
    if (error) {
      return;
    }
    dispatch(
      commonSlice.actions.setTotalCartItem(result.data.cartItems.length)
    );
  };

  const fetchTotalOrder = async () => {
    const [result, error] = await OrderService.getAll();
    if (error) {
      return;
    }
    dispatch(
      commonSlice.actions.setTotalOrder(
        result.filter((o) => !["CANCELLED", "RECEIVED"].includes(o.status))
          .length
      )
    );
  };

  const fetchData = async () => {
    await refreshToken();
    if (!isLoging) return;
    await Promise.all([fetchUser(), fetchTotalCartItem(), fetchTotalOrder()]);
  };

  useEffect(() => {
    fetchData();
    if (!isLoging) return;
    const intervalId = setInterval(refreshToken, env.interval_refresh_token);
    return () => clearInterval(intervalId);
  }, [dispatch, isLoging, refreshTokenString]);
};

export default useInitialApp;
