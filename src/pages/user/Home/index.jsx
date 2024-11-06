import { Card, Space, Col, Divider, Row, Pagination, Rate } from 'antd';
import { useState, useEffect } from 'react';  
import ImageCarousel from './Carousel';
import HomeService from '@services/product.service';
import {  useLocation, useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const query =  new URLSearchParams(location.search);
  const page = query.get("page") || 1;
  const size = query.get("size") || 8;
  const [products, setProduct] = useState([]);
  
  


  console.log({location})

  useEffect(() => {
    // Kiểm tra và cập nhật URL nếu thiếu page hoặc size
    if (!query.get("page") || !query.get("size")) {
      query.set("page", page);
      query.set("size", size);
      navigate({ search: query.toString() }, { replace: true });
    } else {
      fetchProducts();
    }
  }, [location.search]);

  async function fetchProducts(){
    const [result, error] = await HomeService.getProducts({ page: page-1, size});
    if (error) {
      console.log({ error });
      return;
    }
    setProduct(result.data.content);
   
  }

  const handlePageChange = (page) => {
    query.set("page", page);
    query.set("size", size);
    navigate({search: query.toString()});
  };

  return (
    <div>
      <div>
        <ImageCarousel />
      </div>
    
    <div className='container'>
      

      <Divider orientation="left">Danh Mục Sản Phẩm</Divider>

      <Row>
        <Col span={20} offset={2}>
        <Row gutter={[16, 16]} >
            {/* Sử dụng map để tạo Card cho mỗi sản phẩm */}
            {products.map((product) => (
              <Col key={product.id} className="gutter-row sm:span-12 md:span-8 lg:span-6" span={6} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/product/${product.slug}`}>
                <Card
                  className="w-auto h-72 mx-auto rounded-lg hover:shadow-lg flex flex-col gutter-row"
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
                      <h3>{product.name}</h3>
                      <p>{product.minPrice.toLocaleString()} VND</p>
                      <div>
                        <Rate disabled defaultValue={product.rating} style={{ fontSize: "14px" }} />
                      </div>
                    </div>
                  </div>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Pagination onChange={handlePageChange} defaultCurrent={page} total={50}  />
        </Row>
        </Col>
      </Row>
    </div>
    </div>
  );
}

