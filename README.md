<h1 align="center">超星学习通签到 - Universal Platform</h1>

**新版本正在施工中，预计支持 Linux、Windows、macOS、iPad、iPhone、Android、HarmonyOS 客户端全平台**

**支持 Docker 服务器部署，可选 termux、magisk module 运行**

**新版本技术栈：PC 和 Web 使用 Electron + Next.js + Node.js，移动端 Capacitor**

**支持多账号切换**

---

**实现的签到类型：** 普通签到（没必要用这个程序）、拍照签到（任选照片）、手势签到（不需要知道手势）、位置签到（任选位置）、二维码签到（无视十秒）、签到码签到（不需要知道签到码）

**注意：** 只能手动签到。自动签到后续看情况添加



## 截图

<img src="https://github.com/eric-gitta-moore/chaoxing-sign-app/raw/main/readme_static/1.gif" width="48%"/><img src="http://tva1.sinaimg.cn/mw690/008d89Swgy1h2qwwyva0vj30u01uo0xn.jpg" width="48%"/>

<img src="http://tva1.sinaimg.cn/mw690/008d89Swgy1h2qwwytag4j30u01uodna.jpg" width="48%"/><img src="http://tva1.sinaimg.cn/mw690/008d89Swgy1h2qwwzy6xvj30u01uoh2r.jpg" width="48%"/>

<img src="http://tva1.sinaimg.cn/mw690/008d89Swgy1h2qx2zkr9bj30u01uon00.jpg" width="48%"/>

## 使用

### 下载

+ [最新版下载地址](https://github.com/james-curtis/chaoxing-sign-app/releases)

### 登录

- 请使用 **手机号+密码登录** (和[i.chaoxing.com](http://i.chaoxing.com)的账号密码一致)

### 课程

- 列举了所有根目录下的课程（如果课程太多的话可能卡顿，建议新建文件夹，把已结束的课程放在文件夹里面）
- 点击课程图标可以跳转到活动页面的对应课程中

### 活动

1. 课程tab页
   - 这里排序方式是超星那边默认的排序，也就是 活动未结束优先，再按开始时间降序
2. **签到方式**
   + 点击签到图标所在的那一行都可以触发操作
3. 签到类型
   + **普通签到&手势签到&签到码签到：** 直接签到
   + **二维码签到：** 直接扫码、选择二维码文件、输入二维码内容、输入enc参数，任选一种
   + **位置签到：** 直接在弹出的地图中选择签到地点即可
   + **拍照签到：** 选择手机中的图片上传即可。也可以选择普通签到，此时不会上传图片，但是可以签到成功（教师端会有显示没有图片）

### 我的

+ 这里显示的信息是根据超星那边返回的html页面正则匹配出来的
+ 比较奇怪的是那边的html好像做了点手脚，有时候正则能匹配上有时候不行



## 画饼

- [ ] 自动签到

- [ ] 获取群聊签到，需要逆向app，用的是环信SDK

- [x] 对接阿里mPaaS扫码

## 开发

1. #### NPM包

   - crypto-js安装`npm i crypto-js` 

2. #### uni-app应用标识(AppID)需要重新获取一下

3. #### 地图使用的是高德地图，需要配置自己的appkey，配置教程[地图插件配置 - DCloud问答](https://ask.dcloud.net.cn/article/29)



## 逆向

1. [模拟超星网课 Android 客户端 · HonKit (hiczp.com)](https://www.hiczp.com/wang-luo/mo-ni-chao-xing-wang-ke-android-ke-hu-duan.html)



## 其他项目推荐

| 项目地址                                                | 开发语言   | 备注                                           |
| ------------------------------------------------------- | ---------- | ---------------------------------------------- |
| https://github.com/cxOrz/chaoxing-sign-cli              | JavaScript | 基于 Nodejs 实现的一个签到命令行工具           |
| https://github.com/mkdir700/chaoxing_auto_sign          | Python     | 超星学习通课堂签到&健康打卡&多用户多任务&API   |
| https://github.com/Clansty/superstar-checkin            | TypeScript | 超星学习通自动签到工具，可以配合QQ机器人       |
| https://github.com/Wzb3422/auto-sign-chaoxing           | TypeScript | 超星学习通自动签到，梦中刷网课                 |
| https://github.com/Huangyan0804/AutoCheckin             | Python     | 学习通自动签到，支持手势，二维码，位置，拍照等 |
| https://github.com/aihuahua-522/chaoxing-testforAndroid | Java       | 学习通（超星）自动签到                         |
| https://github.com/yuban10703/chaoxingsign              | Python     | 超星学习通自动签到                             |
| https://github.com/SSmJaE/XueXiTonsSign_Electron        | TypeScript | 基于Electron，桌面端，GUI，签到队列            |
| https://github.com/w964522982/xxtSign                   | Python     | 学习通自动签到,普通\|拍照\|位置\|手势\|签到码  |



## 声明
- 本项目基于 **GPL-3.0** ，完全开源，免费，仅供技术学习和交流，开发者团队并未授权任何组织、机构以及个人将其用于商业或者盈利性质的活动。也从未使用本项目进行任何盈利性活动。未来也不会将其用于开展营利性业务。
- 个人或者组织，机构如果使用本项目产生的各类纠纷，法律问题，均由其本人承担。
- 如果您开始使用本项目，即视为同意项目免责声明中的一切条款，条款更新不再另行通知。
- 如有触及相关平台规定或者权益，烦请联系我们删除。




## 鸣谢
> 本项目的实现参考了以下项目

+ https://github.com/cxOrz/chaoxing-sign-cli
+ https://github.com/cxOrz/chaoxing-sign-ui


## Star History

<a href="https://star-history.com/#eric-gitta-moore/chaoxing-sign-app&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=eric-gitta-moore/chaoxing-sign-app&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=eric-gitta-moore/chaoxing-sign-app&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=eric-gitta-moore/chaoxing-sign-app&type=Date" />
 </picture>
</a>
