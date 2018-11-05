import React from 'react';
import styled from 'styled-components';
import {DouProvider, Dou, withDou, createDou, Background} from '.';

const MyDou = createDou({
  Background: styled(Background)`
    opacity: 0.5;
  `,
});

class Test extends React.Component<{id: number}> {
  render() {
    return <div>test</div>;
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
