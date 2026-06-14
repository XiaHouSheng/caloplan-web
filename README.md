# CaloPlan Web

智能饮食记录与营养分析 Web 应用。

## 概述

CaloPlan 是一款基于 Vue 3 构建的个人饮食管理工具，帮助用户记录每日饮食、追踪营养摄入、管理体重数据，并通过 AI 获取个性化的饮食推荐与建议，实现科学的健康管理。

## 功能特性

- **双栏布局** — 左侧智能对话 + 右侧数据看板，布局清晰
- **今日卡片** — 查看体重、距目标进展、连续打卡天数、预计减重趋势及问候卡片
- **营养追踪** — 记录今日摄入（热量、蛋白质、碳水、脂肪），与本周平均值对比展示趋势图（ECharts）
- **消耗记录** — 更新每日消耗卡路里，与摄入对比展示
- **饮食记录** — 多餐次分类管理，长按删除带飞散动画
- **添加餐食弹窗** — 填写食物名称/份数/热量/三大营养素，历史食物一键添加，AI 拍照识别入口
- **AI 推荐** — 模拟推荐食物列表，一键预填至添加餐食弹窗
- **智能聊天** — 对话式交互，支持 markdown 渲染，AI 消息可一键添加推荐食物到今日菜单
- **打卡系统** — 每日记录体重变化
- **设置** — 个人资料、营养目标配置
- **数据持久化** — Pinia + localStorage，刷新不丢失
- **数据可视化** — ECharts 趋势图表

## 技术栈

| 类别 | 技术 |
|---|---|
| 框架 | Vue 3.5 (Composition API + `<script setup>`) |
| 语言 | TypeScript 6 |
| 构建工具 | Vite 8 |
| UI 组件库 | Naive UI |
| 状态管理 | Pinia 3 + pinia-plugin-persistedstate |
| 图表 | ECharts 6 + vue-echarts |
| 图标 | @vicons/ionicons5 |
| Markdown | markdown-it |
| HTTP | axios |
| 工具库 | dayjs, nanoid, zod |

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

### 预览生产构建

```bash
pnpm preview
```

## 项目结构

```
src/
├── applications/
│   ├── api/                        # API 配置与类型定义说明
│   └── service/
│       └── ChatBoxService.ts       # 聊天消息发送服务
├── components/
│   ├── ChatBox.vue                 # 聊天框容器（含 DialogAddMeal 联动）
│   ├── ChatBoxSub/
│   │   ├── ChatInput.vue           # 聊天输入框（功能 tabs + textarea + 发送）
│   │   ├── ChatList.vue            # 聊天消息列表
│   │   └── ChatListItem.vue        # 消息气泡（用户/AI、loading态、添加食物按钮）
│   ├── DashBoard.vue               # 仪表盘容器
│   ├── Dialog/
│   │   ├── DialogAddMeal.vue       # 添加餐食弹窗（营养表单/历史/AI入口/预填）
│   │   ├── DialogCheckIn.vue       # 打卡弹窗（体重录入 + 个人设置）
│   │   └── DialogUpdateExpand.vue  # 更新消耗弹窗（含快速选择）
│   ├── MealRecord/
│   │   ├── MealRecord.vue          # 饮食记录容器（今日记录 + AI 推荐）
│   │   ├── MealRecordItem.vue      # 饮食记录条目（长按删除 + 飞散动画）
│   │   ├── TodayMealRecord.vue     # 今日饮食记录列表
│   │   ├── AiRecommend.vue         # AI 推荐列表
│   │   └── AiRecommendItem.vue     # 推荐食物条目
│   ├── TodayCard/                  # 今日卡片组
│   │   ├── TodayCard.vue
│   │   ├── TSubContinue.vue
│   │   ├── TSubExpectDecrease.vue
│   │   ├── TSubFromTarget.vue
│   │   ├── TSubGreetingCard.vue
│   │   └── TSubTodayKilogram.vue
│   └── TodayNutrition/             # 今日营养组
│       ├── TodayNutrition.vue
│       ├── NSubAverage.vue
│       └── NSubTodayEat.vue
├── pages/
│   └── index.vue                   # 主页面（双栏布局: ChatBox + DashBoard）
├── stores/                         # Pinia 状态管理
│   ├── useAiRecommendStore.ts
│   ├── useChatStore.ts
│   ├── useMealStore.ts             # 饮食记录 + 消耗记录
│   ├── useUserStore.ts             # 用户资料 + 营养目标
│   └── useWeightRecord.ts          # 体重记录
├── types/                          # TypeScript 类型定义
│   ├── AiRecommendation.ts
│   ├── ChatHistory.ts
│   ├── ChatMessage.ts
│   ├── MealEntry.ts
│   ├── MealRecord.ts               # 含 MealRecord / ExpendRecord
│   ├── NutritionTarget.ts
│   ├── StoreData.ts
│   ├── UserProfile.ts
│   └── WeightRecord.ts
├── utils/
│   ├── checkIn.ts
│   ├── date.ts                     # 日期工具（dayjs）
│   ├── export.ts                   # 数据导出
│   └── markdown.ts                 # markdown-it 实例
├── App.vue
├── main.ts
└── style.css
```

## 数据流

```
AI 推荐 / 聊天消息
  └─ additionalInfo.mealRecord (单条对象 | 数组)
      └─ ChatListItem → emit "addToMeal"
          └─ ChatBox → 打开 DialogAddMeal（预填 entries）
              └─ 保存 → MealStore → 持久化
```

## 许可证

[MIT](LICENSE)
