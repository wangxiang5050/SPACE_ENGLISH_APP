# 🚀 太空英语学习APP

> 专为3-6岁幼儿设计的英语学习应用，通过太空探索主题激发孩子学习兴趣

## 🌟 项目概述

**核心概念**：小宇航员驾驶飞船探索太阳系，通过学习英语单词获得燃料，收集星星解锁新星球

## 🎮 核心玩法设计

### 学习流程
```
选择星球 → 听单词发音 → 录音跟读 → 获得评分 → 获得奖励 → 下个单词
```

### 🌍 星球系统
- **🌍 地球（动物主题）** - 默认解锁
  - Cat🐱, Dog🐶, Fish🐟, Bird🐦, Cow🐄
- **🌙 月球（颜色主题）** - 需要15⭐解锁  
  - Red❤️, Blue💙, Green💚, Yellow💛, Purple💜
- **🔴 火星（数字主题）** - 需要30⭐解锁
  - One1️⃣, Two2️⃣, Three3️⃣, Four4️⃣, Five5️⃣

### ⭐ 评分系统（金星标准）
- **⭐⭐⭐ 3星**：语音识别置信度≥90% → +3燃料 +3积分
- **⭐⭐ 2星**：语音识别置信度≥70% → +2燃料 +2积分  
- **⭐ 1星**：语音识别置信度≥50% → +1燃料 +1积分

## 🔧 技术栈

### 主要技术
- **框架**：React Native + Expo
- **语音识别**：@react-native-voice/voice
- **音频播放**：expo-av
- **动画效果**：React Native Reanimated 3
- **状态管理**：React useState (MVP阶段)

### 跨平台支持
- ✅ iPhone (iOS 13+)
- ✅ Android (API 21+ / Android 5.0+)
- ✅ iPad (作为iOS应用运行)
- ✅ Web (可选，通过Expo Web)

## 📱 MVP版本设计

### 🎯 MVP目标
专注于地球关卡，验证核心学习玩法：**语音识别 + 评分反馈 + 基础奖励**

### 功能清单
#### ✅ 必需功能
- 5个动物单词展示
- 单词发音播放
- 语音录音功能
- 基础语音识别评分
- 星级反馈显示
- 简单的进度显示（1/5, 2/5...）

#### ❌ 暂时省略
- 多星球系统
- 燃料机制
- 复杂动画
- 成就系统
- 用户数据存储

### MVP界面设计
```
┌─────────────────────┐
│   🐱 Cat            │  ← 大图片 + 单词
│                     │
│   🔊 [播放按钮]      │  ← 听发音
│                     │
│   🎤 [录音按钮]      │  ← 跟读录音
│                     │
│   ⭐⭐⭐ (评分结果)   │  ← 实时反馈
│                     │
│   进度: 1/5          │  ← 简单进度
│   [下一个] [重试]     │  ← 操作按钮
└─────────────────────┘
```

## 🏗️ 项目结构

