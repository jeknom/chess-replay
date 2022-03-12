import { amber } from '@mui/material/colors';
import styled from '@emotion/styled';

export interface GridProps {
  dimensions: number;
  cellSizePx: number;
}

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.dimensions}, ${(props) => props.cellSizePx}px);
  grid-template-rows: repeat(${(props) => props.dimensions}, ${(props) => props.cellSizePx}px);
  border: '1px solid black';
  gap: 2px;
  background-color: ${amber[400]};
  padding: 4px;
  border-radius: 6px;
`;

export default Grid;
