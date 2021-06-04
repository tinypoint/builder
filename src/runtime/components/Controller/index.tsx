import React from "react";
import "./index.css";
import dragger from "./features/dragger";
import resizer from "./features/resizer";
import { State } from "../../../editor/store";
import { connect } from "react-redux";

interface Props {
  select: State["select"];
  hover: State["hover"];
}

const initState = {
  visible: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

class Controller extends React.Component<Props> {
  clickTimer: any = null;

  select = (list: HTMLElement[]) => {
    for (let i = 0, len = list.length; i < len; i++) {
      const dom = list[i];
      if (dom.hasAttribute("data-builder-tracker")) {
        return;
      }
      const type = dom.getAttribute("data-builder-type");
      if (type) {
        const id = dom.getAttribute("id");

        (window as any).store.dispatch({
          type: "CHANGE_VALUE",
          payload: [{ key: "select", value: id }],
        });

        return;
      }
    }

    (window as any).store.dispatch({
      type: "CHANGE_VALUE",
      payload: [{ key: "select", value: "" }],
    });
  };

  onClick = (e: MouseEvent) => {
    const list = e.composedPath().slice(0, -2) as HTMLElement[];
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
      this.clickTimer = 0;
    }
    this.clickTimer = setTimeout(() => {
      this.select(list);
    }, 300);
  };

  onDoubleClick = (e: MouseEvent) => {
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
      this.clickTimer = 0;
    }
  };

  onMouseOver = (e: MouseEvent) => {
    const list = e.composedPath().slice(0, -2) as HTMLElement[];
    for (let i = 0, len = list.length; i < len; i++) {
      const dom = list[i];
      if (dom.hasAttribute("data-builder-tracker")) {
        return;
      }
      const type = dom.getAttribute("data-builder-type");
      if (type) {
        const id = dom.getAttribute("id");

        (window as any).store.dispatch({
          type: "CHANGE_VALUE",
          payload: [{ key: "hover", value: id }],
        });

        return;
      }
    }

    (window as any).store.dispatch({
      type: "CHANGE_VALUE",
      payload: [{ key: "hover", value: "" }],
    });
  };

  onMouseLeave = () => {
    (window as any).store.dispatch({
      type: "CHANGE_VALUE",
      payload: [{ key: "hover", value: "" }],
    });
  }

  onDragStart = (e: MouseEvent) => {
    e.preventDefault();
  };

  _mousehasdown = false;

  onMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).getAttribute("data-builder-dotdir")) {
      const type = (
        e.target as HTMLElement
      ).parentElement!.parentElement!.getAttribute("data-builder-anchor");

      if (type === "hover") {
        (window as any).store.dispatch({
          type: "CHANGE_VALUE",
          payload: [
            {
              key: "select",
              value: (window as any).store.getState().hover,
            },
          ],
        });
      }
      resizer.start(e);
      return;
    }
    this._mousehasdown = true;
    window.addEventListener("mousemove", this.onMouseMove, true);
  };

  _mousehasmove = false;

  onMouseMove = (e: MouseEvent) => {
    window.removeEventListener("mousemove", this.onMouseMove, true);
    if (!this._mousehasdown) {
      return;
    }
    // drag
    this.select(e.composedPath().slice(0, -2) as HTMLElement[]);
    dragger.start(e);
    this._mousehasmove = true;
  };

  onMouseUp = (e: MouseEvent) => {
    window.removeEventListener("mousemove", this.onMouseMove, true);

    if (!this._mousehasdown) {
      this._mousehasmove = false;
      this._mousehasdown = false;
      return;
    }

    if (!this._mousehasmove) {
      this.onClick(e);
    }

    this._mousehasmove = false;
    this._mousehasdown = false;
  };

  componentDidMount() {
    window.addEventListener("scroll", this.track, true);
    this._looptimer = setInterval(this.track, 300);

    this._mutationObserver!.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    document.body.addEventListener("dragstart", this.onDragStart);

    document.body.addEventListener("mousedown", this.onMouseDown);

    document.body.addEventListener("mouseup", this.onMouseUp);

    document.body.addEventListener("mouseover", this.onMouseOver);
    
    document.body.addEventListener("mouseleave", this.onMouseLeave);

    document.body.addEventListener("dblclick", this.onDoubleClick);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.select !== this.props.select) {
      this.clearSelect();
    }

    if (prevProps.hover !== this.props.hover) {
      this.clearHover();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.track, true);
    clearInterval(this._looptimer);
    this._mutationObserver!.disconnect();
    this._mutationObserver = null;

    document.body.removeEventListener("dragstart", this.onDragStart);

    document.body.removeEventListener("mousedown", this.onMouseDown);

    document.body.removeEventListener("mouseup", this.onMouseUp);

    document.body.removeEventListener("mouseover", this.onMouseOver);

    document.body.removeEventListener("mouseleave", this.onMouseLeave);

    document.body.removeEventListener("dblclick", this.onDoubleClick);
  }

  // track start

  _state = {
    select: initState,
    hover: initState,
  };

  _ticking = false;

  _track = () => {
    const { select } = this.props;
    if (select) {
      const element = document.getElementById(select);

      if (element) {
        const elementRect = element.getBoundingClientRect();
        const {
          x: sx,
          y: sy,
          width: swidth,
          height: sheight,
          visible,
        } = this._state.select;
        const { x, y, width, height } = elementRect;
        if (
          sx !== x ||
          sy !== y ||
          swidth !== width ||
          sheight !== height ||
          !visible
        ) {
          this._setState({
            select: {
              visible: true,
              x,
              y,
              width,
              height,
            },
          });
        }
      } else {
        this.clearSelect();
      }
    } else {
      this.clearSelect();
    }

    const { hover } = this.props;
    if (hover) {
      const element = document.getElementById(hover);

      if (element) {
        const elementRect = element.getBoundingClientRect();
        const {
          x: sx,
          y: sy,
          width: swidth,
          height: sheight,
          visible,
        } = this._state.hover;
        const { x, y, width, height } = elementRect;
        if (
          sx !== x ||
          sy !== y ||
          swidth !== width ||
          sheight !== height ||
          !visible
        ) {
          this._setState({
            hover: {
              visible: true,
              x,
              y,
              width,
              height,
            },
          });
        }
      } else {
        this.clearHover();
      }
    } else {
      this.clearHover();
    }
  };

  track = () => {
    if (!this._ticking) {
      window.requestAnimationFrame(() => {
        this._track();
        this._ticking = false;
      });

      this._ticking = true;
    }
  };

  clearSelect = () => {
    const { x: sx, y: sy, width: swidth, height: sheight } = initState;
    const { x, y, width, height, visible } = this._state.select;
    if (
      sx !== x ||
      sy !== y ||
      swidth !== width ||
      sheight !== height ||
      visible
    ) {
      this._setState({
        select: initState,
      });
    }
  };

  clearHover = () => {
    const { x: sx, y: sy, width: swidth, height: sheight } = initState;
    const { x, y, width, height, visible } = this._state.hover;
    if (
      sx !== x ||
      sy !== y ||
      swidth !== width ||
      sheight !== height ||
      visible
    ) {
      this._setState({
        hover: initState,
      });
    }
  };

  _setState = (args: any) => {
    this._state = {
      ...this._state,
      ...args,
    };
    (window.parent as any)._track(args);
  };

  _mutationObserver: MutationObserver | null = new MutationObserver(this.track);

  _looptimer: any = 1;

  // track end

  render() {
    return null;
  }
}

export default connect((state: State) => {
  return {
    select: state.select,
    hover: state.hover,
  };
})(Controller);
