import { debounce, throttle } from 'lodash-es';
import React from 'react';
import './index.css';

class Ripple extends React.Component {
  state = {
    animating: false,
    x: 0,
    y: 0,
  };

  randomColor = () => Math.floor(Math.random() * 256);

  path = (e: MouseEvent) => {
    let div: HTMLDivElement | null = document.createElement('div');
    div.style.left = `${e.pageX}px`;
    div.style.top = `${e.pageY}px`;
    div.style.width = '0px';
    div.style.height = '0px';
    div.style.backgroundColor = `rgba(${this.randomColor()}, ${this.randomColor()}, ${this.randomColor()}, 0.3)`;
    div.className = 'ripple animating';
    document.body.appendChild(div);
    requestAnimationFrame(() => {
      div!.style.width = '200px';
      div!.style.height = '200px';
      div!.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    });

    setTimeout(() => {
      document.body.removeChild(div!);
      div = null;
    }, 2000);
  };

  ripple = (e: MouseEvent) => {
    let div: HTMLDivElement | null = document.createElement('div');
    div.style.left = `${e.pageX}px`;
    div.style.top = `${e.pageY}px`;
    div.style.width = '0px';
    div.style.height = '0px';
    div.style.backgroundColor = `rgba(${this.randomColor()}, ${this.randomColor()}, ${this.randomColor()}, 0.3)`;
    div.className = 'ripple animating';
    document.body.appendChild(div);
    requestAnimationFrame(() => {
      div!.style.width = '50vw';
      div!.style.height = '50vw';
      div!.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    });

    setTimeout(() => {
      document.body.removeChild(div!);
      div = null;
    }, 1000);
  };

  ref: HTMLDivElement | null = null;

  // throttleRipple = throttle(this.ripple, 1000)

  debounceRipple = debounce(this.ripple, 18);

  componentDidMount() {
    // window.addEventListener('mousemove', this.throttleRipple, true);
    window.addEventListener('mousedown', this.debounceRipple, true);
  }

  componentWillUnmount() {
    // window.removeEventListener('mousemove', this.throttleRipple, true);
    window.removeEventListener('mousedown', this.debounceRipple, true);
  }

  render() {
    return null;
  }
}

export default Ripple;
