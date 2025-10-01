import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { useBreathing } from '@/contexts/BreathingContext';
import { RotateCcw } from 'lucide-react-native';

export default function SettingsScreen() {
  const { settings, updateSettings } = useBreathing();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleInhaleChange = (value: number) => {
    const newSettings = { ...localSettings, inhaleDuration: Math.round(value) };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleExhaleChange = (value: number) => {
    const newSettings = { ...localSettings, exhaleDuration: Math.round(value) };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleHoldChange = (value: number) => {
    const newSettings = { ...localSettings, holdDuration: Math.round(value) };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      inhaleDuration: 4,
      exhaleDuration: 4,
      holdDuration: 4,
    };
    setLocalSettings(defaultSettings);
    updateSettings(defaultSettings);
  };

  const presets = [
    { name: 'Calm', inhale: 4, hold: 4, exhale: 4, description: 'Balanced breathing' },
    { name: 'Relax', inhale: 4, hold: 7, exhale: 8, description: 'Deep relaxation' },
    { name: 'Focus', inhale: 4, hold: 4, exhale: 6, description: 'Enhanced concentration' },
    { name: 'Energy', inhale: 3, hold: 3, exhale: 3, description: 'Quick energizing' },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    const newSettings = {
      inhaleDuration: preset.inhale,
      exhaleDuration: preset.exhale,
      holdDuration: preset.hold,
    };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  return (
    <LinearGradient
      colors={['#E0E7FF', '#F3E8FF', '#FEF3C7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity onPress={resetToDefaults} style={styles.resetButton}>
            <RotateCcw size={20} color="#667EEA" />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Breathing Pattern</Text>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Inhale Duration</Text>
              <Text style={styles.sliderValue}>{localSettings.inhaleDuration}s</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={2}
              maximumValue={8}
              step={1}
              value={localSettings.inhaleDuration}
              onValueChange={handleInhaleChange}
              minimumTrackTintColor="#667EEA"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#667EEA"
            />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Hold Duration</Text>
              <Text style={styles.sliderValue}>{localSettings.holdDuration}s</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={8}
              step={1}
              value={localSettings.holdDuration}
              onValueChange={handleHoldChange}
              minimumTrackTintColor="#667EEA"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#667EEA"
            />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Exhale Duration</Text>
              <Text style={styles.sliderValue}>{localSettings.exhaleDuration}s</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={2}
              maximumValue={8}
              step={1}
              value={localSettings.exhaleDuration}
              onValueChange={handleExhaleChange}
              minimumTrackTintColor="#667EEA"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#667EEA"
            />
          </View>

          <View style={styles.cycleInfo}>
            <Text style={styles.cycleInfoText}>
              One cycle: {localSettings.inhaleDuration + localSettings.holdDuration * 2 + localSettings.exhaleDuration} seconds
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presets</Text>
          {presets.map((preset) => (
            <TouchableOpacity
              key={preset.name}
              style={styles.presetCard}
              onPress={() => applyPreset(preset)}>
              <View style={styles.presetHeader}>
                <Text style={styles.presetName}>{preset.name}</Text>
                <Text style={styles.presetPattern}>
                  {preset.inhale}-{preset.hold}-{preset.exhale}
                </Text>
              </View>
              <Text style={styles.presetDescription}>{preset.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Regular breathing exercises can help reduce stress, improve focus, and promote relaxation.
              Find a comfortable pattern that works for you and practice daily for best results.
            </Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667EEA',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  sliderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#667EEA',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  cycleInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  cycleInfoText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  presetCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  presetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  presetName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  presetPattern: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667EEA',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  presetDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
});
