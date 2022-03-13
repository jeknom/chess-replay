import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface CellDivProps {
  backgroundColor: string;
}

export const CellDiv = styled.div<CellDivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
`;

export const Cell: FC<CellDivProps> = ({ children, ...rest }) => (
  <CellDiv {...rest}>
    {children}
  </CellDiv>
);

export default Cell;
