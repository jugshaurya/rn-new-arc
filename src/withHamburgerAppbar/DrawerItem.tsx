import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import SvgComponent from '../components/svgComponent';
import {DrawerContentType} from './hamburger_data';
import NavigatePlatformWise from './NavigatePlaformWise';
import HamburgerAccordion from './HamburgerAccordion';

const DrawerItem = (props: {
  onTap: () => void;
  item: DrawerContentType;
  height: number | null;
  closeDrawer: () => void;
}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        borderTopStyling: {
          borderColor: 'white',
          borderBottomColor: '#eaf1f5',
          borderWidth: 2,
          marginVertical: 10,
        },
        itemHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        },
        tabContainer: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        },
        itemRow: {
          flexDirection: 'row',
          width: '100%',
          flex: 1,
        },
        headerText: {
          fontSize: 15,
          fontWeight: '600',
          marginLeft: 14,
          color: '#1b2437',
          lineHeight: 20,
          // width:'100%'
        },
        arrow: {},
        content: {
          backgroundColor: '#fff',
          color: '#1b2437',
          fontSize: 15,
          lineHeight: 20,
          paddingLeft: 26,
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

  const renderTopBorder = () => {
    if (props.item.hasBorderTop) {
      return <View style={styles.borderTopStyling} />;
    }
    return null;
  };

  const handleItemPress = () => {
    props.onTap();
    if (props.item.subcategory) {
      return;
    } else {
      props.closeDrawer();
    }
  };

  return (
    <>
      {renderTopBorder()}
      {props.item.routeName ? (
        <>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleItemPress}
            style={styles.itemHeader}>
            {/* <SvgComponent
              height={16}
              width={16}
              style={{width: 16, height: 16}}
              Src={props.item.labelIcon}
            /> */}
            <View style={[styles.tabContainer]}>
              <NavigatePlatformWise
                screen={props.item.routeName}
                routePath={props.item.routePath ?? ''}
                isNativeRoute={props.item.isNativeRoute ?? false}
                isHardRedirect={props.item.isHardRedirect ?? false}
                onPress={() => {
                  if (props.item.subcategory) {
                    return;
                  }
                  if (props.item.routeName == null) {
                    return;
                  }
                  props.closeDrawer();
                }}>
                <View style={styles.itemRow}>
                  <Text style={styles.headerText}>{props.item.label}</Text>
                  {props.item.isNew && <Text style={styles.newLabel}>New</Text>}
                </View>
              </NavigatePlatformWise>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <HamburgerAccordion item={props.item} closeDrawer={props.closeDrawer} />
      )}
    </>
  );
};

export default DrawerItem;
