FROM rabbitmq:3

RUN rabbitmq-plugins enable --offline rabbitmq_management

EXPOSE 5672 15672

CMD ["rabbitmq-server"]