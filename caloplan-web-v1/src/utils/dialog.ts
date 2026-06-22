import { createDiscreteApi } from 'naive-ui'

// 创建独立离散弹窗API，脱离组件上下文
const { dialog } = createDiscreteApi(['dialog'])

// 封装快捷方法，统一默认样式
export default {
  // 成功弹窗
  success(options: { title?: string; content: string; positiveText?: string; onPositiveClick?: () => void }) {
    dialog.success({
      title: '操作成功',
      positiveText: '确定',
      ...options
    })
  },
  // 警告弹窗（你之前写的）
  warning(options: { title?: string; content: string; positiveText?: string; onPositiveClick?: () => void }) {
    dialog.warning({
      title: '确认执行',
      positiveText: '哇',
      ...options
    })
  },
  // 信息弹窗
  info(options: { title?: string; content: string; positiveText?: string; onPositiveClick?: () => void }) {
    dialog.info({
      title: '提示',
      positiveText: '确定',
      ...options
    })
  },
  // 暴露原生dialog实例，支持自定义
  raw: dialog
}