### 📁 当前项目结构
```
SpaceEnglishApp/
├── 📱 app/                           # 应用页面 (Expo Router)
│   ├── _layout.tsx                   # 根布局 - 配置导航和主题
│   ├── +not-found.tsx                # 404页面 - 太空主题错误页
│   └── (tabs)/                       # 标签页导航组
│       ├── _layout.tsx               # 标签页布局 - 底部导航配置
│       ├── index.tsx                 # 首页 - 太空英语学习主界面
│       └── explore.tsx               # 探索页 - 功能占位页面
│
├── 🧩 components/                    # 可复用组件
│   ├── HapticTab.tsx                 # 触感反馈标签组件
│   └── ui/                           # UI基础组件
│       ├── IconSymbol.tsx            # 图标组件 (通用)
│       ├── IconSymbol.ios.tsx        # 图标组件 (iOS专用)
│       ├── TabBarBackground.tsx      # 标签栏背景 (通用)
│       └── TabBarBackground.ios.tsx  # 标签栏背景 (iOS专用)
│
├── 🎨 constants/                     # 常量定义
│   └── Colors.ts                     # 颜色主题配置
│
├── 🔧 hooks/                         # 自定义React Hooks
│   ├── useColorScheme.ts             # 颜色方案Hook (通用)
│   └── useColorScheme.web.ts         # 颜色方案Hook (Web专用)
│
├── 📦 assets/                        # 静态资源
│   ├── fonts/                        # 字体文件
│   └── images/                       # 图片资源
│       ├── adaptive-icon.png         # Android自适应图标
│       ├── favicon.png               # Web网站图标
│       ├── icon.png                  # 应用图标
│       └── splash-icon.png           # 启动屏图标
│
├── ⚙️ 配置文件
│   ├── app.json                      # Expo应用配置
│   ├── package.json                  # 项目依赖和脚本
│   ├── tsconfig.json                 # TypeScript配置
│   ├── eslint.config.js              # ESLint代码规范配置
│   └── expo-env.d.ts                 # Expo类型定义
│
└── 🚀 待开发目录 (计划中)
    └── src/
        ├── components/
        │   ├── AnimalCard.tsx        # 动物卡片组件
        │   ├── AudioButton.tsx       # 音频播放按钮
        │   ├── RecordButton.tsx      # 录音按钮
        │   └── StarRating.tsx        # 星级评分组件
        ├── data/
        │   └── animals.ts            # 动物单词数据
        └── screens/
            └── LearningScreen.tsx    # 学习界面
```

### 📋 目录说明

#### 🔥 **核心目录**
- **`app/`** - 使用Expo Router的文件路由系统，每个.tsx文件自动成为一个路由
- **`components/`** - 可复用的React组件，按功能分类
- **`constants/`** - 应用常量，如颜色、尺寸等配置
- **`hooks/`** - 自定义React Hooks，封装可复用的逻辑

#### 🎯 **Expo Router 路由系统**
- **`app/_layout.tsx`** - 根布局，配置全局导航和主题
- **`app/(tabs)/`** - 标签页组，括号表示路由组，不影响URL
- **`app/(tabs)/_layout.tsx`** - 标签页布局，配置底部导航
- **`app/(tabs)/index.tsx`** - 首页路由 (/)
- **`app/(tabs)/explore.tsx`** - 探索页路由 (/explore)

#### 🎨 **样式和主题**
- **`constants/Colors.ts`** - 定义应用的颜色主题
- **`hooks/useColorScheme.ts`** - 检测系统深色/浅色模式

#### 📱 **跨平台支持**
- **`.ios.tsx`** 后缀 - iOS专用组件
- **`.web.ts`** 后缀 - Web专用组件
- **无后缀** - 通用组件，适用于所有平台

### 🔄 **与传统React Native的区别**

| 传统RN | Expo Router | 说明 |
|--------|-------------|------|
| `src/screens/` | `app/` | 页面文件位置 |
| React Navigation | 文件路由 | 导航方式 |
| 手动配置路由 | 自动生成 | 路由配置 |
| `index.js` | `_layout.tsx` | 入口文件 |

### 🎯 **TypeScript 新手指南**

#### 📝 **文件扩展名**
- **`.tsx`** - 包含JSX的TypeScript文件（React组件）
- **`.ts`** - 纯TypeScript文件（工具函数、类型定义等）
- **`.d.ts`** - 类型声明文件

#### 🔧 **关键配置文件**
- **`tsconfig.json`** - TypeScript编译配置
- **`expo-env.d.ts`** - Expo相关类型定义
- **`package.json`** - 项目依赖和脚本命令

### 📚 **TypeScript 新手必读**

#### 🎯 **核心概念**
```typescript
// 1. 类型注解 - 为变量指定类型
const message: string = "Hello Space!";
const count: number = 5;
const isActive: boolean = true;

// 2. 接口定义 - 定义对象的结构
interface Animal {
  name: string;
  emoji: string;
  audioUrl: string;
}

// 3. 组件Props类型
interface AnimalCardProps {
  animal: Animal;
  onPress: () => void;
}

// 4. React组件类型
const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{animal.emoji} {animal.name}</Text>
    </TouchableOpacity>
  );
};
```

#### 🔍 **当前项目中的TypeScript示例**

