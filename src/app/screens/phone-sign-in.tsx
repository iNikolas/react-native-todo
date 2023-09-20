import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Animated, {BounceIn} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {PhoneConfirmationInput, PhoneNumberInput} from '@src/components';
import {putErrorAction, setUserAction} from '@store';

import {getErrorMessage} from '@src/utils';
import {routes} from '../router';

const View = styled(Animated.View)`
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  padding: 8px;
  height: 100%;
`;

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
    console.log(phoneNumber);
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
        <PhoneNumberInput loading={loading} onSubmit={signInWithPhoneNumber} />
      )}
    </View>
  );
}
