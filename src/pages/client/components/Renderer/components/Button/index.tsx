import React from 'react';
import './index.css';

type IButtonProps = any;

const Button: React.FC<IButtonProps> = ({ id, text }: IButtonProps) => (
  <div
    id={id}
    data-builder-type="button"
    className="button"
  >
    {text}
  </div>
);

Button.displayName = 'Button';

export default Button;
