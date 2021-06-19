import React from 'react';
import './index.css';

type IContainerProps = any;

interface IStates {
  activeIndex: number
}

class Ppt extends React.Component<IContainerProps, IStates> {
  ref: HTMLDivElement | null = null;

  _down = false;

  _startY = 0;

  _height = 0;

  constructor(props:IContainerProps) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onMouseDown = (e: React.MouseEvent) => {
    this._down = true;
    this._startY = e.pageY;
    this._height = this.ref!.getBoundingClientRect().height;
    this.ref?.classList.remove('animation');
  };

  onMouseMove = (e: React.MouseEvent) => {
    if (!this._down) {
      return;
    }
    const { activeIndex } = this.state;
    const moveY = e.pageY - this._startY;
    this.ref!.style.transform = `translateY(${
      moveY - this._height * activeIndex
    }px)`;
  };

  onMouseUp = (e: React.MouseEvent) => {
    const moveY = e.pageY - this._startY;
    this.ref?.classList.add('animation');

    const { children = [] } = this.props;
    const { activeIndex } = this.state;

    if (
      moveY < -this._height * 0.3
      && activeIndex + 1
        <= ((children as any).length - 1 || 0)
    ) {
      // up
      this.ref!.style.transform = `translateY(${
        (activeIndex + 1) * -100
      }%)`;
      this.setState({
        activeIndex: activeIndex + 1,
      });
    } else if (moveY > this._height * 0.3 && activeIndex - 1 >= 0) {
      // down
      this.ref!.style.transform = `translateY(${
        (activeIndex - 1) * -100
      }%)`;
      this.setState({
        activeIndex: activeIndex - 1,
      });
    } else {
      this.ref!.style.transform = `translateY(${
        activeIndex * -100
      }%)`;
    }

    this._down = false;
    this._startY = 0;
  };

  onMouseLeave = () => {
    this.ref?.classList.add('animation');
    this._down = false;
    this._startY = 0;
    this._height = 0;
  };

  render() {
    const { id, children } = this.props;
    const { activeIndex } = this.props;
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label="button"
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
        id={id}
        className="ppt"
        data-builder-type="ppt"
      >
        <div
          ref={(ref) => {
            this.ref = ref;
          }}
          data-builder-block="ppt-container"
          className="ppt-inner animation"
          style={{
            transform: `translateY(${-100 * activeIndex}%)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Ppt;
