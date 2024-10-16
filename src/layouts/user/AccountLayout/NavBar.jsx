import { MdOutlineAccountCircle } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { Menu } from 'antd';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
            {
                label: 'Đổi mật khẩu',
                key: 'change-password',
                path: "/account/change-password"
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
                label: 'Hoàn thành',
                key: 'delivered',
                path: "/orders/delivered"
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
];
function NavBar() {
    const [current, setCurrent] = useState('profile'); // Đặt giá trị mặc định
    const { page } = useParams();
    useEffect(() => {
        setCurrent(page || 'profile'); // Nếu page không có, mặc định là 'profile'
    }, [page]);
    return (
        <Menu
            selectedKeys={[current]}
            mode="inline"
            style={{ width: 250 }} // Điều chỉnh chiều rộng của menu
        >
            {items.map(item => (
                <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                    {item?.children?.map(child => (
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