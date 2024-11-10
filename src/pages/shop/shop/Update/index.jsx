import { useEffect, useReducer, useState } from "react";
import { Upload, message, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ShopService from "@services/shop.service";
import { produce } from "immer";
import defaultShopAvatar from "@assets/images/defaultShopAvatar.webp";
import defaultShopCoverImage from "@assets/images/defaultShopCoverImage.jpg";
import updateShopSchema from "@validations/shop/updateShopSchema";
import UploadsService from "@services/uploads.service";

const initialState = {
  data: { name: "", avatar: "", coverImage: "" },
  error: { name: null, avatar: null, coverImage: null },
};

const reducer = (state, action) => {
  const { type, payload } = action;
  return produce(state, (draft) => {
    switch (type) {
      case "DATA/UPDATE":
        draft.data = payload;
        break;
      case "DATA/FIELD/UPDATE":
        const { field, value } = payload;
        draft.error[field] = null;
        draft.data[field] = value;
        break;
      case "ERROR/EMPTY":
        draft.error = {};
        break;
      case "ERROR/FIELD/UPDATE":
        const { field, value } = payload;
        draft.error[field] = value;
        break;
      default:
        return draft;
    }
  });
};

export default function Update() {
  const navigate = useNavigate();
  const [{ data: shopInfo, error: shopInfoError }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchShopInfo();
  }, []);

  useEffect(() => {
    Object.keys(shopInfoError).forEach((errorField) => {
      shopInfoError[errorField] && message.error(shopInfoError[errorField]);
    });
  }, [shopInfoError]);

  async function fetchShopInfo() {
    const [result, error] = await ShopService.getShopByOwner();
    if (error) return;
    const shopData = result.data;
    dispatch({
      type: "DATA/UPDATE",
      payload: {
        name: shopData.name,
        avatar: shopData.avatar,
        coverImage: shopData.coverImage,
      },
    });
  }

  const handleInputChange = (e) => {
    dispatch({
      type: "DATA/FIELD/UPDATE",
      payload: { field: "name", value: e.target.value },
    });
  };

  const handleImageChange = (file, field) => {
    dispatch({ type: "DATA/FIELD/UPDATE", payload: { field, value: file } });
  };

  const handleValidate = () => {
    const { error } = updateShopSchema.validate(shopInfo);
    if (error) {
      dispatch({ type: "ERROR/EMPTY" });
      error.details.forEach(({ path, message }) => {
        const field = path.join(".");
        dispatch({
          type: "ERROR/FIELD/UPDATE",
          payload: { field, value: message },
        });
      });
      return false;
    }
    return true;
  };

  const handleUpdateMedia = async () => {
    const hasAvatarFile = shopInfo.avatar instanceof File;
    const hasCoverImageFile = shopInfo.coverImage instanceof File;
    let newUpload = {};
    if (hasAvatarFile) {
      const [uploadAvatarResult, uploadAvatarError] =
        await UploadsService.image(shopInfo.avatar);
      if (!uploadAvatarError) {
        newUpload.avatar = uploadAvatarResult.data;
      }
    } else {
      newUpload.avatar = shopInfo.avatar;
    }
    if (hasCoverImageFile) {
      const [uploadCoverImageResult, uploadCoverImageError] =
        await UploadsService.image(shopInfo.coverImage);
      if (!uploadCoverImageError) {
        newUpload.coverImage = uploadCoverImageResult.data;
      }
    } else {
      newUpload.coverImage = shopInfo.coverImage;
    }
    return newUpload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = handleValidate();
    if (!isValid) return;
    const { avatar, coverImage } = await handleUpdateMedia();
    const [, error] = await ShopService.updateShopInfo({
      name: shopInfo.name,
      avatar,
      coverImage,
    });
    setIsLoading(false);
    if (error) {
      message.error(error.message);
      return;
    }
    navigate("/@shop/shop/profile");
  };

  return (
    <Spin spinning={isLoading}>
      <div className="max-w-lg mx-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden mt-10 bg-white">
        <form onSubmit={handleSubmit} className="text-center p-6 space-y-4">
          <div className="relative bg-cover bg-center h-48">
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={({ file }) => handleImageChange(file, "coverImage")}
            >
              <img
                src={
                  shopInfo.coverImage
                    ? shopInfo.coverImage instanceof File
                      ? URL.createObjectURL(shopInfo.coverImage)
                      : shopInfo.coverImage
                    : defaultShopCoverImage
                }
                alt="Shop Cover Image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <EditOutlined className="text-white text-3xl" />
              </div>
            </Upload>
          </div>

          <div className="relative mb-4">
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={({ file }) => handleImageChange(file, "avatar")}
            >
              <div className="relative w-32 h-32 mx-auto">
                <img
                  src={
                    shopInfo.avatar
                      ? shopInfo.avatar instanceof File
                        ? URL.createObjectURL(shopInfo.avatar)
                        : shopInfo.avatar
                      : defaultShopAvatar
                  }
                  alt="Shop avatar"
                  className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-full">
                  <EditOutlined className="text-white text-2xl" />
                </div>
              </div>
            </Upload>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Tên cửa hàng
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={shopInfo.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
            {shopInfoError.name && (
              <p className="text-red-500 text-sm mt-1">{shopInfoError.name}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </Spin>
  );
}
