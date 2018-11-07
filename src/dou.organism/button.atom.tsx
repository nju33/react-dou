import styled from 'styled-components';

export const Button = styled.button`
  height: 43px;
  flex: 1;
  border: none;
  cursor: pointer;
  transition: .2s;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre;

  &:not(:first-child) {
    margin-left: 7.5px;
  }
  @media (min-width: 536px) {
    &:not(:first-child) {
      margin-left: 15px;
    }
  }

  &.button {
    background: #ccc;
    border-radius: 2px;
  }

  &.button:hover {
    background: #b3b3b3;
  }

  &:not(.button) {
    color: #515151;
    background: transparent;
  }

  &:not(.button):hover {
    color: #222;
  }

  & svg {
    margin-right: .5em;
  }
`;
