import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Controls from 'containers/Matrix/components/Controls';
import Table from 'containers/Matrix/components/Table';
import { cellsActions, cellsSelectors } from 'store/cells';
import { AppState } from 'store';

type Props = ConnectedProps<typeof connector>;

const size = 50;

const Matrix = ({ initialize, cells }: Props) => {
  useEffect(() => {
    initialize(size);
  }, [initialize]);

  return (
    <div>
      <Controls />
      <Table size={size} cells={cells} />
    </div>
  );
};

Matrix.defaultProps = {};

const mapStateToProps = (state: AppState) => ({
  cells: cellsSelectors.getState(state),
});
const mapDispatchToProps = { initialize: cellsActions.initialize };

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Matrix);
