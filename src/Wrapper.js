import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ResizableBox } from 'react-resizable';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const options = {
  selectOnLineNumbers: true,
};

const useStyles = makeStyles((theme) => ({
  header: {
    height: 60,
    backgroundColor: theme.palette.primary.main,
  },
  main: {
    display: 'flex',
    height: 'calc(100vh - 120px)',
  },
  ide: {
    height: '100%',
    minWidth: '10%',
    width: '100%',
  },
  output: {
    minWidth: '10%',
    width: '100%',
  },
  footer: {
    height: 60,
  },
}));

export default function Wrapper() {
  const [code, setCode] = useState('');

  const classes = useStyles();

  const editorRef = useRef(null);

  const editorDidMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.focus();
  }, []);

  const adjustEditor = useCallback(() => {
    if (editor.current) {
      editor.current.editor.layout();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', adjustEditor);
    return () => {
      document.removeEventListener('resize', adjustEditor);
    };
  }, []);

  return (
    <>
      <header className={classes.header}>
        <Button>Run</Button>
      </header>
      <main className={classes.main}>
        <ResizableBox axis="x" className={classes.ide}>
          <MonacoEditor
            width="100%"
            height="100%"
            language="scheme"
            // theme="vs-dark"
            value={code}
            options={options}
            onChange={setCode}
            editorDidMount={editorDidMount}
          />
        </ResizableBox>
        <ResizableBox axis="x" className={classes.output}>
          output
        </ResizableBox>
      </main>
      <footer className={classes.footer} />
    </>
  );
}
