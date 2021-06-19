import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './index.css';
import { get } from 'lodash-es';
import TextField from '@material-ui/core/TextField';
import schemaParser from '../../features/schemaParser';
import historyer from '../../features/historyer';
import { Schema, State } from '../../store';

const connecter = connect((state: State) => ({
  select: state.select,
  schema: state.schema,
}));

type IProps = ConnectedProps<typeof connecter>;

interface IStates {
  cssDefination: CSSStyleDeclaration | null;
}

const noop = () => {};

(window as any)._styler = noop;

class Configer extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cssDefination: null,
    };
  }

  componentDidMount() {
    (window as any)._styler = this._listen;
  }

  componentWillUnmount() {
    (window as any)._styler = noop;
  }

  _listen = (cssDefination: CSSStyleDeclaration | null) => {
    this.setState({
      cssDefination,
    });
  };

  renderProp = (item: any, targetSchema: Schema) => {
    const { schema } = this.props;
    const { props = {} } = targetSchema;
    if (item.type === 'input') {
      return (
        <input
          key={item.key}
          type="text"
          value={props[item.key] || ''}
          onChange={(e) => {
            const { value } = e.target as HTMLInputElement;

            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `props.${item.key}`,
              value,
            );

            historyer.push(_schema);
          }}
        />
      );
    }

    return null;
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
          value={styles.width || cssDefination.width || ''}
          disabled={!styles.width}
          onChange={(e) => {
            if (!styles.width) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.width`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles.width) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.width`,
              cssDefination.width,
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="height-styles"
          label="height"
          key="height-styles"
          value={styles.height || cssDefination.height || ''}
          disabled={!styles.height}
          onChange={(e) => {
            if (!styles.height) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.height`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles.height) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.height`,
              cssDefination.height,
            );
            historyer.push(_schema);
          }}
        />
        {/* <TextField
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
              schema,
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
              schema,
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
        </TextField> */}
        <TextField
          id="margin-left-styles"
          label="margin-left"
          key="margin-left-styles"
          value={
            styles['margin-left']
            || cssDefination.getPropertyValue('margin-left')
            || ''
          }
          disabled={!styles['margin-left']}
          onChange={(e) => {
            if (!styles['margin-left']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.margin-left`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['margin-left']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.margin-left`,
              cssDefination.getPropertyValue('margin-left'),
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="margin-top-styles"
          label="margin-top"
          key="margin-top-styles"
          value={
            styles['margin-top']
            || cssDefination.getPropertyValue('margin-top')
            || ''
          }
          disabled={!styles['margin-top']}
          onChange={(e) => {
            if (!styles['margin-top']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.margin-top`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['margin-top']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.margin-top`,
              cssDefination.getPropertyValue('margin-top'),
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="backgroundColor-styles"
          label="backgroundColor"
          style={{
            display: 'flex',
          }}
          inputProps={{
            type: 'color',
          }}
          key="backgroundColor-styles"
          value={
            styles['background-color'] || cssDefination.backgroundColor || ''
          }
          disabled={!styles['background-color']}
          onChange={(e) => {
            if (!styles['background-color']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-color`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['background-color']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-color`,
              cssDefination.backgroundColor,
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="backgroundImage-styles"
          label="backgroundImage"
          style={{
            display: 'flex',
          }}
          key="backgroundImage-styles"
          value={
            styles['background-image'] || cssDefination.backgroundImage || ''
          }
          disabled={!styles['background-image']}
          onChange={(e) => {
            if (!styles['background-image']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-image`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['background-image']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-image`,
              cssDefination.backgroundImage,
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

export default connecter(Configer);
