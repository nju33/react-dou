import React from 'react';
import {FunctionsContext, DouFunctionsContext} from './functions-context';

function withDou<P = {}, S = any>(
  Component:
    | React.ComponentClass<P & {dou: DouFunctionsContext}, S>
    | React.SFC<P & {dou: DouFunctionsContext}>,
) {
  return class extends React.Component<P & {dou: DouFunctionsContext}, S> {
    render() {
      return (
        <FunctionsContext.Consumer>
          {dou => {
            return <Component {...this.props} dou={dou} />;
          }}
        </FunctionsContext.Consumer>
      );
    }
  };
}

export {withDou};
