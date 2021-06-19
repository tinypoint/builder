import './index.css';

class Dragger {
  Dragger = Dragger;

  _working = false;

  startX = 0;

  startY = 0;

  _target: any = null;

  transfer: any = {};

  start = (e: MouseEvent) => {
    const { select } = (window as any).store.getState();
    if (!select) {
      return;
    }
    const target = document.getElementById(select);
    if (!target) {
      return;
    }

    const list = e.composedPath().slice(0, -7) as HTMLElement[];

    const gonext = list.some((item) => item === target);

    if (!gonext) {
      return;
    }

    this._target = target;

    const cssStyle = window.getComputedStyle(target);
    this.transfer = {
      x: Number(cssStyle.left.replace('px', '')) || 0,
      y: Number(cssStyle.top.replace('px', '')) || 0,
    };
    this._working = true;
    this.startX = e.pageX;
    this.startY = e.pageY;

    document.documentElement.classList.add('dragger');

    window.addEventListener('mousemove', this.move);
    window.addEventListener('mouseup', this.up);
    window.addEventListener('mouseleave', this.cancel);
  };

  move = (e: MouseEvent) => {
    if (!this._working) {
      return;
    }
    const moveX = e.pageX - this.startX;
    const moveY = e.pageY - this.startY;

    const left = (this.transfer.x + moveX);
    const top = (this.transfer.y + moveY);
    this._target.style.left = `${left}px`;
    this._target.style.top = `${top}px`;
  };

  cancel = () => {
    this._target = null;
    this._working = false;
    this.transfer = {};
    this.startX = 0;
    this.startY = 0;
    window.removeEventListener('mousemove', this.move);
    window.removeEventListener('mouseup', this.up);
    window.removeEventListener('mouseleave', this.cancel);

    document.documentElement.classList.remove('dragger');
  };

  up = (e: MouseEvent) => {
    const moveX = e.pageX - this.startX;
    const moveY = e.pageY - this.startY;
    const left = (this.transfer.x + moveX);
    const top = (this.transfer.y + moveY);
    this._target.style.left = `${left}px`;
    this._target.style.top = `${top}px`;
    this.cancel();
  };
}

export default new Dragger();
