import React from 'react';
import './index.css';

interface IFormProps {
  id: string;
  children: React.ReactChild
}

const Form: React.FC<IFormProps> = ({ id, children }: IFormProps) => (
  <form
    method="post"
    action="/api/form/submit"
    id={id}
    className="form"
    data-builder-type="form"
    data-builder-block
  >
    {children}
  </form>
);

Form.displayName = 'Form';

export default Form;
