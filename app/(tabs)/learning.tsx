/**
 * 学习界面页面
 * 
 * 核心学习功能界面，包含：
 * - 动物卡片展示
 * - 真实TTS音频播放功能
 * - 模拟语音录音功能
 * - 星级评分显示
 * - 学习进度管理
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Speech from 'expo-speech';
import { EARTH_ANIMALS, Animal, StarRating, calculateStarRating } from '@/data';

export default function LearningScreen() {
  // 学习状态管理
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnimal, setCurrentAnimal] = useState<Animal>(EARTH_ANIMALS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [lastRating, setLastRating] = useState<StarRating | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  
  // 动画值
  const speakerScale = new Animated.Value(1);
  const micScale = new Animated.Value(1);

  // 更新当前动物
  useEffect(() => {
    setCurrentAnimal(EARTH_ANIMALS[currentIndex]);
    setLastRating(null); // 重置评分
  }, [currentIndex]);

  // 组件清理
  useEffect(() => {
    return () => {
      // 停止TTS播放
      Speech.stop();
      // 停止所有动画
      speakerScale.stopAnimation();
      micScale.stopAnimation();
    };
  }, []);

  // 真实TTS播放音频功能
  const handlePlayAudio = async () => {
    try {
      setIsPlaying(true);
      
      // 播放按钮动画
      Animated.sequence([
        Animated.timing(speakerScale, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(speakerScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      // 使用真实TTS播放单词发音
      await Speech.speak(currentAnimal.name, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.7, // 适合儿童学习的语速
      });
       
      console.log(`TTS播放: ${currentAnimal.name}`);
      setIsPlaying(false);
    } catch (error) {
      console.error('TTS播放失败:', error);
      setIsPlaying(false);
      Alert.alert('提示', 'TTS播放失败，请重试');
    }
  };

  // 模拟录音功能（未来可替换为真实语音识别）
  const handleRecord = () => {
    if (isRecording) {
      // 停止录音
      setIsRecording(false);
      
      // 停止麦克风动画
      micScale.stopAnimation();
      micScale.setValue(1);
      
      // 模拟语音识别结果
      const mockConfidence = Math.random() * 100; // 0-100随机置信度
      const rating = calculateStarRating(mockConfidence);
      
      setLastRating(rating);
      setTotalStars(prev => prev + rating);
       
      console.log(`模拟录音完成 - 置信度: ${mockConfidence.toFixed(1)}%, 评分: ${rating}星`);
    } else {
      // 开始录音
      setIsRecording(true);
      
      // 麦克风脉动动画
      Animated.loop(
        Animated.sequence([
          Animated.timing(micScale, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(micScale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      console.log('开始模拟录音...');
      
      // 3秒后自动停止（模拟录音时长）
      setTimeout(() => {
        if (isRecording) {
          handleRecord(); // 递归调用停止录音
        }
      }, 3000);
    }
  };

  // 下一个动物
  const handleNext = () => {
    if (currentIndex < EARTH_ANIMALS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // 学习完成
      Alert.alert(
        '🎉 恭喜完成！',
        `你已经学完了所有${EARTH_ANIMALS.length}个动物单词！\n总共获得了${totalStars}颗星星！`,
        [
          { text: '返回首页', onPress: () => router.back() },
          { text: '再学一遍', onPress: () => {
            setCurrentIndex(0);
            setTotalStars(0);
          }}
        ]
      );
    }
  };

  // 重试当前单词
  const handleRetry = () => {
    setLastRating(null);
  };

  // 返回首页
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={Platform.OS === 'android'}
      />
      
      {/* 头部导航 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>地球动物学习</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{currentIndex + 1}/{EARTH_ANIMALS.length}</Text>
        </View>
      </View>

      {/* 主要学习区域 - 添加ScrollView */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.learningArea}>
          
          {/* 动物卡片 */}
          <View style={styles.animalCard}>
            <Text style={styles.animalEmoji}>{currentAnimal.emoji}</Text>
            <Text style={styles.animalName}>{currentAnimal.name}</Text>
            <Text style={styles.animalChineseName}>{currentAnimal.chineseName}</Text>
            {currentAnimal.pronunciation && (
              <Text style={styles.pronunciation}>{currentAnimal.pronunciation}</Text>
            )}
          </View>

          {/* 学习提示 */}
          {currentAnimal.learningTip && (
            <View style={styles.tipContainer}>
              <Text style={styles.tipText}>💡 {currentAnimal.learningTip}</Text>
            </View>
          )}

          {/* 操作按钮区域 */}
          <View style={styles.controlsArea}>
            
            {/* 播放音频按钮 */}
            <TouchableOpacity 
              style={[styles.audioButton, isPlaying && styles.buttonActive]}
              onPress={handlePlayAudio}
              disabled={isPlaying || isRecording}
            >
              <Animated.View style={{ transform: [{ scale: speakerScale }] }}>
                <Text style={styles.buttonIcon}>🔊</Text>
              </Animated.View>
              <Text style={styles.buttonText}>
                {isPlaying ? '播放中...' : '听发音'}
              </Text>
            </TouchableOpacity>

            {/* 录音按钮 */}
            <TouchableOpacity 
              style={[styles.recordButton, isRecording && styles.buttonRecording]}
              onPress={handleRecord}
              disabled={isPlaying}
            >
              <Animated.View style={{ transform: [{ scale: micScale }] }}>
                <Text style={styles.buttonIcon}>
                  {isRecording ? '🔴' : '🎤'}
                </Text>
              </Animated.View>
              <Text style={styles.buttonText}>
                {isRecording ? '录音中...' : '跟读录音'}
              </Text>
            </TouchableOpacity>

          </View>

          {/* 评分显示 */}
          {lastRating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingTitle}>本次评分：</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3].map((star) => (
                  <Text 
                    key={star} 
                    style={[
                      styles.star,
                      star <= lastRating ? styles.starActive : styles.starInactive
                    ]}
                  >
                    ⭐
                  </Text>
                ))}
              </View>
              <Text style={styles.ratingText}>{lastRating}星评分！</Text>
            </View>
          )}

          {/* 操作按钮 */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>🔄 重试</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.nextButton, !lastRating && styles.nextButtonDisabled]} 
              onPress={handleNext}
              disabled={!lastRating}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === EARTH_ANIMALS.length - 1 ? '🎉 完成' : '➡️ 下一个'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* 底部统计 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>已获得星星：{totalStars} ⭐</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    backgroundColor: '#1B2735',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  learningArea: {
    paddingHorizontal: 20,
    minHeight: 600, // 确保有足够的内容高度
  },
  animalCard: {
    backgroundColor: '#1B2735',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  animalEmoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  animalName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  animalChineseName: {
    fontSize: 24,
    color: '#A0A9BA',
    marginBottom: 10,
  },
  pronunciation: {
    fontSize: 18,
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  tipContainer: {
    backgroundColor: '#2A3441',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  tipText: {
    color: '#FFE066',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  controlsArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  audioButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 120,
  },
  recordButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 120,
  },
  buttonActive: {
    backgroundColor: '#2ECC71',
  },
  buttonRecording: {
    backgroundColor: '#FF6B35',
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingContainer: {
    backgroundColor: '#1B2735',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  ratingTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  starActive: {
    opacity: 1,
  },
  starInactive: {
    opacity: 0.3,
  },
  ratingText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  retryButton: {
    backgroundColor: '#9B59B6',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    flex: 0.4,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    flex: 0.55,
  },
  nextButtonDisabled: {
    backgroundColor: '#555',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#A0A9BA',
    fontSize: 14,
  },
}); 