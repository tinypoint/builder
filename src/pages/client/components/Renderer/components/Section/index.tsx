import React from 'react';
import './index.css';

type ISectionProps = any;

class Section extends React.Component<ISectionProps> {
  static displayName = 'Section';

  render() {
    return (
      <div
        id={this.props.id}
        className="section"
        data-builder-type="section"
        data-builder-block
      >
        {this.props.children}
      </div>
    );
  }
}

export default Section;
