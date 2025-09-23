<!-- 文件名：README.md -->

# ASYBH

> 把天气画在桌面这块画布上，让每一天都有独一无二的风景。

---

## 🚀 项目简介

<p>
一款基于 **Tauri + React + TypeScript** 的跨平台桌面应用。<br/>
零后端、一键安装、插件化架构，支持 Windows / macOS / Linux。
</p>

---

## ✨ 核心功能一览

| 功能          | 一句话描述                                               |
| ------------- | -------------------------------------------------------- |
| ☀️ 阳光进度条 | 2 px 顶部色温条，随太阳高度角变色，雷雨时闪电提醒        |
| 🐱 桌面宠物   | 64×64 像素小伙伴，根据 AQI 换口罩，下雪变雪人            |
| 📦 时间胶囊   | 每天 0 点自动存档天气，一年后弹出“去年的今天”            |
| 🍅 天气番茄钟 | 体感温度决定番茄时长，休息时粒子屏保                     |
| 📝 心情日记   | 全局快捷键 `Ctrl+Alt+W` 一秒记录心情，年终生成情绪气象图 |
| 🏠 居家节能   | 对比室内外温差，一键推送「关空调开窗」提示               |
| 🚨 老板雷达   | 暴雨红色预警时自动往飞书 / 钉钉群发送远程办公建议        |

---

## 🛠️ 技术栈

- **Rust** – Tauri 主进程、插件系统、定时任务
- **React + TypeScript** – 亚克力、云梦风格窗口UI
- **SQLite** – 本地加密数据库（零后端）
- **TailwindCSS + Framer Motion** – 动画与样式
- **tokio-cron-scheduler** – 后台任务调度

---

## 📸 预览（示意图）

暂定

---

## 🚦 快速开始

### 1. 克隆仓库

`git clone https://github.com/songmm820/asybh.git`

`cd asybh`

### 2. 安装依赖

`pnpm install` # 前端
`cd src-tauri && cargo fetch` # Rust

### 3. 运行开发版

`pnpm tauri dev` # 运行本地开发版

### 4. 构建发行版

`pnpm tauri build` # 生成 .msi / .dmg / AppImage # 构建发行版

`git tag v1.0.5` # 构建版本标签
`git checkout v1.0.5` # 切换到版本标签
`git push origin v1.0.5` # 推送版本标签，会自动触发github action的构建工作流，并上传产物。
