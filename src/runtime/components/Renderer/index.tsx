import React from "react";
import { Schema, State } from "../../../editor/store";
import "./index.css";
import Container from "./components/Container";
import Page from "./components/Page";
import Button from "./components/Button";
import Image from "./components/Image";
import { connect } from "react-redux";

interface Props {
  schema: Schema;
}

const MAPS: any = {
  container: Container,
  page: Page,
  button: Button,
  img: Image,
};

class Renderer extends React.Component<Props> {
  cycle = (schema: Schema): React.ReactNode => {
    return React.createElement(
      MAPS[schema.type],
      {
        ...(schema.props || {}),
        key: schema.id,
        id: schema.id,
      },
      (schema.children || []).map(this.cycle)
    );
  };

  render() {
    const { schema } = this.props;
    return this.cycle(schema);
  }
}

export default connect((state: State) => {
  return {
    schema: state.schema,
  };
})(Renderer);
