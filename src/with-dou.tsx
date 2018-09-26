import React from 'react';
import {
  FunctionsContext /* , DouFunctionsContext */,
} from './functions-context';

function withDou<P, S>(
  Component: React.ComponentClass<P, S> | React.SFC<P>,
) {
  return class extends React.Component<P, S> {
    static displayName = `withDou(${Component.displayName})`;

    render() {
      return (
        <FunctionsContext.Consumer>
          {dou => {
            // @ts-ignore
            return <Component {...this.props} dou={dou} />;
          }}
        </FunctionsContext.Consumer>
      );
    }
  };
}

export {withDou};
