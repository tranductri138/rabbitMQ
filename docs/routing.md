# Routing
### Trong RabbitMQ, mô hình Routing (Định tuyến) là một phần của hướng dẫn RabbitMQ. Mô hình này cho phép bạn định tuyến (route) tin nhắn từ nhà xuất bản (publisher) đến các người tiêu thụ (consumers) dựa trên một tiêu chí xác định.

### Quá trình diễn ra như sau:

#### Có một publisher tạo kết nối tới RabbitMQ và tạo một kênh (channel) để gửi tin nhắn.
#### Nhà xuất bản khai báo (declare) một trao đổi (exchange) trong RabbitMQ và chỉ định loại trao đổi là "direct". Loại trao đổi "direct" cho phép định tuyến tin nhắn dựa trên một khóa định danh (routing key).
#### Các consumer tạo kết nối tới RabbitMQ và tạo một kênh để nhận tin nhắn.
#### Mỗi consumer khai báo một hàng đợi (queue) trong RabbitMQ và liên kết hàng đợi này với trao đổi đã được khai báo bởi publisher. Người tiêu thụ cũng chỉ định một khóa định danh (routing key) để chỉ rõ loại tin nhắn mà họ quan tâm.
#### Nhà xuất bản gửi tin nhắn vào trao đổi và chỉ định khóa định danh (routing key) cho tin nhắn.
#### RabbitMQ sẽ định tuyến tin nhắn đến hàng đợi phù hợp dựa trên khóa định danh (routing key) và liên kết giữa hàng đợi và trao đổi.
#### Người tiêu thụ sẽ nhận và xử lý tin nhắn từ hàng đợi của mình.

---

#### Mô hình Routing allow bạn định tuyến tin nhắn dựa trên các tiêu chí xác định, ví dụ như loại dữ liệu, mức độ ưu tiên, hoặc các thuộc tính khác. Điều này cho phép bạn phân chia và xử lý tin nhắn một cách linh hoạt và hiệu quả trong hệ thống phân tán.

#### Mô hình Routing trong RabbitMQ là một phần quan trọng của các hướng dẫn RabbitMQ và được sử dụng rộng rãi trong các hệ thống phân tán để điều phối tin nhắn theo các tiêu chí định tuyến khác nhau.