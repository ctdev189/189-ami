const AppConfig = require("./cus/config")

if (AppConfig.redis && typeof AppConfig.redis === "object") {
  let RedisConfig = AppConfig.redis
  const redis = require("redis")

  const redissub = redis.createClient({
    host: RedisConfig.host || "127.0.0.1",
    port: RedisConfig.host || 6379
  })

  redissub.on("subscribe", function(channel, count) {
    console.log(`订阅通道：${channel}`)
  })

  redissub.on("message", function(channel, message) {
    console.log(`通道‘${channel}’收到消息 : ${message}`)
  })

  redissub.subscribe(`Ami-Event-Cdr`)
}
