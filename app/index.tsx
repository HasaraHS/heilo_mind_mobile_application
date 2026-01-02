import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '@/constants/theme'


const Index = () => {


  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('../assets/images/logo-removebg.png')}
      />
    </View>
  )
}

export default Index


const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  logo: {
    height: "25%",
    aspectRatio: 1,
  }
})