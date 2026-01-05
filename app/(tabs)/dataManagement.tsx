import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import * as Icon from "phosphor-react-native";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const DataManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Week");
  const [showDropdown, setShowDropdown] = useState(false);

  const periods = ["Day", "Week", "Month", "Year"];

  const allChartData: { [key: string]: { label: string; value: number }[] } = {
    Day: [
      { label: "00:00", value: 30 },
      { label: "04:00", value: 45 },
      { label: "08:00", value: 60 },
      { label: "12:00", value: 85 },
      { label: "16:00", value: 70 },
      { label: "20:00", value: 40 },
    ],
    Week: [
      { label: "Mon", value: 45 },
      { label: "Tue", value: 55 },
      { label: "Wed", value: 65 },
      { label: "Thu", value: 40 },
      { label: "Fri", value: 50 },
      { label: "Sat", value: 85 },
      { label: "Sun", value: 60 },
    ],
    Month: [
      { label: "W1", value: 60 },
      { label: "W2", value: 75 },
      { label: "W3", value: 50 },
      { label: "W4", value: 90 },
    ],
    Year: [
      { label: "Jan", value: 45 },
      { label: "Feb", value: 55 },
      { label: "Mar", value: 65 },
      { label: "Apr", value: 40 },
      { label: "May", value: 50 },
      { label: "June", value: 85 },
      { label: "July", value: 60 },
      { label: "Aug", value: 70 },
      { label: "Sep", value: 35 },
      { label: "Oct", value: 50 },
      { label: "Nov", value: 45 },
      { label: "Dec", value: 60 },
    ],
  };

  const currentChartData = allChartData[selectedPeriod];

  const historyData = [
    { id: 1, name: "Computer System", count: 2, percentage: 20, icon: "Monitor" },
    { id: 2, name: "Air Conditioner", count: 5, percentage: 40, icon: "Wind" },
    { id: 3, name: "Livingroom", count: 6, percentage: 60, icon: "Couch" },
    { id: 4, name: "CCTV Camera", count: 4, percentage: 50, icon: "Camera" },
  ];

  return (
    <ScreenWrapper>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Watermark Background */}
          <Typo
            size={70}
            fontWeight="800"
            color={colors.textSecondary}
            style={styles.backgroundText}
          >
            Solar Monitor
          </Typo>

          <View style={styles.main}>
            {/* Title */}
            <Typo size={24} fontWeight="700" color={colors.textPrimary} style={styles.pageTitle}>
              Data Synchronization
            </Typo>

            {/* Consumption Card */}
            <View style={styles.consumptionCard}>
              <View style={styles.cardHeader}>
                <View>
                  <View style={styles.valueRow}>
                    <Typo size={32} fontWeight="700" color="#000">
                      78.36
                    </Typo>
                    <Typo size={14} color="#000" style={{ marginLeft: 5, marginBottom: 5 }}>
                      Kwh
                    </Typo>
                  </View>
                  <Typo size={14} color="#555">
                    Report on your power consumption
                  </Typo>
                </View>
                <View>
                  <Pressable 
                    style={styles.periodSelector}
                    onPress={() => setShowDropdown(true)}
                  >
                    <Typo size={14} fontWeight="600" color="#fff">
                      {selectedPeriod}
                    </Typo>
                    <Icon.CaretDown size={16} color="#fff" style={{ marginLeft: 5 }} />
                  </Pressable>

                  <Modal
                    visible={showDropdown}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowDropdown(false)}
                  >
                    <TouchableOpacity 
                      style={styles.modalOverlay}
                      activeOpacity={1}
                      onPress={() => setShowDropdown(false)}
                    >
                      <View style={styles.dropdownMenu}>
                        {periods.map((period) => (
                          <TouchableOpacity
                            key={period}
                            style={[
                              styles.dropdownItem,
                              selectedPeriod === period && styles.activeDropdownItem
                            ]}
                            onPress={() => {
                              setSelectedPeriod(period);
                              setShowDropdown(false);
                            }}
                          >
                            <Typo 
                              size={14} 
                              fontWeight={selectedPeriod === period ? "700" : "400"}
                              color={selectedPeriod === period ? colors.primary : "#fff"}
                            >
                              {period}
                            </Typo>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
              </View>

              {/* Bar Chart */}
              <View style={styles.chartContainer}>
                {currentChartData.map((item, index) => (
                  <View key={index} style={[styles.barColumn, { width: `${100 / currentChartData.length}%` }]}>
                    <View style={styles.barBackground}>
                      <View 
                        style={[
                          styles.barFill, 
                          { height: `${item.value}%` },
                          (item.label === "June" || item.label === "12:00" || item.label === "Sat" || item.label === "W4") && styles.highlightedBar
                        ]} 
                      />
                    </View>
                    <Typo size={8} color="#000" style={styles.monthLabel}>
                      {item.label}
                    </Typo>
                  </View>
                ))}
              </View>
            </View>

            {/* History Section */}
            <View style={styles.historySection}>
              <View style={styles.historyHeader}>
                <Typo size={24} fontWeight="700" color={colors.textPrimary}>
                  History
                </Typo>
                <Pressable>
                  <Typo size={14} fontWeight="600" color={colors.primary}>
                    See More
                  </Typo>
                </Pressable>
              </View>

              <View style={styles.historyList}>
                {historyData.map((device) => {
                  const DeviceIcon = (Icon as any)[device.icon];
                  return (
                    <View key={device.id} style={styles.deviceItem}>
                      <View style={styles.deviceInfo}>
                        <View style={styles.iconContainer}>
                          {DeviceIcon && <DeviceIcon size={24} color={colors.textPrimary} />}
                        </View>
                        <View style={styles.deviceText}>
                          <Typo size={16} fontWeight="600" color={colors.textPrimary}>
                            {device.name}
                          </Typo>
                          <Typo size={12} color={colors.textSecondary}>
                            {device.count} Devices
                          </Typo>
                        </View>
                      </View>
                      <View style={styles.percentageContainer}>
                        <Typo size={20} fontWeight="700" color="#FFD700">
                          {device.percentage}
                        </Typo>
                        <Typo size={12} color={colors.textSecondary} style={{ marginLeft: 2 }}>
                          %
                        </Typo>
                      </View>
                      <View style={styles.separator} />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default DataManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacingY._30,
  },
  backgroundText: {
    position: "absolute",
    top: verticalScale(400),
    alignSelf: "center",
    opacity: 0.06,
    textTransform: "uppercase",
    letterSpacing: 4,
    zIndex: -1,
  },
  main: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
    gap: spacingY._25,
  },
  pageTitle: {
    marginBottom: spacingY._5,
  },
  consumptionCard: {
    backgroundColor: "#A2D98F", // Light lime/green color from image
    borderRadius: 30,
    padding: spacingX._20,
    minHeight: 350,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacingY._30,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  periodSelector: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacingX._12,
    paddingVertical: spacingY._7,
    borderRadius: 20,
    minWidth: 80,
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    backgroundColor: "#14303D",
    borderRadius: 15,
    padding: spacingY._10,
    width: 150,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingX._15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  activeDropdownItem: {
    backgroundColor: "rgba(50, 205, 50, 0.1)",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 180,
    marginTop: "auto",
    paddingBottom: 10,
  },
  barColumn: {
    alignItems: "center",
  },
  barBackground: {
    width: 12,
    height: 150,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    backgroundColor: "#32CD32", // Primary green
    borderRadius: 10,
  },
  highlightedBar: {
    backgroundColor: "#00FF00", // Brighter green for peak
    opacity: 0.8,
  },
  monthLabel: {
    marginTop: spacingY._10,
  },
  historySection: {
    gap: spacingY._20,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyList: {
    gap: spacingY._15,
  },
  deviceItem: {
    position: "relative",
    paddingBottom: spacingY._15,
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._15,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  deviceText: {
    flex: 1,
  },
  percentageContainer: {
    position: "absolute",
    right: 0,
    top: 5,
    flexDirection: "row",
    alignItems: "baseline",
  },
  separator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});