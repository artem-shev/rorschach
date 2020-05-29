import React, { ChangeEvent } from 'react';
import styles from './Input.module.scss';

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

export default Input;
