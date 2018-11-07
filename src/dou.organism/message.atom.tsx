import styled from 'styled-components';
import {Flex} from './flex.atom';

export const Message = styled(Flex)`
  padding: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  word-wrap: break-word;
  word-break: break-all;

  &[data-has-items='true'] {
    margin-bottom: -17px;
  }
`;
