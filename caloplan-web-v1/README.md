# CaloPlan Web

卡路计划 —— 智能饮食记录与营养分析 Web 应用。

## 概述

CaloPlan 是一款基于 Vue 3 构建的饮食管理工具，帮助用户记录每日饮食、追踪营养摄入、查看体重变化趋势，并借助 AI 获得个性化的饮食推荐。

## 功能特性

- **今日卡片** — 查看今日体重、距目标进展、连续打卡天数、预计减重趋势及问候卡片
- **营养追踪** — 记录今日营养摄入（热量、蛋白质、碳水、脂肪等），并与历史平均值对比
- **饮食记录** — 记录今日餐食明细
- **AI 推荐** — 基于用户数据智能推荐饮食方案
- **智能聊天** — 对话式交互，支持饮食咨询与建议
- **多语言支持** — 支持中文和英文界面切换
- **数据可视化** — 使用 ECharts 展示营养与体重趋势图表

## 技术栈

| 类别       | 技术                                                     |
| ---------- | -------------------------------------------------------- |
| 框架       | Vue 3 (Composition API + `<script setup>`)               |
| 语言       | TypeScript                                               |
| 构建工具   | Vite                                                     |
| UI 组件库  | Naive UI                                                 |
| 状态管理   | Pinia                                                    |
| 图表       | ECharts + vue-echarts                                    |
| 国际化     | vue-i18n                                                 |
| 图标       | Iconify (ionicons5)                                      |
| 自动导入   | unplugin-auto-import / unplugin-vue-components           |

## 开始使用

### 环境准备

- Node.js >= 18
- pnpm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

应用默认运行在 `http://localhost:5173`。

### 构建生产版本

```bash
pnpm build
```

构建产物输出至 `dist` 目录。

### 预览生产构建

```bash
pnpm preview
```

## 项目结构

```
caloplan-web-v1/
├── public/
│   ├── favicon.svg          # 站点图标
│   └── icons.svg            # SVG 图标集合
├── src/
│   ├── components/
│   │   ├── ChatBox/         # 聊天框组件（聊天列表 + 输入框）
│   │   ├── ChatBoxSub/
│   │   ├── DashBoard.vue    # 仪表盘容器
│   │   ├── MealRecord/      # 饮食记录（今日饮食 + AI 推荐）
│   │   ├── MealRecordSub/
│   │   ├── TodayCard/       # 今日卡片（体重、目标、连续天数等）
│   │   ├── TodayCardSub/
│   │   ├── TodayNutrition/  # 今日营养（摄入 vs 平均值）
│   │   └── TodayNutritionSub/
│   ├── i18n/                # 国际化配置
│   │   ├── locales/
│   │   │   ├── zh-CN.ts     # 中文语言包
│   │   │   └── en-US.ts     # 英文语言包
│   │   ├── index.ts         # i18n 实例
│   │   └── type.ts          # 类型定义
│   ├── pages/
│   │   └── index.vue        # 主页面
│   ├── App.vue              # 根组件
│   ├── main.ts              # 应用入口
│   └── style.css            # 全局样式
├── index.html               # HTML 入口
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 开发说明

### 代码风格

- 使用 Vue 3 `<script setup>` 语法
- 组件采用 Composition API
- 遵循 Naive UI 组件库设计规范

### 国际化

项目内置 vue-i18n 国际化方案，默认语言为中文。如需添加新语言，在 `src/i18n/locales/` 下创建对应的语言文件，并在 `src/i18n/index.ts` 中注册即可。

## 许可证

[MIT](LICENSE)
