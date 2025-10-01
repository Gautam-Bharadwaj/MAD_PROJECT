import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BreathingCircleProps {
  phase: 'inhale' | 'hold' | 'exhale';
  inhaleDuration: number;
  exhaleDuration: number;
  holdDuration: number;
  isActive: boolean;
}

const { width } = Dimensions.get('window');
const MIN_SIZE = width * 0.3;
const MAX_SIZE = width * 0.7;

export function BreathingCircle({
  phase,
  inhaleDuration,
  exhaleDuration,
  holdDuration,
  isActive,
}: BreathingCircleProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isActive) {
      Animated.spring(scaleAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
      return;
    }

    let animation: Animated.CompositeAnimation;

    if (phase === 'inhale') {
      animation = Animated.timing(scaleAnim, {
        toValue: 1,
        duration: inhaleDuration * 1000,
        useNativeDriver: true,
      });
    } else if (phase === 'exhale') {
      animation = Animated.timing(scaleAnim, {
        toValue: 0,
        duration: exhaleDuration * 1000,
        useNativeDriver: true,
      });
    } else {
      return;
    }

    animation.start();

    return () => {
      animation.stop();
    };
  }, [phase, isActive, inhaleDuration, exhaleDuration, scaleAnim]);

  const animatedSize = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [MIN_SIZE, MAX_SIZE],
  });

  const opacity = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0.9],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: animatedSize,
            height: animatedSize,
            opacity: opacity,
          },
        ]}>
        <LinearGradient
          colors={['#667EEA', '#764BA2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 1000,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
