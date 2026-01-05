import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { verticalScale } from '@/utils/styling'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import Header from '@/components/Header'
import { useAuth } from '@/context/authContext'
import {Image} from 'expo-image';
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import * as Icons from 'phosphor-react-native';
import Animated, { FadeInDown,  }  from 'react-native-reanimated'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'

const Profile = () => {
  const {user} = useAuth();

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: (
        <Icons.UserCircleIcon size={26} color={colors.surface} weight="fill" />
      ),
      routeName: "/(modals)/profileModal",
      bgColor: '#5FA55A',
    },

    {
      title: "Settings",
      icon: (
        <Icons.GearSixIcon size={26} color={colors.surface} weight="fill" />
      ),
      // routeName: "/(modals)/profileModal",
      bgColor: "#01B4BC",
    },

    {
      title: "Privacy Policy",
      icon: (
        <Icons.LockIcon size={26} color={colors.surface} weight="fill" />
      ),
      // routeName: "/(modals)/profileModal",
      bgColor: "#FA8925"
    },
    {
      title: "Logout",
      icon: (
        <Icons.PowerIcon size={26} color={colors.surface} weight="fill" />
      ),
      // routeName: "/(modals)/profileModal",
      bgColor: '#FA5457'
    },
  ];

   const handleLogout = async () => {
        await signOut(auth)
      }

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [{
      text: "Cancel",
      onPress: () =>console.log('cancel logout'),
      style: 'cancel'
   },
  {
    text: "Logout",
    onPress: () => handleLogout(),
    style: 'destructive'
  }])
  }

  const handlePress =  (item: accountOptionType) => {
     if(item.title === 'Logout'){
       showLogoutAlert();
     }
  }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* header */}
        <Header title="Profile" style={{ marginVertical: spacingY._10 }} />

        {/* user info */}
        <View style={styles.userInfo}>
          {/* user avatar */}
          <View>
            {/* user image */}
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>
          {/* name & email */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.textPrimary}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.textSecondary}>
              {user?.email}
            </Typo>
          </View>
        </View>
        {/* account options  */}
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => (
            <Animated.View entering={FadeInDown.delay(index*50).springify().damping(14)} style={styles.listItem} key={index.toString()}>
              <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                <View style={[styles.listIcon, {backgroundColor: item.bgColor} ]}>{item.icon && item.icon}</View>
                <Typo
                  size={16}
                  color={colors.textPrimary}
                  style={{ marginLeft: 10 , flex: 1}} fontWeight={'500'}
                >
                  {item.title}
                </Typo>
                <Icons.CaretRightIcon size={verticalScale(20)} weight='bold' color={colors.surface}/>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.surface,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.primary,
    shadowColor: colors.background,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: 'center',
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: `${colors.textPrimary}40`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._20,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  }
})