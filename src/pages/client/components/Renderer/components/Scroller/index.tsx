import React from 'react';
import './index.css';

type IScrollerProps = any;

const Scroller: React.FC<IScrollerProps> = ({ id, children }: IScrollerProps) => (
  <div id={id} data-builder-type="scroller" className="scroller">
    <div data-builder-block style={{ height: '100%', width: 1000 }}>
      {children}
    </div>
  </div>
);

Scroller.displayName = 'Scroller';

export default Scroller;
