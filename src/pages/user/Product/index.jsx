import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import { Row, Col, Rate, Carousel, Button, Descriptions, Radio, InputNumber, Modal, Avatar, Badge} from 'antd';
import { useParams } from 'react-router-dom';
import { LeftOutlined, RightOutlined, AntDesignOutlined  } from '@ant-design/icons';
import ProductService from '@services/product.service';
import CartService from '@services/cart.service';
import './Product.scss';

const ProductDetails = () => {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [selectedSKUId, setSelectedSKUId] = useState(null);
  const [price, setPrice] = useState(null);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState();
  const getMessage = useMessageByApiCode();
  
  const handleChange = (value) => {
    setQuantity(value);
  };
  
  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  async function fetchProduct(id) {
    const [result, error] = await ProductService.getProductById(id);
    if (error) {
      console.error(error);
    } else {
      setProduct(result.data);
      setPrice(result.data.skus[0]?.price || 0); // Default price from the first SKU if available
    }
  }

  const handleVariationChange = (variationName, optionId) => {
    const updatedVariations = { ...selectedVariations, [variationName]: optionId };
    setSelectedVariations(updatedVariations);

    const matchingSku = product.skus.find((sku) =>
      Object.values(updatedVariations).every((variation) => sku.variation.includes(variation))
    );

    if (matchingSku) {
      setMaxQuantity(matchingSku.stock);
      setPrice(matchingSku.price); // Update the price based on the matched SKU
      setSelectedSKUId(matchingSku.id); 
    } else {
      setMaxQuantity(1);
      setPrice(product.skus[0]?.price || 0); // Default price if no matching SKU
    }
  };

  const isAddToCartEnabled = () => {
    return Object.keys(selectedVariations).length === product.variations.length && selectedSKUId !== null;
  };

  const isOptionDisabled = (variationName, optionId) => {
    const testVariations = { ...selectedVariations, [variationName]: optionId };

    return !product.skus.some((sku) =>
      Object.keys(testVariations).every((key) =>
        sku.variation.includes(testVariations[key])
      )
    );
  };

  const handleAddToCart = async (skuId, quantity) =>{
    console.log("skuId: " + skuId + " quantity: " + quantity);
    if(skuId == null)
    {
        toast.error("", {
            autoClose: 3000,
        });
        return;
    }
    else{
      const [result, error] = await CartService.addToCart({skuId, quantity});
      if (error) {
        console.log(error);
        setErrorMessage(getMessage(error.code));
        toast.error(getMessage(error.code), {
            autoClose: 3000,
        });
        return;
    } else {
        toast.success("Thêm vào giỏ hàng thành công!", {
            autoClose: 3000,
        });
        setLoading(false);
    }
    }
  }

  const showModal = (index) => {
    setSelectedImageIndex(index);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : product.images.length - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < product.images.length - 1 ? prevIndex + 1 : 0));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Carousel autoplay>
            {product.images.map((image, index) => (
              <div key={index} className="img-container" onClick={() => showModal(index)}>
                <img src={image.path} alt={product.name} className="fixed-size-img" />
              </div>
            ))}
          </Carousel>
        </Col>
        <Col xs={24} md={12}>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <Rate disabled defaultValue={product.rating} style={{ fontSize: '20px' }} className="my-2" />
          <p>{product.sold} Đã bán</p>
          <p className="text-2xl font-semibold text-red-500">{price ? price.toLocaleString() : 0} VND</p>
          <p className='mt-0'>{product.description}</p>
          <div className='flex flex-col'>
            {product.variations.map((variation) => (
              <div className='flex flex-row items-center mb-4' key={variation.id}>
                <h4 className='mr-4 w-24'>{variation.name}</h4>
                <Radio.Group 
                  defaultValue={variation.options[0].id} 
                  size="large" 
                  className='mt-0'
                  onChange={(e) => handleVariationChange(variation.name, e.target.value)}
                >
                  {variation.options.map((option) => (
                    <Radio.Button
                      key={option.id}
                      className="mr-1"
                      value={option.id}
                      disabled={isOptionDisabled(variation.name, option.id)}
                    >
                      {option.value}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
            ))}
          </div>
          <div className='flex flex-row items-center'>
            <InputNumber min={1} max={maxQuantity} defaultValue={1} className='mt-4' onChange={handleChange} value={quantity} />
            <p className='mt-4 ml-2 text-gray-400'>{maxQuantity} sản phẩm có sẵn</p>
          </div>
          <Button type="primary" className="w-96 mt-4" onClick={()=> handleAddToCart(selectedSKUId, quantity)} disabled={!isAddToCartEnabled()}>Thêm vào giỏ</Button>
        </Col>
      </Row>
      
      <div className="shop-info flex items-center my-4 p-4 border rounded-lg">
            <Avatar
              size={64}
              src={product.shop?.avatar || <AntDesignOutlined />}
              className="mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{product.shop?.name || "Shop"}</h3>
              <Badge
                status={product.shop?.status === "ACTIVE" ? "success" : "error"}
                text={product.shop?.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động"}
              />
            </div>
      </div>

      
      <Descriptions title="Thông tin chi tiết" bordered className="mt-8" column={1}>
        {product.productAttributes.map((attribute, index) => (
          <Descriptions.Item key={index} label={attribute.attribute.name}>{attribute.value}</Descriptions.Item>
        ))}
      </Descriptions>
      <Modal visible={visible} onCancel={handleCancel} footer={null} width={500} className="text-center">
        <Button icon={<LeftOutlined />} onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)' }} />
        <img src={product.images[selectedImageIndex].path} alt="Product Image" style={{ width: '100%' }} />
        <Button icon={<RightOutlined />} onClick={handleNext} style={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)' }} />
      </Modal>
    </div>
  );
};

export default ProductDetails;
