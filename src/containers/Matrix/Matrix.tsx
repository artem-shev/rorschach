import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Controls from 'containers/Matrix/components/Controls';
import Table from 'containers/Matrix/components/Table';
import { cellsActions, cellsSelectors } from 'store/cells';
import { useActions } from 'utils/storeUtils';

const initialSize = 50;
const initialUpdateDelay = 500;

const useApp = () => {
  const cells = useSelector(cellsSelectors.getState);
  const { initialize, tick } = useActions<typeof mapDispatchToProps>(mapDispatchToProps);

  const [size, setSize] = useState(initialSize);
  const [updateDelay, setUpdateDelay] = useState(initialUpdateDelay);
  const [resetTriger, setResetTriger] = useState(true);

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);

    if (newSize <= 100) setSize(newSize);
  };
  const handleUpdateDelayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDelay = Number(e.target.value);

    if (newDelay >= 100) setUpdateDelay(newDelay);
  };
  const handleReset = () => {
    setResetTriger(!resetTriger);
  };

  useEffect(() => {
    initialize(size);

    const intervalId = setInterval(() => {
      tick();
    }, updateDelay);

    return () => {
      clearInterval(intervalId);
    };
  }, [initialize, tick, updateDelay, size, resetTriger]);

  return { size, updateDelay, handleSizeChange, handleUpdateDelayChange, cells, handleReset };
};

const Matrix = () => {
  const {
    cells,
    handleUpdateDelayChange,
    handleSizeChange,
    updateDelay,
    size,
    handleReset,
  } = useApp();

  return (
    <div>
      <Controls
        size={size}
        updateDelay={updateDelay}
        onSizeChange={handleSizeChange}
        onDelayChange={handleUpdateDelayChange}
        onReset={handleReset}
      />
      <Table size={size} cells={cells} />
    </div>
  );
};

Matrix.defaultProps = {};

const mapDispatchToProps = { initialize: cellsActions.initialize, tick: cellsActions.tick };

export default Matrix;
