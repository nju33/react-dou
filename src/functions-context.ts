import React from 'react';

export interface DouFunctionsContext {
  ask(message: string): (ev?: React.MouseEvent<unknown>) => void;
}

export const FunctionsContext = React.createContext<DouFunctionsContext>({
  ask() {
    throw new Error('no implement');
  }
});
