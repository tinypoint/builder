import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './index.css';
import { get } from 'lodash-es';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Upload from '../Configer/Upload';
import schemaParser from '../../features/schemaParser';
import historyer from '../../features/historyer';
import { Schema, State } from '../../store';

const parseBackgroundImage = (url: string) => {
  if (url === 'none') {
    return '';
  }
  const matcher = /^url\((.*)\)$/.exec(url);
  if (matcher && matcher[1]) {
    return matcher[1];
  }

  return url;
};

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

    if (!select || !select.length || !cssDefination) {
      return null;
    }

    const [targetSchema] = schemaParser.searchById(schema, select[0]);

    if (!targetSchema) {
      return null;
    }

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
        <Upload
          key="backgroundImage-styles"
          value={
            parseBackgroundImage(styles['background-image'] || cssDefination.backgroundImage || '')
          }
          onChange={(url?:string) => {
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-image`,
              url ? `url(${url})` : 'none',
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="background-size-styles"
          label="background-size"
          select
          key="background-size-styles"
          value={styles['background-size'] || cssDefination.backgroundSize || ''}
          disabled={!styles['background-size']}
          style={{
            width: '100%',
          }}
          onChange={(e) => {
            if (!styles['background-size']) {
              return;
            }
            const { value } = e.target;

            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-size`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['background-size']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-size`,
              cssDefination.backgroundSize,
            );
            historyer.push(_schema);
          }}
        >
          <MenuItem value="auto">auto</MenuItem>
          <MenuItem value="cover">cover</MenuItem>
          <MenuItem value="contain">contain</MenuItem>
        </TextField>
        <TextField
          id="font-family-styles"
          label="font-family"
          key="font-family-styles"
          value={
            styles['font-family']
            || cssDefination.getPropertyValue('font-family')
            || ''
          }
          disabled={!styles['font-family']}
          onChange={(e) => {
            if (!styles['font-family']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.font-family`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['font-family']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.font-family`,
              cssDefination.getPropertyValue('font-family'),
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="font-size-styles"
          label="font-size"
          key="font-size-styles"
          value={
            styles['font-size']
            || cssDefination.getPropertyValue('font-size')
            || ''
          }
          disabled={!styles['font-size']}
          onChange={(e) => {
            if (!styles['font-size']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.font-size`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['font-size']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.font-size`,
              cssDefination.getPropertyValue('font-size'),
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="font-weight-styles"
          label="font-weight"
          key="font-weight-styles"
          value={
            styles['font-weight']
            || cssDefination.getPropertyValue('font-weight')
            || ''
          }
          disabled={!styles['font-weight']}
          onChange={(e) => {
            if (!styles['font-weight']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.font-weight`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['font-weight']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.font-weight`,
              cssDefination.getPropertyValue('font-weight'),
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="font-style-styles"
          label="font-style"
          key="font-style-styles"
          value={
            styles['font-style']
            || cssDefination.getPropertyValue('font-style')
            || ''
          }
          disabled={!styles['font-style']}
          onChange={(e) => {
            if (!styles['font-style']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.font-style`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['font-style']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.font-style`,
              cssDefination.getPropertyValue('font-style'),
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="line-height-styles"
          label="line-height"
          key="line-height-styles"
          value={
            styles['line-height']
            || cssDefination.getPropertyValue('line-height')
            || ''
          }
          disabled={!styles['line-height']}
          onChange={(e) => {
            if (!styles['line-height']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.line-height`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['line-height']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.line-height`,
              cssDefination.getPropertyValue('line-height'),
            );
            historyer.push(_schema);
          }}
        />
        <TextField
          id="letter-spacing-styles"
          label="letter-spacing"
          key="letter-spacing-styles"
          value={
            styles['letter-spacing']
            || cssDefination.getPropertyValue('letter-spacing')
            || ''
          }
          disabled={!styles['letter-spacing']}
          onChange={(e) => {
            if (!styles['letter-spacing']) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.letter-spacing`,
              value,
            );
            historyer.push(_schema);
          }}
          onDoubleClick={() => {
            if (styles['letter-spacing']) {
              return;
            }
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.letter-spacing`,
              cssDefination.getPropertyValue('letter-spacing'),
            );
            historyer.push(_schema);
          }}
        />
      </div>
    );
  }
}

export default connecter(Configer);
