// This component can be used inside Markdown files and is typically used
// as a episode introduction before any excercise modules.

import styled from 'styled-components';

export const TextBlock = styled.div`
    margin: ${({ theme }) => `-${theme.spacing.lg} 0 ${theme.spacing.xl2} 0`};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        margin: ${({ theme }) => `-${theme.spacing.sm} 0 ${theme.spacing.lg} 0`};
    }

    & {
        *:last-child {
            margin-bottom: 0;
        }
    }
`;
