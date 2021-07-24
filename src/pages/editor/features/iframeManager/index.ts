class IframeManager {
  private _iframeElem: HTMLIFrameElement | null = null;

  _resolve: Function | null = null;

  _promise: Promise<HTMLIFrameElement>;

  constructor() {
    this._promise = new Promise((resolve) => {
      this._resolve = resolve;
    });
  }

  bindIframe = (iframeElem: HTMLIFrameElement) => {
    this._iframeElem = iframeElem;
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
