import {
  Button, ButtonGroup, Popover, Position,
} from '@blueprintjs/core';
import React from 'react';
import './index.css';

interface IProps {
  type: 'select' | 'hover';
  children?: React.ReactNode;
}

interface DotProps {
  dir: 'tl' | 'tc' | 'tr' | 'cl' | 'cr' | 'bl' | 'bc' | 'br';
}

const Dot: React.FC<DotProps> = ({ dir }: DotProps) => (
  <div className={`dot ${dir}`}>
    <div data-builder-dotdir={dir} className="dot-hander">
      <div className="dot-hander-inner" />
    </div>
  </div>
);

const dots = (
  <>
    <Dot dir="tl" />
    <Dot dir="tc" />
    <Dot dir="tr" />
    <Dot dir="cl" />
    <Dot dir="cr" />
    <Dot dir="bl" />
    <Dot dir="bc" />
    <Dot dir="br" />
  </>
);

const Anchor: React.FC<IProps> = (props: IProps) => {
  const { type, children = null } = props;

  if (type === 'select') {
    return (
      <Popover
        className="anchor-popover-content"
        position={Position.LEFT_TOP}
        isOpen
        fill
        usePortal
        content={(
          <ButtonGroup minimal>
            <Button
              icon="edit"
            />
          </ButtonGroup>
        )}
      >
        <div data-builder-anchor={type} className="anchor">
          {dots}
          {children}
        </div>
      </Popover>
    );
  }

  return (
    <div data-builder-anchor={type} className="anchor">
      {children}
    </div>
  );
};

Anchor.defaultProps = {
  children: null,
};

export default Anchor;
