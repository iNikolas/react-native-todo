import {Icon, IconProps, useTheme} from '@rneui/themed';
import React from 'react';

export function BasicIcon(props: IconProps) {
  const {theme} = useTheme();
  const {color = theme.colors.primary, ...iconProps} = props;

  return <Icon color={color} {...iconProps} />;
}
