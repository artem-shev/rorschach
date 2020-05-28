import React, { ChangeEvent } from 'react';

import styles from './Controls.module.scss';

interface InputProps {
  label: string;
  defaultValue: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
}

const Input = ({ label, defaultValue, onChange }: InputProps) => (
  <div className={styles.inputWrapper}>
    <label className={styles.label}>{label}</label>
    <input type="number" defaultValue={defaultValue} onChange={onChange} className={styles.input} />
  </div>
);

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
