import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store';
import Anchor from '../Anchor';
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

interface SelectItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IState {
  select: SelectItem[],
  hover: typeof initState
}

class Tracker extends React.Component<IProps, IState> {
  _working = false;

  constructor(props: IProps) {
    super(props);

    this.state = {
      select: ([] as SelectItem[]),
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

  listen = (state: { select: SelectItem[]; hover: typeof initState }) => {
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
        {
          select.map((item) => {
            if (item) {
              return (
                <div
                  key={item.id}
                  className="tracker-box select"
                  style={{
                    transform: `translate3d(${item.x * baseScale}px,${
                      item.y * baseScale
                    }px,0px)`,
                    width: item.width * baseScale,
                    height: item.height * baseScale,
                  }}
                >
                  <Anchor type="select" />
                </div>
              );
            }

            return null;
          })
        }
      </div>
    );
  }
}

export default connecter(Tracker);
