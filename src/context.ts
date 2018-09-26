import React from 'react';

export interface DouState {
  message: string;
  hidden: boolean;
  eventFactory(
    buttonIndex: number,
  ): {
    onClick(ev?: React.MouseEvent<unknown>): void;
  };
}

export type Dialogs = Map<string, DouState>;

export interface ContextValue {
  _regist(key: string, callback: ((buttonIndex: number) => any)): void;
  dialogs: Dialogs;
}

export const Context = React.createContext<ContextValue>({
  _regist() {
    throw new Error('no implement');
  },
  dialogs: new Map(),
});
