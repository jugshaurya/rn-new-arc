import {Link} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {Platform, TouchableOpacity} from 'react-native';

type NavigatePlatformWiseProps = {
  children: ReactElement;
  screen: string;
  routePath: string;
  isNativeRoute: boolean;
  isHardRedirect?: boolean;
  onPress: () => void;
};

const NavigatePlatformWise = (props: NavigatePlatformWiseProps) => {
  const renderLink = () => (
    <Link
      to={{
        screen: props.screen as never,
        params: {} as never,
      }}
      onPress={() => props.onPress()}>
      {props.children}
    </Link>
  );

  const renderCustomLink = () => (
    <TouchableOpacity
      activeOpacity={1}
      // @ts-expect-error: required for SEO
      href={'https://test6.infoedge.com' + props.routePath}
      target="_blank"
      accessibilityRole="link">
      {props.children}
    </TouchableOpacity>
  );

  return (
    <>
      {Platform.select({
        native: !props.isHardRedirect ? renderLink() : renderCustomLink(),
        web: props.isNativeRoute ? renderLink() : renderCustomLink(),
      })}
    </>
  );
};

export default NavigatePlatformWise;
