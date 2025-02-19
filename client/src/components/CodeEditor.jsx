import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode,  handleSubmit, selectedLanguage, handleClear }) {

  return (
    <div className="relative">
      <Editor
        language={selectedLanguage}
        value={code}
        onChange={(newValue) => setCode(newValue || "")}
        className="w-full  h-[450px] font-mono text-sm bg-transparent rounded resize-none overflow-auto"
      />

      {/* <Editor
        language={selectedLanguage}
        value={code}
        onChange={(newValue) => setCode(newValue || "")}
        className="w-full h-[450px] p-4 font-mono text-sm bg-transparent rounded resize-none overflow-auto"
        options={{
          minimap: { enabled: true },
          scrollbar: { vertical: "hidden" },
          lineNumbers: "off",
          renderLineHighlight: "none",
          renderBorder: false
        }}
      /> */}

      {code.length > 0 && <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-400 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2 mt-3"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="w-full bg-gray-400 text-white py-2 rounded-lg text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center gap-2 mt-3"
        >
          Clear
        </button>
      </div>}
    </div>
  );
}
