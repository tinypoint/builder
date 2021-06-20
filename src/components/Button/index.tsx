import React from 'react';
import './index.css';

type IButtonProps = any;

const Button: React.FC<IButtonProps> = ({ id, text }: IButtonProps) => (
  <button
    id={id}
    type="submit"
    data-builder-type="button"
    className="button"
  >
    {text}
    123
  </button>
);

Button.displayName = 'Button';

export default Button;
