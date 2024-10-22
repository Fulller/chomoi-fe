import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/@admin/product/review");
  }, []);
  return <Fragment></Fragment>;
}
