import ProductService from "@services/product.service";
import { useEffect, useState } from "react";
import { message, Select, Pagination, Card, Avatar, List, Button } from "antd";
import { useLocation, Link } from "react-router-dom";
import { PRODUCT_STATUSES } from "@configs/const.config";
import useMessageByApiCode from "@hooks/useMessageByApiCode";

function Review() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || 0);
  const initialStatus = searchParams.get("status") || "PENDING";

  const [productPage, setProductPage] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [status, setStatus] = useState(initialStatus);

  const messageApi = useMessageByApiCode();

  useEffect(() => {
    fetchProductPage();
  }, [page, status]);

  async function fetchProductPage() {
    const [result, error] = await ProductService.adminGetProducts({
      status,
      page,
    });

    if (error) {
      message.info("Không thể load sản phẩm 🙉");
      return;
    }

    console.log('API Response:', result.data);
    setProductPage(result.data);
  }

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(0);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber - 1);
  };

  const handleActionClick = async (productId, status) => {
    const [result, error] = await ProductService.updateProductStatus(productId, status);
    if (error) {
      message.error(messageApi(error.code));
    } else {
      message.success(messageApi(result.code));
      fetchProductPage();
    }
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
        {Object.keys(PRODUCT_STATUSES).map((STATUS) => {
          if (STATUS === "DRAFT") {
            return null;
          }

          return (
            <Select.Option key={STATUS} value={STATUS}>
              {PRODUCT_STATUSES[STATUS].title}
            </Select.Option>
          );
        })}
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
                title={<Link to={`/product/${product.slug}`}>{product.name}</Link>}
                description={
                  <div>
                    <p>Price: {product.minPrice} - {product.maxPrice}</p>
                    <p>Sold: {product.sold}</p>
                    <p>Rating: {product.rating}</p>

                    <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                      <Avatar src={product.shop.avatar} />
                      <span style={{ marginLeft: 8 }}>{product.shop.name}</span>
                    </div>

                    <div style={{ marginTop: 16 }}>
                      {status === "PENDING" && (
                        <>
                          <Button
                            type="primary"
                            onClick={() => handleActionClick(product.id, "ACTIVE")}
                            style={{ marginRight: 8 }}
                          >
                            {PRODUCT_STATUSES.PENDING.actions.ACTIVE}
                          </Button>
                          <Button
                            type="primary" danger
                            onClick={() => handleActionClick(product.id, "REJECTED")}
                          >
                            {PRODUCT_STATUSES.PENDING.actions.REJECTED}
                          </Button>
                        </>
                      )}
                      {status === "ACTIVE" && (
                        <Button
                          type="primary" danger
                          onClick={() => handleActionClick(product.id, "BLOCKED")}
                        >
                          {PRODUCT_STATUSES.ACTIVE.actions.BLOCKED}
                        </Button>
                      )}
                      {status === "BLOCKED" && (
                        <Button
                          type="primary"
                          onClick={() => handleActionClick(product.id, "DRAFT")}
                        >
                          {PRODUCT_STATUSES.BLOCKED.actions.DRAFT}
                        </Button>
                      )}
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








