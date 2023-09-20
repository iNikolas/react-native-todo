import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Animated, {BounceIn} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {
  BasicButton,
  PhoneConfirmationInput,
  PhoneNumberInput,
} from '@src/components';
import {GUEST, putErrorAction, setUserAction} from '@store';
import {theme} from '@theme';
import {getErrorMessage} from '@utils';

import {Text as NativeText} from '@rneui/themed';
import {routes} from '../router';

const View = styled(Animated.View)`
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  padding: 8px;
  height: 100%;
`;

const Text = styled(NativeText)`
  margin-top: 16px;
`;

const Button = styled(BasicButton).attrs({
  titleStyle: {color: theme.lightColors?.warning},
})``;

export function PhoneSignIn() {
  const [loading, setLoading] = React.useState(false);
  const [confirm, setConfirm] =
    React.useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onAuthStateChanged = React.useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      dispatch(setUserAction(user));
      if (user) {
        navigation.navigate(routes.main);
      }
    },
    [dispatch, navigation],
  );

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  // Handle the button press
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      setConfirm(confirmation);
    } catch (error) {
      dispatch(
        putErrorAction(
          getErrorMessage(error) ??
            'Unable to authorize User for unknown reason',
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View entering={BounceIn} key={String(Boolean(confirm))}>
      {confirm ? (
        <PhoneConfirmationInput confirm={confirm} setConfirm={setConfirm} />
      ) : (
        <>
          <PhoneNumberInput
            loading={loading}
            onSubmit={signInWithPhoneNumber}
          />
          <Text>or</Text>
          <Button
            title="Proceed as Guest"
            type="clear"
            onPress={() => dispatch(setUserAction(GUEST))}
          />
        </>
      )}
    </View>
  );
}
