import { StyleSheet, Text, TextStyle} from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'

const Typo = ({
    size,
    color = colors.textPrimary,
    fontWeight = '400',
    children,
    style,
    textProps = {}
}: TypoProps) => {

    const textStyle: TextStyle ={
        fontSize : size? verticalScale(size) : verticalScale(14),
        color,
        fontWeight,
    }
  return (
    <Text style={[textStyle, style]} {...textProps}>{children}</Text>
  )
}

export default Typo

const styles = StyleSheet.create({})