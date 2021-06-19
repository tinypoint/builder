import React from 'react';
import './index.css';

type ISectionProps = any;

const Section: React.FC<ISectionProps> = ({ id, children }: ISectionProps) => (
  <div
    id={id}
    className="section"
    data-builder-type="section"
    data-builder-block
  >
    {children}
  </div>
);

Section.displayName = 'Section';

export default Section;
