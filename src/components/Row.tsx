import { ReactNode } from 'react';

import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  input {
    width: 300px;
  }
`;

type RowProps = {
  className?: string;
  children?: ReactNode | ReactNode[];
};

export function Row({ className, children }: RowProps) {
  return <StyledDiv className={className}>{children}</StyledDiv>;
}
