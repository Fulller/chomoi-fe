import { Fragment } from "react";
import { useSelector } from "react-redux";
import MainLayout from "@layouts/MainLayout";
import AccessDeniedPage from "@pages/AccessDeniedPage";
import Title from "@components/Title";

function PrivateRoute({ ...prop }) {
  const isLoging = useSelector((state) => state.auth.isLoging);
  if (!isLoging) {
    return (
      <MainLayout>
        <Title>Không có quyền truy cập</Title>
        <AccessDeniedPage></AccessDeniedPage>
      </MainLayout>
    );
  }
  return <Fragment {...prop}></Fragment>;
}
export default PrivateRoute;
