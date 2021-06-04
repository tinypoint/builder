import React from "react";
import './index.css';

type IImageProps = any;

class Image extends React.Component<IImageProps> {
  static displayName = "Image";

  render() {
    return (
      <img id={this.props.id} className="image" data-builder-type="img" src={this.props.imgUrl} />
    );
  }
}

export default Image;
