import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "@redux/slices/auth.slice";

const ReceiveTokens = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = useSelector((state) => state.auth.redirect);
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");
    if (accessToken && refreshToken) {
      dispatch(setTokens({ accessToken, refreshToken }));
      navigate(redirect);
    } else {
      console.error("Missing query parameters!");
      navigate("/login");
    }
  }, [location, navigate]);

  return null;
};

export default ReceiveTokens;
