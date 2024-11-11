import ProductService from "@services/product.service";
import { message, InputNumber, Button, Table, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Stock() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [isFetching, setIsFetching] = useState(true); // Thêm state này để kiểm tra trạng thái tải dữ liệu

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    setIsFetching(true);
    const [result, error] = await ProductService.getProductById(productId);
    setIsFetching(false);
    if (error) {
      message.error("Lấy thông tin sản phẩm thất bại");
    } else {
      setProduct(result.data);
    }
  }

  async function updateStock(skuId, quantity) {
    setLoading(true);
    const [result, error] = await ProductService.updateStock(skuId, quantity);
    setLoading(false);
    console.log({ result, error });
    if (error) {
      message.error("Cập nhật kho hàng thất bại");
    } else {
      message.success("Cập nhật kho hàng thành công");
      fetchProduct();
    }
  }

  const handleQuantityChange = (skuId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [skuId]: value,
    }));
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => <img src={image} alt="SKU" width={50} />,
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Số lượng tồn kho",
      dataIndex: "stock",
      render: (stock) => stock,
    },
    {
      title: "Cập nhật kho",
      dataIndex: "id",
      render: (skuId, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <InputNumber
            min={1}
            placeholder="Số lượng"
            onChange={(value) => handleQuantityChange(skuId, value)}
          />
          <Button
            type="primary"
            onClick={() => updateStock(skuId, quantities[skuId] || 0)}
            loading={loading}
            disabled={!quantities[skuId]}
          >
            + Thêm
          </Button>
          <Button
            type="danger"
            onClick={() => updateStock(skuId, -(quantities[skuId] || 0))}
            loading={loading}
            disabled={!quantities[skuId]}
          >
            - Giảm
          </Button>
        </div>
      ),
    },
  ];

  if (isFetching) {
    return <Skeleton active paragraph={{ rows: 5 }} />;
  }

  return (
    <div>
      <h1>Quản lý kho sản phẩm: {product.name}</h1>
      <Table
        columns={columns}
        dataSource={product.skus.map((sku) => ({ ...sku, key: sku.id }))}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}

export default Stock;
