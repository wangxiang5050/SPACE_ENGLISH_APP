/**
 * 星球配置数据
 * 
 * 定义应用中所有星球的基本信息、解锁条件和主题配置
 * 支持未来扩展新的星球和学习主题
 */

import { PlanetConfig, PlanetType } from '@/types/learning';

/**
 * 星球配置数据集
 * 
 * 设计说明：
 * 1. 地球作为起始星球，默认解锁
 * 2. 解锁条件递增，形成学习进阶路径
 * 3. 每个星球都有独特的主题色彩
 * 4. 支持国际化的名称显示
 */
export const PLANET_CONFIGS: PlanetConfig[] = [
  {
    // 地球 - 动物主题
    type: 'earth',
    name: 'Earth',
    chineseName: '地球',
    emoji: '🌍',
    theme: '可爱的动物朋友们',
    requiredStars: 0,
    backgroundColor: '#4A90E2',
    themeColor: '#2ECC71',
    isDefaultUnlocked: true,
    order: 1
  },
  
  {
    // 月球 - 颜色主题
    type: 'moon',
    name: 'Moon',
    chineseName: '月球',
    emoji: '🌙',
    theme: '美丽的颜色世界',
    requiredStars: 15,
    backgroundColor: '#9B59B6',
    themeColor: '#E74C3C',
    isDefaultUnlocked: false,
    order: 2
  },
  
  {
    // 火星 - 数字主题
    type: 'mars',
    name: 'Mars',
    chineseName: '火星',
    emoji: '🔴',
    theme: '神奇的数字王国',
    requiredStars: 30,
    backgroundColor: '#E67E22',
    themeColor: '#F39C12',
    isDefaultUnlocked: false,
    order: 3
  }
];

/**
 * 根据星球类型获取配置
 * @param planetType 星球类型
 * @returns 星球配置或undefined
 */
export const getPlanetConfig = (planetType: PlanetType): PlanetConfig | undefined => {
  return PLANET_CONFIGS.find(config => config.type === planetType);
};

/**
 * 获取已解锁的星球列表
 * @param userStars 用户当前星星数
 * @returns 已解锁的星球配置数组
 */
export const getUnlockedPlanets = (userStars: number): PlanetConfig[] => {
  return PLANET_CONFIGS.filter(config => 
    config.isDefaultUnlocked || userStars >= config.requiredStars
  );
};

/**
 * 获取下一个待解锁的星球
 * @param userStars 用户当前星星数
 * @returns 下一个待解锁的星球配置或undefined
 */
export const getNextLockedPlanet = (userStars: number): PlanetConfig | undefined => {
  return PLANET_CONFIGS
    .filter(config => !config.isDefaultUnlocked && userStars < config.requiredStars)
    .sort((a, b) => a.requiredStars - b.requiredStars)[0];
};

/**
 * 检查星球是否已解锁
 * @param planetType 星球类型
 * @param userStars 用户当前星星数
 * @returns 是否已解锁
 */
export const isPlanetUnlocked = (planetType: PlanetType, userStars: number): boolean => {
  const config = getPlanetConfig(planetType);
  if (!config) return false;
  
  return config.isDefaultUnlocked || userStars >= config.requiredStars;
};

/**
 * 获取星球解锁进度
 * @param planetType 星球类型
 * @param userStars 用户当前星星数
 * @returns 解锁进度 (0-1)
 */
export const getPlanetUnlockProgress = (planetType: PlanetType, userStars: number): number => {
  const config = getPlanetConfig(planetType);
  if (!config) return 0;
  
  if (config.isDefaultUnlocked) return 1;
  
  return Math.min(userStars / config.requiredStars, 1);
};

/**
 * 获取所有星球按解锁顺序排序
 * @returns 排序后的星球配置数组
 */
export const getPlanetsByOrder = (): PlanetConfig[] => {
  return [...PLANET_CONFIGS].sort((a, b) => a.order - b.order);
};

/**
 * 星球数据统计信息
 */
export const PLANET_STATS = {
  /** 总星球数量 */
  total: PLANET_CONFIGS.length,
  
  /** 默认解锁的星球数量 */
  defaultUnlocked: PLANET_CONFIGS.filter(config => config.isDefaultUnlocked).length,
  
  /** 需要解锁的星球数量 */
  requiresUnlock: PLANET_CONFIGS.filter(config => !config.isDefaultUnlocked).length,
  
  /** 最大解锁星星要求 */
  maxStarsRequired: Math.max(...PLANET_CONFIGS.map(config => config.requiredStars)),
  
  /** 最小解锁星星要求（排除默认解锁） */
  minStarsRequired: Math.min(
    ...PLANET_CONFIGS
      .filter(config => !config.isDefaultUnlocked)
      .map(config => config.requiredStars)
  ),
} as const;

/**
 * 星球主题色彩映射
 * 用于UI组件快速获取主题色彩
 */
export const PLANET_THEME_COLORS = {
  earth: {
    primary: '#2ECC71',
    background: '#4A90E2',
    secondary: '#27AE60',
    accent: '#3498DB'
  },
  moon: {
    primary: '#E74C3C',
    background: '#9B59B6',
    secondary: '#C0392B',
    accent: '#8E44AD'
  },
  mars: {
    primary: '#F39C12',
    background: '#E67E22',
    secondary: '#D68910',
    accent: '#DC7633'
  }
} as const; 