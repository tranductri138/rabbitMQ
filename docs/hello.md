# Hello World!
### Trong RabbitMQ, khái niệm "Hello World" đề cập đến một ví dụ đơn giản nhằm giới thiệu cách gửi và nhận tin nhắn trong hệ thống RabbitMQ.

### Trong ví dụ "Hello World", có hai thành phần chính: nhà sản xuất (producer) và người tiêu thụ (consumer). Nhà sản xuất tạo ra (publish) một tin nhắn và gửi (send) nó đến một hàng đợi (queue) trong RabbitMQ. Người tiêu thụ nhận (consume) tin nhắn từ hàng đợi và xử lý nó.

#### Cụ thể, quá trình diễn ra như sau:

#### Nhà sản xuất tạo ra một kết nối (connection) tới RabbitMQ và tạo một kênh (channel) để gửi tin nhắn.
#### Nhà sản xuất khai báo (declare) một hàng đợi trong RabbitMQ. Nếu hàng đợi không tồn tại, nó sẽ được tạo mới.
#### Nhà sản xuất gửi (publish) một tin nhắn đến hàng đợi đã khai báo. Tin nhắn có thể là một chuỗi văn bản đơn giản như "Hello, World!".
#### Người tiêu thụ tạo ra một kết nối tới RabbitMQ và tạo một kênh để nhận tin nhắn.
#### Người tiêu thụ khai báo cùng một hàng đợi như nhà sản xuất.
#### Người tiêu thụ bắt đầu tiêu thụ (consume) tin nhắn từ hàng đợi. Khi nhận được tin nhắn, người tiêu thụ in ra nội dung của tin nhắn, ví dụ như "Received message: Hello, World!".
#### Với ví dụ "Hello World" này, bạn có thể hiểu cách cơ bản để gửi và nhận tin nhắn trong RabbitMQ, mở ra khả năng giao tiếp giữa các thành phần khác nhau trong hệ thống phân tán.