import ProductService from "@services/product.service";
import { useEffect, useState } from "react";
import { message, Select, Pagination, Card, Avatar, List } from "antd";
import { useLocation, Link } from "react-router-dom";
import { PRODUCT_STATUSES } from "@configs/const.config";

function Review() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || 0);
  const initialStatus = searchParams.get("status") || "PENDING";

  const [productPage, setProductPage] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    fetchProductPage();
  }, [page, status]);

  async function fetchProductPage() {
    const [result, error] = await ProductService.adminGetProducts({
      status,
      page,
    });
    if (error) {
      message.info("Không thể load product 🙉");
      return;
    }
    setProductPage(result.data);
  }

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(0);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber - 1);
  };

  if (!productPage) {
    return null;
  }

  return (
    <div>
      <Select
        value={status}
        onChange={handleStatusChange}
        style={{ width: 200, marginBottom: 16 }}
      >
        {Object.keys(PRODUCT_STATUSES).map((STATUS) => (
          <Select.Option value={STATUS}>
            {PRODUCT_STATUSES[STATUS].title}
          </Select.Option>
        ))}
      </Select>

      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={productPage.content}
        renderItem={(product) => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt="thumbnail" src={product.thumbnail} />}
            >
              <Card.Meta
                title={
                  <Link to={`/product/${product.slug}`}>{product.name}</Link>
                }
                description={
                  <div>
                    <p>
                      Giá: {product.minPrice} - {product.maxPrice}
                    </p>
                    <p>Đã bán: {product.sold}</p>
                    <p>Đánh giá: {product.rating}</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <Avatar src={product.shop.avatar} />
                      <span style={{ marginLeft: 8 }}>{product.shop.name}</span>
                    </div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />

      <Pagination
        current={page + 1}
        total={productPage.totalElements}
        pageSize={10}
        onChange={handlePageChange}
        style={{ marginTop: 16 }}
      />
    </div>
  );
}

export default Review;
