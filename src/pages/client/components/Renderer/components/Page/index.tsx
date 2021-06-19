import React from 'react';
import './index.css';

type IPageProps = any;

class Page extends React.Component<IPageProps> {
  static displayName = 'Page';

  render() {
    return (
      <div id={this.props.id} className="page" data-builder-type="page" data-builder-block>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
