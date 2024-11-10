import { Card, Col, Divider, Row, Pagination, Rate, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import SearchService from '@services/product.service';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Search.scss'

const Search = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const queryParams  = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 1;
  const size = queryParams.get("size") || 20;
  const query = queryParams.get("query") || "";
  const [productsPage, setProductsPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Cập nhật URL nếu thiếu page hoặc size
    if (!queryParams.get("page") || !queryParams.get("size")) {
        queryParams.set("page", page);
        queryParams.set("size", size);
      navigate({ search: queryParams.toString() }, { replace: true });
    } else {
      fetchProducts();
    }
  }, [location.search]);

  async function fetchProducts() {
    setIsLoading(true);
    const [result, error] = await SearchService.search({ page: page - 1, size , query});
    if (error) {
      console.log({ error });
      return;
    }
    setProductsPage(result.data);
    setIsLoading(false);
  }
  const handlePageChange = (page) => {
    queryParams.set("page", page);
    queryParams.set("size", size);
    navigate({ search: queryParams.toString() });
  };

  return (
    <div>
      <div className='container'>
        <Divider orientation="center">Kết quả tìm kiếm</Divider>
        <Row>
          <Col span={20} offset={2}>
            <Row gutter={[16, 16]}>
              {isLoading ? (
                // Hiển thị bộ xương cho sản phẩm khi đang tải
                Array.from({ length: 20 }).map((_, index) => (
                  <Col key={index} span={6} xs={24} sm={12} md={8} lg={6}>
                    <Card className="w-auto h-80 mx-auto rounded-lg flex flex-col" bodyStyle={{ padding: "0" }}>
                      <Skeleton.Image className="rounded-t-lg w-full h-48 object-cover" />
                      <div className='pl-2.5 pt-2.5'>
                        <Skeleton active paragraph={{ rows: 1 }} title={{ width: '80%' }} />
                        <Skeleton active paragraph={{ rows: 1 }} title={{ width: '50%' }} />
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                // Hiển thị dữ liệu thật khi tải xong
                productsPage.content.map((product) => (
                  <Col key={product.id} span={6} xs={24} sm={12} md={8} lg={6}>
                    <Link to={`/product/${product.slug}`}>
                      <Card
                        className="w-auto h-80 mx-auto rounded-lg hover:shadow-lg flex flex-col"
                        hoverable
                        bodyStyle={{ padding: "0" }}
                      >
                        <img
                          className='rounded-t-lg w-full h-48 object-cover' 
                          src={product.thumbnail}
                          alt={product.name}
                        />
                        <div className='flex-grow flex flex-col justify-between'>
                          <div className='pl-2.5 pt-2.5'>
                            <h3 className='product-name p-px'>{product.name}</h3>
                            <p className='text-red-400 font-semibold'>{product.minPrice.toLocaleString()} - {product.maxPrice.toLocaleString()} VND</p>
                            <div>
                              <Rate disabled defaultValue={product.rating || 4.5} style={{ fontSize: "14px" }} allowHalf />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </Col>
                  
                ))
              )}
            </Row>

            <Row justify="center" style={{ marginTop: "20px" }}>
              {isLoading ? (
                <Skeleton.Button active size="large" style={{ width: 200 }} />
              ) : (
                <Pagination onChange={handlePageChange} current={page} total={productsPage.totalElements} pageSize={size}/>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Search;