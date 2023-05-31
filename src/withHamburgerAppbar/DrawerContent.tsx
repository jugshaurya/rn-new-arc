import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// import SvgComponent from '../components/svgComponent';
// import DummySvg from '../resources/svg/hamburger-dummy-img.svg';
import {drawerData, routeManifest, DrawerContentType} from './hamburger_data';

import NavigatePlatformWise from './NavigatePlaformWise';
import DrawerItem from './DrawerItem';

const isLoggedIn = true;
const currentUser = {
  name: 'Yash',
  education: {
    courseLabel: 'Ph.D/Doctorate',
    instituteLabel: 'Indian Institute of Technology',
  },
  pictureUrl: null,
};

// const pictureUrl =
//   currentUser && currentUser.pictureUrl ? currentUser.pictureUrl : DummySvg;

const DrawerContent = ({closeDrawer}: {closeDrawer: () => void}) => {
  const [data, setData] = useState<DrawerContentType[]>(drawerData);

  const handleTap = (index: number) => {
    const newData = [...data];
    newData[index].isExpanded = !newData[index].isExpanded;
    setData(newData);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        drawerHeader: {
          padding: 24,
          paddingBottom: 0,
          paddingLeft: 20,
          backgroundColor: 'white',
        },
        drawerHeaderContainer: {
          borderBottomColor: '#eaf1f5',
          borderBottomWidth: 2,
          paddingBottom: 16,
          flexDirection: 'row',
        },
        contentRight: {marginLeft: 12, flex: 1},
        username: {
          color: '#1b2437',
          fontSize: 15,
          fontWeight: '600',
          lineHeight: 20,
          textTransform: 'capitalize',
        },
        courseLabel: {
          color: '#8292b4',
          fontSize: 13,
          lineHeight: 18,
          marginTop: 2,
          marginBottom: 14,
        },
        profileButton: {
          fontSize: 15,
          fontWeight: '600',
          lineHeight: 20,
          color: '#457eff',
        },
        register: {
          backgroundColor: '#ff7555',
          borderRadius: 60,
          color: '#fff',
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 15,
          fontWeight: '600',
          lineheight: 20,
        },
        login: {
          backgroundColor: '#fff',
          borderColor: '#457eff',
          borderWidth: 1,
          borderRadius: 60,
          color: '#457eff',
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 15,
          fontWeight: '600',
          lineheight: 20,
          marginLeft: 18,
          display: 'flex',
        },
        container: {
          paddingVertical: 10,
          paddingLeft: 20,
          paddingRight: 24,
        },
      }),
    [],
  );

  const renderHeader = () => {
    return (
      <View style={styles.drawerHeader}>
        <View style={styles.drawerHeaderContainer}>
          {isLoggedIn ? (
            <>
              {/* <SvgComponent
                height={60}
                width={60}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                }}
                Src={pictureUrl}
              /> */}
              <View style={styles.contentRight}>
                {currentUser && currentUser.name && (
                  <Text style={styles.username}>{currentUser.name}</Text>
                )}
                {currentUser &&
                  currentUser.education &&
                  currentUser.education.courseLabel &&
                  currentUser.education.instituteLabel && (
                    <View>
                      <Text
                        style={
                          styles.courseLabel
                        }>{`${currentUser.education.courseLabel}, ${currentUser.education.instituteLabel}`}</Text>
                    </View>
                  )}
                <NavigatePlatformWise
                  screen={routeManifest.mnjData.routeName}
                  routePath={routeManifest.mnjData.routePath ?? ''}
                  isNativeRoute={routeManifest.mnjData.isNativeRoute ?? false}
                  onPress={() => {
                    if (routeManifest.mnjData.routeName == null) {
                      return;
                    }
                    closeDrawer();
                  }}>
                  <Text style={styles.profileButton}>
                    View & Update profile
                  </Text>
                </NavigatePlatformWise>
              </View>
            </>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <NavigatePlatformWise
                screen={routeManifest.resmanRegistration.routeName}
                routePath={routeManifest.resmanRegistration.routePath ?? ''}
                isNativeRoute={
                  routeManifest.resmanRegistration.isNativeRoute ?? false
                }
                onPress={() => {
                  if (routeManifest.resmanRegistration.routeName == null) {
                    return;
                  }
                  closeDrawer();
                }}>
                <Text style={styles.register}>Register</Text>
              </NavigatePlatformWise>
              <NavigatePlatformWise
                screen={routeManifest.login.routeName}
                routePath={routeManifest.login.routePath ?? ''}
                isNativeRoute={routeManifest.login.isNativeRoute ?? false}
                onPress={() => {
                  if (routeManifest.login.routeName == null) {
                    return;
                  }
                  closeDrawer();
                }}>
                <Text style={styles.login}>Login</Text>
              </NavigatePlatformWise>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      {renderHeader()}
      <View style={styles.container}>
        {data.map((item, index) => {
          if (item.onlyForLogout && !isLoggedIn) {
            return <></>;
          }
          return (
            <DrawerItem
              key={item.label}
              onTap={() => handleTap(index)}
              item={item}
              height={item.isExpanded ? null : 0}
              closeDrawer={closeDrawer}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
export default DrawerContent;
