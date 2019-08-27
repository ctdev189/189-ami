const AppConfig = require("./cus/config")

if (AppConfig.kafka && typeof AppConfig.kafka === "object") {
  let KafkaConfig = AppConfig.kafka
  let kafka = require("kafka-node")
  let Consumer = kafka.Consumer
  let client = new kafka.KafkaClient({
    kafkaHost: KafkaConfig.host || "localhost:9002"
  })

  consumer = new Consumer(client, [{ topic: "Ami-Event-Cdr", partition: 0 }], {
    autoCommit: true
  })

  consumer.on("message", message => {
    console.log(`主题'${message.topic}'收到消息：${message.value}`)
  })
}
