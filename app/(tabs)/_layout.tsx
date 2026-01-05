import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import CustomTabs from "@/components/CustomTabs";

const _layout = () => {
  return (
     <Tabs
      tabBar={(props) => <CustomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="mirrorRedirect" options={{ title: "Angels" }} />
      <Tabs.Screen name="solarForecasting" options={{ title: "Forecast" }} />
      <Tabs.Screen name="batteryOptimization" options={{ title: "Battery" }} />
      <Tabs.Screen name="dataManagement" options={{ title: "Data" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
