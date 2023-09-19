import {Box as NativeBox} from '@rneui/layout';
import React from 'react';
import {Text, View as NativeView} from 'react-native';
import styled from 'styled-components/native';

import {TodoType} from '@store';
import {theme} from '@theme';
import {convertColorToRGBA, getTimeFromNow} from '@utils';

import {BasicCheckbox} from '../../../ui-kit';
import {EditableDescriptionField} from './components';
import {TodoListProps} from './types';

const bgOpacity = 0.2;

const Box = styled(NativeView)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

const View = styled(NativeBox)<{isDone: boolean}>`
  display: flex;
  flex-direction: row;
  background-color: ${({isDone}) =>
    isDone
      ? convertColorToRGBA(theme.darkColors?.success ?? 'green', bgOpacity)
      : convertColorToRGBA(theme.darkColors?.error ?? 'red', bgOpacity)};
  margin: 1px 2px 0 2px;
  border-radius: 4px;
  gap: 2px;
  padding: 2px;
`;

const Description = styled.View`
  flex-basis: 85%;
`;

const Created = styled.Text`
  flex-basis: 15%;
  text-align: center;
`;

export function Todo({
  description,
  isDone,
  created,
  selected,
  onSelectionChange,
  showCheckboxes,
  editable,
  id,
  onFinishEditing,
}: TodoType & TodoListProps) {
  return (
    <View isDone={isDone}>
      {showCheckboxes && (
        <Box>
          <BasicCheckbox checked={selected} onPress={onSelectionChange} />
        </Box>
      )}
      {!showCheckboxes && !editable && (
        <Created>{getTimeFromNow(created)}</Created>
      )}
      <Description>
        {editable ? (
          <EditableDescriptionField
            onFinishEditing={onFinishEditing}
            initialText={description}
            id={id}
          />
        ) : (
          <Text>{description}</Text>
        )}
      </Description>
    </View>
  );
}
