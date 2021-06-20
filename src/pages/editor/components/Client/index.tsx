import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store';
import './index.css';

const connecter = connect((state: State) => ({
  baseScale: state.baseScale,
  components: state.components,
}));

type Props = ConnectedProps<typeof connecter>;

class Runtime extends React.Component<Props> {
  iframe: HTMLIFrameElement | null = null;

  render() {
    const { baseScale, components } = this.props;

    if (!components || !components.length) {
      return null;
    }

    return (
      <iframe
        className="client"
        title="client"
        style={{
          width: 375,
          height: 776,
          transform: `scale(${baseScale})`,
        }}
        src="http://localhost:8080/client"
        ref={(ref) => {
          this.iframe = ref;
        }}
        id="runtime"
      />
    );
  }
}

export default connecter(Runtime);
