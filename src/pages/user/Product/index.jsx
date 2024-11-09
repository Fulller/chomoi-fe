import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import { Row, Col, Rate, Carousel, Button, Descriptions, Radio, InputNumber, Modal, Avatar, Badge } from 'antd';
import { useHref, useParams, Link } from 'react-router-dom';
import { LeftOutlined, RightOutlined, AntDesignOutlined } from '@ant-design/icons';
import ProductService from '@services/product.service';
import CartService from '@services/cart.service';
import './Product.scss';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import commonSlice from '@redux/slices/common.slice';
import {setRedirect} from '@redux/slices/auth.slice';

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
  const isLoging = useSelector((state) => state.auth.isLoging);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const href = useHref();
  const handleChange = (value) => {
    setQuantity(value);
  };

  useEffect(() => {
    fetchProduct(id);
    if (product) {
      // Thiết lập các biến thể mặc định
      const initialVariations = {};
      product.variations.forEach((variation) => {
        initialVariations[variation.name] = variation.options[0].id;
      });
      setSelectedVariations(initialVariations);
  
      // Tìm SKU tương ứng với các biến thể mặc định
      const matchingSku = product.skus.find((sku) =>
        Object.values(initialVariations).every((variation) => sku.variation.includes(variation))
      );
  
      if (matchingSku) {
        setSelectedSKUId(matchingSku.id);
        setMaxQuantity(matchingSku.stock);
        setPrice(matchingSku.price);
      }
    }
  }, [product, id]);

  async function fetchProduct(id) {
    const [result, error] = await ProductService.getProductById(id);
    if (error) {
      console.error(error);
    } else {
      setProduct(result.data);
      setPrice(result.data.skus[0]?.price || 0); // Giá mặc định từ SKU đầu tiên nếu có
      if (result.data.isSimple) {
        setSelectedSKUId(result.data.skus[0]?.id); // Gán SKU ID cho sản phẩm đơn giản
      }
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
      setPrice(matchingSku.price); // Cập nhật giá theo SKU tương ứng
      setSelectedSKUId(matchingSku.id);
    } else {
      setMaxQuantity(1);
      setPrice(product.skus[0]?.price || 0); // Giá mặc định nếu không có SKU tương ứng
    }
  };

  const isAddToCartEnabled = () => {
    if (product.isSimple) {
      return true; // Sản phẩm đơn giản thì bật nút thêm vào giỏ hàng luôn
    }
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

  const handleAddToCart = async (skuId, quantity) => {
    if (isLoging) {
      if (!product.isSimple && skuId == null) {
        toast.error("Vui lòng chọn một biến thể sản phẩm", {
          autoClose: 3000,
        });
        return;
      } else {
          const [cartResult, getError] = await CartService.getAllCartItems();
          const [result, error] = await CartService.addToCart({ skuId, quantity });
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
          }
          
          const existingItem = cartResult.data.cartItems.find((item) => item.skuId === skuId);
          console.log(existingItem);
          if(existingItem){
            console.log('Khong tang');
          }
          else{
            dispatch(commonSlice.actions.increaseTotalItem());
          }
      }          

    } else {
      dispatch(setRedirect(href));
      console.log(href);
      navigate('/login');
    }
  };

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
          {product.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <div key={index} className="img-container" onClick={() => showModal(index)}>
                <img
                  src={image.path}
                  alt={product.name}
                  className="fixed-size-img"
                  style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                />
              </div>
            ))
          ) : null}
          {product.video && (
            <div className="flex justify-center items-center">
              <video className="max-w-full max-h-full object-contain cursor-pointer" controls>
                <source src={product.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {(!product.images || (product.images.length === 0 && !product.video)) && (
            <div className="img-container">
              <p>No media available</p>
            </div>
          )}
        </Carousel>
        </Col>
        <Col xs={24} md={12}>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <Rate disabled defaultValue={product.rating} style={{ fontSize: '20px' }} className="my-2" />
          <p>{product.sold} Đã bán</p>
          <p className="text-2xl font-semibold text-red-500">{price ? price.toLocaleString() : 0} VND</p>
          
          {!product.isSimple && (
            <div className='flex flex-col'>
              {product.variations.map((variation) => (
                <div className='flex flex-row items-center mb-4' key={variation.id}>
                  <h4 className='mr-4 w-24 font-semibold'>{variation.name}</h4>
                  <Radio.Group
                    defaultValue={variation.options[0].id}
                    size="large"
                    className='mt-4'
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
          )}
          <div className='flex flex-row items-center'>
            <InputNumber min={1} max={maxQuantity} defaultValue={1} className='mt-4' onChange={handleChange} value={quantity} />
            <p className='mt-4 ml-2 text-gray-400'>{maxQuantity} sản phẩm có sẵn</p>
          </div>
          <Button type="primary" className="w-96 mt-4" onClick={() => handleAddToCart(selectedSKUId, quantity)} disabled={!isAddToCartEnabled()}>
            Thêm vào giỏ
          </Button>
        </Col>
      </Row>
      
      <div className="shop-info flex items-center my-4 p-4 border rounded-lg">
      <Link to={`/shop/${product.shop.id}`}>
      <Avatar size={64} src={product.shop?.avatar || <AntDesignOutlined />} className="mr-4" style={{ border: '1px solid pink' }} />
      </Link>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{product.shop?.name || "Shop"}</h3>
          <Badge
            status={product.shop?.status === "ACTIVE" ? "success" : "default"}
            text={product.shop?.status === "ACTIVE" ? "Hoạt động" : "Tạm ngừng"}
          />
        </div>
      </div>
      <Descriptions title="Thông số kỹ thuật" bordered className="mt-8" column={1}>
        {product.productAttributes.map((attribute, index) => (
          <Descriptions.Item key={index} label={attribute.attribute.name}>{attribute.value}</Descriptions.Item>
        ))}
      </Descriptions>
      <h3 className='font-semibold text-base py-5	' >Thông tin sản phẩm</h3>
      <p className='text-justify'>{product.description}</p> 
      
      <Modal visible={visible} onCancel={handleCancel} footer={null} centered>
      <div className="modal-content" style={{ position: 'relative', width: '100%', height: '100%' }}>
        {product.video && selectedImageIndex === -1 ? (
          <video
            className="modal-video"
            controls
            style={{
              objectFit: 'contain',  // Đảm bảo video không bị phóng to quá mức
              width: '100%',
              height: 'auto',
            }}
          >
            <source src={product.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={product.images[selectedImageIndex]?.path}
            alt={product.name}
            className="modal-image"
            style={{
              objectFit: 'contain',  // Đảm bảo hình ảnh không bị phóng to quá mức
              width: '100%',
              height: 'auto',
            }}
          />
        )}
        <div className="modal-actions" style={{
          position: 'absolute',
          top: '50%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          transform: 'translateY(-50%)',
        }}>
          <Button
            icon={<LeftOutlined />}
            onClick={handlePrev}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
            }}
          />
          <Button
            icon={<RightOutlined />}
            onClick={handleNext}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>
    </Modal>

    </div>
  );
};
export default ProductDetails;
