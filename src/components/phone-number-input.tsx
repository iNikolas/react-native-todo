import {Input, InputProps} from '@rneui/themed';
import React from 'react';
import NativePhoneInput from 'react-native-phone-input';
import {styled} from 'styled-components/native';
import {BasicButton} from './ui-kit';

const PhoneInput = styled(NativePhoneInput).attrs({
  flagStyle: {marginBottom: 24},
})``;

export function PhoneNumberInput({
  onSubmit,
  loading,
}: {
  onSubmit: (phone: string) => void;
  loading: boolean;
}) {
  const [errorMessage, setErrorMessage] = React.useState('');
  const phoneInput = React.useRef<NativePhoneInput<
    | React.FunctionComponent<React.PropsWithChildren<InputProps>>
    | React.ForwardRefExoticComponent<
        React.RefAttributes<React.PropsWithChildren<InputProps>>
      >
  > | null>(null);

  const handleSubmit = () => {
    const inputRef = phoneInput.current;
    if (!inputRef) {
      return setErrorMessage("Can't locate Phone Input");
    }

    if (inputRef.isValidNumber()) {
      return onSubmit(inputRef.getValue());
    }

    setErrorMessage('Provided phone number is invalid');
  };

  return (
    <>
      <PhoneInput
        ref={phoneInput}
        textComponent={Input}
        textProps={{
          errorMessage,
        }}
        initialCountry="ua"
        onChangePhoneNumber={() => setErrorMessage('')}
      />
      <BasicButton
        title="Submit"
        loading={loading}
        disabled={Boolean(errorMessage) || loading}
        onPress={handleSubmit}
      />
    </>
  );
}
