import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialogStore = defineStore("dialog", () => {
  const dialogAddMealVisible = ref(false);
  const presetEntries: any = ref(undefined);
  const presetMealType: any = ref(undefined);

  function onDialogUpdateShow(val: boolean) {
    dialogAddMealVisible.value = val;
    if (!val) {
      // 关闭后清除预填
      presetEntries.value = undefined;
      presetMealType.value = undefined;
    }
  }

  return {
    dialogAddMealVisible,
    presetEntries,
    presetMealType,
    onDialogUpdateShow,
  };
});
