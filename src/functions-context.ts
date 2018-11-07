import React from 'react';

export interface DouFunctionsContext {
  ask(
    keyName: string,
    message: string | JSX.Element,
    sendingValue?: any,
  ): (ev?: React.MouseEvent<unknown>) => void;
  hide(id: string, keyName: string): (ev?: React.MouseEvent<unknown>) => void;
}

export const FunctionsContext = React.createContext<DouFunctionsContext>({
  ask() {
    throw new Error('no implement');
  },
  hide() {
    throw new Error('no implement');
  },
});
