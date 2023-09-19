import {Stack as NativeStack} from '@rneui/layout';
import {Dialog} from '@rneui/themed';
import React from 'react';
import {ModalProps} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {styled} from 'styled-components/native';

import {BasicButton} from './basic-btn/basic-btn';

const Stack = styled(NativeStack)`
  margin-top: 8px;
`;

export function BasicDialog({
  children,
  onClose,
  closeDialogBtnText = 'OK',
  extraBtns,
  ...modalProps
}: {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  closeDialogBtnText?: string;
  extraBtns?: JSX.Element;
} & ModalProps) {
  return (
    <Dialog animationType="fade" {...modalProps}>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        {children}
        <Stack row align="center" justify="flex-end" spacing={1}>
          <BasicButton
            type="clear"
            onPress={onClose}
            title={closeDialogBtnText}
          />
          {extraBtns}
        </Stack>
      </Animated.View>
    </Dialog>
  );
}
