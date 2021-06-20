import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
// import Popper from '@material-ui/core/Popper';
import { State } from '../../store';
import Anchor from '../Anchor';
// import Toolbox from '../Toolbox';
import './index.css';

const connecter = connect((state: State) => ({
  select: state.select,
  hover: state.hover,
  baseScale: state.baseScale,
}));

type IProps = ConnectedProps<typeof connecter>;

const initState = {
  visible: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

interface IState {
  select: typeof initState,
  hover: typeof initState
}

class Tracker extends React.Component<IProps, IState> {
  _working = false;

  ref: HTMLDivElement | null = null;

  constructor(props: IProps) {
    super(props);

    this.state = {
      select: initState,
      hover: initState,
    };
  }

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

  listen = (state: { select: typeof initState; hover: typeof initState }) => {
    if (!this._working) {
      return;
    }

    this.setState(state);
  };

  render() {
    const { baseScale } = this.props;
    const { select, hover } = this.state;
    return (
      <div className="tracker-layer" data-builder-tracker>
        <div
          className="tracker-box hover"
          style={{
            display: hover.visible ? 'block' : 'none',
            transform: `translate3d(${hover.x * baseScale}px,${
              hover.y * baseScale
            }px,0px)`,
            width: hover.width * baseScale,
            height: hover.height * baseScale,
          }}
        >
          <Anchor type="hover" />
        </div>
        <div
          className="tracker-box select"
          ref={(ref) => {
            this.ref = ref;
          }}
          style={{
            visibility: select.visible ? 'visible' : 'hidden',
            transform: `translate3d(${select.x * baseScale}px,${
              select.y * baseScale
            }px,0px)`,
            width: select.width * baseScale,
            height: select.height * baseScale,
          }}
        >
          <Anchor type="select" />
        </div>
        {/* <Popper
          open={select.visible}
          anchorEl={() => this.ref!}
          popperOptions={{
            offsets: { x: 20, y: 20 },
          }}
        >
          <Toolbox />
        </Popper> */}
      </div>
    );
  }
}

export default connecter(Tracker);
