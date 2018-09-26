import React from 'react';

export interface DouFunctionsContext {
  ask(
    keyName: string,
    message: string,
    sendingValue?: any,
  ): (ev?: React.MouseEvent<unknown>) => void;
}

export const FunctionsContext = React.createContext<DouFunctionsContext>({
  ask() {
    throw new Error('no implement');
  },
});
