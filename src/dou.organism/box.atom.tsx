import styled from 'styled-components';

export const Box = styled.div`
  width: calc(100% - 50px);
  background: #fff;

  @media (min-width: 536px) {
    min-width: 330px;
    max-width: 410px;
  }
`;
