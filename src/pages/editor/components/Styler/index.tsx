import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './index.css';
import { get } from 'lodash-es';
import {
  Button, Classes, InputGroup,
} from '@blueprintjs/core';
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

            historyer.pushSchema(_schema);
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
        <InputGroup
          key="width-styles"
          value={styles.width || cssDefination.width || ''}
          disabled={!styles.width}
          className="styler-row"
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
            historyer.pushSchema(_schema);
          }}
          leftIcon={(
            <span className={Classes.ICON} title="width">
              <span className="textIcon">W</span>
            </span>
          )}
          rightElement={(
            <Button
              icon={!styles.width ? 'lock' : 'unlock'}
              minimal
              onClick={() => {
                if (styles.width) {
                  return;
                }
                const _schema = schemaParser.update(
                  schema,
                  targetSchema.id,
                  `styles.#${targetSchema.id}.width`,
                  cssDefination.width,
                );
                historyer.pushSchema(_schema);
              }}
            />
          )}
        />
        <InputGroup
          key="height-styles"
          value={styles.height || cssDefination.height || ''}
          disabled={!styles.height}
          className="styler-row"
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
            historyer.pushSchema(_schema);
          }}
          leftIcon={(
            <span className={Classes.ICON} title="height">
              <span className="textIcon">H</span>
            </span>
          )}
          rightElement={(
            <Button
              icon={!styles.height ? 'lock' : 'unlock'}
              minimal
              onClick={() => {
                if (styles.height) {
                  return;
                }
                const _schema = schemaParser.update(
                  schema,
                  targetSchema.id,
                  `styles.#${targetSchema.id}.height`,
                  cssDefination.height,
                );
                historyer.pushSchema(_schema);
              }}
            />
          )}
        />
        <InputGroup
          key="left-styles"
          value={styles.left || cssDefination.left || ''}
          disabled={!styles.left}
          className="styler-row"
          onChange={(e) => {
            if (!styles.left) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.left`,
              value,
            );
            historyer.pushSchema(_schema);
          }}
          leftIcon={(
            <span className={Classes.ICON} title="left">
              <span className="textIcon">X</span>
            </span>
          )}
          rightElement={(
            <Button
              icon={!styles.left ? 'lock' : 'unlock'}
              minimal
              onClick={() => {
                if (styles.left) {
                  return;
                }
                const _schema = schemaParser.update(
                  schema,
                  targetSchema.id,
                  `styles.#${targetSchema.id}.left`,
                  cssDefination.left,
                );
                historyer.pushSchema(_schema);
              }}
            />
          )}
        />
        <InputGroup
          key="top-styles"
          value={styles.top || cssDefination.top || ''}
          disabled={!styles.top}
          className="styler-row"
          onChange={(e) => {
            if (!styles.top) {
              return;
            }
            const { value } = e.target as HTMLInputElement;
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.top`,
              value,
            );
            historyer.pushSchema(_schema);
          }}
          leftIcon={(
            <span className={Classes.ICON} title="top">
              <span className="textIcon">Y</span>
            </span>
          )}
          rightElement={(
            <Button
              icon={!styles.top ? 'lock' : 'unlock'}
              minimal
              onClick={() => {
                if (styles.top) {
                  return;
                }
                const _schema = schemaParser.update(
                  schema,
                  targetSchema.id,
                  `styles.#${targetSchema.id}.top`,
                  cssDefination.top,
                );
                historyer.pushSchema(_schema);
              }}
            />
          )}
        />
        <InputGroup
          key="backgroundColor-styles"
          value={styles['background-color'] || cssDefination.backgroundColor || ''}
          disabled={!styles['background-color']}
          className="styler-row"
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
            historyer.pushSchema(_schema);
          }}
          leftIcon={(
            <span className={Classes.ICON} title="background color">
              <span className="textIcon" style={{ backgroundColor: styles['background-color'] || cssDefination.backgroundColor || '' }} />
            </span>
          )}
          rightElement={(
            <Button
              icon={!styles['background-color'] ? 'lock' : 'unlock'}
              minimal
              onClick={() => {
                if (styles['background-color']) {
                  return;
                }
                const _schema = schemaParser.update(
                  schema,
                  targetSchema.id,
                  `styles.#${targetSchema.id}.background-color`,
                  cssDefination.backgroundColor,
                );
                historyer.pushSchema(_schema);
              }}
            />
          )}
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
            historyer.pushSchema(_schema);
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
            historyer.pushSchema(_schema);
          }}
        >
          <MenuItem value="static">static</MenuItem>
          <MenuItem value="relative">relative</MenuItem>
          <MenuItem value="absolute">absolute</MenuItem>
          <MenuItem value="fixed">fixed</MenuItem>
        </TextField> */}
        <Upload
          key="backgroundImage-styles"
          value={
            parseBackgroundImage(styles['background-image'] || cssDefination.backgroundImage || '')
          }
          disabled={!styles['background-image']}
          className="styler-row"
          onChange={(url?:string) => {
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `styles.#${targetSchema.id}.background-image`,
              url ? `url(${url})` : 'none',
            );
            historyer.pushSchema(_schema);
          }}
        />
        <InputGroup
          key="font-family-styles"
          value={styles['font-family'] || cssDefination.getPropertyValue('font-family') || ''}
          disabled={!styles['font-family']}
          className="styler-row"
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
            historyer.pushSchema(_schema);
          }}
          leftIcon={(
            <span className={Classes.ICON} title="font family">
              <span className="textIcon">A</span>
            </span>
          )}
          rightElement={(
            <Button
              icon={!styles['font-family'] ? 'lock' : 'unlock'}
              minimal
              onClick={() => {
                if (styles['font-family']) {
                  return;
                }
                const _schema = schemaParser.update(
                  schema,
                  targetSchema.id,
                  `styles.#${targetSchema.id}.font-family`,
                  cssDefination.getPropertyValue('font-family'),
                );
                historyer.pushSchema(_schema);
              }}
            />
          )}
        />
        <InputGroup
          key="font-size-styles"
          value={styles['font-size'] || cssDefination.getPropertyValue('font-size') || ''}
          disabled={!styles['font-size']}
          className="styler-row"
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
            historyer.pushSchema(_schema);
          }}
          leftIcon={(
            <span className={Classes.ICON} title="font family">
              <span className="textIcon">A</span>
            </span>
          )}
          rightElement={(
            <Button
              icon={!styles['font-size'] ? 'lock' : 'unlock'}
              minimal
              onClick={() => {
                if (styles['font-size']) {
                  return;
                }
                const _schema = schemaParser.update(
                  schema,
                  targetSchema.id,
                  `styles.#${targetSchema.id}.font-size`,
                  cssDefination.getPropertyValue('font-size'),
                );
                historyer.pushSchema(_schema);
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default connecter(Configer);
