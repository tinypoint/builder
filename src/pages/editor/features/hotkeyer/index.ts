import hotkeys from 'hotkeys-js';
import eventer from '../eventer';

class Hotkeyer {
  Hotkeyer = Hotkeyer;

  init = () => {
    const iframe = document.getElementById('runtime')! as HTMLIFrameElement;

    const iframehotkeys = ((iframe!.contentWindow as any).hotkeys as typeof hotkeys);

    hotkeys('Backspace', eventer.delComp);

    iframehotkeys('Backspace', eventer.delComp);

    hotkeys('ctrl + d', eventer.duplicateComp);

    iframehotkeys('ctrl + d', eventer.duplicateComp);

    hotkeys('ctrl + c', eventer.copyComp);

    iframehotkeys('ctrl + c', eventer.copyComp);

    hotkeys('ctrl + x', eventer.cutComp);

    iframehotkeys('ctrl + x', eventer.cutComp);

    hotkeys('ctrl + v', eventer.pasteComp);

    iframehotkeys('ctrl + v', eventer.pasteComp);

    hotkeys('ctrl + g', eventer.saveTemplate);

    iframehotkeys('ctrl + g', eventer.saveTemplate);

    hotkeys('ctrl + z', eventer.undo);

    iframehotkeys('ctrl + z', eventer.undo);

    hotkeys('ctrl + y', eventer.redo);

    iframehotkeys('ctrl + y', eventer.redo);

    hotkeys('ctrl + s', (e) => {
      e.preventDefault();
      eventer.save();
    });

    iframehotkeys('ctrl + s', (e) => {
      e.preventDefault();
      eventer.save();
    });
  };
}

export default new Hotkeyer();
