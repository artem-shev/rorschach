import React, { ChangeEvent } from 'react';

import Input from '../Input';
import styles from './Controls.module.scss';

interface Props {
  size: number;
  updateDelay: number;
  onSizeChange: (event: ChangeEvent<HTMLInputElement>) => any;
  onDelayChange: (event: ChangeEvent<HTMLInputElement>) => any;
  onReset: () => void;
}

const Controls = ({ size, onDelayChange, onSizeChange, updateDelay, onReset }: Props) => (
  <div className={styles.controlsWrapper}>
    <Input label="size" defaultValue={size} onChange={onSizeChange} />
    <Input label="delay" defaultValue={updateDelay} onChange={onDelayChange} />
    <div>
      <button onClick={onReset}>reset</button>
    </div>
  </div>
);

Controls.defaultProps = {};

export default Controls;
