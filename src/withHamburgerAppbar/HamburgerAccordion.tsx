import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
} from 'react-native';
// import SvgComponent from '../components/svgComponent';
// import ArrowTop from '../resources/svg/hamburger-arrow-top.svg';
import {DrawerContentType} from './hamburger_data';
import NavigatePlatformWise from './NavigatePlaformWise';

const HamburgerAccordion = ({
  item,
  closeDrawer,
}: {
  item: DrawerContentType;
  closeDrawer: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [arrowAnimation] = useState(new Animated.Value(0));
  const [heightAnimation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    setExpanded(!expanded);

    Animated.timing(heightAnimation, {
      toValue: heightAnimation._value == 0 ? 1 : 0,
      duration: 100,
      easing: Easing.bezier(0.49, 0.28, 1, 1),
      useNativeDriver: false,
    }).start();

    Animated.timing(arrowAnimation, {
      toValue: arrowAnimation._value == 0 ? 1 : 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const contentHeight = heightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (item.subcategory?.length ?? 0) * 36],
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        headerText: {
          fontSize: 15,
          fontWeight: '600',
          marginLeft: 14,
          color: '#1b2437',
          lineHeight: 20,
          // width:'100%'
        },
        content: {
          backgroundColor: '#fff',
          color: '#1b2437',
          fontSize: 15,
          lineHeight: 20,
          paddingLeft: 28,
          paddingVertical: 8,
        },
        newLabel: {
          backgroundColor: '#fdefef',
          borderRadius: 4,
          color: '#ee5c5c',
          fontSize: 11,
          fontWeight: '600',
          lineHeight: 14,
          marginLeft: 8,
          paddingHorizontal: 2,
          paddingVertical: 2,
        },
      }),
    [],
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={toggleExpand}
        style={{
          flexDirection: 'row',
          paddingVertical: 8,
          flex: 1,
          alignItems: 'center',
        }}>
        {/* <SvgComponent
          height={16}
          width={16}
          style={{width: 16, height: 16}}
          Src={item.labelIcon}
        /> */}
        <Text style={[styles.headerText, {flex: 1}]}>{item.label}</Text>
        <Animated.View
          style={[
            {
              transform: [
                {
                  rotate: arrowAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '360deg'],
                  }),
                },
              ],
            },
          ]}>
          {/* <SvgComponent
            width={24}
            height={24}
            style={{width: 24, height: 24}}
            Src={ArrowTop}
          /> */}
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={{height: contentHeight, overflow: 'hidden'}}>
        {expanded && (
          <View style={{}}>
            {item.subcategory?.map((subItem, index) => (
              <NavigatePlatformWise
                screen={subItem.routeName}
                routePath={subItem.routePath}
                isNativeRoute={subItem.isNativeRoute}
                isHardRedirect={subItem.isHardRedirect}
                onPress={() => {
                  if (subItem.routeName == null) {
                    return;
                  }
                  closeDrawer();
                }}
                key={index}>
                <View style={styles.content}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black'}}>{subItem.label}</Text>
                    {subItem.isNew && <Text style={styles.newLabel}>New</Text>}
                  </View>
                </View>
              </NavigatePlatformWise>
            ))}
          </View>
        )}
      </Animated.View>
    </>
  );
};

export default HamburgerAccordion;
