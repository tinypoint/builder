// import store from '../../store';
import Overlayer from '../overlayer';
import './index.css'

class Dragger {
    Dragger = Dragger;
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

        const list = e.composedPath().slice(0, -2) as HTMLElement[];

        const gonext = list.some(item => {
            return item === target
        })

        if (!gonext) {
            return;
        }

        this._target = target;

        const cssStyle = window.getComputedStyle(target);
        this.transfer = {
            x: Number(cssStyle.left.replace('px', '')) || 0,
            y: Number(cssStyle.top.replace('px', '')) || 0,
        }
        this._working = true;
        this.startX = e.pageX;
        this.startY = e.pageY;

        // this.overlayer.host.style.display = 'block';
        // this.overlayer.host.style.cursor = 'nwse-resize'

        document.documentElement.classList.add('dragger')


        window.addEventListener('mousemove', this.move)
        window.addEventListener('mouseup', this.up)
        window.addEventListener('mouseleave', this.cancel)
    }

    move = (e: MouseEvent) => {
        if (!this._working) {
            return;
        }
        const moveX = e.pageX - this.startX
        const moveY = e.pageY - this.startY

        const left = (this.transfer.x + moveX)
        const top = (this.transfer.y + moveY)
        this._target.style.left = `${left}px`
        this._target.style.top = `${top}px`
    }

    cancel = (e: MouseEvent) => {
        this._target = null
        this._working = false;
        this.transfer = {};
        this.startX = 0;
        this.startY = 0;
        window.removeEventListener('mousemove', this.move)
        window.removeEventListener('mouseup', this.up)
        window.removeEventListener('mouseleave', this.cancel)

        // this.overlayer.host.style.display = 'none'
        // this.overlayer.host.style.cursor = 'initial'
        document.documentElement.classList.remove('dragger')
    }

    up = (e: MouseEvent) => {
        const moveX = e.pageX - this.startX
        const moveY = e.pageY - this.startY
        const left = (this.transfer.x + moveX)
        const top = (this.transfer.y + moveY)
        this._target.style.left = `${left}px`
        this._target.style.top = `${top}px`
        this.cancel(e);
    }
}

export default new Dragger();