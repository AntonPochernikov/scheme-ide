import React, { useState, useCallback } from 'react';
// import MonacoEditor from 'react-monaco-editor';

const options = {
  selectOnLineNumbers: true
};

export default function App() {
  const [code, setCode] = useState('');

  const editorDidMount = useCallback((editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }, []);

  const onChange = useCallback((newValue, e) => {
    console.log('onChange', newValue, e);
  }, []);

  return (
    <div>
      <main>
        {/* <MonacoEditor
          monaco={monaco}
          width="800"
          height="600"
          language="scheme"
          // theme="vs-dark"
          value={code}
          options={options}
          onChange={setCode}
          editorDidMount={editorDidMount}
        /> */}
      </main>
    </div>
  );
}
