# 疯狂星期四互动网页

这是一个有趣的互动网页，用于请求朋友请你吃肯德基疯狂星期四。

## 功能特点

- 动态变化的表情包
- 根据用户操作变化的文案
- 交互式按钮效果
- 背景音乐切换
- Q版菜单展示
- 分享功能

## 如何使用

1. 直接打开 `index.html` 文件即可在浏览器中运行
2. 点击页面任意位置开始播放背景音乐
3. 点击"v我50"按钮表示同意请客
4. 点击"拒绝"按钮会触发不同的变化效果
5. 点击"查看菜单"可以查看Q版KFC菜单
6. 点击"分享给朋友"可以保存分享图片

## 文件结构

- `index.html`: 主页面HTML结构
- `styles.css`: 页面样式表
- `script.js`: 交互逻辑
- `图片/`: 存放表情包图片
- `音乐/`: 存放背景音乐

## 注意事项

- 由于浏览器安全策略，自动播放音频可能会被阻止，需要用户交互后才能播放
- 分享功能会生成一张图片，可以保存后分享给好友

## 部署指南

要让其他人无需下载文件就能访问这个网页，您需要将其部署到网络服务器上。以下是几种免费托管方式：

### 方法一：使用GitHub Pages（推荐）

1. 创建一个GitHub账号（如果没有的话）
2. 创建一个新的仓库，例如命名为"kfc-thursday"
3. 上传所有项目文件到该仓库
4. 前往仓库设置 -> Pages -> Source，选择"main"分支
5. 点击"Save"，等待几分钟
6. 您的网页将被部署到 `https://你的用户名.github.io/kfc-thursday/`

详细步骤：
```
# 安装Git（如果没有安装的话）
# 在命令行中执行以下命令
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/kfc-thursday.git
git push -u origin main
```

### 方法二：使用Netlify

1. 注册一个Netlify账号
2. 点击"New site from Git"
3. 连接您的GitHub/GitLab/Bitbucket账号
4. 选择您的项目仓库
5. 点击"Deploy site"
6. 您的网页将被部署到一个随机域名，如 `https://your-site-name.netlify.app`
7. 您可以在设置中更改为自定义域名

### 方法三：使用Vercel

1. 注册一个Vercel账号
2. 点击"New Project"
3. 导入您的Git仓库
4. 点击"Deploy"
5. 您的网页将被部署到 `https://your-project-name.vercel.app`

### 方法四：使用Cloudflare Pages

1. 注册一个Cloudflare账号
2. 前往Pages选项卡
3. 点击"Create a project"
4. 连接您的Git仓库
5. 配置部署设置
6. 点击"Save and Deploy"
7. 您的网页将被部署到 `https://your-project-name.pages.dev`

## 自定义域名

如果您想使用自己的域名，您需要：
1. 购买一个域名（如通过GoDaddy、Namecheap等）
2. 在您选择的托管服务中配置自定义域名
3. 根据托管服务的指导更新您的DNS记录

## 本地运行

如果只是想在本地运行，可以使用任何静态文件服务器托管这些文件，例如：

```
npx serve
```

或者直接在浏览器中打开index.html文件。 