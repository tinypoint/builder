import React from "react";
import { connect } from "react-redux";
import schemaParser from "../../features/schemaParser";
import store, { State } from "../../store";
import "./index.css";

interface Props {
  type: "select" | "hover";
}

interface Props {
  select: State["select"];
  schema: State["schema"];
}

class Toolbox extends React.Component<Props> {
  delComp = () => {
    const { select, schema } = this.props;
    if (!select) {
      return;
    }
    const [_target] = schemaParser.searchById(schema, select);
    if (_target.type === 'page') {
      return;
    }
    const _schema = schemaParser.remove(schema, select);

    store.dispatch({
      type: "CHANGE_VALUE",
      payload: [
        { key: "schema", value: _schema },
        { key: "select", value: "" },
      ],
    });
  };

  render() {
    return (
      <div className="toolbox">
        <div className="toolbox-item" onClick={this.delComp}>
          X
        </div>
        <div className="toolbox-item">Y</div>
        <div className="toolbox-item">Z</div>
      </div>
    );
  }
}

export default connect((state: State) => {
  return {
    select: state.select,
    schema: state.schema,
  };
})(Toolbox);