**1. 查看 `app/(tabs)/index.tsx`**
```typescript
// 导入React Native组件，TypeScript会自动推断类型
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// 函数组件，TypeScript知道这是一个React组件
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 太空英语学习</Text>
    </View>
  );
}

// 样式对象，TypeScript会检查样式属性是否正确
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
  },
});
```

**2. 查看 `constants/Colors.ts`**
```typescript
// 定义颜色主题的类型结构
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
```

#### 🚨 **常见错误和解决方案**

**1. 导入路径错误**
```typescript
// ❌ 错误 - 找不到模块
import { Colors } from './Colors';

// ✅ 正确 - 使用绝对路径
import { Colors } from '@/constants/Colors';
```

**2. 类型不匹配**
```typescript
// ❌ 错误 - 类型不匹配
const count: string = 5;

// ✅ 正确 - 类型匹配
const count: number = 5;
```

**3. 组件Props缺失**
```typescript
// ❌ 错误 - 缺少必需的props
<AnimalCard />

// ✅ 正确 - 提供所有必需的props
<AnimalCard animal={animalData} onPress={() => {}} />
```

#### 🛠️ **开发工具推荐**

**1. VS Code 扩展**
- **TypeScript Hero** - 自动导入和整理imports
- **Auto Rename Tag** - 自动重命名JSX标签
- **ES7+ React/Redux/React-Native snippets** - 代码片段

**2. 调试技巧**
```typescript
// 使用console.log查看变量类型
console.log('变量类型:', typeof variable);

// 使用TypeScript的类型断言
const element = document.getElementById('myId') as HTMLElement;
```

#### 📖 **学习资源**
1. **TypeScript官方文档**: https://www.typescriptlang.org/docs/
2. **React Native TypeScript**: https://reactnative.dev/docs/typescript
3. **Expo TypeScript**: https://docs.expo.dev/guides/typescript/

## 📈 开发计划

### Phase 1: MVP版本 (2周)
#### 第1周：核心功能
- Day 1-2：项目搭建 + 基础界面
- Day 3-4：语音录音和播放功能
- Day 5-7：语音识别和评分逻辑

#### 第2周：优化完善
- Day 8-10：界面美化和交互优化
- Day 11-12：测试和bug修复
- Day 13-14：性能优化和发布准备

### Phase 2: 月球解锁 (1周)
- 添加月球关卡（颜色主题）
- 实现星星收集和解锁机制
- 基础动画效果

### Phase 3: 火星扩展 (1周)
- 添加火星关卡（数字主题）
- 完善燃料系统
- 优化用户体验

## 🎯 成功标准

### 技术指标
1. **语音识别准确率**：基础单词识别率≥80%
2. **跨平台兼容性**：iPhone、Android、iPad正常运行
3. **性能表现**：应用启动时间<3秒

### 用户体验
1. **独立操作**：3-6岁儿童可以在最少指导下使用
2. **界面友好**：大按钮、清晰图标、简单操作
3. **学习效果**：能够正确引导发音学习

## 🚀 快速开始

### 环境要求
- Node.js 16+
- Expo CLI
- iOS模拟器 / Android模拟器 / 真机设备

### 安装步骤
```bash
# 克隆项目
git clone [repository-url]
cd SpaceEnglishApp

# 安装依赖
npm install

# 启动开发服务器
npx expo start

# 在设备上测试
# 1. 下载Expo Go应用
# 2. 扫描二维码即可预览
```

### 构建发布版本
```bash
# 安装EAS CLI
npm install -g @expo/eas-cli

# 构建iOS版本
eas build --platform ios

# 构建Android版本
eas build --platform android

# 同时构建两个平台
eas build --platform all
```

## 📊 验证指标

### MVP核心指标
1. **功能可用性**：语音识别是否工作正常
2. **用户体验**：幼儿能否独立操作
3. **学习效果**：能否正确引导发音

### 数据收集
- 每个单词的尝试次数
- 平均评分分布
- 完成时间统计

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 许可证

此项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

项目链接: [https://github.com/username/SpaceEnglishApp](https://github.com/username/SpaceEnglishApp)

---

⭐ 如果这个项目对您有帮助，请给它一个星标！ 