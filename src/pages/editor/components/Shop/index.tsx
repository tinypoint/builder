import React from "react";
import { connect, ConnectedProps } from "react-redux";
import store, { State } from "../../store";
import "./index.css";
import schemaParser from "../../features/schemaParser";
import historyer from "../../features/historyer";

const lsit = ["section", "button", "text", "img", "scroller", "ppt", "ppt-container"];

const connector = connect((state: State) => {
  return {
    select: state.select,
    schema: state.schema,
    shopShow: state.shopShow,
  };
});

type Props = ConnectedProps<typeof connector>;

class Shop extends React.Component<Props> {
  addComp = (type: string) => {
    const { select, schema } = this.props;
    const newScheam = schemaParser.createSchema(type);

    if (type === "ppt") {
      const children = [
        schemaParser.createSchema("ppt-container"),
        schemaParser.createSchema("ppt-container"),
        schemaParser.createSchema("ppt-container"),
      ];
      newScheam.children = children;
    }

    if (!select) {
      const [page] = schemaParser.search(schema, "type", "page");
      const _schema = schemaParser.appendChild(schema, page.id, newScheam);
      historyer.push(_schema);
      store.dispatch({
        type: "CHANGE_VALUE",
        payload: [{ key: "select", value: newScheam.id }],
      });
      return;
    }
    const hasBlock =
      (window as any)._hasBlock && (window as any)._hasBlock(select);

    if (hasBlock) {
      const _schema = schemaParser.appendChild(schema, select, newScheam);
      historyer.push(_schema);
      store.dispatch({
        type: "CHANGE_VALUE",
        payload: [{ key: "select", value: newScheam.id }],
      });
    } else {
      const _schema = schemaParser.insertAfter(schema, select, newScheam);
      historyer.push(_schema);
      store.dispatch({
        type: "CHANGE_VALUE",
        payload: [{ key: "select", value: newScheam.id }],
      });
    }
  };

  render() {
    const { shopShow } = this.props;
    return (
      <div
        className="shop"
        style={{
          transform: shopShow ? "" : "translateX(-100%)",
          transition: shopShow ? "transform .3s" : "",
        }}
      >
        {lsit.map((type) => {
          return (
            <div
              className="component-card"
              key={type}
              onClick={() => {
                this.addComp(type);
              }}
            >
              {type.toUpperCase()}
            </div>
          );
        })}
      </div>
    );
  }
}

export default connector(Shop);
