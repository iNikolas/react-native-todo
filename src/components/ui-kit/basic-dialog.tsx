import React from 'react';
import {Modal, ModalProps, View} from 'react-native';

import {BasicButton} from './basic-btn';

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
    <Modal animationType="slide" {...modalProps}>
      <View>
        {children}
        {
          <View>
            {extraBtns}
            <BasicButton onPress={onClose} title={closeDialogBtnText} />
          </View>
        }
      </View>
    </Modal>
  );
}
