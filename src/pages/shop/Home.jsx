import { FaPen } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/shops/edit");
  };

  return (
    <div>
      <div className="flex flex-col bg-gray-200 p-2 w-full justify-center items-center">
        <div>
          <img
            src="https://placehold.co/200"
            alt=""
            className="w-50 rounded-full"
          />
        </div>
        <div className="font-bold text-base mt-1 text-cyan-500">
          Phan Gia Bảo
        </div>
        <div className="flex gap-2">
          <div>
            Số lượng sản phẩm: <span className="text-yellow-500">05</span>
          </div>
          <div>|</div>
          <div>
            Rating: <span className="text-yellow-500">4.5</span>
          </div>
          <FaStarHalfStroke></FaStarHalfStroke>
        </div>
        <div className="flex gap-2 text-cyan-500 ">
          <button className="italic underline" onClick={navigation}>
            Chỉnh sửa thông tin cá nhân{" "}
          </button>
          <FaPen />
        </div>
      </div>
    </div>
  );
}
