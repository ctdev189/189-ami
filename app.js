const AmiClient = require("asterisk-ami-client")
const AppConfig = require("./cus/config")
const fnAmiEventHandler = require("./ami/event")

let client = new AmiClient()

client
  .connect(AppConfig.ami.user, AppConfig.ami.secret, {
    host: AppConfig.ami.host,
    port: AppConfig.ami.port
  })
  .then(amiConnection => {
    client
      .on("connect", () => console.log("connect"))
      .on("event", fnAmiEventHandler)
      .on("data", chunk => console.log(chunk))
      .on("response", response => console.log(response))
      .on("disconnect", () => console.log("disconnect"))
      .on("reconnection", () => console.log("reconnection"))
      .on("internalError", error => console.log(error))
      .action({
        Action: "Ping"
      })

    // setTimeout(() => {
    //   client.disconnect()
    // }, 5000)
  })
  .catch(error => console.log(error))
