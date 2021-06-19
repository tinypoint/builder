import React from 'react';
import './index.css';

type IImageProps = any;

const Image: React.FC<IImageProps> = ({ id, alt = 'img', src = '//img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg' }: IImageProps) => (
  <img
    id={id}
    className="image"
    data-builder-type="img"
    alt={alt}
    src={src}
  />
);

Image.displayName = 'Image';

export default Image;
