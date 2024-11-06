import AuthService from "@services/auth.service";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setTokens } from "@redux/slices/auth.slice";

export default function UpgradeToShop() {
  const [shopName, setShopName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpgrade = async () => {
    if (!shopName.trim()) {
      toast.error("Vui lòng nhập tên cửa hàng.");
      return;
    }

    const [result, error] = await AuthService.upgradeToShop({ shopName });
    if (error) {
      toast.error("Đăng ký cửa hàng thất bại: " + error.message);
      return;
    }
    const [newTokensResult, newTokensError] = await AuthService.newTokens();
    if (newTokensError) {
      toast.error("newTokensError newTokensError: " + error.message);
      return;
    }
    dispatch(setTokens(newTokensResult.data));
    toast.info("Đăng ký cửa hàng thành công: " + result.message);
    navigate("/@shop");
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full flex flex-col items-center gap-6 mt-[10%]">
        <h1 className="text-2xl font-bold text-cyan-600">Đăng Ký Cửa Hàng</h1>
        <div className="w-full">
          <label className="text-gray-700 text-lg">Tên cửa hàng</label>
          <input
            type="text"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder="Nhập tên cửa hàng"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            spellCheck="false"
          />
        </div>
        <button
          className="w-full py-3 bg-cyan-600 text-white rounded-lg font-semibold text-lg hover:bg-cyan-700 transition-all duration-300"
          onClick={handleUpgrade}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}
