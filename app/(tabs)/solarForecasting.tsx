import React, { JSX } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Responsive font size calculation
const responsiveFontSize = (size: number): number => {
  const scale = width / 375; // Base width (iPhone X)
  return Math.round(size * scale);
};

const SolarForecasting = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a2332" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </View>
          <View style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋮</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Today's Weather</Text>

        {/* Weather Cards Grid */}
        <View style={styles.cardsContainer}>
          {/* Temperature Card */}
          <View style={[styles.card, styles.cardLight]}>
            <Text style={styles.cardIcon}>☀</Text>
            <Text style={styles.cardLabel}>Temperature</Text>
            <Text style={styles.cardValue}>
              24 <Text style={styles.cardUnit}>°C</Text>
            </Text>
          </View>

          {/* Irradiance Card */}
          <View style={[styles.card, styles.cardLight]}>
            <Text style={styles.cardIcon}>⚡</Text>
            <Text style={styles.cardLabel}>Irradiance</Text>
            <Text style={styles.cardValue}>
              850 <Text style={styles.cardUnit}>W/m²</Text>
            </Text>
          </View>

          {/* Cloud Cover Card */}
          <View style={[styles.card, styles.cardGreen]}>
            <View style={styles.cloudIconContainer}>
              <Text style={styles.cardIcon}>☁</Text>
              <Text style={styles.sunIcon}>☀</Text>
            </View>
            <Text style={styles.cardLabelGreen}>Cloud Cover</Text>
            <Text style={styles.cardValueGreen}>
              15 <Text style={styles.cardUnit}>%</Text>
            </Text>
          </View>

          {/* Humidity Card */}
          <View style={[styles.card, styles.cardLight]}>
            <Text style={styles.cardIcon}>💧</Text>
            <Text style={styles.cardLabel}>Humidity</Text>
            <Text style={styles.cardValue}>
              62 <Text style={styles.cardUnit}>%</Text>
            </Text>
          </View>
        </View>

        {/* Historical Data Section */}
        <Text style={styles.sectionTitle}>Historical Data Summary</Text>

        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Avg. Sunlight Hours</Text>
            <Text style={styles.dataValue}>8.2 hrs/day</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>7-Day Avg. Energy</Text>
            <Text style={styles.dataValue}>17.5 kWh</Text>
          </View>

          <View style={[styles.dataRow, styles.lastDataRow]}>
            <Text style={styles.dataLabel}>Peak Generation Time</Text>
            <Text style={styles.dataValue}>12.00 - 2.00 PM</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2332',
  },
  scrollContent: {
    paddingHorizontal: width * 0.053,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: '#fff',
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    color: '#fff',
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
  },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    minHeight: 100,
  },
  cardLight: {
    backgroundColor: '#f5f1e3',
  },
  cardGreen: {
    backgroundColor: '#32cd32',
  },
  cardIcon: {
    fontSize: responsiveFontSize(24),
    marginBottom: 8,
  },
  cloudIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sunIcon: {
    fontSize: responsiveFontSize(16),
    marginLeft: -8,
  },
  cardLabel: {
    fontSize: responsiveFontSize(12),
    color: '#666',
    marginBottom: 4,
  },
  cardLabelGreen: {
    fontSize: responsiveFontSize(12),
    color: '#1a5c1a',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: responsiveFontSize(32),
    fontWeight: 'bold',
    color: '#000',
  },
  cardValueGreen: {
    fontSize: responsiveFontSize(32),
    fontWeight: 'bold',
    color: '#1a5c1a',
  },
  cardUnit: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'normal',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  dataContainer: {
    backgroundColor: 'transparent',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastDataRow: {
    borderBottomWidth: 0,
  },
  dataLabel: {
    fontSize: responsiveFontSize(15),
    color: '#fff',
    fontWeight: '400',
  },
  dataValue: {
    fontSize: responsiveFontSize(15),
    color: '#ffd700',
    fontWeight: '600',
  },
});

export default SolarForecasting;