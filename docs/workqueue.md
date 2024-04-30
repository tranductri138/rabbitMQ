# Work Queues
### Trong RabbitMQ, phần hướng dẫn "Work Queues" cung cấp một cách để xử lý công việc (work) trong một hệ thống phân tán. Work Queues cho phép bạn chia sẻ và phân phối công việc giữa nhiều ứng dụng hoặc tiến trình đang chạy đồng thời.

### Quá trình Work Queues diễn ra như sau:
--
#### Ứng dụng gửi công việc (work) tới một hàng đợi (queue) RabbitMQ.
#### RabbitMQ lưu trữ công việc trong hàng đợi và gửi nó tới một ứng dụng hoặc tiến trình sẵn sàng để xử lý công việc.
#### Ứng dụng hoặc tiến trình nhận công việc từ hàng đợi và bắt đầu xử lý nó.
#### Sau khi hoàn thành công việc, ứng dụng hoặc tiến trình gửi một thông báo xác nhận (acknowledgment) tới RabbitMQ để cho biết công việc đã được xử lý thành công.
#### RabbitMQ nhận được thông báo xác nhận và remove công việc khỏi hàng đợi.

----
###  Features quan trọng của Work Queues là:

#### Chia sẻ công việc (Work Sharing): Nhiều ứng dụng hoặc tiến trình có thể chia sẻ và nhận công việc từ cùng một hàng đợi.
#### Cân bằng tải công việc (Load Balancing): RabbitMQ phân phối công việc một cách công bằng giữa các ứng dụng hoặc tiến trình đang chạy, giúp tận dụng tối đa khả năng xử lý.
#### Độ tin cậy (Reliability): Nếu một ứng dụng hoặc tiến trình không thể xử lý công việc, công việc đó sẽ được gửi lại cho một ứng dụng hoặc tiến trình khác để đảm bảo không bị mất đi.
#### Work Queues là một mô hình quan trọng trong RabbitMQ, cho phép các ứng dụng phân phối công việc và xử lý chúng theo cách hiệu quả và có khả năng mở rộng.