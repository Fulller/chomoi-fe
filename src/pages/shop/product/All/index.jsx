import { useEffect, useState } from "react";
import { Table, Button, Tabs, Tag, message, Spin, Skeleton } from "antd";
import ProductService from "@services/product.service";
import { useNavigate } from "react-router-dom";
import { STATUS_ACTIONS } from "./const";

function All() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("DRAFT");
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState({
    isLoading: false,
    productId: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductPage();
  }, []);

  async function fetchProductPage() {
    setLoading(true);
    const [result, error] = await ProductService.getAllByRoleShop();
    setLoading(false);
    if (error) {
      message.error("Không thể tải danh sách sản phẩm");
      return;
    }
    setProducts(result.data);
  }

  async function updateProductStatus(productId, newStatus) {
    setLoadingStatus({ isLoading: true, productId });
    const [result, error] = await ProductService.shopChangeStatus(
      productId,
      newStatus
    );
    setLoadingStatus({ isLoading: false, productId: null });
    if (error) {
      message.error("Cập nhật trạng thái thất bại");
      return;
    }
    message.success("Cập nhật trạng thái thành công");
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, status: newStatus } : product
      )
    );
  }

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Số lượng bán", dataIndex: "sold", key: "sold" },
    { title: "Đánh giá", dataIndex: "rating", key: "rating" },
    { title: "Danh mục", dataIndex: ["category", "name"], key: "category" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "DRAFT"
              ? "gray"
              : status === "PENDING"
              ? "orange"
              : "green"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons flex-col space-y-2">
          {STATUS_ACTIONS[status].actions.map((action) => (
            <Button
              key={action.status}
              onClick={() => updateProductStatus(record.id, action.status)}
              loading={
                loadingStatus.isLoading && loadingStatus.productId == record.id
              }
            >
              {action.title}
            </Button>
          ))}
          <Button
            type="primary"
            onClick={() => navigate(`/@shop/product/edit/${record.id}`)}
          >
            Chỉnh sửa
          </Button>
        </div>
      ),
    },
  ];

  const tabItems = Object.keys(STATUS_ACTIONS).map((statusKey) => ({
    key: statusKey,
    label: STATUS_ACTIONS[statusKey].title,
  }));

  return (
    <div className="all-products">
      <Tabs defaultActiveKey="DRAFT" onChange={setStatus} items={tabItems} />
      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={products.filter((p) => p.status === status)}
          rowKey="id"
          pagination={false}
        />
      )}
    </div>
  );
}

export default All;
