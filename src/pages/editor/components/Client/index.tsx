import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import iframeManager from '../../features/iframeManager';
import { State } from '../../store';
import './index.css';

const connecter = connect((state: State) => ({
  baseScale: state.baseScale,
  components: state.components,
}));

type Props = ConnectedProps<typeof connecter>;

class Runtime extends React.Component<Props> {
  iframeWrapper: HTMLDivElement | null = null;

  iframe: HTMLIFrameElement;

  constructor(props: Props) {
    super(props);
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('title', 'client');
  }

  componentDidMount() {
    const { components } = this.props;
    if (components.length) {
      this.bindIframe();
    }

    // this.iframe!.onload = () => {
    //   iframeManager.bindIframe(this.iframe!);
    //   hotkeyer.init();

    //   const metas = this.iframe?.contentWindow!.document.getElementsByTagName('meta');
    //   const viewportMeta: HTMLMetaElement[] = Array.prototype.slice.call(metas, 0)
    //     .filter((meta: HTMLMetaElement) => {
    //       if (meta.getAttribute('name') === 'viewport') {
    //         return true;
    //       }

    //       return false;
    //     });

    //   if (viewportMeta.length > 0) {
    //     const content = viewportMeta[0].getAttribute('content') || '';
    //     const matcher = content.match(/width=(\d+|device-width);/);

    //     const width = Number((matcher && matcher[1]) || 750);

    //     store.dispatch({
    //       type: 'CHANGE_VALUE',
    //       payload: [
    //         { key: 'baseScale', value: 375 / width },
    //       ],
    //     });
    //   }
    // };
  }

  componentDidUpdate(props: Props) {
    const { components } = this.props;
    if (components.length && !props.components.length) {
      this.bindIframe();
    }
  }

  bindIframe = () => {
    if (iframeManager.ifNeverBind()) {
      iframeManager.bindIframe(this.iframe!);
      this.iframeWrapper?.appendChild(this.iframe);
    }
  };

  render() {
    const { baseScale } = this.props;

    return (
      <div
        className="client"
        style={{
          width: 750,
          height: 1552,
          transform: `scale(${baseScale})`,
        }}
        id="runtime"
        ref={(ref) => {
          this.iframeWrapper = ref;
        }}
      />
    );
  }
}

export default connecter(Runtime);
