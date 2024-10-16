import MainLayout from "@layouts/user/MainLayout";
import NavBar from "./NavBar";
import "./AccountLayout.scss";
function AccountLayout({ children }) {
    return (
        <MainLayout>
            <div id="account-layout">
                <NavBar></NavBar>
                <div id="account-layout-page">{children}</div>
            </div>
        </MainLayout>
    );
}
export default AccountLayout;