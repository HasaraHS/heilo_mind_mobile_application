import { StyleSheet, View} from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/Typo'
import Button from '@/components/Button'
import Animated, {FadeIn} from 'react-native-reanimated'

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Top sliding bars */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.activeBar]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        {/* Background Watermark */}
        <Typo
          size={70}
          fontWeight="800"
          color={colors.textSecondary}
          style={styles.backgroundText}
        >
          solar monitor
        </Typo>

        {/* Center Content */}
        <View style={styles.centerContent}>
          <Animated.Image
            entering={FadeIn.duration(1000)}
            source={require("../../assets/images/logo-removebg.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Animated.View entering={FadeIn.duration(1200).delay(300)}>
            <Typo
              size={16}
              color={colors.textSecondary}
              style={styles.description}
            >
              Track, analyze, and improve your system get started to maximize
              efficiency effortlessly.
            </Typo>
          </Animated.View>
        </View>

        {/* Footer Button */}
        <View style={styles.footer}>
          <Animated.View entering={FadeIn.duration(800).delay(600)}>
            <Button onPress={() => {}}>
              <Typo size={16} fontWeight="600" color={colors.background}>
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  /* Progress Bars */
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacingX._10,
  },
  progressBar: {
    width: verticalScale(115),
    height: verticalScale(4),
    backgroundColor: colors.surface,
    borderRadius: 10,
  },
  activeBar: {
    backgroundColor: colors.buttonPrimary,
  },

  /* Background Text */
  backgroundText: {
    position: 'absolute',
    top: verticalScale(400),
    alignSelf: 'center',
    opacity: 0.06,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },

  /* Center Content */
  centerContent: {
    alignItems: 'center',
    paddingHorizontal: spacingX._30,
  },
  logo: {
    height: verticalScale(250),
    aspectRatio: 1,
    marginBottom: spacingY._12,
  },
  description: {
    textAlign: 'center',
    lineHeight: verticalScale(20),
  },

  /* Footer */
  footer: {
    paddingHorizontal: spacingX._25,
    paddingBottom: spacingY._25,
  },
})
