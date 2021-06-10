import React from "react";
import { connect } from "react-redux";
import store, { Schema, State } from "../../store";
import "./index.css";
import schemaParser from "../../features/schemaParser";

const createSchema = (type: string): Schema => {
  const newScheam = {
    type,
    id: type + (Math.random() + "").slice(2, 6),
    props: {},
    styles: {},
    children: [],
  };
  return newScheam;
};
const lsit = ["button", "text", "img", "scroller", "ppt", "ppt-container"];

interface Props {
  select: State["select"];
  schema: State["schema"];
}

class Shop extends React.Component<Props> {
  addComp = (type: string) => {
    const { select, schema } = this.props;
    const newScheam = createSchema(type);

    if (type === "ppt") {
      const children = [
        createSchema("ppt-container"),
        createSchema("ppt-container"),
        createSchema("ppt-container"),
      ];
      newScheam.children = children;
    }

    if (!select) {
      const [page] = schemaParser.search(schema, "type", "page");
      const _schema = schemaParser.appendChild(schema, page.id, newScheam);

      store.dispatch({
        type: "CHANGE_VALUE",
        payload: [
          { key: "schema", value: _schema },
          { key: "select", value: newScheam.id },
        ],
      });
      return;
    }
    const hasBlock =
      (window as any)._hasBlock && (window as any)._hasBlock(select);

    if (hasBlock) {
      const _schema = schemaParser.appendChild(schema, select, newScheam);

      store.dispatch({
        type: "CHANGE_VALUE",
        payload: [
          { key: "schema", value: _schema },
          { key: "select", value: newScheam.id },
        ],
      });
    } else {
      const _schema = schemaParser.insertAfter(schema, select, newScheam);

      store.dispatch({
        type: "CHANGE_VALUE",
        payload: [
          { key: "schema", value: _schema },
          { key: "select", value: newScheam.id },
        ],
      });
    }
  };

  render() {
    return (
      <div className="shop">
        {lsit.map((type) => {
          return (
            <div
              className="component-card"
              key={type}
              onClick={() => {
                this.addComp(type);
              }}
            >
              {type}
            </div>
          );
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
})(Shop);
