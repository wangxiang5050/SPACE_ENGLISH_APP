/**
 * 太空英语学习应用 - 核心数据类型定义
 * 
 * 本文件定义了应用中所有学习相关的数据结构
 * 设计原则：类型安全、可扩展、易维护
 */

/**
 * 星球类型枚举
 * 用于区分不同的学习主题和解锁条件
 */
export type PlanetType = 'earth' | 'moon' | 'mars';

/**
 * 难度等级枚举
 * 为未来扩展不同难度的学习内容预留
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * 学习项目基础接口
 * 所有学习内容（动物、颜色、数字）的通用结构
 */
export interface LearningItem {
  /** 唯一标识符 */
  id: string;
  
  /** 英文名称（学习目标） */
  name: string;
  
  /** 中文名称（辅助理解） */
  chineseName: string;
  
  /** 表情符号或图标 */
  emoji: string;
  
  /** 所属星球 */
  planet: PlanetType;
  
  /** 难度等级 */
  difficulty: DifficultyLevel;
  
  /** 音频文件URL或本地路径 */
  audioUrl: string;
  
  /** 可选的图片URL（未来可能添加真实图片） */
  imageUrl?: string;
  
  /** 发音提示（音标或简化发音） */
  pronunciation?: string;
  
  /** 学习提示或记忆方法 */
  learningTip?: string;
  
  /** 排序权重（控制显示顺序） */
  order: number;
  
  /** 是否启用（用于A/B测试或临时禁用） */
  enabled: boolean;
}

/**
 * 动物学习项目接口
 * 继承基础学习项目，添加动物特有属性
 */
export interface Animal extends LearningItem {
  /** 动物类型分类 */
  category: 'mammal' | 'bird' | 'fish' | 'reptile' | 'amphibian' | 'insect';
  
  /** 动物栖息地 */
  habitat: 'land' | 'water' | 'air' | 'mixed';
  
  /** 动物大小分类 */
  size: 'small' | 'medium' | 'large';
}

/**
 * 星级评分枚举
 * 基于语音识别置信度的评分标准
 */
export type StarRating = 1 | 2 | 3;

/**
 * 学习记录接口
 * 记录用户对每个学习项目的学习情况
 */
export interface LearningRecord {
  /** 学习项目ID */
  itemId: string;
  
  /** 最高获得星级 */
  bestRating: StarRating;
  
  /** 总尝试次数 */
  attemptCount: number;
  
  /** 成功次数（获得1星及以上） */
  successCount: number;
  
  /** 最近学习时间 */
  lastStudiedAt: Date;
  
  /** 首次学习时间 */
  firstStudiedAt: Date;
  
  /** 平均置信度 */
  averageConfidence: number;
  
  /** 是否已掌握（连续3次获得3星） */
  isMastered: boolean;
  
  /** 学习历史记录 */
  attempts: LearningAttempt[];
}

/**
 * 单次学习尝试记录
 * 详细记录每次语音识别的结果
 */
export interface LearningAttempt {
  /** 尝试时间 */
  timestamp: Date;
  
  /** 语音识别置信度 (0-100) */
  confidence: number;
  
  /** 获得星级 */
  rating: StarRating;
  
  /** 识别的文本结果 */
  recognizedText: string;
  
  /** 目标文本 */
  targetText: string;
  
  /** 录音时长（毫秒） */
  recordingDuration: number;
  
  /** 是否使用了提示 */
  usedHint: boolean;
}

/**
 * 星球配置接口
 * 定义每个星球的基本信息和解锁条件
 */
export interface PlanetConfig {
  /** 星球类型 */
  type: PlanetType;
  
  /** 星球名称 */
  name: string;
  
  /** 中文名称 */
  chineseName: string;
  
  /** 星球emoji */
  emoji: string;
  
  /** 学习主题描述 */
  theme: string;
  
  /** 解锁所需星星数量 */
  requiredStars: number;
  
  /** 背景颜色 */
  backgroundColor: string;
  
  /** 主题颜色 */
  themeColor: string;
  
  /** 是否默认解锁 */
  isDefaultUnlocked: boolean;
  
  /** 排序顺序 */
  order: number;
}

/**
 * 用户进度接口
 * 记录用户的整体学习进度
 */
export interface UserProgress {
  /** 用户ID */
  userId: string;
  
  /** 总获得星星数 */
  totalStars: number;
  
  /** 总燃料数 */
  totalFuel: number;
  
  /** 已解锁的星球 */
  unlockedPlanets: PlanetType[];
  
  /** 当前选中的星球 */
  currentPlanet: PlanetType;
  
  /** 学习记录映射表 */
  learningRecords: Record<string, LearningRecord>;
  
  /** 总学习时间（分钟） */
  totalStudyTime: number;
  
  /** 连续学习天数 */
  streakDays: number;
  
  /** 最后学习日期 */
  lastStudyDate: Date;
  
  /** 创建时间 */
  createdAt: Date;
  
  /** 更新时间 */
  updatedAt: Date;
}

/**
 * 应用配置接口
 * 定义应用的全局配置参数
 */
export interface AppConfig {
  /** 语音识别配置 */
  voiceRecognition: {
    /** 语言代码 */
    language: string;
    
    /** 最大录音时长（毫秒） */
    maxRecordingDuration: number;
    
    /** 最小录音时长（毫秒） */
    minRecordingDuration: number;
    
    /** 置信度阈值配置 */
    confidenceThresholds: {
      /** 1星阈值 */
      oneStar: number;
      /** 2星阈值 */
      twoStar: number;
      /** 3星阈值 */
      threeStar: number;
    };
  };
  
  /** 奖励配置 */
  rewards: {
    /** 星级对应的燃料奖励 */
    fuelPerStar: Record<StarRating, number>;
    
    /** 星级对应的积分奖励 */
    pointsPerStar: Record<StarRating, number>;
  };
  
  /** UI配置 */
  ui: {
    /** 动画持续时间（毫秒） */
    animationDuration: number;
    
    /** 自动播放间隔（毫秒） */
    autoPlayInterval: number;
    
    /** 是否启用触觉反馈 */
    hapticFeedback: boolean;
  };
}

/**
 * 发音评分结果
 */
export interface PronunciationScore {
  stars: 1 | 2 | 3;         // 星级评分
  fuel: number;             // 获得的燃料
  points: number;           // 获得的积分
  confidence: number;       // 置信度 (0-1)
  feedback: string;         // 反馈文本
} 