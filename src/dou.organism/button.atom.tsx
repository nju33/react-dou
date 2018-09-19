import styled from 'styled-components';

export const Button = styled.button`
  height: 43px;
  flex: 1;
  border: none;
  background: #ccc;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  transition: .2s;

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  &:hover {
    background: #b3b3b3;
  }
`;
