# Blocked Connection Notifications

#### là một tính năng trong RabbitMQ cho phép hệ thống thông báo về các kết nối bị chặn (blocked connections). Khi một kết nối được coi là bị chặn, điều này thường xảy ra khi một hàng đợi or một Exchange đã đạt đến giới hạn dung lượng or tài nguyên của mình.


#### Khi một kết nối bị chặn, RabbitMQ sẽ gửi thông báo về sự cố này cho ứng dụng gốc thông qua một cơ chế gọi là Blocked Connection Notifications. Thông báo này cho phép ứng dụng biết rằng kết nối đã bị chặn và cần thực hiện các biện pháp để giải quyết vấn đề.

#### Thông báo Blocked Connection Notifications có thể được xử lý bằng cách đăng ký một listener or một callback trong ứng dụng RabbitMQ. Khi một kết nối bị chặn, ứng dụng sẽ nhận được thông báo và có thể thực hiện các hành động như giảm tải cho hàng đợi or Exchange, tăng dung lượng or tài nguyên cho hệ thống, or thực hiện các biện pháp khác để khắc phục tình trạng bị chặn.

#### Blocked Connection Notifications rất hữu ích trong việc giám sát và quản lý hệ thống RabbitMQ. Chúng cho phép các nhà phát triển và quản trị viên biết về các vấn đề kết nối bị chặn và có thể đưa ra các biện pháp để duy trì hoạt động ổn định và hiệu suất cao của hệ thống.