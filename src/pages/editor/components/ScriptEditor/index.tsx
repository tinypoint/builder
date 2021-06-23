import React, { useRef, useEffect } from 'react';
import { editor as Editor } from 'monaco-editor';
import './index.css';
import Drawer from '@material-ui/core/Drawer';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import store, { State } from '../../store';
import historyer from '../../features/historyer';

// @ts-ignore
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorkerUrl(_moduleId: any, label: string) {
    if (label === 'json') {
      return '/json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return '/css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return '/html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return '/ts.worker.bundle.js';
    }
    return '/editor.worker.bundle.js';
  },
};

const connector = connect((state: State) => ({
  scriptEditorVisible: state.scriptEditorVisible,
  scriptText: state.scriptText,
}));

type IProps = ConnectedProps<typeof connector>;

const ScriptEditor: React.FC<IProps> = (props: IProps) => {
  const { scriptEditorVisible, scriptText } = props;
  const divEl = useRef<HTMLDivElement>(null);
  let editor: Editor.IStandaloneCodeEditor;
  useEffect(() => {
    if (divEl.current) {
      if (!editor) {
        editor = Editor.create(divEl.current, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
          language: 'typescript',
        });
      }
      editor.setValue(scriptText);
    }
    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  }, [scriptEditorVisible]);

  return (
    <Drawer
      anchor="bottom"
      open={scriptEditorVisible}
      keepMounted
      onClose={() => {
        store.dispatch({
          type: 'CHANGE_VALUE',
          payload: [
            { key: 'scriptEditorVisible', value: !scriptEditorVisible },
          ],
        });
      }}
    >
      <div>
        <Button onClick={() => {
          historyer.pushScriptText(editor.getValue());
        }}
        >
          save
        </Button>
        <Button onClick={() => {
          store.dispatch({
            type: 'CHANGE_VALUE',
            payload: [{ key: 'scriptEditorVisible', value: false }],
          });
        }}
        >
          close
        </Button>
      </div>
      <div className="Editor" ref={divEl} />
    </Drawer>
  );
};

export default connector(ScriptEditor);
