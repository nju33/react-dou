import styled from 'styled-components';
import {getLuminance, darken} from 'polished';
import {Button} from './button.atom';

const getBackgroundColor = (props: any) => props['data-color'];
const getHoverBackgroundColor = (props: any) =>
  darken(0.1, props['data-color']);
const getColor = (props: any) =>
  getLuminance(props['data-color']) ? '#111' : '#eee';

export const PrimaryButton = styled(Button)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &.button {
    background: ${getBackgroundColor};
    color: ${getColor};
  }

  &:not(.button) {
    color: ${getBackgroundColor};
    background: transparent;
  }

  &.button:hover {
    background: ${getHoverBackgroundColor};
  }

  &:not(.button):hover {
    color: ${getHoverBackgroundColor};
  }

  & svg {
    margin-right: .5em;
  }
`;
