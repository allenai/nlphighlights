// This component can be used inside Markdown files and is typically used
// as a episode introduction before any excercise modules.

import React from 'react';
import styled from 'styled-components';
import Container from './Container';

export const Turn = ({ speaker, timestamp, children }) => {
  return (
    <div>
      {speaker && <Speaker>{speaker}</Speaker>}
      {timestamp && <Timestamp>{timestamp}</Timestamp>}
      {children}
    </div>
  )
};

const Speaker = styled.div`
  margin: auto;
`;

const Timestamp = styled.div`
  margin: auto;
`;
