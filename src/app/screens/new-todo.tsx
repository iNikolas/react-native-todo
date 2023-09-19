import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {View as NativeView} from 'react-native';
import {styled} from 'styled-components/native';

const Blur = styled(BlurView)`
  position: 'absolute';
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
`;

const View = styled(NativeView)`
  position: relative;
`;

const AbsoluteView = styled(NativeView)`
  padding: 5%;
  padding-top: 50%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
`;

import {GoBackBtn, NewTodoInput} from '../../components';

const blurAmount = 40;

export function NewTodo() {
  return (
    <View>
      <Blur blurType="light" blurAmount={blurAmount} />
      <AbsoluteView>
        <NewTodoInput />
        <GoBackBtn />
      </AbsoluteView>
    </View>
  );
}
