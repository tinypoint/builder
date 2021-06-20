import React from 'react';
import './index.css';

interface ISelectProps {
  id: string;
}

const Select: React.FC<ISelectProps> = ({ id }: ISelectProps) => (
  <select
    id={id}
    className="select"
    data-builder-type="select"
  >
    <option value="male">male</option>
    <option value="female">female</option>
  </select>
);

Select.displayName = 'Select';

export default Select;
