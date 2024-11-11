import { FaPen } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  navigate("/@shop/order/all");

  return <></>;
}
