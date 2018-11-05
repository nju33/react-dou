import React from 'react';
import {Dou, DouPassingProps} from './dou.organism';
import * as customizableComponents from './customizable-components';
import {Context} from './context';

export const createDou: (
  components: Partial<typeof customizableComponents>,
) => React.SFC<DouPassingProps> = components => {
  return (props: any) => {
    return (
      <Context.Consumer>
        {state => {
          return (
            <Dou
              components={components as any}
              {...props}
              douProviderState={state}
            />
          ) as any;
        }}
      </Context.Consumer>
    );
  };
};
