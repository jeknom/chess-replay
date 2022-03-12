import styled from '@emotion/styled';

export interface CellProps {
  backgroundColor: string;
}

const Cell = styled.div<CellProps>`
  background-color: ${(props) => props.backgroundColor};
`;

export default Cell;
