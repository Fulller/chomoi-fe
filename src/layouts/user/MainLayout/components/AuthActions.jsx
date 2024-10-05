import { useDispatch } from "react-redux";
import { setRedirect } from "@redux/slices/auth.slice";
import { Link, useHref } from "react-router-dom";

export default function AuthActions() {
  const dispatch = useDispatch();
  const href = useHref();

  function handleSaveredirect() {
    dispatch(setRedirect(href));
  }
  return (
    <div className="flex space-x-6">
      <Link
        to="/login"
        className="text-blue-500 hover:underline"
        onClick={handleSaveredirect}
      >
        Đăng nhập
      </Link>
      <Link
        to="/register"
        className="text-blue-500 hover:underline"
        onClick={handleSaveredirect}
      >
        Đăng ký
      </Link>
    </div>
  );
}
