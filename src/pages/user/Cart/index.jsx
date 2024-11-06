import React, { useEffect, useState } from "react";
import { Dropdown, Button, InputNumber, Avatar, Table } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import CartService from "@services/cart.service";
import ProductService from "@services/product.service";
import './Cart.scss';
import { toast } from "react-toastify";
import TollTip from "@components/TollTip";
import {Link} from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const [result, error] = await CartService.getAllCartItems();
    if (error) {
      console.log({ error });
      return;
    }

    const mappedItems = result.data.cartItems.map((item) => {
      const selectedVariationValues = item.sku.variation.split(" ").map((id) => {
        const foundOption = item.product.variations.flatMap(v => 
          v.options.map(option => ({ name: v.name, value: option.value, id: option.id })))
          .find(option => option.id === id);
        return foundOption ? `${foundOption.name}: ${foundOption.value}` : "";
      }).filter(Boolean).join(", ");

      return {
        id: item.skuId,
        name: item.product.name,
        image: item.image || item.product.thumbnail,
        quantity: item.quantity,
        price: item.price,
        shop: item.shop.name,
        selectedVariation: selectedVariationValues,
        productId: item.product.slug,
      };
    });

    setCartItems(mappedItems);
  };

  const handleQuantityChange = async (id, newQuantity) => {
    const [result, error] = await CartService.updateCartItemQuantity({ skuId: id, quantity: newQuantity });
    if (error) {
      toast.error(error.message);
    } else {
      fetchCartItems();
    }
  };

  const handleDelete = async (id) => {
    const [result, error] = await CartService.deleteCartItem(id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
      fetchCartItems();
    }
  };

  const handleMultiDelete = async () => {
    const allSelectedIds = Object.values(selectedItems).flat();
    if (allSelectedIds.length === 0) {
      toast.warning("Vui lòng chọn sản phẩm để xóa!");
      return;
    }
    for (const id of allSelectedIds) {
      const [result, error] = await CartService.deleteCartItem(id);
      if (error) {
        toast.error(`Không thể xóa sản phẩm ID ${id}: ${error.message}`);
      } else {
        toast.success(`Đã xóa sản phẩm khỏi giỏ hàng!`);
      }
    }
    fetchCartItems();
    setSelectedItems({}); 
  };

  const groupedItems = cartItems.reduce((groups, item) => {
    const shop = item.shop;
    groups[shop] = groups[shop] || [];
    groups[shop].push(item);
    return groups;
  }, {});

  const totalPrice = cartItems.reduce((total, item) => {
    if (selectedItems[item.shop]?.includes(item.id)) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  const totalSelectedCount = Object.values(selectedItems).flat().length;

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar shape="square" src={record.image} size={64} className="mr-4" />
          <Link to={`/product/${record.productId}`}>
            <p className="text-blue-500 hover:underline">
              {record.name}
            </p>
          </Link>
          
        </div>
      ),
    },
    {
      title: "Phân loại hàng",
      dataIndex: "variation",
      key: "variation",
      render: (_, record) => (
        <Dropdown
          disabled
          overlay={
            <div className="bg-white border rounded shadow-md">
              {record.selectedVariation.split(", ").map((variation, index) => (
                <Button key={index} type="text" className="w-full text-left px-4 py-2">
                  {variation}
                </Button>
              ))}
            </div>
          }
          trigger={["click"]}
        >
          <Button className="w-full text-left">{record.selectedVariation}</Button>
        </Dropdown>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div className="flex items-center">
          <Button icon={<MinusOutlined />} onClick={() => handleQuantityChange(record.id, Math.max(1, record.quantity - 1))} size="small" />
          <InputNumber min={1} value={record.quantity} onChange={(value) => handleQuantityChange(record.id, value)} className="w-16 mx-2" />
          <Button icon={<PlusOutlined />} onClick={() => handleQuantityChange(record.id, record.quantity + 1)} size="small" />
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString()} VND</span>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <TollTip content="Xóa">
          <Button type="text" icon={<DeleteOutlined className="text-red-500" />} onClick={() => handleDelete(record.id)} />
        </TollTip>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng</h2>
      {Object.entries(groupedItems).map(([shop, items]) => (
        <div key={shop} className="mb-8">
          <div className="flex items-center mb-4">
            <Avatar size={40} src={items[0].image} className="mr-4" />
            <h3 className="text-xl font-semibold">{shop}</h3>
          </div>
          <Table
            dataSource={items}
            columns={columns}
            pagination={false}
            rowKey="id"
            bordered
            className="shadow-lg"
            rowSelection={{
              selectedRowKeys: selectedItems[shop] || [],
              onChange: (selectedRowKeys) => {
                setSelectedItems((prevSelected) => ({
                  ...prevSelected,
                  [shop]: selectedRowKeys,
                }));
              },
            }}
          />
        </div>
      ))}
      <div className="sticky bottom-0 bg-white shadow-lg p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Button type="text" icon={<DeleteOutlined />} onClick={handleMultiDelete} className="mr-2 text-red-500" disabled={totalSelectedCount === 0}/>
          <span className="font-semibold">({totalSelectedCount}) Đã chọn</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-4">Tổng tiền: {totalPrice.toLocaleString()} VND</span>
          <Button type="primary" size="large" disabled={totalSelectedCount === 0}>
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
