import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import debounce from 'lodash/debounce';
import MonacoEditor from 'react-monaco-editor';
import { Resizable } from 're-resizable';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';

import run from './evaluator';

const options = {
  selectOnLineNumbers: true,
};

const useStyles = makeStyles(theme => ({
  header: {
    height: 60,
    backgroundColor: theme.palette.primary.main,
  },
  runButton: {
    marginRight: theme.spacing(2),
  },
  main: {
    display: 'flex',
    height: 'calc(100vh - 120px)',
  },
  ide: {
    boxSizing: 'border-box',
    height: '100%',
    minWidth: '10%',
    borderRight: [[6, 'solid', '#d5d5d5']],
    padding: theme.spacing(1),
  },
  output: {
    minWidth: '10%',
    boxSizing: 'border-box',
    padding: [[theme.spacing(1), theme.spacing(2)]],
  },
  footer: {
    height: 60,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Wrapper() {
  const classes = useStyles();

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [outputSize] = useState({ width: '60%', height: '100%' });

  const editorRef = useRef(null);
  const enabledResize = useMemo(() => ({ right: true }), []);

  const editorDidMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.focus();
  }, [editorRef]);

  const adjustEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, []);

  const onResizeOutput = useCallback(debounce(adjustEditor), [editorRef]);

  const onRunCode = useCallback(() => {
    console.log(code);
    try {
      setOutput(run(code));
    } catch (e) {
      setOutput(e.message);
    }
  }, [code, setOutput]);

  useEffect(() => {
    window.addEventListener('resize', adjustEditor);
    return () => {
      document.removeEventListener('resize', adjustEditor);
    };
  }, []);

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.runButton}
            onClick={onRunCode}
            color="inherit"
            aria-label="menu"
          >
            <PlayArrow />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Eval Scheme
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Resizable
          className={classes.ide}
          enable={enabledResize}
          minWidth="10%"
          maxWidth="90%"
          defaultSize={outputSize}
          onResize={onResizeOutput}
        >
          <MonacoEditor
            width="100%"
            height="100%"
            language="scheme"
            theme="vs-light"
            value={code}
            options={options}
            onChange={setCode}
            editorDidMount={editorDidMount}
          />
        </Resizable>
        <div className={classes.output}>
          Output:
          {output}
        </div>
      </main>
      <footer className={classes.footer} />
    </>
  );
}
