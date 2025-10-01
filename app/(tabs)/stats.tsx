import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, Clock, Target } from 'lucide-react-native';

export default function StatsScreen() {
  return (
    <LinearGradient
      colors={['#E0E7FF', '#F3E8FF', '#FEF3C7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Stats</Text>
          <Text style={styles.subtitle}>Track your progress</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Summary</Text>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Clock size={24} color="#667EEA" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardValue}>0 min</Text>
                <Text style={styles.cardLabel}>Total Time</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Target size={24} color="#667EEA" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardValue}>0</Text>
                <Text style={styles.cardLabel}>Total Cycles</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Award size={24} color="#667EEA" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardValue}>0</Text>
                <Text style={styles.cardLabel}>Sessions Completed</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <View style={styles.infoCard}>
            <Text style={styles.benefitTitle}>Regular Practice</Text>
            <Text style={styles.benefitText}>
              • Reduces stress and anxiety{'\n'}
              • Improves focus and concentration{'\n'}
              • Promotes better sleep{'\n'}
              • Enhances emotional well-being{'\n'}
              • Lowers blood pressure
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.benefitTitle}>Tips for Success</Text>
            <Text style={styles.benefitText}>
              • Practice in a quiet environment{'\n'}
              • Sit or lie in a comfortable position{'\n'}
              • Start with 5 minutes daily{'\n'}
              • Gradually increase session length{'\n'}
              • Be consistent with your practice
            </Text>
          </View>
        </View>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>
            Database integration coming soon! Stats will be tracked across sessions.
          </Text>
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
    marginBottom: 30,
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  comingSoon: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#667EEA',
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 40,
  },
});
