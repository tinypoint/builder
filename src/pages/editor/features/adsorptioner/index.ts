import { Bound } from "../../store";

class Adsorptioner {
    Adsorptioner = Adsorptioner;

    calc = (currentBound: Bound, bounds: Bound[], threshold: number, leftdir: number, topdir: number) => {

        const res = { ...currentBound }
        bounds.forEach((bound) => {

            if (/* consider left */leftdir) {
                if (
                    /* current left vs sibling left */ Math.abs(
                    currentBound.x - bound.x
                ) <= threshold
                ) {
                    const x = bound.x;
                    const width = currentBound.width + currentBound.x - x

                    if (width >= 0) {
                        res.x = x
                        res.width = width
                    }
                }

                if (
                    /* current left vs sibling right */ Math.abs(
                    currentBound.x - (bound.x + bound.width)
                ) <= threshold
                ) {
                    const x = bound.x + bound.width
                    const width = currentBound.width + currentBound.x - x

                    if (width >= 0) {
                        res.x = x
                        res.width = width
                    }

                }
            } else {
                /* no consider left */
                if (
                    /* current right vs sibling left */ Math.abs(
                    currentBound.x + currentBound.width - bound.x
                ) <= threshold
                ) {
                    const width = bound.x - currentBound.x
                    if (width >= 0) {
                        res.width = width
                    }
                }

                if (
                    /* current right vs sibling right */ Math.abs(
                    currentBound.x + currentBound.width - (bound.x + bound.width)
                ) <= threshold
                ) {
                    const width = bound.x + bound.width - currentBound.x
                    if (width >= 0) {
                        res.width = width
                    }
                }
            }

            if (/* consider top */topdir) {
                if (
                    /* current top vs sibling top */ Math.abs(
                    currentBound.y - bound.y
                ) <= threshold
                ) {
                    const y = bound.y;
                    const height = currentBound.height + currentBound.y - y

                    if (height >= 0) {
                        res.y = y
                        res.height = height
                    }
                }

                if (
                    /* current top vs sibling right */ Math.abs(
                    currentBound.y - (bound.y + bound.height)
                ) <= threshold
                ) {
                    const y = bound.y + bound.height
                    const height = currentBound.height + currentBound.y - y

                    if (height >= 0) {
                        res.y = y
                        res.height = height
                    }

                }
            } else {
                /* no consider top */
                if (
                    /* current right vs sibling top */ Math.abs(
                    currentBound.y + currentBound.height - bound.y
                ) <= threshold
                ) {
                    const height = bound.y - currentBound.y
                    if (height >= 0) {
                        res.height = height
                    }
                }

                if (
                    /* current right vs sibling right */ Math.abs(
                    currentBound.y + currentBound.height - (bound.y + bound.height)
                ) <= threshold
                ) {
                    const height = bound.y + bound.height - currentBound.y
                    if (height >= 0) {
                        res.height = height
                    }
                }
            }



            // if (
            //   /* sibling left vs current left | current right */ Math.abs(
            //     bound.x - currentBound.x
            // ) <= threshold ||
            //     Math.abs(bound.x - (currentBound.x + currentBound.width)) <= threshold
            // ) {
            //   /* left */ ctx.strokeRect(bound.x, 0, 1, 1552);
            // }

            // if (
            //   /* sibling right vs current left | current right */ Math.abs(
            //     bound.x + bound.width - currentBound.x
            // ) <= threshold ||
            //     Math.abs(
            //         bound.x + bound.width - (currentBound.x + currentBound.width)
            //     ) <= threshold
            // ) {
            //   /* right */ ctx.strokeRect(bound.x + bound.width, 0, 1, 1552);
            // }

            // if (
            //     /* sibling top vs current top | current bottom */
            //     Math.abs(bound.y - currentBound.y) <= threshold ||
            //     Math.abs(bound.y - (currentBound.y + currentBound.height)) <= threshold
            // ) {
            //   /* top */ ctx.strokeRect(0, bound.y, 750, 1);
            // }

            // if (
            //     /* sibling bottom vs current top | current bottom */
            //     Math.abs(bound.y + bound.height - currentBound.y) <= threshold ||
            //     Math.abs(
            //         bound.y + bound.height - (currentBound.y + currentBound.height)
            //     ) <= threshold
            // ) {
            //   /* bottom */ ctx.strokeRect(0, bound.y + bound.height, 750, 1);
            // }
        });


        return res
    }
}

export default new Adsorptioner;