import React from 'react';
import './index.css';

type IContainerProps = any;

const PptContainer: React.FC<IContainerProps> = ({ id, children }: IContainerProps) => (
  <div id={id} className="ppt-container" data-builder-type="ppt-container" data-builder-block>
    {children}
  </div>
);

PptContainer.displayName = 'Scroller';

export default PptContainer;
