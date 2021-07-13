import React from 'react';
import { connect } from 'react-redux';
import { InputGroup } from '@blueprintjs/core';
import { Schema, State } from '../../store';
import schemaParser from '../../features/schemaParser';
import historyer from '../../features/historyer';
import Upload from './Upload';
import styles from './index.module.scss';

const map: any = {
  button: [
    {
      type: 'input',
      key: 'text',
    },
  ],
  image: [
    {
      type: 'upload',
      key: 'src',
    },
  ],
};

interface Props {
  select: State['select'];
  schema: State['schema'];
}

class Configer extends React.Component<Props> {
  renderProp = (item: any, targetSchema: Schema) => {
    const { schema } = this.props;
    const { props = {} } = targetSchema;

    if (item.type === 'input') {
      return (
        <InputGroup
          key={item.key}
          className={styles.configerRow}
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
    } if (item.type === 'upload') {
      return (
        <Upload
          key={item.key}
          value={props[item.key] || ''}
          onChange={(url?: string) => {
            const _schema = schemaParser.update(
              schema,
              targetSchema.id,
              `props.${item.key}`,
              url,
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

    if (!select || !select.length) {
      return null;
    }

    const [targetSchema] = schemaParser.searchById(schema, select[0]);

    const props = map[targetSchema.type];

    if (!props) {
      return null;
    }

    return (
      <div className="configer">
        {props.map((item: any) => this.renderProp(item, targetSchema))}
      </div>
    );
  }
}

export default connect((state: State) => ({
  select: state.select,
  schema: state.schema,
}))(Configer);
