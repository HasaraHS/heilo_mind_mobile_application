import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import {
  processDayData,
  processWeekData,
  processMonthData,
  processYearData,
} from "@/utils/syncChartProcessor";

import * as Icon from "phosphor-react-native";
import React, { useEffect, useState } from "react";
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

  const [chartData, setChartData] = useState<any>({
    Day: [],
    Week: [],
    Month: [],
    Year: [],
  });

  const periods = ["Day", "Week", "Month", "Year"];

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_SENSOR_API_URL as string
      );

      const data = await response.json();

      setChartData({
        Day: processDayData(data),
        Week: processWeekData(data),
        Month: processMonthData(data),
        Year: processYearData(data),
      });
    } catch (error) {
      console.log("Sensor fetch error:", error);
    }
  };

  const currentChartData = chartData[selectedPeriod] || [];

  const maxValue = Math.max(
    ...currentChartData.map((i: any) => i.value),
    1
  );

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
          {/* Watermark */}
          <Typo
            size={70}
            fontWeight="800"
            color={colors.textSecondary}
            style={styles.backgroundText}
          >
            Solar Monitor
          </Typo>

          <View style={styles.main}>
            <Typo
              size={24}
              fontWeight="700"
              color={colors.textPrimary}
              style={styles.pageTitle}
            >
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
                    <Typo
                      size={14}
                      color="#000"
                      style={{ marginLeft: 5, marginBottom: 5 }}
                    >
                      Kwh
                    </Typo>
                  </View>

                  <Typo size={14} color="#555">
                    Report on your power consumption
                  </Typo>
                </View>

                {/* Period selector */}
                <View>
                  <Pressable
                    style={styles.periodSelector}
                    onPress={() => setShowDropdown(true)}
                  >
                    <Typo size={14} fontWeight="600" color="#fff">
                      {selectedPeriod}
                    </Typo>
                    <Icon.CaretDown size={16} color="#fff" />
                  </Pressable>

                  <Modal
                    visible={showDropdown}
                    transparent
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
                              selectedPeriod === period &&
                                styles.activeDropdownItem,
                            ]}
                            onPress={() => {
                              setSelectedPeriod(period);
                              setShowDropdown(false);
                            }}
                          >
                            <Typo
                              size={14}
                              fontWeight={
                                selectedPeriod === period ? "700" : "400"
                              }
                              color={
                                selectedPeriod === period
                                  ? colors.primary
                                  : "#fff"
                              }
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

              {/* Chart */}
              <View style={styles.chartContainer}>
                {currentChartData.map((item: any, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.barColumn,
                      { width: `${100 / currentChartData.length}%` },
                    ]}
                  >
                    <View style={styles.barBackground}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: `${(item.value / maxValue) * 100}%`,
                          },
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

            {/* History */}
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
                          {DeviceIcon && (
                            <DeviceIcon
                              size={24}
                              color={colors.textPrimary}
                            />
                          )}
                        </View>

                        <View style={styles.deviceText}>
                          <Typo
                            size={16}
                            fontWeight="600"
                            color={colors.textPrimary}
                          >
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

                        <Typo
                          size={12}
                          color={colors.textSecondary}
                          style={{ marginLeft: 2 }}
                        >
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
  container: { flex: 1 },

  scrollContent: { paddingBottom: spacingY._30 },

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

  pageTitle: { marginBottom: spacingY._5 },

  consumptionCard: {
    backgroundColor: "#A2D98F",
    borderRadius: 30,
    padding: spacingX._20,
    minHeight: 350,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },

  dropdownItem: {
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingX._15,
  },

  activeDropdownItem: {
    backgroundColor: "rgba(50,205,50,0.1)",
  },

  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 180,
    marginTop: "auto",
  },

  barColumn: {
    alignItems: "center",
  },

  barBackground: {
    width: 12,
    height: 150,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 10,
    justifyContent: "flex-end",
    overflow: "hidden",
  },

  barFill: {
    width: "100%",
    backgroundColor: "#32CD32",
    borderRadius: 10,
  },

  monthLabel: {
    marginTop: spacingY._10,
  },

  historySection: { gap: spacingY._20 },

  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  historyList: { gap: spacingY._15 },

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
    justifyContent: "center",
    alignItems: "center",
  },

  deviceText: { flex: 1 },

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
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});