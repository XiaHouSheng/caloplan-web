<script setup lang="ts">
import { ref } from "vue";
import { type MealRecord } from "../../types/MealRecord.ts";

const props = defineProps({
  item: {
    type: Object as () => MealRecord,
    default: () => {},
  },
});

const emit = defineEmits<{
  (e: "delete", id: string): void;
}>();

const sumKcal = props.item.entries.reduce((acc, cur) => acc + cur.kcal, 0);
const content = props.item.entries
  .map((item) => item.amount + item.name)
  .join(" + ");

// 长按弹出删除确认
const showDeleteOverlay = ref(false);
const deleting = ref(false);
const longPressTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const LONG_PRESS_MS = 600;

function onPointerDown() {
  longPressTimer.value = setTimeout(() => {
    showDeleteOverlay.value = true;
    longPressTimer.value = null;
  }, LONG_PRESS_MS);
}
function onPointerUp() {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value);
    longPressTimer.value = null;
  }
}

function confirmDelete() {
  showDeleteOverlay.value = false;
  // 触发删除动画，结束后 emit
  deleting.value = true;
}

function onAnimationEnd() {
  emit("delete", props.item.id);
}

function cancelDelete() {
  showDeleteOverlay.value = false;
}
</script>

<template>
  <div
    class="meal-record-item-wrapper"
    :class="{ 'is-deleting': deleting }"
    @animationend="onAnimationEnd"
  >
    <n-list-item
      @mousedown="onPointerDown"
      @mouseup="onPointerUp"
      @mouseleave="onPointerUp"
      @touchstart="onPointerDown"
      @touchend="onPointerUp"
      @touchmove="onPointerUp"
      style="cursor: default"
      :class="{ 'item-blurred': showDeleteOverlay }"
    >
      <n-flex :size="0">
        <n-image
          lazy
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          :width="50"
          :height="50"
          style="border-radius: 6px; padding: 8px"
        ></n-image>
        <n-flex :size="0" justify="center" vertical style="flex-grow: 1">
          <n-flex :size="4" align="center" inline>
            <n-text style="font-weight: bold; font-size: 16px">{{
              props.item.mealType
            }}</n-text>
            <n-text
              type="primary"
              style="font-size: 18px; font-weight: bold; margin-left: auto"
              >{{ sumKcal }}</n-text
            >
            <n-text type="primary" style="font-size: 18px; font-weight: bold"
              >kcal</n-text
            >
          </n-flex>
          <n-flex inline align="center">
            <n-text
              style="
                font-size: 12px;
                text-overflow: ellipsis;
                max-width: 220px;
                white-space: nowrap;
                overflow: hidden;
              "
              >{{ content }}</n-text
            >
            <n-text style="margin-left: auto">{{ props.item.time }}</n-text>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-list-item>

    <!-- 长按删除浮层 -->
    <transition name="fade">
      <div v-if="showDeleteOverlay" class="delete-overlay" @click="cancelDelete">
        <n-button
          type="error"
          strong
          round
          @click.stop="confirmDelete"
        >
          删除此条记录
        </n-button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.meal-record-item-wrapper {
  position: relative;
  transform-origin: center center;
}

.item-blurred {
  filter: blur(1px);
  opacity: 0.25;
  pointer-events: none;
  transition: filter 0.25s ease, opacity 0.25s ease;
}

/* ===== 删除动画 ===== */
.is-deleting {
  animation: delete-blast 0.55s cubic-bezier(0.55, 0, 0.1, 1) forwards;
  pointer-events: none;
}

@keyframes delete-blast {
  0% {
    transform: scale(1) translateX(0) rotate(0deg);
    opacity: 1;
    max-height: 200px;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  30% {
    transform: scale(1.04) translateX(0) rotate(0deg);
    opacity: 1;
  }
  60% {
    transform: scale(0.95) translateX(40px) rotate(3deg);
    opacity: 0.6;
  }
  100% {
    transform: scale(0.6) translateX(120px) rotate(8deg);
    opacity: 0;
    max-height: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
  }
}

/* ===== 浮层 ===== */
.delete-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 6px;
  z-index: 10;
  cursor: default;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
