import { StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { useAuth } from '@/context/authContext'


const Home = () => {
  const {user} = useAuth()

  console.log("user", user);
  
  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})