import { CircularProgress } from '@mui/material';
import React, { FC, ReactElement } from 'react';

interface LoadingContainerProps {
  size?: number;
  isLoading: boolean;
}

const LoadingContainer: FC<LoadingContainerProps> = ({ isLoading, size, children }) => {
  if (!isLoading) {
    return children as ReactElement;
  }

  return <CircularProgress size={size} />;
};

LoadingContainer.defaultProps = {
  size: undefined,
};

export default LoadingContainer;
