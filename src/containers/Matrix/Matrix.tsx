import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Controls from 'containers/Matrix/components/Controls';
import Table from 'containers/Matrix/components/Table';
import { cellsActions, cellsSelectors } from 'store/cells';
import { AppState } from 'store';

type Props = ConnectedProps<typeof connector>;

const initialSize = 50;
const initialUpdateDelay = 500;

const Matrix = ({ initialize, cells, tick }: Props) => {
  const [size, setSize] = useState(initialSize);
  const [updateDelay, setUpdateDelay] = useState(initialUpdateDelay);

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);

    if (newSize < initialSize) setSize(newSize);
  };
  const handleUpdateDelayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDelay = Number(e.target.value);

    if (newDelay > initialUpdateDelay) setUpdateDelay(newDelay);
  };

  useEffect(() => {
    initialize(size);

    const intervalId = setInterval(() => {
      tick();
    }, updateDelay);

    return () => {
      clearInterval(intervalId);
    };
  }, [initialize, tick, updateDelay, size]);

  return (
    <div>
      <Controls
        size={size}
        updateDelay={updateDelay}
        onSizeChange={handleSizeChange}
        onDelayChange={handleUpdateDelayChange}
      />
      <Table size={size} cells={cells} />
    </div>
  );
};

Matrix.defaultProps = {};

const mapStateToProps = (state: AppState) => ({
  cells: cellsSelectors.getState(state),
});
const mapDispatchToProps = { initialize: cellsActions.initialize, tick: cellsActions.tick };

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Matrix);
