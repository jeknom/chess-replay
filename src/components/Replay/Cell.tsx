import React, { FC } from 'react';
import { amber } from '@mui/material/colors';
import styled from '@emotion/styled';

export interface CellDivProps {
  useDark: boolean;
  isFromCell: boolean;
  isToCell: boolean;
}

export const CellDiv = styled.div<CellDivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.useDark ? amber[700] : amber[600])};
  border-radius: ${(props) => ((props.isFromCell || props.isToCell) && '4px')};
  box-shadow: ${(props) => ((props.isFromCell || props.isToCell) && 'rgba(255, 255, 255, 0.300) 0px 3px 8px')};
  border: ${(props) => (props.isFromCell
    ? `3px solid ${amber[100]}`
    : props.isToCell
      ? `5px solid ${amber[100]}`
      : 'none'
  )}
`;

export const Cell: FC<CellDivProps> = ({ children, ...rest }) => (
  <CellDiv {...rest}>
    {children}
  </CellDiv>
);

export default Cell;
