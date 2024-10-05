import logo from "@assets/images/logo.svg";

function HeaderForm({ children }) {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
        <span className="font-bold text-2xl whitespace-nowrap">CHỢ CŨ</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-700 mt-6 w-full text-left">
        {children}
      </h2>
    </div>
  );
}

export default HeaderForm;
