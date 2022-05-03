<h1 align="center">超星学习通签到-APP版</h1>
采用uni-app开发一个helloWord

**实现的签到类型：** 普通签到（没必要用这个程序）、拍照签到、手势签到、位置签到、二维码签到、签到码签到

**注意：** 只能手动签到。自动签到后续看情况添加



## 使用

### 登录

- 请使用手机号+密码登录

### 活动

1. "全部"tab
   - 这里排序方式是所有课程列表中所有活动的开始时间 **倒序**
   - 可能这里最开头几个不是需要签到的活动，此时建议切换到指定课程tab

2. 课程tab页
   - 这里排序方式是超星那边默认的排序，也就是 活动未结束优先，再按开始时间排序
3. **签到方式**
   + 点击签到图标所在的那一行都可以触发操作
4. 签到类型
   + **普通签到&手势签到&签到码签到：** 直接签到
   + **二维码签到：** 选择二维码文件、输入二维码内容、输入enc参数，三种方式任选一种
   + **位置签到：** 直接在弹出的地图中选择签到地点即可
   + **拍照签到：** 选择手机中的图片上传即可。也可以选择普通签到，此时不会上传图片，但是可以签到成功（教师端会有显示没有图片）

### 我的

+ 这里显示的信息是根据超星那边返回的html页面正则匹配出来的
+ 比较奇怪的是那边的html好像做了点手脚，有时候正则能匹配上有时候不行



## 开发

1. #### 插件
   + 使用HBuilderX导入[【WrapUpdate】APP版本更新、支持wgt热更新、测试版本、跳转appStore等所有方式， - DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=5141)和[uView2.0重磅发布，利剑出鞘，一统江湖 - DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=1593)

2. #### uni-app应用标识(AppID)需要重新获取一下

3. #### 地图使用的是高德地图，配置教程[地图插件配置 - DCloud问答](https://ask.dcloud.net.cn/article/29)



## 其他项目推荐

| 项目地址                                                | 开发语言   | 备注                                           |
| ------------------------------------------------------- | ---------- | ---------------------------------------------- |
| https://github.com/cxOrz/chaoxing-sign-cli              | JavaScript | 基于 Nodejs 实现的一个签到命令行工具           |
| https://github.com/mkdir700/chaoxing_auto_sign          | Python     | 超星学习通课堂签到&健康打卡&多用户多任务&API   |
| https://github.com/Wzb3422/auto-sign-chaoxing           | TypeScript | 超星学习通自动签到，梦中刷网课                 |
| https://github.com/Huangyan0804/AutoCheckin             | Python     | 学习通自动签到，支持手势，二维码，位置，拍照等 |
| https://github.com/aihuahua-522/chaoxing-testforAndroid | Java       | 学习通（超星）自动签到                         |
| https://github.com/yuban10703/chaoxingsign              | Python     | 超星学习通自动签到                             |
| https://github.com/SSmJaE/XueXiTonsSign_Electron        | TypeScript | 基于Electron，桌面端，GUI，签到队列            |



## 声明
- 本项目基于 **GPL-3.0** ，完全开源，免费，仅供技术学习和交流，开发者团队并未授权任何组织、机构以及个人将其用于商业或者盈利性质的活动。也从未使用本项目进行任何盈利性活动。未来也不会将其用于开展营利性业务。
- 个人或者组织，机构如果使用本项目产生的各类纠纷，法律问题，均由其本人承担。
- 如果您开始使用本项目，即视为同意项目免责声明中的一切条款，条款更新不再另行通知。
- 如有触及相关平台规定或者权益，烦请联系我们删除。




## 鸣谢
> 本项目的实现参考了以下项目

+ https://github.com/cxOrz/chaoxing-sign-cli
+ https://github.com/cxOrz/chaoxing-sign-ui



**感谢超星学习通给了一个学习的机会**