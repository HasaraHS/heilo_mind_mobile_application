import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from "react-native";

const BatteryRuntime = () => {
  // Sample power activity data for the graph
  const powerData = [
    { time: "00:00", value: 40 },
    { time: "04:00", value: 35 },
    { time: "08:00", value: 50 },
    { time: "12:00", value: 65 },
    { time: "16:00", value: 75 },
    { time: "20:00", value: 55 },
    { time: "24:00", value: 45 },
  ];

  const maxValue = 100;
  const graphHeight = 150;
  const graphWidth = 280;

  // Calculate points for the graph line
  const calculateYPosition = (value: number) => {
    return graphHeight - (value / maxValue) * graphHeight;
  };

  // Generate SVG path for curved line
  const generateCurvedPath = () => {
    const points = powerData.map((point, index) => ({
      x: (index / (powerData.length - 1)) * graphWidth,
      y: calculateYPosition(point.value),
    }));

    let pathData = `M ${points[0].x} ${points[0].y}`;

    // Create smooth curve using quadratic bezier curves
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const prev = points[i - 1];
      const controlX = (prev.x + current.x) / 2;
      const controlY = (prev.y + current.y) / 2;

      pathData += ` Q ${controlX} ${controlY}, ${current.x} ${current.y}`;
    }

    return pathData;
  };

  // Generate curved line segments using multiple small lines
  const getCurvedLineSegments = () => {
    const segments = [];
    const smoothness = 10; // More points = smoother curve

    for (let i = 0; i < powerData.length - 1; i++) {
      const current = powerData[i];
      const next = powerData[i + 1];
      const x1 = (i / (powerData.length - 1)) * graphWidth;
      const y1 = calculateYPosition(current.value);
      const x2 = ((i + 1) / (powerData.length - 1)) * graphWidth;
      const y2 = calculateYPosition(next.value);

      // Create smooth transition with intermediate points
      for (let t = 0; t <= smoothness; t++) {
        const ratio = t / smoothness;
        // Ease function for smooth curve
        const easeRatio = ratio < 0.5 ? 2 * ratio * ratio : -1 + (4 - 2 * ratio) * ratio;
        
        const x = x1 + (x2 - x1) * ratio;
        const y = y1 + (y2 - y1) * easeRatio;

        segments.push({ x, y });
      }
    }

    return segments;
  };

  const curveSegments = getCurvedLineSegments();

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>

          {/* Watermark */}
          <Typo
            size={70}
            fontWeight="800"
            color={colors.textSecondary}
            style={styles.backgroundText}
          >
            solar monitor
          </Typo>

          {/* Main Content */}
          <View style={styles.main}>
            {/* Title */}
            <Typo size={24} fontWeight="700" color={colors.textPrimary} style={{ textAlign: "center" }}>
              Battery Runtime
            </Typo>

            {/* Graph Container */}
            <View style={styles.graphCard}>
              {/* Header */}
              <View style={styles.graphHeader}>
                <Typo size={14} fontWeight="600" color={colors.textSecondary}>
                  RECENT POWER ACTIVITY
                </Typo>
              </View>

              {/* Date Range */}
              <View style={styles.dateRange}>
                <Typo size={12} fontWeight="600" color={colors.textSecondary}>
                  Aug 1
                </Typo>
                <Typo size={12} fontWeight="600" color={colors.textSecondary}>
                  Aug 2
                </Typo>
              </View>

              {/* Graph with curved line */}
              <View style={styles.graphContainer}>
                {/* Y-axis grid lines */}
                <View style={styles.gridLines}>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <View
                      key={index}
                      style={[
                        styles.gridLine,
                        {
                          top: (index * graphHeight) / 4,
                        },
                      ]}
                    />
                  ))}
                </View>

                {/* SVG Curved Line Chart */}
                <View style={styles.svgContainer}>
                  {/* Curved line made from small segments */}
                  {curveSegments.map((point, index) => {
                    if (index === 0) return null;
                    const prevPoint = curveSegments[index - 1];
                    const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);
                    const distance = Math.sqrt(
                      Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2)
                    );

                    return (
                      <View
                        key={`curve-${index}`}
                        style={[
                          styles.curveSegment,
                          {
                            left: prevPoint.x,
                            top: prevPoint.y,
                            width: distance,
                            transform: [{ rotate: `${(angle * 180) / Math.PI}deg` }],
                            transformOrigin: "0 0",
                          },
                        ]}
                      />
                    );
                  })}

                  {/* Data point dots */}
                  {powerData.map((point, index) => {
                    const x = (index / (powerData.length - 1)) * graphWidth;
                    const y = calculateYPosition(point.value);
                    return (
                      <View
                        key={`point-${index}`}
                        style={[
                          styles.dataPoint,
                          {
                            left: x - 5,
                            top: y - 5,
                          },
                        ]}
                      />
                    );
                  })}
                </View>
              </View>

              {/* X-axis labels */}
              <View style={styles.xAxisLabels}>
                {powerData.map((point, index) => (
                  <View key={index} style={styles.xAxisLabel}>
                    <Typo size={9} color={colors.textSecondary}>
                      {point.time}
                    </Typo>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default BatteryRuntime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  /* Watermark */
  backgroundText: {
    position: "absolute",
    top: verticalScale(400),
    alignSelf: "center",
    opacity: 0.06,
    textTransform: "uppercase",
    letterSpacing: 4,
  },

  main: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
    gap: spacingY._20,
  },

  /* Graph Card */
  graphCard: {
    backgroundColor: "rgba(30, 40, 35, 0.8)",
    borderRadius: 16,
    padding: spacingX._15,
    borderWidth: 1,
    borderColor: colors.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  graphHeader: {
    marginBottom: spacingY._12,
  },

  dateRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacingY._12,
    paddingHorizontal: spacingX._5,
  },

  graphContainer: {
    position: "relative",
    height: 180,
    marginBottom: spacingY._15,
  },

  gridLines: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  gridLine: {
    width: "100%",
    height: 1,
    backgroundColor: colors.surface,
    opacity: 0.3,
  },

  svgContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  curveSegment: {
    position: "absolute",
    height: 2,
    backgroundColor: "#7CFC00",
    borderRadius: 1,
  },

  dataPoint: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7CFC00",
    shadowColor: "#7CFC00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: 10,
  },

  xAxisLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacingX._5,
    marginTop: spacingY._7,
  },

  xAxisLabel: {
    alignItems: "center",
  },
});
