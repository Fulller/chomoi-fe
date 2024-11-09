import React, { useState, useEffect } from "react";
import { Rate, Card, Row, Col, Button, Badge, Pagination, Skeleton } from "antd";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import ShopService from "@services/shop.service";
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import ProductService from "@services/product.service";

function ShopPage() {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || 1;
  const size = query.get("size") || 12;

  useEffect(() => {
    if (!query.get("page") || !query.get("size")) {
      query.set("page", page);
      query.set("size", size);
      navigate({ search: query.toString() }, { replace: true });
    } else {
      fetchShopInfo(id);
    }
  }, [id, page, size]);


  const fetchShopInfo = async (id) => {
    try {
      console.log("Fetching shop info for ID:", id);
      const [result, error] = await ShopService.getShopById(id);
      if (error) {
        console.error("Error fetching shop:", error);
        return;
      }
      console.log("Shop result:", result);
  
      const [productsResult, productsError] = await ProductService.getAllByShopId({ shopId: id, page: page - 1, size });
      if (productsError) {
        console.error("Error fetching products:", productsError);
        return;
      }
      console.log("Products result:", productsResult);
  
      setShop(result.data);
      setProducts(productsResult.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  const handlePageChange = (page) => {
    query.set("page", page);
    query.set("size", size);
    navigate({ search: query.toString() });
  };

  if (!shop) {
    // Hiển thị xương (skeleton) hoặc loading khi shop chưa được tải
    return (
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="relative">
          <div className="w-full h-80 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="absolute top-3/4 left-8 transform -translate-y-1/2 flex items-center space-x-4 p-1.5 border-2 bg-black bg-opacity-60 box-border shadow-2xl rounded-lg">
            <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-full border-4 border-white"></div>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md mt-1"></div>
            </div>
          </div>
        </div>
      </div>
      // <p> Đang load...</p>
    );
  }
  

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      {/* Shop Header */}
      <div className="relative shadow-md">
        <img
          src={shop.coverImage || "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-powerpoint-dep-tinh-te-mau-da.jpg"}
          alt="Shop Cover"
          className="w-full h-80 object-cover rounded-lg brightness-75"
        />
        <div className="absolute top-3/4 left-8 transform -translate-y-1/2 flex items-center space-x-4 rounded-lg p-1.5 border-2 border-aliceblue bg-black bg-opacity-60 box-border shadow-2xl">
            <img
                src={shop.avatar || "https://www.91-cdn.com/hub/wp-content/uploads/2019/02/chrome-incognito-featured.jpg"}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-4 border-white object-contain"
            />
            <div className="text-white">
                <h1 className="text-2xl font-bold">{shop.name}</h1>
                <div className="flex items-center space-x-2">
                    <Rate disabled defaultValue={3.5} className="text-lg" allowHalf /> {/* Xếp hạng sao */}
                </div>
                <Badge
                  status={shop?.status === "ACTIVE" ? "success" : "default"}
                  text={<span style={{ color: 'white' }}>{shop?.status === "ACTIVE" ? "Hoạt động" : "Tạm ngừng"}</span>}
                />
            </div>
        </div>
    
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sản phẩm nổi bật</h2>
        <Row gutter={[16, 24]}>
          {products.content.map((product, index) =>(
            <Col span={6}>
               <Link to={`/product/${product.slug}`}>
                <Card
                  hoverable
                  cover={<img alt="Product 1" src={product.thumbnail} />}
                >
                  <div className='flex-grow flex flex-col justify-between' style={{paddingTop: '-8px'}}>
                    <h3 className='product-name p-px'>{product.name}</h3>
                    <p className='text-red-400 font-semibold'>{product.minPrice} - {product.maxPrice} VND</p>
                      <div className="flex justify-between">
                        <Rate disabled defaultValue={product.rating || 4.5} style={{ fontSize: "14px" }} allowHalf className="leading-5"/>
                        <p className="text-gray-400">{product.sold} Đã bán</p>
                      </div>
                  </div>
                </Card>
               </Link>
          </Col>
          ))}
          
        </Row>
        <Row justify="center" style={{ marginTop: "20px" }}>
                <Pagination onChange={handlePageChange} current={page} total={products.totalElements} />
              
            </Row>
      </div>
    </div>
  );
}
export default ShopPage;
