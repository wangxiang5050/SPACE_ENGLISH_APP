/**
 * 数据模块统一导出
 * 
 * 提供应用所有数据的统一入口
 * 便于组件导入和使用
 */

// 类型定义导出
export * from '@/types/learning';

// 动物数据导出
export {
  EARTH_ANIMALS,
  getAnimalById,
  getAnimalsByDifficulty,
  getAnimalsByCategory,
  getAnimalsByHabitat,
  getEnabledAnimals,
  getRandomAnimals,
  ANIMAL_STATS,
} from '@/data/animals';

// 星球配置导出
export {
  PLANET_CONFIGS,
  getPlanetConfig,
  getUnlockedPlanets,
  getNextLockedPlanet,
  isPlanetUnlocked,
  getPlanetUnlockProgress,
  getPlanetsByOrder,
  PLANET_STATS,
  PLANET_THEME_COLORS,
} from '@/data/planets';

// 应用配置导出
export {
  APP_CONFIG,
  DEV_CONFIG,
  getAppConfig,
  VOICE_CONFIG,
  REWARD_CONFIG,
  UI_CONFIG,
  calculateStarRating,
  calculateRewards,
  checkMastery,
  CONFIG_CONSTANTS,
} from '@/data/config';

/**
 * 数据模块版本信息
 */
export const DATA_VERSION = '1.0.0';

/**
 * 数据模块元信息
 */
export const DATA_META = {
  version: DATA_VERSION,
  lastUpdated: new Date().toISOString(),
  totalAnimals: 5,
  totalPlanets: 3,
  supportedLanguages: ['en-US'],
  features: [
    'voice-recognition',
    'star-rating',
    'progress-tracking',
    'planet-unlocking',
    'mastery-system',
  ],
} as const; 