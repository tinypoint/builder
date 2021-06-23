import React from 'react';
import './index.css';

type IButtonProps = any;

class Button extends React.Component<IButtonProps> {
  onClick = () => {
    const name = 'customEvent';
    requirejs([name], (func: any) => { func(); });
  };

  render() {
    const { id, text } = this.props;

    return (
      <button
        id={id}
        type="submit"
        data-builder-type="button"
        className="button"
        onClick={this.onClick}
      >
        {text}
        123
      </button>
    );
  }
}

export default Button;
