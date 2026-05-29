export interface MessageSchema {
  hello: string
  welcome: string
  msg: string
  count: string
  button: {
    confirm: string
    cancel: string
  }
}

// 语言类型联合
export type Locale = 'zh-CN' | 'en-US'