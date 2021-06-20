import React from 'react';
import { Unsubscribe } from 'redux';
import store, { Bound } from '../../store';
import './index.css';

class ReferenceLine extends React.Component {
  ref: HTMLCanvasElement | null = null;

  ctx: CanvasRenderingContext2D | null = null;

  unsubscribe: Unsubscribe | null = null;

  componentDidMount() {
    this.ctx = this.ref!.getContext('2d')!;

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
    this.ctx!.clearRect(0, 0, 375, 776);
  };

  draw = (currentBound: Bound, bounds: Bound[], threshold: number) => {
    this.clear();
    const ctx = this.ctx!;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    bounds.forEach((bound) => {
      if (
        /* sibling left vs current left | current right */ Math.abs(
          bound.x - currentBound.x,
        ) <= threshold
        || Math.abs(bound.x - (currentBound.x + currentBound.width)) <= threshold
      ) {
        /* left */ ctx.strokeRect(bound.x, 0, 1, 776);
      }

      if (
        /* sibling right vs current left | current right */ Math.abs(
          bound.x + bound.width - currentBound.x,
        ) <= threshold
        || Math.abs(
          bound.x + bound.width - (currentBound.x + currentBound.width),
        ) <= threshold
      ) {
        /* right */ ctx.strokeRect(bound.x + bound.width, 0, 1, 776);
      }

      if (
        /* sibling top vs current top | current bottom */
        Math.abs(bound.y - currentBound.y) <= threshold
        || Math.abs(bound.y - (currentBound.y + currentBound.height)) <= threshold
      ) {
        /* top */ ctx.strokeRect(0, bound.y, 375, 1);
      }

      if (
        /* sibling bottom vs current top | current bottom */
        Math.abs(bound.y + bound.height - currentBound.y) <= threshold
        || Math.abs(
          bound.y + bound.height - (currentBound.y + currentBound.height),
        ) <= threshold
      ) {
        /* bottom */ ctx.strokeRect(0, bound.y + bound.height, 375, 1);
      }
    });
  };

  render() {
    return (
      <canvas
        className="referenceLine"
        width="375px"
        height="776px"
        ref={(ref) => {
          this.ref = ref;
        }}

      />
    );
  }
}

export default ReferenceLine;
