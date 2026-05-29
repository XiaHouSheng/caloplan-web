// src/i18n/index.ts
import { createI18n, useI18n } from 'vue-i18n'
import type { MessageSchema, Locale } from './type'
import { zhCN } from './locales/zh-CN'
import { enUS } from './locales/en-US'
// 读取本地存储的语言
const storageLang = localStorage.getItem('lang') as Locale | null
const defaultLang: Locale = storageLang || 'zh-CN'

// 语言包集合
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 创建 i18n 实例 + 绑定类型
const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,       // Vue3 setup 必须关闭
  locale: defaultLang,
  fallbackLocale: 'zh-CN',
  messages,
  globalInjection: true // 全局注入 $t，模板直接用
})

export default i18n as any
// 导出带类型的 useI18n，组件内使用有完整提示
export const useI18nTyped = () => useI18n<MessageSchema, Locale>()