import { useSelector } from "react-redux";
import AccessDeniedPage from "@components/AccessDeniedPage";
import Title from "@components/Title";

import _ from "lodash";

function PrivateRoute({ AccessDeniedLayout, role, children }) {
  const isLoging = useSelector((state) => state.auth.isLoging);
  const roles = useSelector((state) => state.auth?.user?.roles) || [];

  if (!isLoging || !roles.includes(role)) {
    return (
      <AccessDeniedLayout>
        <Title>Không có quyền truy cập</Title>
        <AccessDeniedPage></AccessDeniedPage>
      </AccessDeniedLayout>
    );
  }
  return children;
}
export default PrivateRoute;
