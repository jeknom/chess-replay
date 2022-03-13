import { amber } from '@mui/material/colors';
import styled from '@emotion/styled';

export interface GridProps {
  dimensions: number;
  cellSizeRem: number;
}

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.dimensions}, ${(props) => props.cellSizeRem}rem);
  grid-template-rows: repeat(${(props) => props.dimensions}, ${(props) => props.cellSizeRem}rem);
  border: '1px solid black';
  gap: 2px;
  background-color: ${amber[400]};
  padding: 4px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export default Grid;
