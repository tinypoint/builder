import React from 'react';
import './index.css';

type IPageProps = any;

const Page: React.FC<IPageProps> = ({ id, children }: IPageProps) => (
  <div id={id} className="page" data-builder-type="page" data-builder-block>
    {children}
  </div>
);

Page.displayName = 'Page';

export default Page;
