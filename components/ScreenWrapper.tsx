import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
        style,
      ]}
    >
      <StatusBar barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
