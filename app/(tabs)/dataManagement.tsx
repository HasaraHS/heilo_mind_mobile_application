import { StyleSheet, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header';
import { spacingX, spacingY } from '@/constants/theme'

const DataManagement = () => {
  return (
    <ScreenWrapper>
     <View style={styles.container}>
      {/* header */}
        <Header title="Data Synchronization" style={{ marginVertical: spacingY._10 }} />
     </View>
    </ScreenWrapper>
  )
}

export default DataManagement

const styles = StyleSheet.create({
  container: {
     flex:1,
     paddingHorizontal: spacingX._20,
  }
})