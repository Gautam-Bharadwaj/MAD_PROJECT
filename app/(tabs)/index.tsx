import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Play, Pause } from 'lucide-react-native';
import { useBreathing } from '@/contexts/BreathingContext';
import { BreathingCircle } from '@/components/BreathingCircle';

type Phase = 'inhale' | 'hold-after-inhale' | 'exhale' | 'hold-after-exhale';

export default function HomeScreen() {
  const { settings } = useBreathing();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { inhaleDuration, exhaleDuration, holdDuration } = settings;

  const getDisplayPhase = (): 'inhale' | 'hold' | 'exhale' => {
    if (phase === 'inhale') return 'inhale';
    if (phase === 'exhale') return 'exhale';
    return 'hold';
  };

  const getPhaseText = (): string => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold-after-inhale':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'hold-after-exhale':
        return 'Hold';
    }
  };

  const getPhaseDuration = (currentPhase: Phase): number => {
    switch (currentPhase) {
      case 'inhale':
        return inhaleDuration;
      case 'hold-after-inhale':
        return holdDuration;
      case 'exhale':
        return exhaleDuration;
      case 'hold-after-exhale':
        return holdDuration;
    }
  };

  const getNextPhase = (currentPhase: Phase): Phase => {
    switch (currentPhase) {
      case 'inhale':
        return 'hold-after-inhale';
      case 'hold-after-inhale':
        return 'exhale';
      case 'exhale':
        return 'hold-after-exhale';
      case 'hold-after-exhale':
        return 'inhale';
    }
  };

  useEffect(() => {
    if (!isActive) {
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
        phaseTimerRef.current = null;
      }
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
        sessionTimerRef.current = null;
      }
      return;
    }

    const scheduleNextPhase = (currentPhase: Phase) => {
      const duration = getPhaseDuration(currentPhase);

      phaseTimerRef.current = setTimeout(() => {
        const nextPhase = getNextPhase(currentPhase);
        setPhase(nextPhase);

        if (nextPhase === 'inhale') {
          setCycleCount((prev) => prev + 1);
        }

        scheduleNextPhase(nextPhase);
      }, duration * 1000);
    };

    scheduleNextPhase(phase);

    sessionTimerRef.current = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
      }
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    };
  }, [isActive, phase, inhaleDuration, exhaleDuration, holdDuration]);

  const handleToggle = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (!isActive) {
      setIsActive(true);
      setPhase('inhale');
      setCycleCount(0);
      setSessionTime(0);
    } else {
      setIsActive(false);
      setPhase('inhale');
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient
      colors={['#E0E7FF', '#F3E8FF', '#FEF3C7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Breathe</Text>
        <Text style={styles.subtitle}>Find your calm</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{cycleCount}</Text>
          <Text style={styles.statLabel}>Cycles</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{formatTime(sessionTime)}</Text>
          <Text style={styles.statLabel}>Time</Text>
        </View>
      </View>

      <View style={styles.circleContainer}>
        <BreathingCircle
          phase={getDisplayPhase()}
          inhaleDuration={inhaleDuration}
          exhaleDuration={exhaleDuration}
          holdDuration={holdDuration}
          isActive={isActive}
        />
        <Text style={styles.phaseText}>{isActive ? getPhaseText() : 'Ready'}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.button, isActive && styles.buttonActive]}
          onPress={handleToggle}>
          {isActive ? (
            <Pause size={32} color="#FFFFFF" />
          ) : (
            <Play size={32} color="#FFFFFF" />
          )}
        </TouchableOpacity>
        <Text style={styles.buttonLabel}>{isActive ? 'Pause' : 'Start'}</Text>
      </View>

      <View style={styles.settingsInfo}>
        <Text style={styles.settingsText}>
          {inhaleDuration}s in • {holdDuration}s hold • {exhaleDuration}s out
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 100,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#667EEA',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 40,
    textAlign: 'center',
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667EEA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonActive: {
    backgroundColor: '#F59E0B',
  },
  buttonLabel: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingsInfo: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  settingsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});
