import React from 'react';
import './index.css';

type IContainerProps = any;

class Ppt extends React.Component<IContainerProps> {
  static displayName = 'Ppt';

  state = {
    activeIndex: 0,
  };

  ref: HTMLDivElement | null = null;

  _down = false;

  _startY = 0;

  _height = 0;

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
    const moveY = e.pageY - this._startY;
    this.ref!.style.transform = `translateY(${
      moveY - this._height * this.state.activeIndex
    }px)`;
  };

  onMouseUp = (e: React.MouseEvent) => {
    const moveY = e.pageY - this._startY;
    this.ref?.classList.add('animation');

    if (
      moveY < -this._height * 0.3
      && this.state.activeIndex + 1
        <= (((this.props.children || []) as any).length - 1 || 0)
    ) {
      // up
      this.ref!.style.transform = `translateY(${
        (this.state.activeIndex + 1) * -100
      }%)`;
      this.setState({
        activeIndex: this.state.activeIndex + 1,
      });
    } else if (moveY > this._height * 0.3 && this.state.activeIndex - 1 >= 0) {
      // down
      this.ref!.style.transform = `translateY(${
        (this.state.activeIndex - 1) * -100
      }%)`;
      this.setState({
        activeIndex: this.state.activeIndex - 1,
      });
    } else {
      this.ref!.style.transform = `translateY(${
        this.state.activeIndex * -100
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
    const { children } = this.props;
    const { activeIndex } = this.props;
    const childrenLength = ((children || {}) as any).length || 0;
    return (
      <div
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
        id={this.props.id}
        className="ppt"
        data-builder-type="ppt"
      >
        <div
          ref={(ref) => (this.ref = ref)}
          data-builder-block="ppt-container"
          className="ppt-inner animation"
          style={{
            transform: `translateY(${-100 * activeIndex}%)`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Ppt;
