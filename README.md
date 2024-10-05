# Dự án React Vite

## 1. Cài đặt môi trường

Để chạy dự án, bạn cần tạo một file `.env` ở thư mục gốc với các biến sau:

```env
VITE_SERVER_URL = http://localhost:8080
VITE_INTERVAL_REFRESHTOKEN = 3600
```

## 2. Sử dụng thư viện React Icons

Dự án sử dụng thư viện [React Icons](https://react-icons.github.io/react-icons/) để thêm các icon vào giao diện. Bạn có thể tham khảo thêm tài liệu tại link trên.

## 3. Sử dụng Tailwind CSS và Ant Design

Dự án tích hợp **Tailwind CSS** để thiết kế giao diện và **Ant Design** để tận dụng các component có sẵn. Ngoài ra, bạn có thể sử dụng file `.scss` thủ công cho các phần tùy chỉnh khác.

## 4. Sử dụng @ alias cho đường dẫn

Bạn có thể sử dụng `@` làm alias cho các đường dẫn trong dự án. Ví dụ:

- `@components` để trỏ đến thư mục chứa các component.
- `@assets` để trỏ đến nơi lưu trữ tài nguyên như ảnh, video.
- `@layouts` để lưu các layout sử dụng trong dự án.

## 5. ToolTip component

Dự án có component **ToolTip** nằm trong thư mục `@components/ToolTip`. Bạn có thể sử dụng lại ở bất cứ đâu trong dự án.

## 6. Quản lý Route

Dự án có hai loại route:

- **Public Route**: Không yêu cầu đăng nhập.
- **Private Route**: Yêu cầu người dùng phải đăng nhập mới có thể truy cập.

## 7. Quản lý nội dung ảnh, video

Tất cả các nội dung như hình ảnh, video sẽ được lưu trữ trong thư mục `@assets` để dễ dàng quản lý.

## 8. Component tái sử dụng

Nếu bạn có bất kỳ component nào dùng chung nhiều lần trong dự án, hãy đặt chúng trong thư mục `@components` để dễ tái sử dụng và quản lý.

## 9. Cấu hình API và hằng số

- Các mã API code sẽ được lưu trong file `@configs/apiCode.config.js`.
- Các hằng số sử dụng trong dự án sẽ được lưu trong file `@configs/const.config.js`.

## 10. Layouts

Nếu có layout mới trong dự án, bạn có thể tạo và quản lý chúng trong thư mục `@layouts`.

## 11. Sử dụng service với Axios

Khi sử dụng các service của **Axios**, các lỗi và dữ liệu đều đã được xử lý sẵn. Bạn chỉ cần gọi service và xử lý logic. Ví dụ với hàm `handleSubmit`:

```js
const handleSubmit = async (data) => {
  const [result, error] = await AuthService.login(data);
  if (error) {
    setErrorMessage(getMessage(error.code));
    toast.error(getMessage(error.code), {
      autoClose: 3000,
    });
    return;
  }
  toast.success(getMessage(result.code), {
    autoClose: 3000,
  });
  const tokens = result.data;
  dispatch(setTokens(tokens));
  navigate(redirect);
};
```

## 12. Validate dữ liệu

Khi sử dụng component `@components/Form`, bạn cần tạo các file để validate dữ liệu ở thư mục `@validations`. Mục đích để dễ dàng quản lý và chuẩn hóa quy trình kiểm tra dữ liệu đầu vào.
