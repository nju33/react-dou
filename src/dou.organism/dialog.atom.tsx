import styled, {css, InterpolationValue} from 'styled-components';
import {Box} from './box.atom';
import {Flex} from './flex.atom';

// @ts-ignore
const getUserCSS = ({userCSS = css``}: {userCSS: InterpolationValue[]} & any) =>
  userCSS || css``;

interface DialogProps {
  'aria-hidden': boolean;
  userCSS?: InterpolationValue[];
}

export const Dialog = styled(Flex)<DialogProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  transition: 0.01s;

  &[aria-hidden='true'] {
    transition: 0.01s 0.4s;
    width: 0;
    height: 0;
    overflow: hidden;
    z-index: -10000;
  }

  &:before {
    content: '';
    opacity: 1;
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 0.4s linear;
  }

  &[aria-hidden='true']:before {
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    z-index: -1;
  }

  & > ${Box} {
    transition: 0.4s linear 0.1s,
      transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 1;
    z-index: 2;
    transform: translate3d(0, 0, 0);
  }

  &[aria-hidden='true'] > ${Box} {
    transition: 0.4s linear,
      transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
    opacity: 0;
    z-index: -2;
    transform: translate3d(0, 100px, 0);
  }

  ${getUserCSS};
`;
