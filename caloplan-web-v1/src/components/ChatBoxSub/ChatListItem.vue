<script setup>
import { computed } from "vue";
import { markdown } from "../../utils/markdown";
import { TrashOutline } from "@vicons/ionicons5";
import { useDialogStore } from "../../stores/useDialogStore";
import { useUserStore } from "../../stores/useUserStore";
import { useChatStore } from "../../stores/useChatStore";
import dialog from "../../utils/dialog";

const props = defineProps({
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
  isLoading: {
    type: Boolean,
    default: false,
  },
  additionalInfo: {
    type: Object,
    default: () => ({}),
  },
  application: {
    type: String,
    default: "功能1",
  },
});

const emits = defineEmits(["delete"]);

const renderMessage = computed(() => markdown.render(props.rawMessage));
const dialogStore = useDialogStore();
const userStore = useUserStore();
const chatStore = useChatStore();

// 添加到今日菜单
function handleAddToMeal() {
  const mealRecord = props.additionalInfo?.meal_record;
  if (!mealRecord) return;
  dialogStore.dialogAddMealVisible = true;
  dialogStore.presetEntries = mealRecord.entries;
  dialogStore.presetMealType = mealRecord.meal_type || 0;
}
// 更新营养素比例
function handleUpdateNutrition() {
  dialog.warning({
    title: "确认更新营养素比例？",
    content: "更改后无法撤销",
    positiveText: "我确认了！！！",
    onPositiveClick: () => {
      userStore.updateNutritionTarget(
        props.additionalInfo?.nutrition.dailyKcal,
        props.additionalInfo?.nutrition.carbs,
        props.additionalInfo?.nutrition.protein,
        props.additionalInfo?.nutrition.fat,
      );
    },
  });
}

function handleDelete() {
  emits("delete");
}

</script>

<template>
  <n-list-item>
    <template #default>
      <n-flex :justify="isUser ? 'end' : 'start'">
        <n-flex
          vertical
          :style="isUser ? 'max-width: 500px' : 'max-width: 100%'"
        >
          <template v-if="isLoading && !isUser">
            <n-flex
              vertical
              style="
                padding: 16px 20px;
                border-radius: 20px;
                border: solid 1px #ccc;
              "
            >
              <n-flex align="center">
                <n-spin size="small" />
                <n-text depth="3" style="font-size: 14px">AI 思考中...</n-text>
              </n-flex>
            </n-flex>
          </template>
          <template v-else>
            <n-flex
              vertical
              wrap
              style="padding: 12px; border-radius: 20px; border: solid 1px #ccc"
            >
              <div class="markdown-body" v-html="renderMessage"></div>
              <n-flex inline :size="4"  align="center" :justify="isUser ? 'end' : 'start'">
                <n-text>{{ time }}</n-text>
                <n-button
                  quaternary
                  circle
                  size="tiny"
                  style="margin-left: 4px"
                  @click.stop="handleDelete"
                >
                  <template #icon>
                    <n-icon size="14"><TrashOutline /></n-icon>
                  </template>
                </n-button>
              </n-flex>
            </n-flex>
          </template>
          <!-- ToolBar -->
          <n-flex v-if="!isLoading && !isUser" inline>
            <n-button
              v-if="application === 'meal_recommend'"
              size="tiny"
              quaternary
              @click="handleAddToMeal"
              >添加到我的今日菜单</n-button
            >
            <n-button
              v-if="application === 'nutrition'"
              size="tiny"
              quaternary
              @click="handleUpdateNutrition"
              >更新营养素比例</n-button
            >
          </n-flex>
        </n-flex>
      </n-flex>
    </template>
  </n-list-item>
</template>

<style scoped></style>
