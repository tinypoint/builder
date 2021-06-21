import React from 'react';
import { connect } from 'react-redux';
import Hoc from './hoc';

interface IProps {
  schema: any;
}

class Renderer extends React.Component<IProps> {
  cycle = (schema: any): React.ReactNode => React.createElement(
    Hoc,
    {
      ...(schema.props || {}),
      key: schema.id,
      id: schema.id,
      _$name$_: schema.type,
    },
    (schema.children || []).map(this.cycle),
  )
  ;

  render() {
    const { schema } = this.props;
    return this.cycle(schema);
  }
}

export default connect((state: any) => ({
  schema: state.schema,
}))(Renderer);
