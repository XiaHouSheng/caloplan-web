<script setup>
defineProps({
  rawMessage: {
    type: String,
    default: "测试文本",
  },
  isUser: {
    type: Boolean,
    default: true,
  },
  time: {
    type: String,
    default: "2026-5-27 22:18",
  },
});
</script>

<template>
  <n-list-item>
    <template #default>
      <n-flex :justify="isUser ? 'end' : 'start'">
        <n-flex vertical>
          <n-flex
            vertical
            wrap
            style="
              max-width: 300px;
              padding: 12px;
              border-radius: 20px;
              border: solid 1px #ccc;
            "
          >
            <span style="font-size: 18px"> {{ rawMessage }} </span>
            <n-flex inline :justify="isUser ? 'end' : 'start'">
              <n-text>{{ time }}</n-text>
            </n-flex>
          </n-flex>
          <!-- ToolBar -->
          <n-flex inline>
            <n-button>添加到我的今日菜单</n-button>
          </n-flex>
        </n-flex>
      </n-flex>
    </template>
  </n-list-item>
</template>

<style scoped></style>
