import store from '../../store';

class IframeManager {
  private _iframeElem: HTMLIFrameElement | null = null;

  _resolve: Function | null = null;

  _promise: Promise<HTMLIFrameElement>;

  constructor() {
    this._promise = new Promise((resolve) => {
      this._resolve = resolve;
    });
  }

  private _isBinding = false;

  private _isBinded = false;

  ifNeverBind = () => !this._isBinding && !this._isBinded;

  private _bindIframe = (
    iframeElem: HTMLIFrameElement,
  ) => new Promise<HTMLIFrameElement>((resolve, reject) => {
    iframeElem.onload = () => {
      const pathname = iframeElem.contentWindow?.location.pathname;
      if (!pathname?.match(/^\/builder\/client/)) {
        return;
      }
      const metas = iframeElem.contentWindow!.document.getElementsByTagName('meta');
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

      resolve(iframeElem);
    };

    iframeElem.onerror = (error) => {
      const pathname = iframeElem.contentWindow?.location.pathname;
      if (!pathname?.match(/^\/builder\/client/)) {
        return;
      }
      reject(error);
    };

    iframeElem.setAttribute('src', '/builder/client');
  });

  bindIframe = async (iframeElem: HTMLIFrameElement) => {
    this._iframeElem = await this._bindIframe(iframeElem);
  };

  getWindow = async (): Promise<Window > => {
    if (this._iframeElem) {
      return this._iframeElem!.contentWindow!;
    }

    await this._promise;

    return this._iframeElem!.contentWindow!;
  };

  getDocument = async (): Promise<Document > => {
    if (this._iframeElem) {
      return this._iframeElem!.contentDocument!;
    }

    await this._promise;

    return this._iframeElem!.contentDocument!;
  };
}

export default new IframeManager();
