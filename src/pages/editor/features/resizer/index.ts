import { get } from 'lodash-es';
import store, { Bound, DIR } from '../../store';
import historyer from '../historyer';
import Overlayer from '../overlayer';
import schemaParser from '../schemaParser';
import adsorptioner from '../adsorptioner';

const CURSOR_MAP = {
  tl: 'nw-resize',
  tc: 'ns-resize',
  tr: 'ne-resize',
  cl: 'ew-resize',
  cr: 'ew-resize',
  bl: 'sw-resize',
  bc: 'ns-resize',
  br: 'se-resize',
};

class Resizer {
    Resizer = Resizer;

    overlayer = new Overlayer();

    _working = false;

    startX = 0;

    startY = 0;

    _target: any = null;

    transfer: any = {};

    constructor() {
      this.overlayer.host.style.display = 'none';
    }

    start = (e: MouseEvent) => {
      const {
        select, scale, baseScale, precision, schema, threshold,
      } = store.getState();
      if (!select) {
        return;
      }
      const iframe = document.getElementById('runtime') as HTMLIFrameElement;
      const iframeWindow = iframe.contentWindow!;
      const iframeDocument = iframeWindow.document;
      const target = iframeDocument.getElementById(select);

      if (!target) {
        return;
      }
      this._target = target;
      const cssStyle = iframeWindow.getComputedStyle(target);
      const { style } = target;
      const dir = (e.target as HTMLDivElement).getAttribute('data-builder-dotdir') as keyof typeof CURSOR_MAP;

      const code = dir.split('').map((d) => {
        if (d === 't') {
          return DIR.TOP;
        } if (d === 'l') {
          return DIR.LEFT;
        } if (d === 'r') {
          return DIR.RIGHT;
        } if (d === 'b') {
          return DIR.BOTTOM;
        }
        return DIR.OTHER;
      }).reduce((prevValue, currentValue) => prevValue ^ currentValue, DIR.OTHER);

      const [_, _parentSchema] = schemaParser.searchById(schema, select);
      const siblings = (_parentSchema.children || []).filter((child) => child.id !== select);

      const bounds: Bound[] = siblings.map((sib) => {
        const element = iframeDocument.getElementById(sib.id);

        if (!element) {
          return null as unknown as Bound;
        }
        const elementCssStyle = iframeWindow.getComputedStyle(element);

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
        _width: style.width,
        _height: style.height,
        _left: style.marginLeft,
        _top: style.marginTop,
        x: _left,
        y: _top,
        width: _width,
        height: _height,
        dir,
        scale,
        baseScale,
        precision,
        schema,
        select,
        bounds,
        threshold,
        code,
      };
      this._working = true;
      this.startX = e.pageX;
      this.startY = e.pageY;

      this.overlayer.host.style.display = 'block';
      this.overlayer.host.style.cursor = CURSOR_MAP[dir];

      this.overlayer.host.addEventListener('mousemove', this.move);
      this.overlayer.host.addEventListener('mouseup', this.up);
      this.overlayer.host.addEventListener('mouseout', this.cancel);
      store.dispatch({
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
    }

    move = (e: MouseEvent) => {
      if (!this._working) {
        return;
      }

      const {
        x,
        y,
        width,
        height,
        dir,
        scale,
        baseScale,
        precision,
        bounds,
        threshold,
        code,
      } = this.transfer;
      const sc = baseScale * scale;
      const moveX = e.pageX - this.startX;
      const moveY = e.pageY - this.startY;
      let _width = Number(((code & DIR.LEFT ? -1 : 1) * moveX / sc + width).toFixed(precision));
      let _height = Number(((code & DIR.TOP ? -1 : 1) * moveY / sc + height).toFixed(precision));
      let _left = Number(((code & DIR.RIGHT ? 0 : 1) * moveX / sc + x).toFixed(precision));
      let _top = Number(((code & DIR.BOTTOM ? 0 : 1) * moveY / sc + y).toFixed(precision));

      if (_height <= 0) {
        _height = 0;
        _top = Number((height + y).toFixed(precision));
      }

      if (_width <= 0) {
        _width = 0;
        _left = Number((width + x).toFixed(precision));
      }

      const res = adsorptioner.resize(
        {
          x: _left, y: _top, width: _width, height: _height,
        },
        bounds,
        threshold,
        code,
      );

      _left = res.x;
      _width = res.width;
      _top = res.y;
      _height = res.height;

      ((code & DIR.LEFT || code & DIR.RIGHT)) && (this._target.style.width = `${_width}px`);
      ((code & DIR.TOP || code & DIR.BOTTOM)) && (this._target.style.height = `${_height}px`);
      ((code & DIR.LEFT)) && (this._target.style.marginLeft = `${_left}px`);
      ((code & DIR.TOP)) && (this._target.style.marginTop = `${_top}px`);

      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [
          {
            key: 'currentBound',
            value: {
              x: _left, y: _top, width: _width, height: _height,
            },
          },
        ],
      });
    }

    cancel = (e: MouseEvent) => {
      const {
        _width, _height, _left, _top,
      } = this.transfer;

      this._target.style.width = _width;
      this._target.style.height = _height;
      this._target.style.marginLeft = _left;
      this._target.style.marginTop = _top;

      this._working = false;
      this._target = null;
      this.transfer = {};
      this.startX = 0;
      this.startY = 0;
      this.overlayer.host.removeEventListener('mousemove', this.move);
      this.overlayer.host.removeEventListener('mouseup', this.up);
      this.overlayer.host.removeEventListener('mouseout', this.cancel);

      this.overlayer.host.style.display = 'none';
      this.overlayer.host.style.cursor = 'initial';
    }

    up = (e: MouseEvent) => {
      if (!this._working) {
        return;
      }

      const {
        x, y, width, height, dir, scale, baseScale, precision,
        schema, select, bounds, threshold, code,
      } = this.transfer;
      const sc = baseScale * scale;
      const moveX = e.pageX - this.startX;
      const moveY = e.pageY - this.startY;
      let _width = Number(((code & DIR.LEFT ? -1 : 1) * moveX / sc + width).toFixed(precision));
      let _height = Number(((code & DIR.TOP ? -1 : 1) * moveY / sc + height).toFixed(precision));
      let _left = Number(((code & DIR.RIGHT ? 0 : 1) * moveX / sc + x).toFixed(precision));
      let _top = Number(((code & DIR.BOTTOM ? 0 : 1) * moveY / sc + y).toFixed(precision));
      if (_height <= 0) {
        _height = 0;
        _top = Number((height + y).toFixed(precision));
      }

      if (_width <= 0) {
        _width = 0;
        _left = Number((width + x).toFixed(precision));
      }

      const res = adsorptioner.resize(
        {
          x: _left, y: _top, width: _width, height: _height,
        },
        bounds,
        threshold,
        code,
      );

      _left = res.x;
      _width = res.width;
      _top = res.y;
      _height = res.height;

      ((code & DIR.LEFT || code & DIR.RIGHT)) && (this._target.style.width = `${_width}px`);
      ((code & DIR.TOP || code & DIR.BOTTOM)) && (this._target.style.height = `${_height}px`);
      ((code & DIR.LEFT)) && (this._target.style.marginLeft = `${_left}px`);
      ((code & DIR.TOP)) && (this._target.style.marginTop = `${_top}px`);

      const [_targetSchema] = schemaParser.searchById(schema, select);
      const styles = get(_targetSchema, `styles.#${_targetSchema.id}`, {});

      const newStyle: { width?: string; height?: string; 'margin-left'?: string; 'margin-top'?: string } = {};

      ((code & DIR.LEFT || code & DIR.RIGHT)) && (newStyle.width = `${_width}px`);
      ((code & DIR.TOP || code & DIR.BOTTOM)) && (newStyle.height = `${_height}px`);
      ((code & DIR.LEFT)) && (newStyle['margin-left'] = `${_left}px`);
      ((code & DIR.TOP)) && (newStyle['margin-top'] = `${_top}px`);

      const _schema = schemaParser.update(schema, select, `styles.#${_targetSchema.id}`, {
        ...styles,
        ...newStyle,
      });

      historyer.push(_schema);

      store.dispatch({
        type: 'CHANGE_VALUE',
        payload: [
          { key: 'currentBound', value: null },
          { key: 'bounds', value: [] },
        ],
      });

      this.cancel(e);
    }
}

export default new Resizer();
