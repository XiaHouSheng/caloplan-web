import { getTodayDate } from "./date";
import { useUserStore } from "../stores/useUserStore";
import { useWeightRecordStore } from "../stores/useWeightRecord";
import { useMealStore } from "../stores/useMealStore";
import { useChatStore } from "../stores/useChatStore";
import type { StoreData } from "../types/StoreData";

const CURRENT_VERSION = 1;

function exportData(): void {
  const data: StoreData = {
    version: CURRENT_VERSION,
    exportedAt: new Date().toISOString(),
    user: useUserStore().profile,
    nutritionTarget: useUserStore().nutritionTarget,
    weightRecords: useWeightRecordStore().getAllWeightRecords(),
    mealRecords: useMealStore().mealRecords,
    chatMessages: useChatStore().messages,
    aiRecommendations: [],
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `caloplan-backup-${getTodayDate()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = JSON.parse(reader.result as string);

        if (typeof raw.version !== "number") {
          reject(new Error("无效的备份文件：缺少版本号"));
          return;
        }

        if (raw.version > CURRENT_VERSION) {
          reject(
            new Error(
              `备份文件版本 (v${raw.version}) 高于当前版本 (v${CURRENT_VERSION})，请先升级应用`,
            ),
          );
          return;
        }

        applyImportData(raw);
        resolve();
      } catch {
        reject(new Error("无法解析备份文件，请确认文件格式是否正确"));
      }
    };
    reader.onerror = () => reject(new Error("读取文件失败"));
    reader.readAsText(file);
  });
}

function applyImportData(raw: Partial<StoreData>): void {
  const userStore = useUserStore();
  const weightStore = useWeightRecordStore();
  const mealStore = useMealStore();
  const chatStore = useChatStore();

  if (raw.user) userStore.profile = raw.user;
  if (raw.nutritionTarget) userStore.nutritionTarget = raw.nutritionTarget;
  if (raw.weightRecords) {
    weightStore.clearWeightRecords();
    raw.weightRecords.forEach((r) => weightStore.addWeightRecord(r));
  }
  if (raw.mealRecords) mealStore.mealRecords = raw.mealRecords;
  if (raw.chatMessages) chatStore.messages = raw.chatMessages;
}

function resetAllData(): void {
  const userStore = useUserStore();
  const weightStore = useWeightRecordStore();
  const mealStore = useMealStore();
  const chatStore = useChatStore();

  userStore.$reset();
  weightStore.$reset();
  mealStore.$reset();
  chatStore.$reset();

  localStorage.removeItem("user-store");
  localStorage.removeItem("weight-record-store");
  localStorage.removeItem("meal-store");
  localStorage.removeItem("chat-store");
}

export { exportData, importData, resetAllData };
