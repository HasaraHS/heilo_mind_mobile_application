import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icon from "phosphor-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const BatteryOptimization = () => {
  const [batteryLevel] = useState(12);
  const router = useRouter();

  const handlePowerDrainingPress = () => {
    router.push("/battery_runtime/page");
  };

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
            <Typo size={28} fontWeight="700" color={colors.textPrimary} style={{ textAlign: "center", marginBottom: spacingY._10 }}>
              Battery Runtime
            </Typo>
            
            {/* Battery Visualization */}
            <View style={styles.batteryContainer}>
             
              
              {/* Battery Frame */}
              <View style={styles.batteryFrame}>
                {/* Battery Cap */}
                <View style={styles.batteryCap} />
                
                {/* Battery Body */}
                <View style={styles.batteryBody}>
                  {/* Lightning Icon at Top */}
                  <View style={styles.topIconContainer}>
                    <Icon.Lightning
                      size={40}
                      color="#90EE90"
                      weight="fill"
                    />
                  </View>
                  
                  {/* Battery Fill */}
                  <View style={[styles.batteryFill, { height: `${batteryLevel}%` }]}>
                    {/* Inner Glow Layers */}
                    <View style={styles.innerGlowBottom} />
                    <View style={styles.innerGlowMiddle} />
                    <View style={styles.innerGlowTop} />
                  </View>
                  
                  {/* Battery Percentage */}
                  <View style={styles.percentageContainer}>
                    <Typo size={48} fontWeight="700" color="#fff">
                      {batteryLevel}
                    </Typo>
                    <Typo size={20} fontWeight="600" color="#fff" style={{ marginLeft: 4 }}>
                      %
                    </Typo>
                  </View>
                </View>
              </View>
            </View>

        

            {/* Battery Widgets Grid */}
            <View style={styles.widgetsContainer}>
              {/* Row 1 */}
              <View style={styles.widgetRow}>
                {/* Remaining Battery Life Widget */}
                <View style={styles.widgetLarge}>
                  <Typo size={12} fontWeight="600" color="#000" style={{ marginBottom: 8 }}>
                    REMAINING BATTERY LIFE
                  </Typo>
                  <Typo size={32} fontWeight="700" color="#000">
                    5.13h
                  </Typo>
                </View>
                
                {/* Power Draining Widget */}
                <Pressable style={styles.widgetSmall} onPress={handlePowerDrainingPress}>
                  <View style={styles.widgetSmallContent}>
                    <View>
                      <Typo size={28} fontWeight="700" color="#000">
                        18
                      </Typo>
                      <Typo size={11} fontWeight="600" color="#000" style={{ marginTop: 4 }}>
                        POWER DRAINING
                      </Typo>
                      <Typo size={10} color="#000">
                        Devices
                      </Typo>
                    </View>
                    <Icon.CaretRight
                      size={24}
                      color="#000"
                      weight="bold"
                    />
                  </View>
                </Pressable>
              </View>

              {/* Row 2 */}
              <View style={styles.widgetRow}>
                {/* Time to Fully Charge Widget */}
                <View style={styles.widgetSmall}>
                  <Typo size={12} fontWeight="600" color="#000" style={{ marginBottom: 8 }}>
                    TIME TO FULLY CHARGE
                  </Typo>
                  <Typo size={28} fontWeight="700" color="#000">
                    2h
                  </Typo>
                </View>

                {/* Battery Health Widget */}
                <View style={styles.widgetLarge}>
                  <Typo size={12} fontWeight="600" color="#000" style={{ marginBottom: 8 }}>
                    State of Battery Health
                  </Typo>
                  <Typo size={32} fontWeight="700" color="#000">
                    89%
                  </Typo>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default BatteryOptimization;

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
    justifyContent: "center",
    alignItems: "center",
    gap: spacingY._30,
  },

  /* Battery Visualization */
  batteryContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 320,
  },

  /* Glow Effects */
  glowOuter: {
    position: "absolute",
    width: 240,
    height: 360,
    borderRadius: 50,
    backgroundColor: "#00ff00",
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 20,
  },
  glowMiddle: {
    position: "absolute",
    width: 220,
    height: 340,
    borderRadius: 45,
    backgroundColor: "#00ff00",
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
    elevation: 15,
  },
  glowInner: {
    position: "absolute",
    width: 200,
    height: 320,
    borderRadius: 40,
    backgroundColor: "#00ff00",
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },

  /* Battery Frame */
  batteryFrame: {
    alignItems: "center",
    zIndex: 10,
  },

  batteryCap: {
    width: 60,
    height: 15,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#7CFC00",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0,
    marginBottom: -2,
    shadowColor: "#7CFC00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },

  batteryBody: {
    width: 160,
    height: 280,
    backgroundColor: "rgba(20, 25, 20, 0.95)",
    borderWidth: 3,
    borderColor: "#7CFC00",
    borderRadius: 35,
    overflow: "hidden",
    justifyContent: "flex-end",
    shadowColor: "#7CFC00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },

  topIconContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },

  batteryFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#32CD32",
    opacity: 0.8,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#32CD32",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    overflow: "hidden",
  },

  /* Inner Glow Effects */
  innerGlowBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "#00ff00",
    opacity: 0.4,
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
  innerGlowMiddle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "#32CD32",
    opacity: 0.3,
    shadowColor: "#32CD32",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  innerGlowTop: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "80%",
    backgroundColor: "#7CFC00",
    opacity: 0.2,
    shadowColor: "#7CFC00",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },

  percentageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  /* Info Section */
  infoContainer: {
    gap: spacingY._10,
    marginTop: spacingY._20,
  },

  /* Widgets Section */
  widgetsContainer: {
    width: "100%",
    gap: spacingY._15,
  },

  widgetRow: {
    flexDirection: "row",
    gap: spacingX._15,
    width: "100%",
  },

  widgetLarge: {
    flex: 1.5,
    backgroundColor: "#7CFC00",
    borderRadius: 16,
    padding: spacingX._15,
    justifyContent: "flex-start",
    shadowColor: "#7CFC00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  widgetSmall: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacingX._15,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  widgetSmallContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});