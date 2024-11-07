import { FaLocationDot } from "react-icons/fa6";
import logo from "@assets/images/logo.svg";

const Checkout = () => {
    return (
        <div className="">
            <div className="flex flex-row items-center bg-white w-full p-5">
                <img src={logo} alt="Logo" className="h-10 w-10 mx-3" />
                <span className="mr-3 pr-3 border-r-2 border-primary text-primary font-bold text-xl whitespace-nowrap">CHỢ MỚI</span>
                <span className="text-xl text-primary whitespace-nowrap">Thanh Toán</span>
            </div>
            <div className="bg-white my-2 p-5">
                <div className="flex flex-row items-center">
                    <FaLocationDot className="size-5 mx-3 text-primary"/>
                    <span className="text-primary text-xl">Địa chỉ nhận hàng</span>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default Checkout;