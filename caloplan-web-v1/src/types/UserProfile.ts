import { nanoid } from "nanoid";

interface UserProfile {
  id: string;
  name: string;
  height: number; // cm，用于计算 BMI
  age: number; // 用于计算年龄/BMR
  gender: "male" | "female";
  nowWeight: number; // 当前体重 kg
  targetWeight: number; // 目标体重 kg
  targetDate?: string; // 目标达成日期
  checkInCount?: number; // 打卡次数
  lastCheckInDate?: string; // 最后打卡日期
  avatarUrl?: string; // 头像（后端存储）
  createdAt: string;
}

function createUserProfile(
  raw: Omit<UserProfile, "id" | "createdAt">,
): UserProfile {
  return {
    id: nanoid(),
    name: raw.name,
    height: raw.height,
    age: raw.age,
    gender: raw.gender,
    nowWeight: raw.nowWeight,
    targetWeight: raw.targetWeight,
    targetDate: raw.targetDate || undefined,
    checkInCount: raw.checkInCount || 0,
    avatarUrl: raw.avatarUrl || undefined,
    createdAt: new Date().toISOString(),
  };
}

export type { UserProfile };
export { createUserProfile };
