import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import Appbar from './Appbar';

type withHamburgerAppbarType = {
  ScreenComponent: React.FC;
  showAppbar: boolean;
  // isHeaderTransparent: boolean;
  // isSticky: boolean;
};

const withHamburgerAppbar = ({
  ScreenComponent,
  showAppbar,
}: withHamburgerAppbarType) => {
  const ScreenWithDrawer = (props: object) => {
    const styles = useMemo(() => {
      return StyleSheet.create({
        compStyle: {
          marginTop: 56,
          flex: 1,
          backgroundColor: 'white',
        },
      });
    }, []);

    return showAppbar ? (
      <>
        <Appbar />
        <View style={styles.compStyle}>
          <ScreenComponent {...props} />
        </View>
      </>
    ) : (
      <ScreenComponent {...props} />
    );
  };

  return ScreenWithDrawer;
};

export default withHamburgerAppbar;
