<div align="center">
<img alt="logo" src="./public/logo.svg" width="80"/>
<h2>今日热榜</h2>
<p>汇聚全网热点，热门尽览无余</p>
</div>

## 项目信息
* 项目预览：https://hot.baiwumm.com/
* 技术栈：[React](https://react.dev/)、[Vite](https://www.vitejs.net/)、[Antd](https://ant-design.antgroup.com/)

## 热点平台
| **Logo**    | **平台**     | **类别** | **接口地址** |
| :--------: | :--------: | :--------: | :--------: |
|<img alt="微博" src="./public/weibo.svg" width="30" style="display:inline-block"/>| 微博     | 热搜榜 | [weibo](https://api.baiwumm.com/hot/weibo)   |
|<img alt="哔哩哔哩" src="./public/bilibili.svg" width="30" style="display:inline-block"/>| 哔哩哔哩  | 热门榜   | [bilibili](https://api.baiwumm.com/hot/bilibili)   |
|<img alt="抖音" src="./public/douyin.svg" width="30" style="display:inline-block"/>| 抖音     | 热点榜 | [douyin](https://api.baiwumm.com/hot/douyin)   |
|<img alt="今日头条" src="./public/toutiao.svg" width="30" style="display:inline-block"/>| 今日头条 | 热榜     | [toutiao](https://api.baiwumm.com/hot/toutiao)   |
|<img alt="知乎" src="./public/zhihu.svg" width="30" style="display:inline-block"/>| 知乎     | 热榜 | [zhihu](https://api.baiwumm.com/hot/zhihu)   |
|<img alt="百度" src="./public/baidu.svg" width="30" style="display:inline-block"/>| 百度     | 热搜榜 | [baidu](https://api.baiwumm.com/hot/baidu)   |
|<img alt="百度贴吧" src="./public/baidutieba.svg" width="30" style="display:inline-block"/>| 百度贴吧  | 热议榜   | [baidutieba](https://api.baiwumm.com/hot/baidutieba)   |
|<img alt="腾讯新闻" src="./public/qq.svg" width="30" style="display:inline-block"/>| 腾讯新闻   | 热点榜  | [qq](https://api.baiwumm.com/hot/qq)   |
|<img alt="稀土掘金" src="./public/juejin.svg" width="30" style="display:inline-block"/>| 稀土掘金   | 热榜  | [juejin](https://api.baiwumm.com/hot/juejin)   |
|<img alt="网易新闻微博" src="./public/netease.svg" width="30" style="display:inline-block"/>| 网易新闻    | 热榜 | [netease](https://api.baiwumm.com/hot/netease)   |
|<img alt="英雄联盟" src="./public/lol.svg" width="30" style="display:inline-block"/>| 英雄联盟  | 更新公告   | [lol](https://api.baiwumm.com/hot/lol)   |
|<img alt="澎湃新闻" src="./public/thepaper.svg" width="30" style="display:inline-block"/>| 澎湃新闻 | 热榜   | [thepaper](https://api.baiwumm.com/hot/thepaper)   |

> 以上 API 是基于 [Nest.js](https://nest.nodejs.cn/) 搭建的

## 项目运行
```
// 克隆项目
git clone https://github.com/baiwumm/react-daily-hot.git

// 安装依赖
pnpm install

// 运行
pnpm dev
```

## Vercel 私有部署
1. `Fork` 本项目
2. 在 `Vercel` 官网点击 `New Project`
3. 点击 `Import Git Repository` 并选择你 fork 的此项目并点击 `import`
4. `PROJECT NAME`自己填，`FRAMEWORK PRESET` 选 `Other` 然后直接点 `Deploy` 接着等部署完成即可

## Vecel 本地部署
```
// 全局安装 vercel
npm i -g vercel

// 登录
vercel login

// 项目推送
vercel

// 挂载生产
vercel --prod
```
> 具体教程可参考文章：[如何使用 Vercel 托管静态网站](https://baiwumm.com/p/5zzij7bt)

## 其他
> 如果想集成其他平台的热搜或热点 API，可以提 Issues