import { useParams } from "react-router-dom";
import Address from "./Address";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";

const page = {
  profile: Profile,
  address: Address,
  "change-password": ChangePassword,
};
function Account() {
  const params = useParams();
  const Page = page[params.page] || Profile;
  return <Page></Page>;
}
export default Account;
