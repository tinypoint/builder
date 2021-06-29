import React from 'react';
import axios from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './index.css';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

interface IProps {
  value: string;
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
    const { value } = this.props;

    return (
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
              color="primary"
              variant="contained"
              size="large"
              startIcon={<CloudUploadIcon />}
            >
              upload
            </Button>

          ) }
        </div>

        { value && (
        <IconButton
          className="upload-preview-clear"
          color="secondary"
          onClick={this.clear}
        >
          <HighlightOffIcon />
        </IconButton>
        )}
      </div>
    );
  }
}
