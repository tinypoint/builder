import React from 'react';
import './index.css';

type IContainerProps = any;

const Container: React.FC<IContainerProps> = ({ id, children }: IContainerProps) => (
  <div
    id={id}
    className="container"
    data-builder-type="container"
    data-builder-block
  >
    {children}
  </div>
);

Container.displayName = 'Container';

export default Container;
