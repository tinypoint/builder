import React from 'react';
import { Unsubscribe } from 'redux';
import { Application, Graphics, utils } from 'pixi.js';
import store, { Bound } from '../../store';
import './index.css';

utils.skipHello();

class ReferenceLine extends React.Component {
  ref: HTMLCanvasElement | null = null;

  unsubscribe: Unsubscribe | null = null;

  app: Application | null = null;

  graphics: Graphics | null = null;

  componentDidMount() {
    this.app = new Application({
      view: this.ref!,
      antialias: true,
      width: 375,
      height: 776,
      backgroundAlpha: 0,
    });

    this.graphics = new Graphics();
    this.app.stage.addChild(this.graphics);

    this.unsubscribe = store.subscribe(() => {
      const { currentBound, bounds, threshold } = store.getState();
      if (!currentBound || !bounds || !bounds.length) {
        this.clear();
      } else {
        this.draw(currentBound, bounds, threshold);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe!();
  }

  clear = () => {
    this.graphics?.clear();
  };

  draw = (currentBound: Bound, bounds: Bound[], threshold: number) => {
    this.clear();

    const graphics = this.graphics!;

    graphics.lineStyle(2, 0xFEEB77, 0.5);

    bounds.forEach((bound) => {
      if (
        /* sibling left vs current left | current right */ Math.abs(
          bound.x - currentBound.x,
        ) <= threshold
        || Math.abs(bound.x - (currentBound.x + currentBound.width)) <= threshold
      ) {
        /* left */ graphics.drawRect(bound.x, 0, 1, 776);
      }

      if (
        /* sibling right vs current left | current right */ Math.abs(
          bound.x + bound.width - currentBound.x,
        ) <= threshold
        || Math.abs(
          bound.x + bound.width - (currentBound.x + currentBound.width),
        ) <= threshold
      ) {
        /* right */ graphics.drawRect(bound.x + bound.width, 0, 1, 776);
      }

      if (
        /* sibling top vs current top | current bottom */
        Math.abs(bound.y - currentBound.y) <= threshold
        || Math.abs(bound.y - (currentBound.y + currentBound.height)) <= threshold
      ) {
        /* top */ graphics.drawRect(0, bound.y, 375, 1);
      }

      if (
        /* sibling bottom vs current top | current bottom */
        Math.abs(bound.y + bound.height - currentBound.y) <= threshold
        || Math.abs(
          bound.y + bound.height - (currentBound.y + currentBound.height),
        ) <= threshold
      ) {
        /* bottom */ graphics.drawRect(0, bound.y + bound.height, 375, 1);
      }
    });
  };

  render() {
    return (
      <canvas
        className="referenceLine"
        ref={(ref) => {
          this.ref = ref;
        }}

      />
    );
  }
}

export default ReferenceLine;
