# Publish/Subscribe
### Trong RabbitMQ, mô hình Publish/Subscribe (Xuất bản/Đăng ký) là một mô hình phân phối tin nhắn cho phép một nhà xuất bản (publisher) gửi tin nhắn đến nhiều người đăng ký (subscribers). Mỗi tin nhắn được gửi bởi nhà xuất bản sẽ được nhận và xử lý bởi tất cả các người đăng ký.

### Quá trình diễn ra như sau:
--
#### Có một nhà xuất bản tạo kết nối tới RabbitMQ và tạo một kênh (channel) để gửi tin nhắn.
#### publisher khai báo (declare) một trao đổi (exchange) trong RabbitMQ. Trao đổi là nơi mà nhà xuất bản gửi tin nhắn.
#### publishers tạo kết nối tới RabbitMQ và tạo một kênh để nhận tin nhắn.
#### publisher khai báo một hàng đợi (queue) trong RabbitMQ và liên kết hàng đợi này với trao đổi đã được khai báo bởi nhà xuất bản.
#### publisher gửi tin nhắn vào trao đổi.
#### Tin nhắn sẽ được RabbitMQ gửi đến tất cả các hàng đợi đã liên kết với trao đổi.
#### publisher sẽ nhận và xử lý tin nhắn từ hàng đợi của mình.

---

#### Mô hình Publish/Subscribe allow publisher gửi tin nhắn tới tất cả các người đăng ký một cách đồng thời và không biết sự tồn tại của từng subscribers cụ thể. Điều này mang lại tính linh hoạt và khả năng mở rộng trong việc phân phối tin nhắn trong hệ thống phân tán.

#### Mô hình Publish/Subscribe trong RabbitMQ được sử dụng rộng rãi trong các hệ thống phân tán, trong đó thông báo cần được gửi đến nhiều thành phần cùng một lúc, ví dụ như cập nhật dữ liệu thời gian thực, thông báo sự kiện, hoặc phân phối công việc.