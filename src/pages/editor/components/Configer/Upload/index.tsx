import React from 'react';
import axios from 'axios';
import './index.css';
import { Button, Card } from '@blueprintjs/core';
import classNames from 'classnames';

interface IProps {
  value: string;
  disabled?: boolean;
  className?: string;
  onChange: (url?: string) => void;
}

export default class Upload extends React.Component<IProps> {
  ref: HTMLInputElement | null = null;

  clickInput = () => {
    this.ref?.click();
  };

  onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const { onChange } = this.props;
    if (file) {
      const formData = new FormData();
      formData.append('files', file);
      const { data: { data: { path: url } } } = await axios.post('/api/file/upload', formData);
      onChange(url);
    }
  };

  clear = async () => {
    const { onChange } = this.props;
    onChange(undefined);
  };

  render() {
    const { value, className } = this.props;

    return (
      <Card className={classNames(className)}>
        <div className="upload-preview">
          <input
            ref={(ref) => {
              this.ref = ref;
            }}
            className="upload-preview-input"
            type="file"
            onChange={this.onChange}
          />
          <div className="upload-preview-content" onClick={this.clickInput}>
            {value ? <img className="upload-preview-img" src={value} alt="" /> : (

              <Button
                className="upload-preview-button"
                icon="upload"
              >
                upload
              </Button>

            ) }
          </div>

          { value && (
          <Button
            className="upload-preview-clear"
            icon="trash"
            onClick={this.clear}
          />
          )}
        </div>
      </Card>
    );
  }
}
