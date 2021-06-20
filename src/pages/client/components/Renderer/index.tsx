import React from 'react';
import { connect } from 'react-redux';
import { Schema, State } from '../../../editor/store';
import Hoc from './hoc';

interface IProps {
  schema: Schema;
}

const { components } = (window as any).store.getState();

const host = 'http://127.0.0.1:8002';

const paths: { [index: string]: string } = {
  react: `${host}/assets/libs/react.development`,
};

components.forEach((component: any) => {
  paths[component.name] = `${host}/${component.path.replace(/\.js$/, '')}`;
});

(window as any).require.config({
  paths,
});

class Renderer extends React.Component<IProps> {
  cycle = (schema: Schema): React.ReactNode => React.createElement(
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

export default connect((state: State) => ({
  schema: state.schema,
}))(Renderer);
