import React from "react";
import { Rate, Card, Row, Col, Button } from "antd";
import { UserOutlined } from '@ant-design/icons';

function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      {/* Shop Header */}
      <div className="relative">
        <img
          src="https://cf.shopee.vn/file/sg-11134258-7reoe-m26ljz41p3thae_xxhdpi"
          alt="Shop Cover"
          className="w-full h-80 object-cover rounded-lg brightness-75"
        />
        <div className="absolute top-3/4 left-8 transform -translate-y-1/2 flex items-center space-x-4 rounded-lg p-1.5 border-2 border-aliceblue bg-black bg-opacity-60 box-border shadow-2xl">
            <img
                src="https://down-bs-vn.img.susercontent.com/fa553e24092448d339970f6dd742478f_tn.webp"
                alt="Avatar"
                className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div className="text-white">
                <h1 className="text-2xl font-bold">Tên người dùng</h1>
                <div className="flex items-center space-x-2">
                    <Rate disabled defaultValue={4} className="text-lg" /> {/* Xếp hạng sao */}
                </div>
                <p className="mt-1">Trạng thái: Hoạt động</p>
            </div>
        </div>
    
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sản phẩm nổi bật</h2>
        <Row gutter={[16, 24]}>
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 1" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 1" description="₫100.000" />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 2" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 2" description="₫150.000" />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 3" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 3" description="₫200.000" />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 4" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 4" description="₫250.000" />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mt-10">
        <Row gutter={[16, 24]}>
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 5" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 5" description="₫300.000" />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 6" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 6" description="₫350.000" />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 7" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 7" description="₫400.000" />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              cover={<img alt="Product 8" src="https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m1ibisfp90s4ea.webp" />}
            >
              <Card.Meta title="Sản phẩm 8" description="₫450.000" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ShopPage;
