import React from 'react';
import './index.css';

interface IInputProps {
  id: string;
  type: string;
}

const Input: React.FC<IInputProps> = ({ id, type = 'text' }: IInputProps) => (
  <input
    id={id}
    type={type}
    className="input"
    data-builder-type="input"
  />
);

Input.displayName = 'Input';

export default Input;
