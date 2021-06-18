// import store from '../../store';
import { get } from 'lodash-es';
import schemaParser from '../../../../../editor/features/schemaParser';
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

        const cssStyle = window.getComputedStyle(target);
        this._target = target;

        if (cssStyle.position === 'absolute' || cssStyle.position === 'fixed') {
            return;
        }

        this.transfer = {
            _left: this._target.style.left,
            _top: this._target.style.top,
            x: Number(cssStyle.marginLeft.replace('px', '')) || 0,
            y: Number(cssStyle.marginTop.replace('px', '')) || 0,
        }
        this._working = true;
        this.startX = e.pageX;
        this.startY = e.pageY;


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
        this._target.style.marginLeft = `${left}px`
        this._target.style.marginTop = `${top}px`
    }

    cancel = (e: MouseEvent) => {
        this._target.style.marginLeft = this.transfer._left
        this._target.style.marginTop = this.transfer._top
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
        this._target.style.marginLeft = `${left}px`
        this._target.style.marginTop = `${top}px`
        const { schema, select } = (window as any).store.getState();
        const [_targetSchema] = schemaParser.searchById(schema, select)
        const styles = get(_targetSchema, `styles.#${_targetSchema.id}`, {});
        const _schema = schemaParser.update(schema, select, `styles.#${_targetSchema.id}`, {
            ...styles,
            'margin-left': `${left}px`,
            'margin-top': `${top}px`
        });

        (window.parent as any).changePosition(_schema);

        this.cancel(e);
    }
}

export default new Dragger();