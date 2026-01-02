import { colors, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text } from '@react-navigation/elements';
import * as Icons from 'phosphor-react-native';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

  const tabbarIcons: any = {
     home: (isFocused: boolean) => (
        <Icons.HouseIcon 
        size={verticalScale(30)}
        weight={isFocused ? 'fill' : 'regular'}
        color={isFocused ? colors.primary : colors.textPrimary} />  
      ),
      mirrorRedirect: (isFocused: boolean) => (
        <Icons.LightningAIcon 
        size={verticalScale(30)}
        weight={isFocused ? 'fill' : 'regular'}
        color={isFocused ? colors.primary : colors.textPrimary} />  
      ),
      solarForecasting: (isFocused: boolean) => (
        <Icons.SunIcon 
        size={verticalScale(30)}
        weight={isFocused ? 'fill' : 'regular'}
        color={isFocused ? colors.primary : colors.textPrimary} />  
      ),
      batteryOptimization: (isFocused: boolean) => (
        <Icons.BatteryChargingIcon 
        size={verticalScale(30)}
        weight={isFocused ? 'fill' : 'regular'}
        color={isFocused ? colors.primary : colors.textPrimary} />  
      ),
      dataManagement: (isFocused: boolean) => (
        <Icons.DatabaseIcon
        size={verticalScale(30)}
        weight={isFocused ? 'fill' : 'regular'}
        color={isFocused ? colors.primary : colors.textPrimary} />  
      ),
      profile: (isFocused: boolean) => (
        <Icons.UserCircleIcon
        size={verticalScale(30)}
        weight={isFocused ? 'fill' : 'regular'}
        color={isFocused ? colors.primary : colors.textPrimary} />  
      )
  }


  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label : any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            // href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {
              tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
   tabbar: {
    flexDirection: 'row', 
    width: '100%', 
    height: Platform.OS === 'ios'? verticalScale(73) : verticalScale(60),
    backgroundColor: colors.tabBar,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    borderTopColor: '#214656',
    borderTopWidth: 1,
   },
   tabbarItem: {
     marginBottom: Platform.OS === 'ios' ? spacingY._10 : spacingY._5,
     justifyContent: 'center',
     alignItems: 'center',

   }
})