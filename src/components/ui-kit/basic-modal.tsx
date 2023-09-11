import React from 'react';
import {Modal, ModalProps, View} from 'react-native';

import {BasicButton} from './basic-btn';

export function BasicModal({
  children,
  onClose,
  confirmBtnText,
  ...modalProps
}: {
  children: JSX.Element;
  onClose: () => void;
  confirmBtnText?: string;
} & ModalProps) {
  return (
    <Modal animationType="slide" {...modalProps}>
      <View>
        {children}
        <BasicButton onPress={onClose} title={confirmBtnText ?? 'OK'} />
      </View>
    </Modal>
  );
}
