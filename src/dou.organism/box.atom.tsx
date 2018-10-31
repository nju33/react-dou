import styled from 'styled-components';

export const Box = styled.div`
  width: calc(100% - 50px);
  background: #fff;
  opacity: 1;
  z-index: 2;
  transition:
    0.4s linear,
    transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0.1s;
  transform: translate3d(0, 0, 0) rotateX(0deg) scale(1);
  transform-origin: center bottom;

  [aria-hidden='true'] > & {
    transition: 0.4s linear, transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    z-index: -2;
    transform: translate3d(0, 50px, 0) rotateX(90deg) scale(0.9);
  }

  @media (min-width: 536px) {
    min-width: 330px;
    max-width: 410px;
  }
`;
