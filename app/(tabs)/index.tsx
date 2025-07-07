import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EARTH_ANIMALS, ANIMAL_STATS } from '@/data';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={Platform.OS === 'android'}
      />
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 头部标题 */}
        <View style={styles.header}>
          <Text style={styles.title}>🚀 太空英语学习</Text>
          <Text style={styles.subtitle}>Space English Learning</Text>
        </View>

        {/* 主要内容区域 */}
        <View style={styles.content}>
          <Text style={styles.emoji}>🌍</Text>
          <Text style={styles.welcomeText}>欢迎小宇航员！</Text>
          <Text style={styles.description}>
            准备好驾驶飞船探索太阳系，{'\n'}
            学习英语单词获得燃料吧！
          </Text>
          
          {/* Hello World 验证信息 */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusTitle}>✅ 项目状态</Text>
            <Text style={styles.statusItem}>📱 React Native + Expo 已就绪</Text>
            <Text style={styles.statusItem}>🎤 语音识别功能已安装</Text>
            <Text style={styles.statusItem}>🔊 音频播放功能已安装</Text>
            <Text style={styles.statusItem}>📁 项目结构已创建</Text>
            <Text style={styles.statusItem}>📊 数据结构已完成 ({ANIMAL_STATS.total}个动物)</Text>
          </View>

          {/* 开始按钮 */}
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>🚀 开始太空之旅</Text>
          </TouchableOpacity>
        </View>

        {/* 底部信息 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>MVP版本 - 地球关卡</Text>
          <Text style={styles.footerText}>{EARTH_ANIMALS.length}个动物单词等你来学习</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A9BA',
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    minHeight: 600, // 确保内容有足够高度
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#A0A9BA',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  statusContainer: {
    backgroundColor: '#1B2735',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
    width: '100%',
    maxWidth: 350, // 限制最大宽度，在大屏设备上更美观
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
  },
  statusItem: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    paddingLeft: 10,
  },
  startButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#6C7B7F',
    textAlign: 'center',
    marginBottom: 5,
  },
});
