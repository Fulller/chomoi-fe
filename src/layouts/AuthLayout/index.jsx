import bg from "../../assets/images/background-auth.svg";

function AuthLayout({ children }) {
  return (
    <div className="auth-layout-container min-h-screen relative">
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default AuthLayout;
