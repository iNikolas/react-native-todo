import {errorTypes} from '@constants';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type ErrorType = {type: typeof errorTypes.authError; message: string};

export type UserStateType = {
  data: FirebaseAuthTypes.User | null;
  errors: ErrorType[];
};

export const USER = 'user';
export type USER = typeof USER;
