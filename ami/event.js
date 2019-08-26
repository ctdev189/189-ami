const AppConfig = require("../cus/config")

// Redis发布者
let redispub
if (AppConfig.redis && typeof AppConfig.redis === "object") {
  let RedisConfig = AppConfig.redis
  const redis = require("redis")

  redispub = redis.createClient({
    host: RedisConfig.host || "127.0.0.1",
    port: RedisConfig.host || 6379
  })
}

// Kafka生产者
let kafkapro
let bKafkaReady = false
if (AppConfig.kafka && typeof AppConfig.redis === "object") {
  let KafkaConfig = AppConfig.kafka
  const kafka = require("kafka-node")
  const client = new kafka.KafkaClient({
    kafkaHost: KafkaConfig.host || "localhost:9002"
  })
  const Producer = kafka.Producer
  kafkapro = new Producer(client)
  kafkapro.on("ready", () => {
    bKafkaReady = true
  })
}

/**
 * 消息队列
 */
class QueueMessage {
  // 接收ami发来的事件数据
  constructor(amiEvent) {
    this.amiEvent = amiEvent
  }
  // 通道名称
  get channel() {
    return `Ami-Event-${this.amiEvent.Event}`
  }
  // 消息内容
  get message() {
    return JSON.stringify(this.amiEvent)
  }
  /**
   * 将事件发布到Redis通道
   */
  push() {
    return new Promise((resolve, reject) => {
      if (redispub)
        redispub.publish(this.channel, this.message, () => {
          resolve()
        })
      if (kafkapro && bKafkaReady)
        kafkapro.send(
          [{ topic: this.channel, messages: this.message, partition: 0 }],
          () => {
            resolve()
          }
        )
    })
  }
}

function handler(amiEvent) {
  if ("Cdr" === amiEvent.Event) {
    const msg = new QueueMessage(amiEvent)
    msg.push()
  }
}
module.exports = handler
