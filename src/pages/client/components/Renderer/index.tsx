import React from 'react';
import { connect } from 'react-redux';
import { Schema, State } from '../../../editor/store';
import Container from './components/Container';
import Page from './components/Page';
import Section from './components/Section';
import Button from './components/Button';
import Image from './components/Image';
import Text from './components/Text';
import Scroller from './components/Scroller';
import Ppt from './components/Ppt';
import PptContainer from './components/PptContainer';

interface Props {
  schema: Schema;
}

const MAPS: any = {
  container: Container,
  section: Section,
  page: Page,
  button: Button,
  img: Image,
  text: Text,
  scroller: Scroller,
  ppt: Ppt,
  'ppt-container': PptContainer,
};

class Renderer extends React.Component<Props> {
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
    const { schema } = this.props;
    return this.cycle(schema);
  }
}

export default connect((state: State) => ({
  schema: state.schema,
}))(Renderer);
