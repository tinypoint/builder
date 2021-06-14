// import store from '../../store';
import Overlayer from '../overlayer';

const CURSOR_MAP = {
    tl: 'nw-resize',
    tc: 'ns-resize',
    tr: 'ne-resize',
    cl: 'ew-resize',
    cr: 'ew-resize',
    bl: 'sw-resize',
    bc: 'ns-resize',
    br: 'se-resize',
}

// const getLeftTop = (str: string) => {
//     if () {

//     }
// }

class Resizer {
    Resizer = Resizer;
    overlayer = new Overlayer();

    _working = false;
    startX = 0;
    startY = 0;
    _target: any = null;
    transfer: any = {};

    constructor() {
        this.overlayer.host.style.display = 'none'
    }

    start = (e: MouseEvent) => {
        const select = (window as any).store.getState().select;
        if (!select) {
            return;
        }
        const target = document.getElementById(select)
        if (!target) {
            return;
        }
        this._target = target;
        const cssStyle = window.getComputedStyle(target);
        this.transfer = {
            x: cssStyle.left.replace('px', ''),
            y: cssStyle.top.replace('px', ''),
        }
        this._working = true;
        this.startX = e.pageX;
        this.startY = e.pageY;

        const dir = (e.target as HTMLDivElement).getAttribute('data-builder-dotdir') as keyof typeof CURSOR_MAP;

        this.overlayer.host.style.display = 'block';
        this.overlayer.host.style.cursor = CURSOR_MAP[dir]

        this.overlayer.host.addEventListener('mousemove', this.move)
        this.overlayer.host.addEventListener('mouseup', this.up)
        this.overlayer.host.addEventListener('mouseout', this.cancel)
    }

    move = (e: MouseEvent) => {
        if (!this._working) {
            return;
        }

        const moveX = e.pageX - this.startX
        const moveY = e.pageY - this.startY

        this._target.style.left = `${this.transfer.x + moveX}px`
        this._target.style.top = `${this.transfer.y + moveY}px`
    }

    cancel = (e: MouseEvent) => {
        this._target = null
        this._working = false;
        this.transfer = {};
        this.startX = 0;
        this.startY = 0;
        this.overlayer.host.removeEventListener('mousemove', this.move)
        this.overlayer.host.removeEventListener('mouseup', this.up)
        this.overlayer.host.removeEventListener('mouseout', this.cancel)

        this.overlayer.host.style.display = 'none'
        this.overlayer.host.style.cursor = 'initial'
    }

    up = (e: MouseEvent) => {
        const moveX = e.pageX - this.startX
        const moveY = e.pageY - this.startY
        this.cancel(e);
    }
}

export default new Resizer();