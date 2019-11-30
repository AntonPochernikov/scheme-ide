import React, { useState, useCallback } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { makeStyles } from '@material-ui/core/styles';

const options = {
  selectOnLineNumbers: true,
};

const useStyles = makeStyles({
  main: {

  },
});

export default function App() {
  const [code, setCode] = useState('');

  const classes = useStyles();

  const editorDidMount = useCallback((editor) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }, []);

  return (
    <>
      <main className={classes.main}>
        <MonacoEditor
          width="100%"
          height="600"
          language="scheme"
          // theme="vs-dark"
          value={code}
          options={options}
          onChange={setCode}
          editorDidMount={editorDidMount}
        />
      </main>
    </>
  );
}
