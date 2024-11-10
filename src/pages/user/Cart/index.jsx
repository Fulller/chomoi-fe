import React, { useEffect, useState } from "react";
import { Dropdown, Button, InputNumber, Avatar, Table, Image } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import CartService from "@services/cart.service";
import "./Cart.scss";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import commonSlice from "@redux/slices/common.slice";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [isSameShop, setIsSameShop] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Hàm để kiểm tra xem tất cả các sản phẩm được chọn có cùng shop hay không
  const checkSameShop = () => {
    const selectedShops = Object.keys(selectedItems).filter(
      (shop) => selectedItems[shop]?.length > 0
    );
    setIsSameShop(selectedShops.length === 1); // Nếu chỉ có 1 shop được chọn, thì isSameShop = true
  };

  // Cập nhật lại khi selectedItems thay đổi
  useEffect(() => {
    checkSameShop();
  }, [selectedItems]);

  // Hàm để xử lý sự thay đổi khi chọn hoặc bỏ chọn các sản phẩm
  const handleRowSelectionChange = (shop, selectedRowKeys) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [shop]: selectedRowKeys,
    }));
  };

  const fetchCartItems = async () => {
    setIsloading(true);
    const [result, error] = await CartService.getAllCartItems();
    if (error) {
      console.log({ error });
      return;
    }

    const mappedItems = result.data.cartItems.map((item) => {
      const selectedVariationValues = item.sku.variation
        .split(" ")
        .map((id) => {
          const foundOption = item.product.variations
            .flatMap((v) =>
              v.options.map((option) => ({
                name: v.name,
                value: option.value,
                id: option.id,
              }))
            )
            .find((option) => option.id === id);
          return foundOption ? `${foundOption.name}: ${foundOption.value}` : "";
        })
        .filter(Boolean)
        .join(", ");

      return {
        cartItemId: item.cartItemId,
        id: item.skuId,
        name: item.product.name,
        image: item.image || item.product.thumbnail,
        quantity: item.quantity,
        price: item.price,
        shopImage: item.shop.avatar,
        shopId: item.shop.id,
        shop: item.shop.name,
        shopId: item.shop.id,
        selectedVariation: selectedVariationValues,
        productId: item.product.id,
      };
    });

    setCartItems(mappedItems);
    setIsloading(false);
  };

  const handleQuantityChange = async (id, newQuantity) => {
    const [result, error] = await CartService.updateCartItemQuantity({
      skuId: id,
      quantity: newQuantity,
    });
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
      dispatch(commonSlice.actions.descreaseTotalItem());
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
    dispatch(commonSlice.actions.ZeroTotalItem());
    fetchCartItems();
    setSelectedItems({});
    setSelectedCartItems([]); // Reset selectedCartItems after deletion
  };

  const handleRowSelectionChange = (selectedRowKeys, selectedRows, shopIdItem, shop) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [shop]: selectedRowKeys,
    }));

    // setSelectedCartItems((prevSelectedCartItems) => {

    //   if (selectedRows.length === 0) {
    //     // Nếu không có item nào được chọn từ shop này, xóa nhóm `shopId` khỏi `selectedCartItems`
    //     return prevSelectedCartItems.filter((group) => group.shopId !== shopIdItem);
    //   }

    //   const newSelectedItems = selectedRows.map((item) => item);

    //   // Nhóm các items mới theo `shopId`
    //   const groupedItems = newSelectedItems.reduce((acc, item) => {
    //     const shopId = item.shopId;
    //     const shopName = shop;
    //     if (!acc[shopId]) {
    //       acc[shopId] = { shopId, shopName, items: [] };
    //     }
    //     acc[shopId].items.push(item);
    //     return acc;
    //   }, {});

    //   // Cập nhật `selectedCartItems` với các items mới và xóa nhóm không còn item nào
    //   const updatedCartItems = prevSelectedCartItems
    //     .map((group) => {
    //       const newGroup = groupedItems[group.shopId];

    //       if (newGroup) {
    //         // Cập nhật nhóm hiện có với các items mới
    //         const updatedItems = group.items
    //           .filter((existingItem) => newGroup.items.some((newItem) => newItem.id === existingItem.id))
    //           .concat(newGroup.items.filter(
    //             (newItem) => !group.items.some((existingItem) => existingItem.id === newItem.id)
    //           ));

    //         return { shopId: group.shopId, items: updatedItems };
    //       }
    //       // Giữ nhóm hiện có nếu không có thay đổi
    //       return group;
    //     })
    //     .filter(group => group.items.length > 0); // Xóa các nhóm không có item nào

    //   // Thêm các nhóm mới từ `groupedItems` mà không có trong `prevSelectedCartItems`
    //   Object.values(groupedItems).forEach((newGroup) => {
    //     if (!updatedCartItems.some((group) => group.shopId === newGroup.shopId)) {
    //       updatedCartItems.push(newGroup);
    //     }
    //   });

    //   // Xóa lại các nhóm trống sau khi cập nhật xong
    //   return updatedCartItems.filter(group => group.items.length > 0);
    // });
    setSelectedCartItems(() => {
      if (selectedRows.length === 0) {
        // Nếu không có item nào được chọn từ shop này, xóa `selectedCartItems`
        return {}; // Hoặc `{ shopId: null, shopName: null, items: [] }` nếu muốn giữ cấu trúc rỗng
      }

      const newSelectedItems = selectedRows.map((item) => item);

      // Tạo đối tượng chứa `shopId`, `shopName` và danh sách `items`
      const updatedCartItems = {
        shopId: shopIdItem,
        shopName: shop,
        items: newSelectedItems,
      };

      return updatedCartItems;
    });
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

  const handleRedirectCheckout = () => {
    navigate('/checkout', { state: { selectedCartItems } });
  }

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      width: "40%",
      render: (_, record) => (
        <div className="flex items-center">
          <Image
            width={200}
            src={record.image}
            alt="Hình ảnh sản phẩm"
            className="mr-2"
          />
          <Link to={`/product/${record.productId}`}>
            <Tooltip title="Click để xem chi tiết">
              <p className="text-blue-500 hover:underline ml-2">
                {record.name}
              </p>
            </Tooltip>
          </Link>
        </div>
      ),
    },
    {
      title: "Phân loại hàng",
      dataIndex: "variation",
      key: "variation",
      width: "25%",
      render: (_, record) => (
        <div className="text-red-300 font-medium">
          {record.selectedVariation.split(", ").map((variation, index) => (
            <p key={index} type="text" className="w-full text-left px-4 py-2">
              {variation || "Không có"}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: "15%",
      render: (_, record) => (
        <div className="flex items-center">
          <Tooltip title="Giảm">
            <Button
              icon={<MinusOutlined />}
              onClick={() =>
                handleQuantityChange(
                  record.id,
                  Math.max(1, record.quantity - 1)
                )
              }
              size="small"
            />
          </Tooltip>
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(value) => handleQuantityChange(record.id, value)}
            className="w-16 mx-2"
          />
          <Tooltip title="Tăng">
            <Button
              icon={<PlusOutlined />}
              onClick={() =>
                handleQuantityChange(record.id, record.quantity + 1)
              }
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "15%",
      render: (price) => <span>{price.toLocaleString()} VND</span>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Tooltip title="Xóa">
          <Button
            type="text"
            icon={<DeleteOutlined className="text-red-500" />}
            onClick={() => handleDelete(record.id)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng</h2>
      {Object.entries(groupedItems).map(([shop, items]) => (
        <div key={shop} className="mb-8">
          <Link to={`/shop/${items[0].shopId}`}>
            <div className="flex items-center mb-4">
              <Avatar size={40} src={items[0].shopImage} className="mr-4" />
              <h3 className="text-xl font-semibold">{shop}</h3>
            </div>
          </Link>
          <Table
            dataSource={items}
            columns={columns}
            pagination={false}
            rowKey="id"
            bordered
            className="shadow-lg"
            rowSelection={{
              selectedRowKeys: selectedItems[shop] || [],
              onChange: (selectedRowKeys) =>
                handleRowSelectionChange(shop, selectedRowKeys),
            }}
          />
        </div>
      ))}

      {/* Sticky Footer */}
      <div
        className={`sticky bottom-0 shadow-lg p-4 flex justify-between items-center ${
          totalSelectedCount === 0 ? "bg-white" : "bg-red-200 rounded"
        }`}
      >
        <div className="flex items-center">
          <Tooltip title="Xóa tất cả đã chọn!" overlayStyle={{ zIndex: 10000 }}>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={handleMultiDelete}
              className="mr-2 text-red-500"
              disabled={totalSelectedCount === 0}
            />
          </Tooltip>
          <span className="font-semibold">({totalSelectedCount}) Đã chọn</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-4">
            Tổng tiền: {totalPrice.toLocaleString()} VND
          </span>
          <Button
            type="primary"
            size="large"
            disabled={totalSelectedCount === 0 || !isSameShop}
            onClick={() => {
              console.log(selectedItems);
            }}
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default Cart;
