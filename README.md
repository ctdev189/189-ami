# 189-ami

Asterisk 管理接口对接

# 安装

npm i

需要安装 Redis

# 设置配置信息

在项目目录下建立 cus 文件夹，文件夹下参照 config.sample.js 文件建立 config.js 文件，填写其中的参数。

# 运行

确定已经启动 Redis，如果没有执行：

```
redis-server &
```

执行 npm run start
