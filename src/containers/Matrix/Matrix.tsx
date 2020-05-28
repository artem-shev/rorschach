import React from 'react';
import Controls from 'containers/Matrix/components/Controls';
import Table from 'containers/Matrix/components/Table';

interface Props {}

const size = 50;

const Matrix = (props: Props) => {
  return (
    <div>
      <Controls />
      <Table size={size} />
    </div>
  );
};

Matrix.defaultProps = {};

export default Matrix;
