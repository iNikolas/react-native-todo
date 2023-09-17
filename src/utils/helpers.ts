import α from 'color-alpha';
import {formatDistanceToNow} from 'date-fns';

export const isRejected = (
  input: PromiseSettledResult<unknown>,
): input is PromiseRejectedResult => input.status === 'rejected';

export const isFulfilled = <T>(
  input: PromiseSettledResult<T>,
): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

export const getTimeFromNow = (input: string): string =>
  formatDistanceToNow(new Date(input));

export const convertColorToRGBA = (color: string, opacity: number) =>
  α(color, opacity);
