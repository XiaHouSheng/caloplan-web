# CaloPlan Web

智能饮食记录与营养分析 Web 应用。

## 概述

CaloPlan 是一款基于 Vue 3 构建的个人饮食管理工具，帮助用户记录每日饮食、追踪营养摄入、管理体重数据，并通过 AI 获取个性化的饮食推荐与建议，实现科学的健康管理。

## 功能特性

- **双栏仪表盘** — 左侧智能对话交互，右侧数据看板，布局清晰
- **今日卡片** — 查看今日体重、距目标进展、连续打卡天数、预计减重趋势及问候卡片
- **营养追踪** — 记录今日营养摄入（热量、蛋白质、碳水、脂肪），并与本周历史平均值对比展示趋势图
- **饮食记录** — 添加/查看今日餐食明细，支持多餐次分类记录
- **添加餐食弹窗** — 支持填写食物名称、份数、热量及三大营养素；历史食物一键添加；AI 拍照识别入口
- **AI 推荐** — 内置模拟推荐食物列表，一键填入添加餐食弹窗
- **AI 拍照识别** — 预设拍照上传入口，支持后续 AI 识别食物并自动填入营养数据
- **智能聊天** — 对话式交互，支持饮食咨询与建议
- **打卡系统** — 每日打卡记录体重变化，支持个人资料与营养目标设置
- **消耗记录** — 更新每日消耗卡路里，与摄入数据对比展示趋势图
- **长按删除** — 长按饮食记录条目弹出确认浮层，带飞散动画删除效果
- **数据持久化** — 使用 Pinia + localStorage 持久化用户数据，刷新不丢失
- **多语言支持** — 支持中文和英文界面切换（vue-i18n）
- **数据可视化** — 使用 ECharts 展示营养摄入与消耗趋势图表

## 技术栈

| 类别 | 技术 |
|---|---|
| 框架 | Vue 3 (Composition API + `<script setup>`) |
| 语言 | TypeScript |
| 构建工具 | Vite |
| UI 组件库 | Naive UI |
| 状态管理 | Pinia (pinia-plugin-persistedstate) |
| 图表 | ECharts + vue-echarts |
| 国际化 | vue-i18n |
| 图标 | @vicons/ionicons5 |
| 工具库 | dayjs, nanoid, zod |
| 自动导入 | unplugin-auto-import / unplugin-vue-components |

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
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── ChatBox/              # 聊天框容器
│   │   ├── ChatBoxSub/           # 聊天子组件（ChatInput, ChatList, ChatListItem）
│   │   ├── DashBoard.vue         # 仪表盘容器
│   │   ├── Dialog/
│   │   │   ├── DialogAddMeal.vue         # 添加餐食弹窗（营养表单、历史食物、AI入口）
│   │   │   ├── DialogCheckIn.vue         # 打卡弹窗（体重录入 + 个人设置）
│   │   │   └── DialogUpdateExpand.vue    # 更新消耗弹窗（含快速选择）
│   │   ├── MealRecord/
│   │   │   ├── MealRecord.vue            # 饮食记录容器（左右分栏编排）
│   │   │   ├── MealRecordItem.vue        # 饮食记录条目（长按删除 + 动画）
│   │   │   ├── TodayMealRecord.vue       # 今日饮食记录列表
│   │   │   ├── AiRecommend.vue           # AI 推荐列表
│   │   │   └── AiRecommendItem.vue       # 推荐食物条目
│   │   ├── TodayCard/            # 今日卡片（体重、目标、连续天数、问候等）
│   │   │   ├── TodayCard.vue
│   │   │   ├── TSubContinue.vue
│   │   │   ├── TSubExpectDecrease.vue
│   │   │   ├── TSubFromTarget.vue
│   │   │   ├── TSubGreetingCard.vue
│   │   │   └── TSubTodayKilogram.vue
│   │   └── TodayNutrition/       # 今日营养（摄入 vs 周平均值）
│   │       ├── TodayNutrition.vue
│   │       ├── NSubAverage.vue
│   │       └── NSubTodayEat.vue
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── zh-CN.ts
│   │   │   └── en-US.ts
│   │   ├── index.ts
│   │   └── type.ts
│   ├── mock/
│   │   └── index.ts              # 模拟数据（种子数据）
│   ├── pages/
│   │   └── index.vue             # 主页面（双栏布局）
│   ├── stores/                   # Pinia 状态管理
│   │   ├── useAiRecommendStore.ts
│   │   ├── useChatStore.ts
│   │   ├── useMealStore.ts       # 饮食记录 + 消耗记录
│   │   ├── useUserStore.ts       # 用户资料 + 营养目标
│   │   └── useWeightRecord.ts    # 体重记录
│   ├── types/                    # TypeScript 类型定义
│   │   ├── AiRecommendation.ts
│   │   ├── ChatHistory.ts
│   │   ├── ChatMessage.ts
│   │   ├── MealEntry.ts
│   │   ├── MealRecord.ts         # 含 MealRecord / ExpendRecord
│   │   ├── NutritionTarget.ts
│   │   ├── StoreData.ts
│   │   ├── UserProfile.ts
│   │   └── WeightRecord.ts
│   ├── utils/
│   │   ├── checkIn.ts            # 打卡逻辑
│   │   ├── date.ts               # 日期工具（dayjs）
│   │   └── export.ts             # 数据导出
│   ├── App.vue
│   ├── env.d.ts
│   ├── main.ts
│   └── style.css
├── index.html
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
- 使用 TypeScript 严格模式

### 数据持久化

使用 Pinia + `pinia-plugin-persistedstate` 插件，将 `mealRecords`、`mealEntries`、`expendRecords` 等数据自动持久化至 `localStorage`。

### 国际化

项目内置 vue-i18n 国际化方案，默认语言为中文。如需添加新语言，在 `src/i18n/locales/` 下创建对应的语言文件，并在 `src/i18n/index.ts` 中注册即可。

## 许可证

[MIT](LICENSE)
