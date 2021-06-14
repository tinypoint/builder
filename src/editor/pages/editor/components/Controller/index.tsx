import Button from "@material-ui/core/Button";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import schemaParser from "../../features/schemaParser";
import store, { State } from "../../store";
import MockPhone from "../MockPhone";
import Runtime from "../Runtime";
import Tracker from "../Tracker";
import "./index.css";

const connector = connect((state: State) => {
  return ({
    scale: state.scale,
    schema: state.schema
  })
})

type Props = ConnectedProps<typeof connector>

class Controller extends React.Component<Props> {

  addBlankPage = () => {
    const { schema } = this.props;
    const pageSchema = schemaParser.createSchema('page');
    const _schema = schemaParser.appendChild(schema, schema.id, pageSchema);

    store.dispatch({
      type: "CHANGE_VALUE",
      payload: [
        { key: "schema", value: _schema },
        { key: "select", value: pageSchema.id },
      ],
    });
  }

  render() {
    const { scale, schema } = this.props;
    return <div className="controller">
      <div
        className="divice"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="webview"
          style={{
            width: 375,
            height: 812,
          }}
        >
          <Runtime />
          {Boolean(!schema.children || !schema.children.length) && < div className="add-a-page">
            <Button onClick={this.addBlankPage}>Add a Blank Page</Button>
          </div>
          }
        </div>
        <MockPhone />
        <Tracker />
      </div>
    </div >;
  }
}

export default connector(Controller);
