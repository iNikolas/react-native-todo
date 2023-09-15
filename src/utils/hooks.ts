import React from 'react';

type CallbackType<A extends any[], R> = (...args: A) => R;

export const useEvent = <A extends any[], R>(
  callback: CallbackType<A, R>,
): CallbackType<A, R> => {
  const functionRef = React.useRef(callback);

  React.useLayoutEffect(() => {
    functionRef.current = callback;
  });

  return React.useCallback((...args) => {
    const functionCall = functionRef.current;
    return functionCall(...args);
  }, []);
};
