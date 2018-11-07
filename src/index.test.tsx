import React from 'react';
import styled from 'styled-components';
import {
  DouProvider,
  Dou,
  withDou,
  createDou,
  Background,
  DouFunctionsProps,
} from '.';

const MyDou = createDou({
  Background: styled(Background)`
    opacity: 0.5;
  `,
});

class Test extends React.Component<{id: number}> {
  // @ts-ignore
  props: {id: number} & DouFunctionsProps;

  render() {
    return (
      <div
        onClick={this.props.dou.ask('foo', (_id, _keyName) => (
          <div />
        ))}
      >
        test
      </div>
    );
  }
}

const WithDou = withDou(Test);

(() => {
  return (
    <DouProvider>
      <WithDou id={1} />
      <Dou keyName="test" />
      <MyDou keyName="test" />
    </DouProvider>
  );
})();
