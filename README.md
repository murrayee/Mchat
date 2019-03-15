**开始**
- yarn  or npm install
- yarn run mock 
- react-native link (package name ) // 已经link 请忽略
- react-native run-ios (run-android)

**简介**


 这个分支是用dva搭建的，主要是学习用，以及版本的迭代升级。master分支为手动搭建，技术栈也有些差别，并且master上有完整功能。不想用mock ，服务端入口（https://github.com/murrayee/m-server）



**截图**

<img src="https://github.com/murrayee/m-server-py/blob/flask/screenshot.gif" width="40%"> 

**注意**

- 如果编译出现 iconfont.ttf 的问题 ，复制'src/components/Icon/custom/iconfont.ttf 到'node_modules/react-native-vector-icons/Fonts'；自定义图标更新到新版导致的，按照官网来不行，也没找到好的方案。暂时这样解决吧。
- 生产的时候请把 createLogger这个中间件注释掉，不然卡的你怀疑人生。（开发阶段没事，调式方便）
- mock服务 或者 线上服务，真机调式请把config/host.js 里面的url更换为局域网ip或着。。。。,