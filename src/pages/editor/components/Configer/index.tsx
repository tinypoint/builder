import React from "react";
import { connect } from "react-redux";
import store, { Schema, State } from "../../store";
import "./index.css";
import schemaParser from "../../features/schemaParser";
import historyer from "../../features/historyer";

const map: any = {
  button: [
    {
      type: "input",
      key: "text",
    },
  ],
};

interface Props {
  select: State["select"];
  schema: State["schema"];
}

class Configer extends React.Component<Props> {
  renderProp = (item: any, targetSchema: Schema) => {
    const { props = {} } = targetSchema;
    if (item.type === "input") {
      return (
        <input
          key={item.key}
          type="text"
          value={props[item.key] || ""}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;

            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `props.${item.key}`,
              value
            );

            historyer.push(_schema);
          }}
        />
      );
    }
  };

  render() {
    const { select, schema } = this.props;

    if (!select) {
      return null;
    }

    const [targetSchema] = schemaParser.searchById(schema, select);

    const props = map[targetSchema.type];

    if (!props) {
      return null;
    }

    return (
      <div className="configer">
        {props.map((item: any) => {
          return this.renderProp(item, targetSchema);
        })}
      </div>
    );
  }
}

export default connect((state: State) => {
  return {
    select: state.select,
    schema: state.schema,
  };
})(Configer);
