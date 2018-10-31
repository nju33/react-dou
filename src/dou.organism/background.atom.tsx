import styled, {InterpolationValue} from 'styled-components';
import {Flex} from './flex.atom';

const getFontSize = (props: any) => props['data-font-size'];

interface BackgroundProps {
  'aria-hidden': boolean;
  userCSS?: InterpolationValue[];
}

export const Background = styled(Flex)<BackgroundProps>`
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
    transition: background 0.4s linear;
  }

  &[aria-hidden='true']:before {
    background: rgba(0, 0, 0, 0);
    width: 0;
    height: 0;
    overflow: hidden;
    z-index: -1;
  }

  font-size: ${getFontSize};
`;
