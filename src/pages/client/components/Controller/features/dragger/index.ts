// import store from '../../store';
import { get } from 'lodash-es';
import adsorptioner from '../../../../../editor/features/adsorptioner';
import schemaParser from '../../../../../editor/features/schemaParser';
import { Bound } from '../../../../../editor/store';
import './index.css';

class Dragger {
  Dragger = Dragger;

  _working = false;

  startX = 0;

  startY = 0;

  _target: any = null;

  transfer: any = {};

  start = (e: MouseEvent) => {
    const { select, schema, threshold } = (window as any).store.getState();
    if (!select) {
      return;
    }
    const target = document.getElementById(select);
    if (!target) {
      return;
    }

    const list = e.composedPath().slice(0, -2) as HTMLElement[];

    const gonext = list.some((item) => item === target);

    if (!gonext) {
      return;
    }

    const cssStyle = window.getComputedStyle(target);
    this._target = target;

    if (cssStyle.position === 'absolute' || cssStyle.position === 'fixed') {
      return;
    }

    const _parentSchema = schemaParser.searchById(schema, select)[1];
    const siblings = (_parentSchema.children || []).filter((child) => child.id !== select);
    siblings.unshift(_parentSchema);
    const bounds: Bound[] = siblings.map((sib) => {
      const element = document.getElementById(sib.id);

      if (!element) {
        return null as unknown as Bound;
      }
      const elementCssStyle = window.getComputedStyle(element);

      const x = +elementCssStyle.marginLeft.replace('px', '');
      const y = +elementCssStyle.marginTop.replace('px', '');
      const width = +elementCssStyle.width.replace('px', '');
      const height = +elementCssStyle.height.replace('px', '');

      return {
        x, y, width, height,
      };
    }).filter((bound) => Boolean(bound));

    const _width = +cssStyle.width.replace('px', '');
    const _height = +cssStyle.height.replace('px', '');
    const _left = +cssStyle.marginLeft.replace('px', '');
    const _top = +cssStyle.marginTop.replace('px', '');

    this.transfer = {
      _left: this._target.style.left,
      _top: this._target.style.top,
      x: _left,
      y: _top,
      width: _width,
      height: _height,
      bounds,
      threshold,
      schema,
      select,
    };
    this._working = true;
    this.startX = e.pageX;
    this.startY = e.pageY;

    document.documentElement.classList.add('dragger');

    window.addEventListener('mousemove', this.move);
    window.addEventListener('mouseup', this.up);
    window.addEventListener('mouseleave', this.cancel);

    (window as any).store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        {
          key: 'currentBound',
          value: {
            x: _left, y: _top, width: _width, height: _height,
          },
        },
        { key: 'bounds', value: bounds },
      ],
    });
  };

  move = (e: MouseEvent) => {
    if (!this._working) {
      return;
    }

    const {
      x,
      y,
      width,
      height,
      precision,
      bounds,
      threshold,
    } = this.transfer;

    const moveX = e.pageX - this.startX;
    const moveY = e.pageY - this.startY;

    let _left = Number((moveX + x).toFixed(precision));
    let _top = Number((moveY + y).toFixed(precision));

    const res = adsorptioner.move(
      {
        x: _left, y: _top, width, height,
      },
      bounds,
      threshold,
    );

    _left = res.x;
    _top = res.y;

    this._target.style.marginLeft = `${_left}px`;
    this._target.style.marginTop = `${_top}px`;

    (window as any).store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        {
          key: 'currentBound',
          value: {
            x: _left, y: _top, width, height,
          },
        },
      ],
    });
  };

  cancel = () => {
    this._target.style.marginLeft = this.transfer._left;
    this._target.style.marginTop = this.transfer._top;
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
    const {
      x,
      y,
      width,
      height,
      precision,
      bounds,
      threshold,
      schema,
      select,
    } = this.transfer;

    const moveX = e.pageX - this.startX;
    const moveY = e.pageY - this.startY;

    let _left = Number((moveX + x).toFixed(precision));
    let _top = Number((moveY + y).toFixed(precision));

    const res = adsorptioner.move(
      {
        x: _left, y: _top, width, height,
      },
      bounds,
      threshold,
    );

    _left = res.x;
    _top = res.y;

    const [_targetSchema] = schemaParser.searchById(schema, select);
    const styles = get(_targetSchema, `styles.#${_targetSchema.id}`, {});
    const _schema = schemaParser.update(schema, select, `styles.#${_targetSchema.id}`, {
      ...styles,
      'margin-left': `${_left}px`,
      'margin-top': `${_top}px`,
    });

    (window.parent as any).changePosition(_schema);

    (window as any).store.dispatch({
      type: 'CHANGE_VALUE',
      payload: [
        { key: 'currentBound', value: null },
        { key: 'bounds', value: [] },
      ],
    });

    this.cancel();
  };
}

export default new Dragger();
