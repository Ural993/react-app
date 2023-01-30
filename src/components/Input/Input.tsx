/* eslint-disable jsx-a11y/no-autofocus */
import React, { ChangeEvent, ReactElement } from 'react';

type InputPropsType = {
  autoFocus?: boolean;
  value: string | number;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: any) => void;
};

const Input = ({
  name,
  value,
  onChange,
  onKeyDown,
  autoFocus,
}: InputPropsType): ReactElement => (
  <input
    type="text"
    autoFocus={autoFocus}
    name={name}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  />
);

export default Input;
