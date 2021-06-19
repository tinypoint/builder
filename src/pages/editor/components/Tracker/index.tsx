import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import Anchor from '../Anchor';
import Toolbox from '../Toolbox';
import './index.css';
import Popper from '@material-ui/core/Popper';

interface Props {
  select: State['select'];
  hover: State['hover'];
}

const initState = {
  visible: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const scale = 0.5;

class Tracker extends React.Component<Props> {
  state = {
    select: initState,
    hover: initState,
  };

  _working = false;

  listen = (state: { select: typeof initState; hover: typeof initState }) => {
    if (!this._working) {
      return;
    }

    this.setState(state);
  };

  ref: HTMLDivElement | null = null;

  componentDidMount() {
    this._working = true;

    Object.defineProperty(window, '_track', {
      configurable: true,
      get: () => this.listen,
    });
  }

  componentWillUnmount() {
    this._working = false;

    delete (window as any)._track;
  }

  render() {
    const { select, hover } = this.state;
    return (
      <div className="tracker-layer" data-builder-tracker>
        <div
          className="tracker-box hover"
          style={{
            display: hover.visible ? 'block' : 'none',
            transform: `translate3d(${hover.x * scale}px,${
              hover.y * scale
            }px,0px)`,
            width: hover.width * scale,
            height: hover.height * scale,
          }}
        >
          <Anchor type="hover" />
        </div>
        <div
          className="tracker-box select"
          ref={(ref) => (this.ref = ref)}
          style={{
            visibility: select.visible ? 'visible' : 'hidden',
            transform: `translate3d(${select.x * scale}px,${
              select.y * scale
            }px,0px)`,
            width: select.width * scale,
            height: select.height * scale,
          }}
        >
          <Anchor type="select" />
        </div>
        <Popper
          open={select.visible}
          anchorEl={() => this.ref!}
          popperOptions={{
            offsets: { x: 20, y: 20 },
          }}
        >
          <Toolbox />
        </Popper>
      </div>
    );
  }
}

export default connect((state: State) => ({
  select: state.select,
  hover: state.hover,
}))(Tracker);
