import React from 'react';
import { connect } from 'react-redux';
import { Schema, State } from '../../../editor/store';

interface IProps {
  schema: Schema;
}

interface IStates {
  ready: boolean
}

let MAPS: any = {

};

(window as any).require.config({
  paths: {
    react: 'http://127.0.0.1:8002/assets/react.development',
    container: 'http://127.0.0.1:8002/assets/Container.db85d88a2649dc731e49',
    section: 'http://127.0.0.1:8002/assets/Section.435b528d86aab4edc587',
    page: 'http://127.0.0.1:8002/assets/Page.0db6afed2ba232142ca5',
    button: 'http://127.0.0.1:8002/assets/Button.5cee2fc7a76560eb8c19',
    img: 'http://127.0.0.1:8002/assets/Image.1afac7205a682f90abd9',
    text: 'http://127.0.0.1:8002/assets/Text.7e3899892b9131161ee9',
    scroller: 'http://127.0.0.1:8002/assets/Scroller.ea0bf0fbd89886e44bdf',
    ppt: 'http://127.0.0.1:8002/assets/Ppt.f260ec6d3a46a8310d90',
    'ppt-container': 'http://127.0.0.1:8002/assets/PptContainer.c7f7229c05968f3ad1c5',
  },
});

class Renderer extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    (window as any).require([
      'container',
      'section',
      'page',
      'button',
      'img',
      'text',
      'scroller',
      'ppt',
      'ppt-container',
    ], (...args: any) => {
      const [container, section, page, button, img, text, scroller, ppt, pptContainer] = args;

      MAPS = {
        container: container.default,
        section: section.default,
        page: page.default,
        button: button.default,
        img: img.default,
        text: text.default,
        scroller: scroller.default,
        ppt: ppt.default,
        'ppt-container': pptContainer.default,
      };
      this.setState({
        ready: true,
      });
    });
  }

  cycle = (schema: Schema): React.ReactNode => React.createElement(
    MAPS[schema.type],
    {
      ...(schema.props || {}),
      key: schema.id,
      id: schema.id,
    },
    (schema.children || []).map(this.cycle),
  );

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
