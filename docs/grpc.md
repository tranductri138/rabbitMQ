
# Remote procedure call (RPC)


### Trong RabbitMQ, hướng dẫn về gọi thủ tục từ xa (Remote Procedure Call - RPC) provide một way để các ứng dụng trong các hệ thống phân tán communicate together by call các hàm or phương thức từ xa. RPC allow ứng dụng gửi yêu cầu từ xa và nhận kết quả từ ứng dụng khác.


### Quá trình RPC diễn ra như sau:
----

#### Có một ứng dụng client tạo kết nối tới RabbitMQ và tạo một kênh (channel) để gửi yêu cầu RPC.
#### Ứng dụng client khai báo (declare) một hàng đợi (queue) trong RabbitMQ để nhận kết quả từ RPC.
#### Ứng dụng client gửi yêu cầu RPC by send a message tới một trao đổi (exchange) được xác định trước.
#### Tin nhắn yêu cầu chứa một từ khóa định danh (routing key) duy nhất để xác định hàm or phương thức cần gọi từ xa và các tham số của nó.
#### RabbitMQ nhận tin nhắn yêu cầu và chuyển nó đến hàng đợi của ứng dụng server đã được liên kết với trao đổi tương ứng.
#### Ứng dụng server nhận tin nhắn yêu cầu từ hàng đợi.
#### Ứng dụng server thực thi hàm or phương thức yêu cầu và tạo một kết quả.
#### Ứng dụng server gửi kết quả trả về bằng cách đăng (publish) tin nhắn chứa kết quả vào một trao đổi với từ khóa định danh (routing key) tương ứng với hàng đợi của ứng dụng client.
#### Tin nhắn chứa kết quả được chuyển đến hàng đợi của ứng dụng client.
#### Ứng dụng client nhận kết quả từ hàng đợi và tiếp tục xử lý.