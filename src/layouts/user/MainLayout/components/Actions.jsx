import ToolTip from "@components/TollTip";
import { v4 as uuidv4 } from "uuid";
import { LuShoppingCart } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import commonSelector from "@redux/selector/common.selector";

export default function Actions() {
  const isLoging = useSelector((state) => state.auth.isLoging);
  const cartCount = useSelector(commonSelector.getTotalCartItem);
  const orderCount = useSelector(commonSelector.getTotalOrder);

  const menu = [
    {
      title: "Giỏ hàng",
      icon: LuShoppingCart,
      path: "/cart",
      count: cartCount,
    },
    {
      title: "Đơn hàng",
      icon: FiShoppingBag,
      path: "/orders/all",
      count: orderCount,
    },
  ];

  return (
    <div className="menuAction flex items-center space-x-6">
      {isLoging && (
        <>
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <ToolTip key={uuidv4()} content={item.title}>
                <Link
                  to={item.path}
                  className="menuAction-item relative flex items-center whitespace-nowrap space-x-2 rounded-full"
                >
                  <Icon size={30} />
                  {item.count > 0 && (
                    <span className="badge absolute top-[-8px] right-[-8px] rounded-full bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </Link>
              </ToolTip>
            );
          })}
        </>
      )}
    </div>
  );
}
