import { useRef } from "react";
import { Editor } from "@monaco-editor/react";

interface MonacoEditorProps {
  onResultChange: (result: string) => void;
}

const MonacoEditor = (props: MonacoEditorProps) => {
  const editorRef = useRef<any>();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleRunCode = () => {
    try {
      const code = editorRef.current?.getValue();
      if (code) {
        const result = eval(code);
        props.onResultChange(result);
      }
    } catch (error) {
      props.onResultChange(`Error: ${error}`);
    }
  };

  return (
    <div>
      <Editor
        onMount={handleEditorDidMount}
        language="typescript"
        theme="vs-dark"
        defaultValue="// TypeScript and JavaScript only. More languages will be implemented in the future"
        height="50vh"
        width="45vw"
      />
      <button id="editorRun" onClick={handleRunCode}>
        Run Code
      </button>
    </div>
  );
};

export default MonacoEditor;
