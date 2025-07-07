/**
 * 应用全局配置
 * 
 * 集中管理应用的所有配置参数
 * 便于调试、测试和生产环境的配置切换
 */

import { AppConfig, StarRating } from '@/types/learning';

/**
 * 应用配置常量
 * 
 * 设计说明：
 * 1. 语音识别参数基于幼儿发音特点调整
 * 2. 奖励系统鼓励多次练习和进步
 * 3. UI配置考虑幼儿操作习惯
 * 4. 所有数值都可以根据用户反馈调整
 */
export const APP_CONFIG: AppConfig = {
  // 语音识别配置
  voiceRecognition: {
    /** 识别语言：美式英语 */
    language: 'en-US',
    
    /** 最大录音时长：5秒（避免幼儿录音过长） */
    maxRecordingDuration: 5000,
    
    /** 最小录音时长：0.5秒（避免误触） */
    minRecordingDuration: 500,
    
    /** 置信度阈值配置 */
    confidenceThresholds: {
      /** 1星：50% 置信度（鼓励尝试） */
      oneStar: 50,
      /** 2星：70% 置信度（良好发音） */
      twoStar: 70,
      /** 3星：90% 置信度（优秀发音） */
      threeStar: 90,
    },
  },
  
  // 奖励系统配置
  rewards: {
    /** 星级对应的燃料奖励 */
    fuelPerStar: {
      1: 1,  // 1星获得1燃料
      2: 2,  // 2星获得2燃料
      3: 3,  // 3星获得3燃料
    } as Record<StarRating, number>,
    
    /** 星级对应的积分奖励 */
    pointsPerStar: {
      1: 1,  // 1星获得1积分
      2: 2,  // 2星获得2积分
      3: 3,  // 3星获得3积分
    } as Record<StarRating, number>,
  },
  
  // UI配置
  ui: {
    /** 动画持续时间：300毫秒（流畅但不过慢） */
    animationDuration: 300,
    
    /** 自动播放间隔：2秒（给幼儿充分反应时间） */
    autoPlayInterval: 2000,
    
    /** 启用触觉反馈（增强交互体验） */
    hapticFeedback: true,
  },
};

/**
 * 开发环境配置
 * 用于开发和测试时的特殊配置
 */
export const DEV_CONFIG: Partial<AppConfig> = {
  voiceRecognition: {
    ...APP_CONFIG.voiceRecognition,
    // 开发时降低置信度要求，便于测试
    confidenceThresholds: {
      oneStar: 30,
      twoStar: 50,
      threeStar: 70,
    },
  },
  
  ui: {
    ...APP_CONFIG.ui,
    // 开发时加快动画速度
    animationDuration: 150,
    autoPlayInterval: 1000,
  },
};

/**
 * 根据环境获取配置
 * @param isDev 是否为开发环境
 * @returns 应用配置
 */
export const getAppConfig = (isDev: boolean = false): AppConfig => {
  if (isDev) {
    return {
      ...APP_CONFIG,
      ...DEV_CONFIG,
      voiceRecognition: {
        ...APP_CONFIG.voiceRecognition,
        ...DEV_CONFIG.voiceRecognition,
      },
      ui: {
        ...APP_CONFIG.ui,
        ...DEV_CONFIG.ui,
      },
    };
  }
  
  return APP_CONFIG;
};

/**
 * 语音识别配置快捷访问
 */
export const VOICE_CONFIG = APP_CONFIG.voiceRecognition;

/**
 * 奖励配置快捷访问
 */
export const REWARD_CONFIG = APP_CONFIG.rewards;

/**
 * UI配置快捷访问
 */
export const UI_CONFIG = APP_CONFIG.ui;

/**
 * 根据置信度计算星级评分
 * @param confidence 置信度 (0-100)
 * @returns 星级评分 (1-3)
 */
export const calculateStarRating = (confidence: number): StarRating => {
  const thresholds = getAppConfig().voiceRecognition.confidenceThresholds;
  
  if (confidence >= thresholds.threeStar) {
    return 3;
  } else if (confidence >= thresholds.twoStar) {
    return 2;
  } else if (confidence >= thresholds.oneStar) {
    return 1;
  } else {
    // 即使低于1星阈值，也给予1星鼓励
    return 1;
  }
};

/**
 * 根据星级计算奖励
 * @param rating 星级评分
 * @returns 奖励信息
 */
export const calculateRewards = (rating: StarRating) => {
  const config = getAppConfig();
  
  return {
    fuel: config.rewards.fuelPerStar[rating],
    points: config.rewards.pointsPerStar[rating],
    stars: rating,
  };
};

/**
 * 检查是否达到掌握标准
 * @param recentAttempts 最近的尝试记录（按时间倒序）
 * @param masteryCount 掌握所需的连续成功次数
 * @returns 是否已掌握
 */
export const checkMastery = (
  recentAttempts: { rating: StarRating }[],
  masteryCount: number = 3
): boolean => {
  if (recentAttempts.length < masteryCount) {
    return false;
  }
  
  // 检查最近N次是否都是3星
  const recentRatings = recentAttempts.slice(0, masteryCount);
  return recentRatings.every(attempt => attempt.rating === 3);
};

/**
 * 配置常量
 */
export const CONFIG_CONSTANTS = {
  /** 掌握标准：连续3次3星 */
  MASTERY_REQUIRED_COUNT: 3,
  
  /** 掌握标准：必须是3星 */
  MASTERY_REQUIRED_RATING: 3 as StarRating,
  
  /** 最大尝试次数（用于UI显示） */
  MAX_ATTEMPTS_DISPLAY: 99,
  
  /** 学习记录保留天数 */
  LEARNING_RECORD_RETENTION_DAYS: 30,
  
  /** 统计数据更新间隔（毫秒） */
  STATS_UPDATE_INTERVAL: 1000,
} as const; 