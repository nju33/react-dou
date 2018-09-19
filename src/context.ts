import React from 'react';
import {DouProviderState} from './dou-provider.organism';

export const Context = React.createContext<DouProviderState>({
  message: '',
  hidden: true,
  eventFactory() {
    throw new Error('no implement');
  },
});
