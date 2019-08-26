const redis = require("redis")
const AppConfig = require("../cus/config")

let RedisConfig = AppConfig.redis || {}

const pub = redis.createClient({
  host: RedisConfig.host || "127.0.0.1",
  port: RedisConfig.host || 6379
})
/**
 * Redis消息队列
 */
class RedisMessage {
  // 接收ami发来的事件数据
  constructor(amiEvent) {
    this.amiEvent = amiEvent
  }
  // 通道名称
  get channel() {
    return `Ami:Event:${this.amiEvent.Event}`
  }
  // 消息内容
  get message() {
    return JSON.stringify(this.amiEvent)
  }
  /**
   * 将事件发布到Redis通道
   */
  publish() {
    return new Promise((resolve, reject) => {
      pub.publish(this.channel, this.message, () => {
        resolve()
      })
    })
  }
}

function handler(amiEvent) {
  if ("Cdr" === amiEvent.Event) {
    const msg = new RedisMessage(amiEvent)
    msg.publish()
  }
}
module.exports = handler
