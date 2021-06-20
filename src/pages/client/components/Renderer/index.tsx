import React from 'react';
import { connect } from 'react-redux';
import { Schema, State } from '../../../editor/store';

interface IProps {
  schema: Schema;
}

interface IStates {
  ready: boolean;
  maps: { [index: string]: React.ComponentClass }
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

class Renderer extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ready: false,
      maps: ({} as IStates['maps']),
    };
  }

  componentDidMount() {
    (window as any).require(components.map((component: any) => component.name), (...args: any) => {
      const maps: any = {
      };

      args.forEach((mod: any, index: number) => {
        maps[components[index].name] = mod;
      });
      this.setState({
        ready: true,
        maps,
      });
    });
  }

  cycle = (schema: Schema): React.ReactNode => {
    const { maps } = this.state;
    return React.createElement(
      maps[schema.type],
      {
        ...(schema.props || {}),
        key: schema.id,
        id: schema.id,
      },
      (schema.children || []).map(this.cycle),
    );
  };

  render() {
    const { ready } = this.state;

    if (!ready) {
      return null;
    }

    const { schema } = this.props;
    return this.cycle(schema);
  }
}

export default connect((state: State) => ({
  schema: state.schema,
}))(Renderer);
