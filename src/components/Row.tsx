import { ReactNode } from 'react';

import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  label {
    font-weight: 500;
    font-size: 0.9rem;
  }

  input, select {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: #ffffff;
    color: #212529;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #228be6;
      box-shadow: 0 0 0 3px rgba(34, 139, 230, 0.1);
    }

    &:disabled {
      background-color: #e9ecef;
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  input[type="file"] {
    padding: 0.375rem 0.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    input, select {
      min-width: 150px;
      font-size: 16px; /* Prevents zoom on iOS */
    }
  }
`;

type RowProps = {
  className?: string;
  children?: ReactNode | ReactNode[];
};

export function Row({ className, children }: RowProps) {
  return <StyledDiv className={className}>{children}</StyledDiv>;
}
