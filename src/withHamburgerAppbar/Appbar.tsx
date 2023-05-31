import React, {useMemo, useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  Text,
  Easing,
} from 'react-native';

// import {useNavigationState, useNavigation} from '@react-navigation/native';

// import SvgComponent from '../components/svgComponent';
// import HamburgerIcon from '../resources/svg/hamburger-icon.svg';
// import HamburgerWhiteIcon from '../resources/svg/hamburger-white-icon.svg';
// import BackIcon from '../resources/svg/hamburger-arrow-left.svg';
// import BackWhiteIcon from '../resources/svg/hamburger-arrow-left-white.svg';

import DrawerContent from './DrawerContent';

const Appbar = ({
  iconsInWhite = false,
}: {
  iconsInWhite?: boolean | undefined;
}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  //   const routesLength = useNavigationState(state => state.routes.length);

  const translateAnim = new Animated.Value(0);

  //   const navigation = useNavigation();

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(translateAnim, {
      toValue: 1,
      duration: 480,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.58, 1.0), // ease-out
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 480,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.58, 1.0), // ease-out
    }).start(() => {
      setDrawerOpen(false);
    });
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        hamOrBackStyle: {width: 24},
        appBarContainer: {
          position: 'absolute',
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 18,
          height: 60,
          zIndex: 999,
        },
        flexOne: {flex: 1},
        overlay: {backgroundColor: 'rgba(0,0,0,0.5)'},
        drawer: {
          position: 'absolute',
          top: 0,
          zIndex: 5,
          backgroundColor: '#fff',
          borderTopRightRadius: 20,
          shadowColor: 'rgb(32, 106, 238)',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 24,
        },
      }),
    [],
  );

  const isBack = false;

  const handleHamOrBackPress = () => {
    return /* isBack ? navigation.goBack() :  */ openDrawer();
  };

  const renderHamOrBack = () => {
    return (
      <View style={styles.hamOrBackStyle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleHamOrBackPress}
          hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}>
          {/* {iconsInWhite ? (
            <SvgComponent
              height={20}
              width={20}
              style={{width: 20, height: 20}}
              Src={isBack ? BackWhiteIcon : HamburgerWhiteIcon}
            />
          ) : (
            <SvgComponent
              height={20}
              width={20}
              style={{width: 20, height: 20}}
              Src={isBack ? BackIcon : HamburgerIcon}
            />
          )} */}
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const translateX = translateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-1 * 290, 0],
  });

  return (
    <>
      {iconsInWhite ? (
        renderHamOrBack()
      ) : (
        <View style={styles.appBarContainer}>{renderHamOrBack()}</View>
      )}
      <Modal
        transparent={true}
        visible={drawerOpen}
        animationType="none"
        onShow={openDrawer}
        onRequestClose={closeDrawer}>
        {/* overlay */}
        <View style={[styles.flexOne, styles.overlay]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.flexOne}
            onPress={closeDrawer}
          />
        </View>
        {/* drawer */}
        <Animated.View
          style={[
            styles.drawer,
            {backgroundColor: 'white'},
            {height: Dimensions.get('window').height},
            {width: 290},
            {transform: [{translateX}]},
          ]}>
          <DrawerContent closeDrawer={closeDrawer} />
        </Animated.View>
      </Modal>
    </>
  );
};

export default Appbar;
