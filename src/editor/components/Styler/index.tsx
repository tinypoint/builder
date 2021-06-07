import React from "react";
import { connect } from "react-redux";
import store, { Schema, State } from "../../store";
import "./index.css";
import schemaParser from "../../features/schemaParser";
import { get } from "lodash-es";

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

interface States {
  cssDefination: CSSStyleDeclaration | null;
}

const noop = () => {};

(window as any)._styler = noop;

class Configer extends React.Component<Props, States> {
  state: States = {
    cssDefination: null,
  };

  _listen = (cssDefination: CSSStyleDeclaration | null) => {
    this.setState({
      cssDefination,
    });
  };

  componentDidMount() {
    (window as any)._styler = this._listen;
  }

  componentWillUnmount() {
    (window as any)._styler = noop;
  }

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

            store.dispatch({
              type: "CHANGE_VALUE",
              payload: [{ key: "schema", value: _schema }],
            });
          }}
        />
      );
    }
  };

  render() {
    const { select, schema } = this.props;

    const { cssDefination } = this.state;

    if (!select || !cssDefination) {
      return null;
    }

    const [targetSchema] = schemaParser.searchById(schema, select);

    const styles = get(targetSchema, `styles.#${targetSchema.id}`, {});

    return (
      <div className="styler">
        {styles.width ? (
          <input
            key="width-styles"
            type="text"
            value={styles.width || ""}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.width`,
                value
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          />
        ) : (
          <div
            onClick={() => {
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.width`,
                cssDefination.width
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          >
            {cssDefination.width}
          </div>
        )}
        {styles.height ? (
          <input
            key="height-styles"
            type="text"
            value={styles.height || ""}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.height`,
                value
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          />
        ) : (
          <div
            onClick={() => {
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.height`,
                cssDefination.height
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          >
            {cssDefination.height}
          </div>
        )}
        {styles.position ? (
          <select
            key="position-styles"
            value={styles.position || ""}
            onChange={(e) => {
              const value = (e.target as HTMLSelectElement).value;

              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.position`,
                value
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          >
              <option value="static">static</option>
              <option value="relative">relative</option>
              <option value="absolute">absolute</option>
              <option value="fixed">fixed</option>
          </select>
        ) : (
          <div
            onClick={() => {
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.position`,
                cssDefination.position
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          >
            {cssDefination.position}
          </div>
        )}
        {styles.left ? (
          <input
            key="left-styles"
            type="text"
            value={styles.left || ""}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.left`,
                value
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          />
        ) : (
          <div
            onClick={() => {
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.left`,
                cssDefination.left
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          >
            {cssDefination.left}
          </div>
        )}
        {styles.top ? (
          <input
            key="top-styles"
            type="text"
            value={styles.top || ""}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.top`,
                value
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          />
        ) : (
          <div
            onClick={() => {
              const _schema = schemaParser.update(
                this.props.schema,
                targetSchema.id,
                `styles.#${targetSchema.id}.top`,
                cssDefination.top
              );
              store.dispatch({
                type: "CHANGE_VALUE",
                payload: [{ key: "schema", value: _schema }],
              });
            }}
          >
            {cssDefination.top}
          </div>
        )}
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
