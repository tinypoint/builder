import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import hotkeyer from '../../features/hotkeyer';
import iframeManager from '../../features/iframeManager';
import store, { State } from '../../store';
import './index.css';

const connecter = connect((state: State) => ({
  baseScale: state.baseScale,
}));

type Props = ConnectedProps<typeof connecter>;

class Runtime extends React.Component<Props> {
  iframe: HTMLIFrameElement | null = null;

  componentDidMount() {
    this.iframe!.onload = () => {
      iframeManager.bindIframe(this.iframe!);
      hotkeyer.init();

      const metas = this.iframe?.contentWindow!.document.getElementsByTagName('meta');
      const viewportMeta: HTMLMetaElement[] = Array.prototype.slice.call(metas, 0)
        .filter((meta: HTMLMetaElement) => {
          if (meta.getAttribute('name') === 'viewport') {
            return true;
          }

          return false;
        });

      if (viewportMeta.length > 0) {
        const content = viewportMeta[0].getAttribute('content') || '';
        const matcher = content.match(/width=(\d+|device-width);/);

        const width = Number((matcher && matcher[1]) || 750);

        store.dispatch({
          type: 'CHANGE_VALUE',
          payload: [
            { key: 'baseScale', value: 375 / width },
          ],
        });
      }
    };
  }

  render() {
    const { baseScale } = this.props;

    return (
      <iframe
        className="client"
        title="client"
        style={{
          width: 750,
          height: 1552,
          transform: `scale(${baseScale})`,
        }}
        src="/builder/client"
        ref={(ref) => {
          this.iframe = ref;
        }}
        id="runtime"
      />
    );
  }
}

export default connecter(Runtime);
