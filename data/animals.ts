/**
 * 动物学习数据
 * 
 * 地球星球的5个动物学习内容
 * 每个动物都包含完整的学习信息和元数据
 */

import { Animal } from '@/types/learning';

/**
 * 地球星球 - 动物学习数据集
 * 
 * 设计说明：
 * 1. 选择常见且易于发音的动物
 * 2. 覆盖不同的动物类型和栖息地
 * 3. 按发音难度递增排序
 * 4. 提供学习提示帮助记忆
 */
export const EARTH_ANIMALS: Animal[] = [
  {
    // 基础信息
    id: 'earth_cat',
    name: 'Cat',
    chineseName: '猫',
    emoji: '🐱',
    planet: 'earth',
    difficulty: 'beginner',
    
    // 音频和视觉
    audioUrl: '/assets/audio/animals/cat.mp3',
    imageUrl: '/assets/images/animals/cat.jpg',
    pronunciation: '/kæt/',
    
    // 学习辅助
    learningTip: '猫咪的叫声"喵"和Cat的发音很相似哦！',
    order: 1,
    enabled: true,
    
    // 动物特有属性
    category: 'mammal',
    habitat: 'land',
    size: 'small'
  },
  
  {
    id: 'earth_dog',
    name: 'Dog',
    chineseName: '狗',
    emoji: '🐶',
    planet: 'earth',
    difficulty: 'beginner',
    
    audioUrl: '/assets/audio/animals/dog.mp3',
    imageUrl: '/assets/images/animals/dog.jpg',
    pronunciation: '/dɔːg/',
    
    learningTip: '狗狗是人类最好的朋友，Dog读起来像"道格"！',
    order: 2,
    enabled: true,
    
    category: 'mammal',
    habitat: 'land',
    size: 'medium'
  },
  
  {
    id: 'earth_fish',
    name: 'Fish',
    chineseName: '鱼',
    emoji: '🐟',
    planet: 'earth',
    difficulty: 'beginner',
    
    audioUrl: '/assets/audio/animals/fish.mp3',
    imageUrl: '/assets/images/animals/fish.jpg',
    pronunciation: '/fɪʃ/',
    
    learningTip: '小鱼在水中游，Fish发音像"费什"！',
    order: 3,
    enabled: true,
    
    category: 'fish',
    habitat: 'water',
    size: 'small'
  },
  
  {
    id: 'earth_bird',
    name: 'Bird',
    chineseName: '鸟',
    emoji: '🐦',
    planet: 'earth',
    difficulty: 'intermediate',
    
    audioUrl: '/assets/audio/animals/bird.mp3',
    imageUrl: '/assets/images/animals/bird.jpg',
    pronunciation: '/bɜːrd/',
    
    learningTip: '小鸟在天空飞翔，Bird发音要卷舌哦！',
    order: 4,
    enabled: true,
    
    category: 'bird',
    habitat: 'air',
    size: 'small'
  },
  
  {
    id: 'earth_cow',
    name: 'Cow',
    chineseName: '牛',
    emoji: '🐄',
    planet: 'earth',
    difficulty: 'beginner',
    
    audioUrl: '/assets/audio/animals/cow.mp3',
    imageUrl: '/assets/images/animals/cow.jpg',
    pronunciation: '/kaʊ/',
    
    learningTip: '奶牛说"哞"，Cow发音像"考"！',
    order: 5,
    enabled: true,
    
    category: 'mammal',
    habitat: 'land',
    size: 'large'
  }
];

/**
 * 根据ID获取动物数据
 * @param id 动物ID
 * @returns 动物数据或undefined
 */
export const getAnimalById = (id: string): Animal | undefined => {
  return EARTH_ANIMALS.find(animal => animal.id === id);
};

/**
 * 根据难度筛选动物
 * @param difficulty 难度等级
 * @returns 符合条件的动物数组
 */
export const getAnimalsByDifficulty = (difficulty: Animal['difficulty']): Animal[] => {
  return EARTH_ANIMALS.filter(animal => animal.difficulty === difficulty);
};

/**
 * 根据动物类型筛选
 * @param category 动物类型
 * @returns 符合条件的动物数组
 */
export const getAnimalsByCategory = (category: Animal['category']): Animal[] => {
  return EARTH_ANIMALS.filter(animal => animal.category === category);
};

/**
 * 根据栖息地筛选动物
 * @param habitat 栖息地类型
 * @returns 符合条件的动物数组
 */
export const getAnimalsByHabitat = (habitat: Animal['habitat']): Animal[] => {
  return EARTH_ANIMALS.filter(animal => animal.habitat === habitat);
};

/**
 * 获取启用的动物列表（按顺序排序）
 * @returns 启用的动物数组
 */
export const getEnabledAnimals = (): Animal[] => {
  return EARTH_ANIMALS
    .filter(animal => animal.enabled)
    .sort((a, b) => a.order - b.order);
};

/**
 * 获取随机动物
 * @param count 返回数量，默认为1
 * @returns 随机动物数组
 */
export const getRandomAnimals = (count: number = 1): Animal[] => {
  const enabledAnimals = getEnabledAnimals();
  const shuffled = [...enabledAnimals].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * 动物数据统计信息
 */
export const ANIMAL_STATS = {
  /** 总动物数量 */
  total: EARTH_ANIMALS.length,
  
  /** 启用的动物数量 */
  enabled: EARTH_ANIMALS.filter(animal => animal.enabled).length,
  
  /** 按难度分组统计 */
  byDifficulty: {
    beginner: getAnimalsByDifficulty('beginner').length,
    intermediate: getAnimalsByDifficulty('intermediate').length,
    advanced: getAnimalsByDifficulty('advanced').length,
  },
  
  /** 按类型分组统计 */
  byCategory: {
    mammal: getAnimalsByCategory('mammal').length,
    bird: getAnimalsByCategory('bird').length,
    fish: getAnimalsByCategory('fish').length,
    reptile: getAnimalsByCategory('reptile').length,
    amphibian: getAnimalsByCategory('amphibian').length,
    insect: getAnimalsByCategory('insect').length,
  },
  
  /** 按栖息地分组统计 */
  byHabitat: {
    land: getAnimalsByHabitat('land').length,
    water: getAnimalsByHabitat('water').length,
    air: getAnimalsByHabitat('air').length,
    mixed: getAnimalsByHabitat('mixed').length,
  },
} as const; 