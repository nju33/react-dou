import styled from 'styled-components';
import {getLuminance, darken} from 'polished';
import {Button} from './button.atom';

const getBackgroundColor = ({color}: any) => color;
const getHoverBackgroundColor = ({color}: any) => darken(0.1, color);
const getColor = ({color}: any) => (getLuminance(color) ? '#111' : '#eee');

export const PrimaryButton = styled(Button)`
  background: ${getBackgroundColor};
  color: ${getColor};

  &:hover {
    background: ${getHoverBackgroundColor};
  }
`;
