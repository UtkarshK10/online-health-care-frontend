import React from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ReactSpinner = ({ size }) => {
  return (
    <div className='sweet-loading'>
      <ClipLoader css={override} size={size} color={'#f4511e'} loading={true} />
    </div>
  );
};

export default ReactSpinner;
