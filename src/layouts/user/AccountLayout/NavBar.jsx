import { MdOutlineAccountCircle } from "react-icons/md";
import { RiBillLine, RiShoppingCartLine  } from "react-icons/ri";
import { Menu } from 'antd';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountService from "@services/account.service";
const items = [
    {
        label: 'Thông tin tài khoản',
        key: 'account',
        icon: <MdOutlineAccountCircle />,
        children: [
            {
                label: 'Hồ sơ',
                key: 'profile',
                path: "/account/profile"
            },
            {
                label: 'Địa chỉ',
                key: 'address',
                path: "/account/address"
            },
        ],
    },
    {
        label: 'Đơn mua',
        key: 'order',
        icon: <RiBillLine />,
        children: [
            {
                label: 'Tất cả',
                key: 'all',
                path: "/orders/all"
            },
            {
                label: 'Chờ xác nhận',
                key: 'pending',
                path: "/orders/pending"
            },
            {
                label: 'Đang vận chuyển',
                key: 'delivering',
                path: "/orders/delivering"
            },
            {
                label: 'Đã vận chuyển',
                key: 'delivered',
                path: "/orders/delivered"
            },
            {
                label: 'Đã nhận hàng',
                key: 'received',
                path: "/orders/received"
            },
            {
                label: 'Đã hủy',
                key: 'cancelled',
                path: "/orders/cancelled"
            },
            {
                label: 'Trả hàng/Hoàn tiền',
                key: 'refunded',
                path: "/orders/refunded"
            },
        ],
    },
    {
        label: 'Giỏ hàng',
        key: 'cart',
        icon: <RiShoppingCartLine  />,
        path: "/cart",
        children: [
            {
                label: 'Giỏ hàng của tôi',
                key: 'mycart',
                path: "/cart"
            }
        ]
    }
];
function NavBar() {
    const [current, setCurrent] = useState('profile'); // Đặt giá trị mặc định
    const { page } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const [response, apiError] = await AccountService.getUserInfo();
                if (apiError) {
                    setError(apiError.message || "Failed to fetch user data.");
                    return;
                }
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Failed to fetch user data.");
            }
        }

        fetchUserData();
    }, []);

    useEffect(() => {
        setCurrent(page || 'profile'); // Nếu page không có, mặc định là 'profile'
    }, [page]);

    const menuItems = items.map(item => {
        if (item.key === 'account') {
            if (user && user.isLocal) {
                // Thêm "Change Password" nếu user không đăng nhập bằng Google
                const updatedChildren = [
                    ...item.children,
                    {
                        label: 'Đổi mật khẩu',
                        key: 'change-password',
                        path: "/account/change-password"
                    }
                ];
                return { ...item, children: updatedChildren };
            }
        }
        return item;
    });

    return (
        <Menu
            selectedKeys={[current]}
            mode="inline"
            style={{ width: 250 }} // Điều chỉnh chiều rộng của menu
        >
            {menuItems.map(item => (
                <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                    {item.children.map(child => (
                        <Menu.Item key={child.key}>
                            <Link to={child.path}>
                                {child.label}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            ))}
        </Menu>
    );
}
export default NavBar;