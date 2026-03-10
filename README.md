# Pomodoro 番茄钟应用

这是一个基于 React, Vite 和原生 CSS 构建的现代化前端番茄钟应用。设计上采用了拟态玻璃(Glassmorphism)风格，界面简洁大方。

## 功能特性 (Features)

- **三种模式**：番茄钟 (25分钟)、短休息 (5分钟)、长休息 (15分钟)。
- **现代 UI**：基于 CSS 变量与 `backdrop-filter` 打造的暗黑玻璃拟物风格体验。
- **自定义主题**：每次切换模式都会触发全局主题色的平滑动画过渡。
- **声音提示**：倒计时结束时会播放基于 Web Audio API 生成的蜂鸣声。
- **纯前端**：无需后端服务器即可运行，适合静态托管。

## 本地开发指南 (Local Development)

由于项目基于 Vite 构建：

1. 确保在本地安装了 [Node.js](https://nodejs.org/)。
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev
   ```

## 如何部署到 GitHub Pages (Deployment)

该应用已经内置了 GitHub Actions 工作流文件 (`.github/workflows/deploy.yml`)。您可以非常简单地将其自动部署至您个人的 GitHub Pages 上。

### 部署步骤：

1. **推送代码**：将全部代码推送到您的 GitHub 个人仓库的 `main` 或 `master` 分支。
2. **修改 GitHub 设置**：
   - 打开您的 GitHub 仓库页面。
   - 点击 **Settings (设置)** 面板。
   - 在左侧侧边栏中点击 **Pages**。
   - 在 "Build and deployment" (构建和部署) 下拉菜单中，将 **Source (来源)** 更改为 **GitHub Actions**。
3. **完成部署**：
   - GitHub 将会自动触发 `.github/workflows/deploy.yml` 工作流。
   - 稍等1~2分钟，您的站点便会成功发布，您可以在 Pages 页面中看到站点的访问链接。

## 技术栈 (Tech Stack)

- React (v18)
- Vite
- Lucide React (图标)
- Vanilla CSS
