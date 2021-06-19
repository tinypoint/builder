import { Bound, DIR } from '../../store';

class Adsorptioner {
    Adsorptioner = Adsorptioner;

    resize = (currentBound: Bound, bounds: Bound[], threshold: number, code: number) => {
      const res = { ...currentBound };
      bounds.forEach((bound) => {
        if (/* consider left */!(code & DIR.RIGHT)) {
          if (
          /* current left vs sibling left */ Math.abs(
              currentBound.x - bound.x,
            ) <= threshold
          ) {
            const { x } = bound;
            const width = currentBound.width + currentBound.x - x;

            if (width >= 0) {
              res.x = x;
              res.width = width;
            }
          }

          if (
          /* current left vs sibling right */ Math.abs(
              currentBound.x - (bound.x + bound.width),
            ) <= threshold
          ) {
            const x = bound.x + bound.width;
            const width = currentBound.width + currentBound.x - x;

            if (width >= 0) {
              res.x = x;
              res.width = width;
            }
          }
        } else {
          /* no consider left */
          if (
          /* current right vs sibling left */ Math.abs(
              currentBound.x + currentBound.width - bound.x,
            ) <= threshold
          ) {
            const width = bound.x - currentBound.x;
            if (width >= 0) {
              res.width = width;
            }
          }

          if (
          /* current right vs sibling right */ Math.abs(
              currentBound.x + currentBound.width - (bound.x + bound.width),
            ) <= threshold
          ) {
            const width = bound.x + bound.width - currentBound.x;
            if (width >= 0) {
              res.width = width;
            }
          }
        }

        if (/* consider top */!(code & DIR.BOTTOM)) {
          if (
          /* current top vs sibling top */ Math.abs(
              currentBound.y - bound.y,
            ) <= threshold
          ) {
            const { y } = bound;
            const height = currentBound.height + currentBound.y - y;

            if (height >= 0) {
              res.y = y;
              res.height = height;
            }
          }

          if (
          /* current top vs sibling right */ Math.abs(
              currentBound.y - (bound.y + bound.height),
            ) <= threshold
          ) {
            const y = bound.y + bound.height;
            const height = currentBound.height + currentBound.y - y;

            if (height >= 0) {
              res.y = y;
              res.height = height;
            }
          }
        } else {
          /* no consider top */
          if (
          /* current right vs sibling top */ Math.abs(
              currentBound.y + currentBound.height - bound.y,
            ) <= threshold
          ) {
            const height = bound.y - currentBound.y;
            if (height >= 0) {
              res.height = height;
            }
          }

          if (
          /* current right vs sibling right */ Math.abs(
              currentBound.y + currentBound.height - (bound.y + bound.height),
            ) <= threshold
          ) {
            const height = bound.y + bound.height - currentBound.y;
            if (height >= 0) {
              res.height = height;
            }
          }
        }
      });

      return res;
    }

    move = (currentBound: Bound, bounds: Bound[], threshold: number) => {
      const res = { ...currentBound };

      bounds.forEach((bound) => {
        if (
        /* current left vs sibling left */ Math.abs(
            currentBound.x - bound.x,
          ) <= threshold
        ) {
          const { x } = bound;
          res.x = x;
        }

        if (
        /* current left vs sibling right */ Math.abs(
            currentBound.x - (bound.x + bound.width),
          ) <= threshold
        ) {
          const x = bound.x + bound.width;
          res.x = x;
        }

        if (
        /* current right vs sibling left */ Math.abs(
            currentBound.x + currentBound.width - bound.x,
          ) <= threshold
        ) {
          res.x = bound.x - currentBound.width;
        }

        if (
        /* current right vs sibling right */ Math.abs(
            currentBound.x + currentBound.width - (bound.x + bound.width),
          ) <= threshold
        ) {
          res.x = bound.x + bound.width - currentBound.width;
        }

        if (
        /* current top vs sibling top */ Math.abs(
            currentBound.y - bound.y,
          ) <= threshold
        ) {
          const { y } = bound;
          res.y = y;
        }

        if (
        /* current top vs sibling bottom */ Math.abs(
            currentBound.y - (bound.y + bound.height),
          ) <= threshold
        ) {
          const y = bound.y + bound.height;
          res.y = y;
        }

        if (
        /* current bottom vs sibling top */ Math.abs(
            currentBound.y + currentBound.height - bound.y,
          ) <= threshold
        ) {
          res.y = bound.y - currentBound.height;
        }

        if (
        /* current bottom vs sibling bottom */ Math.abs(
            currentBound.y + currentBound.height - (bound.y + bound.height),
          ) <= threshold
        ) {
          res.y = bound.y + bound.height - currentBound.height;
        }
      });

      return res;
    }
}

export default new Adsorptioner();
