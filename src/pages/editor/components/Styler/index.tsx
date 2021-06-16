import React from "react";
import { connect } from "react-redux";
import store, { Schema, State } from "../../store";
import "./index.css";
import schemaParser from "../../features/schemaParser";
import { get } from "lodash-es";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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

            historyer.push(_schema);
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
        <TextField
          id="width-styles"
          label="width"
          key="width-styles"
          value={styles.width || cssDefination.width || ""}
          disabled={!styles.width}
          onChange={(e) => {
            if (!styles.width) {
              return;
            }
            const value = (e.target as HTMLInputElement).value;
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.width`,
              value
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles.width) {
              return;
            }
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.width`,
              cssDefination.width
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="height-styles"
          label="height"
          key="height-styles"
          value={styles.height || cssDefination.height || ""}
          disabled={!styles.height}
          onChange={(e) => {
            if (!styles.height) {
              return;
            }
            const value = (e.target as HTMLInputElement).value;
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.height`,
              value
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles.height) {
              return;
            }
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.height`,
              cssDefination.height
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="position-styles"
          label="position"
          select
          key="position-styles"
          value={styles.position || cssDefination.position || ""}
          disabled={!styles.position}
          onChange={(e) => {
            if (!styles.position) {
              return;
            }
            const value = e.target.value;

            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.position`,
              value
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles.position) {
              return;
            }
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.position`,
              cssDefination.position
            );
            historyer.push(_schema);
          }}
        >
          <MenuItem value="static">static</MenuItem>
          <MenuItem value="relative">relative</MenuItem>
          <MenuItem value="absolute">absolute</MenuItem>
          <MenuItem value="fixed">fixed</MenuItem>
        </TextField>
        <TextField
          id="left-styles"
          label="left"
          key="left-styles"
          value={styles.left || cssDefination.left || ""}
          disabled={!styles.left}
          onChange={(e) => {
            if (!styles.left) {
              return;
            }
            const value = (e.target as HTMLInputElement).value;
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.left`,
              value
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles.left) {
              return;
            }
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.left`,
              cssDefination.left
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="top-styles"
          label="top"
          key="top-styles"
          value={styles.top || cssDefination.top || ""}
          disabled={!styles.top}
          onChange={(e) => {
            if (!styles.top) {
              return;
            }
            const value = (e.target as HTMLInputElement).value;
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.top`,
              value
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles.top) {
              return;
            }
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.top`,
              cssDefination.top
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="backgroundColor-styles"
          label="backgroundColor"
          style={{
            display: "flex",
          }}
          inputProps={{
            type: "color",
          }}
          key="backgroundColor-styles"
          value={
            styles["background-color"] || cssDefination.backgroundColor || ""
          }
          disabled={!styles["background-color"]}
          onChange={(e) => {
            if (!styles["background-color"]) {
              return;
            }
            const value = (e.target as HTMLInputElement).value;
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-color`,
              value
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles["background-color"]) {
              return;
            }
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-color`,
              cssDefination.backgroundColor
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="backgroundImage-styles"
          label="backgroundImage"
          style={{
            display: "flex",
          }}
          key="backgroundImage-styles"
          value={
            styles["background-image"] || cssDefination.backgroundImage || ""
          }
          disabled={!styles["background-image"]}
          onChange={(e) => {
            if (!styles["background-image"]) {
              return;
            }
            const value = (e.target as HTMLInputElement).value;
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-image`,
              value
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles["background-image"]) {
              return;
            }
            const _schema = schemaParser.update(
              this.props.schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-image`,
              cssDefination.backgroundImage
            );
            historyer.push(_schema);
          }}
        />
        {/* <div>
          <img src={cssDefination.backgroundImage.match(/url\((.*)\)/)![1]} alt="" />
        </div> */}
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
