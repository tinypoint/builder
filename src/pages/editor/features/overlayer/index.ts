import './index.css';

class Overlayer {
    Overlayer = Overlayer;

    host: HTMLDivElement = document.createElement('div')

    constructor() {
        this.host!.className = 'overlayer';
        document.body.appendChild(this.host!);
    }

    destory() {
      document.body.removeChild(this.host!);
    }
}

export default Overlayer;
