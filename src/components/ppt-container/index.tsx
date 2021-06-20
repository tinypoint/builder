import React from 'react';
import './index.css';

type IPptContainerProps = any;

const PptContainer: React.FC<IPptContainerProps> = ({ id, children }: IPptContainerProps) => (
  <div id={id} className="ppt-container" data-builder-type="ppt-container" data-builder-block>
    {children}
  </div>
);

PptContainer.displayName = 'PptContainer';

export default PptContainer;
