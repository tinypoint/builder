import React from 'react';
import './index.css';

type IImageProps = any;

class Img extends React.Component<IImageProps> {
  static displayName = 'Img';

  render() {
    const {
      imgUrl = '//img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg',
    } = this.props;

    return (
      <img
        id={this.props.id}
        className="img"
        data-builder-type="img"
        src={imgUrl}
      />
    );
  }
}

export default Img;
