import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "@redux/slices/auth.slice";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTokens({ accessToken: "", refreshToken: "" }));
    dispatch(setUser(null));
    navigate("/");
  }, [location, navigate]);

  return null;
};

export default LogOut;
