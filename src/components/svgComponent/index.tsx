import {Image, Platform, ImageSourcePropType, ImageStyle} from 'react-native';
import React, {ElementType} from 'react';

type svgComponentProps = {
  style: ImageStyle;
  Src: ImageSourcePropType | ElementType;
  height?: number;
  width?: number;
};

export default function SvgComponent(props: svgComponentProps) {
  if (Platform.OS === 'web') {
    return (
      <Image source={props.Src as ImageSourcePropType} style={props.style} />
    );
  } else {
    let dimensionProps: {height?: number; width?: number};
    if (props.height && props.width) {
      dimensionProps = {height: props.height, width: props.width};
    } else {
      dimensionProps = {};
    }
    const Svg = props.Src as ElementType;
    return <Svg {...dimensionProps} style={props.style} />;
  }
}
