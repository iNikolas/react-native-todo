import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React from 'react';

import {theme} from '@theme';
import {getErrorMessage} from '@utils';

import {styled} from 'styled-components/native';
import {BasicButton, BasicInput} from './ui-kit';

const Input = styled(BasicInput)`
  width: 200px;
`;

const Button = styled(BasicButton).attrs({
  titleStyle: {color: theme.lightColors?.error},
})``;

export function PhoneConfirmationInput({
  confirm,
  setConfirm,
}: {
  confirm: FirebaseAuthTypes.ConfirmationResult;
  setConfirm: React.Dispatch<
    React.SetStateAction<FirebaseAuthTypes.ConfirmationResult | null>
  >;
}) {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const confirmCode = async (code: string) => {
    setLoading(true);
    setErrorMessage('');

    try {
      await confirm.confirm(code);
    } catch (error) {
      setErrorMessage(getErrorMessage(error) ?? 'Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        placeholder="Confirmation code"
        btnContent="Confirm Code"
        inputProps={{errorMessage}}
        onPress={confirmCode}
        btnProps={{loading, disabled: loading}}
      />
      <Button title="Cancel" type="clear" onPress={() => setConfirm(null)} />
    </>
  );
}
