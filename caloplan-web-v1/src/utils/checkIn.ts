import { useUserStore } from "../stores/useUserStore";
import { useWeightRecordStore } from "../stores/useWeightRecord";
import { getTodayDate, getYesterdayDate, convertToDate } from "./date";

// 打卡次数计算
const checkInCount = () => {
  const userStore = useUserStore();
  const weightRecordStore = useWeightRecordStore();
  const lastWeightRecordDate = convertToDate(
    weightRecordStore.latestWeightRecord?.date || getYesterdayDate(),
  ).getTime();
  const todayDate = convertToDate(getTodayDate()).getTime();
  const yesterdayDate = convertToDate(getYesterdayDate()).getTime();
  let checkInCount = userStore.profile.checkInCount || 0;
  // 上次打卡日期 == 昨天 -> 打卡次数加1
  if (lastWeightRecordDate === yesterdayDate) {
    checkInCount++;
    userStore.profile.checkInCount = checkInCount;
    userStore.profile.lastCheckInDate = getTodayDate();
    return true;
  } else if (lastWeightRecordDate === todayDate) {
    return true;
  } else {
    // 其他日期 -> 清空打卡次数
    checkInCount = 1;
    userStore.profile.checkInCount = checkInCount;
    userStore.profile.lastCheckInDate = getTodayDate();
    return false;
  }
};

export { checkInCount };
