import {Stack as NativeStack} from '@rneui/layout';
import {Dialog} from '@rneui/themed';
import React from 'react';
import {ModalProps, View} from 'react-native';
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
  children: JSX.Element;
  onClose: () => void;
  closeDialogBtnText?: string;
  extraBtns?: JSX.Element;
} & ModalProps) {
  return (
    <Dialog animationType="slide" {...modalProps}>
      <View>
        {children}
        <Stack row align="center" justify="flex-end" spacing={1}>
          <BasicButton
            type="clear"
            onPress={onClose}
            title={closeDialogBtnText}
          />
          {extraBtns}
        </Stack>
      </View>
    </Dialog>
  );
}
