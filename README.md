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

- link完成前提下，如果编译出现 iconfont.ttf 的问题 ，自定义图标导致.(android:将iconfont.ttf移到'android/app/src/main/assets/fonts',ios:'移至工程目录Resources'目录下)
- 生产的时候请把 createLogger这个中间件注释掉，不然卡的你怀疑人生。（开发阶段没事，调式方便）
- mock服务 或者 线上服务，真机调式请把config/host.js 里面的url更换为局域网ip或着。。。。,
- alias 的使用问题，这里用的是 'babel-plugin-module-resolver'，如果出现编译路径怪异的问题，运行 ' yarn start --reset-cache '就可以了。

