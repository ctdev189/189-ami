module.exports = {
  ami: {
    user: "",
    secret: "",
    host: "",
    port: ""
  },
  redis: {
    host: "",
    port: ""
  },
  kafka: {
    host:
      " A string of kafka broker/host combination delimited by comma for example: kafka-1.us-east-1.myapp.com:9093,kafka-2.us-east-1.myapp.com:9093,kafka-3.us-east-1.myapp.com:9093 default: localhost:9092."
  }
}
