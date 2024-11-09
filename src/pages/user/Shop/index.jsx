import React, { useState, useEffect } from "react";
import { Rate, Card, Row, Col, Button, Badge } from "antd";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import ShopService from "@services/shop.service";
import { useParams } from 'react-router-dom';
import ProductService from "@services/product.service";

function ShopPage() {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchShopInfo(id);
  }, [id]);

  const fetchShopInfo = async (id) => {
    const [result, error] = await ShopService.getShopById(id);
    //const [products, errors] = await ProductService.get
    if(error) {
      console.log("Error fetching shop info:", error);
      //return;
    }
    else{
      setShop(result.data);
    }
  }
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
                src={shop.avatar || <AntDesignOutlined />}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-4 border-white"
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
          {}
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 1" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 1" description="₫100.000" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ShopPage;
