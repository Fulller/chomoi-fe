import ShopService from "@services/shop.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultShopCoverImage from "@assets/images/defaultShopCoverImage.jpg";
import defaultShopAvatar from "@assets/images/defaultShopAvatar.webp";

function Profile() {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/@shop/shop/profile/edit");
  };

  const [shopInfo, setShopInfo] = useState({});
  useEffect(() => {
    fetchShopInfo();
  }, []);

  async function fetchShopInfo() {
    const [result] = await ShopService.getShopByOwner();
    setShopInfo(result.data);
  }

  return (
    <div className="max-w-lg mx-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div
        className="relative w-full h-48 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${
            shopInfo.coverImage || defaultShopCoverImage
          })`,
        }}
      >
        <img
          src={shopInfo.avatar || defaultShopAvatar}
          alt="Shop Avatar"
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 w-28 h-28 rounded-full border-4 border-white shadow-lg"
        />
      </div>
      <div className="text-center pt-16 pb-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800">{shopInfo.name}</h2>
        <p className="text-gray-500 mt-1">
          Rating: {shopInfo.rating || "N/A"} / 5
        </p>
        <button
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          onClick={navigation}
        >
          Chỉnh sửa thông tin
        </button>
      </div>
    </div>
  );
}

export default Profile;
