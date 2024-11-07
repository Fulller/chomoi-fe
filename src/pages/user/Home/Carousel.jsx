import { Carousel } from 'antd';

const images = [
  "https://cf.shopee.vn/file/sg-11134258-7renb-m1wfeyz4kaisc7_xxhdpi", 
  "https://cf.shopee.vn/file/sg-11134258-7rent-m1wf3kjb8bcmc1_xxhdpi",
  "https://cf.shopee.vn/file/vn-11134258-7ras8-m1wj3pkho50307_xxhdpi",
  "https://cf.shopee.vn/file/sg-11134258-7ren7-m1wkrlva9jr80e_xxhdpi"
];

const contentStyle = {
  width: '100%',
  height: '400px',
  objectFit: 'cover',
};

const ImageCarousel = () => (
  <Carousel autoplay autoplaySpeed={3000}> {/* Tự động trượt sau 3 giây */}
    {images.map((src, index) => (
      <div key={index}>
        <img src={src} alt={`Slide ${index + 1}`} style={contentStyle} />
      </div>
    ))}
  </Carousel>
);

export default ImageCarousel;
