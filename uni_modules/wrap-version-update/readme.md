# wrap-version-update

> 1.一行代码实现APP版本更新，更提供后台管理让版本的发布和迭代再也不用愁了
>
> 2.支持安卓apk安装更新、支持安卓和ios热更新、支持ios跳转到appStore更新
>
> 3.支持配置非强制更新，暴露绝大部分参数自定义性强
>
> 4.封装了大部分js方法，让向完全自定义界面的开发者更加编辑

- 使用**wrap-version-update** 大于`2.0.0`版本的组件，请到新管理后台将所有app有提示需要保存的版本重新编辑保存一次，避免出现问题；

- WrapStore官方QQ群：855298680，有问题请加群讨论，避免应用发布后无法控制版本更新造成损失；


## 一、后台管理添加应用

### 1.登录网址

[点我前往WrapStore后台管理](https://apps.seepine.com/)，后台使用uniCloud搭建，24小时运行无需担心服务器过期等问题，稳定提供版本更新服务。后续会开发类似IOS的AppStore应用，展示WrapStore上大家的app，为大家推广app及提供用户评论等功能。

### 2.创建应用

![](https://s2.loli.net/2021/12/26/IxRw4yi5rf8pAuc.png)

### 3.添加版本

创建完应用后，点击菜单栏的版本管理，点击添加版本即可。其中HBuilderX是否更新和是否强制更新底部皆有解释，若还不明白的可添加QQ群讨论咨询。

![](https://s2.loli.net/2021/12/26/NF716rPxvIhLZKD.png)

### 4.设置正式版

在添加的版本右边菜单栏，选择设为正式版/设为测试版即可。

## 二、使用

### 1.获取应用id

![](https://s2.loli.net/2021/12/26/OyGh7wiAfHWERTv.png)

### 2.引入组件，修改id值

在首页引入组件，id**记得**替换为上一步获取到的

```
<wrap-version-update id="60abb4b4f6a398000176547a" @check="handleCheck" @error="handleError"
			@finish="handleFinish">
</wrap-version-update>
```

### 3.监听事件

当需要更新会自动弹窗，当无需更新会触发`finish`事件，此时可表示应用为最新版，可由此事件继续应用的相关业务逻辑。

### 4.更多参数



| 参数         | 说明                                                         | 类型    | 默认                                                         |
| ------------ | ------------------------------------------------------------ | ------- | ------------------------------------------------------------ |
| id           | 应用appId                                                    | String  |                                                              |
| auto | 是否自动检查新版本，若设为false，需要主动调用$refs.ref.check()去检查版本，适用于当开启了不强制更新，在设置->关于中可以提供让用户主动去检查更新的入口 | Boolean | true |
| apiUrl       | 请求版本更新接口                                             | String  | https://ed2bb32b-5553-4785-9bec-047aef8f37f3.bspapp.com/check |
| loading      | 是否显示检查接口加载                                         | Boolean | true                                                         |
| loadingText  | 加载文字                                                     | String  | 检查更新中                                                   |
| loadingMask  | 加载弹窗mask，为true则不可通过返回键取消动画                 | Boolean | true                                                         |
| loadingDelay | 加载动画延时，默认1.5秒后出现（表现为用户网络环境差时，1.5秒接口还未获得返回值则出现加载弹窗） | Number  | 1500        |
| loadingDelay | 加载动画延时，默认1.5秒后出现（表现为用户网络环境差时，1.5秒接口还未获得返回值则出现加载弹窗） | Number  | 1500    |
| lines      | 更新说明最多展示几行 | Number  | 4 |
| bgImage | 背景图片 | String | 默认蓝色调火箭背景图 |
| btnBgColor        | 升级按钮背景颜色                                                 | String  | #0a84ec      |
| btnTextColor | 升级按钮文字颜色                                             | String  | #FFFFFF                                                      |
| secondaryBtnText | 暂不更新按钮文字 | String | 以后再说 |
| secondaryBtnTextColor | 暂不更新按钮文字颜色 | String | #afafaf |
| textColor    | 升级弹窗版本说明文字颜色                                     | String  | #1e1e1e                                                      |
| errToast     | 检测新版本接口请求失败是否展示错误信息                       | Boolean | true                                                         |
| errTimes | 安装错误次数超过此值提示打开浏览器下载，一般若由高版本降回低版本会出现无法安装的情况 | Number | 2 |



## 四、体验

### 1.下载demo查看效果

[demo_1.0.0.apk](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ed2bb32b-5553-4785-9bec-047aef8f37f3/45341503-44e9-4a4f-859d-415ea160c727.apk)：打开后会提示有新版3.0.0，升级使用热更新的方式。
![](https://s2.loli.net/2021/12/26/vSQtazIDFAGYB5n.png)
[demo_2.0.0.apk](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ed2bb32b-5553-4785-9bec-047aef8f37f3/f4325c07-6b30-4b60-b6f5-9fa8dbc7b1c7.apk)：运行后会提示是测试版，无需更新。
![](https://s2.loli.net/2021/12/26/iE4rbWxBl8C3cHS.png)