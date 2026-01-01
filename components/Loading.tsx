import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

const Loading = ({
    size = "large",
    color = colors.textPrimary,
}: ActivityIndicatorProps) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ActivityIndicator size={size} color={color}></ActivityIndicator>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})