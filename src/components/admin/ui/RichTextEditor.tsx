"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-slate-100 animate-pulse rounded-xl" />,
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "code-block"],
      ["clean"],
    ],
  };

  return (
    <div className="prose-editor">
      <QuillEditor
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden min-h-[300px]"
      />
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border-color: var(--color-slate-200);
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          background: white;
        }
        .dark .ql-toolbar.ql-snow {
          border-color: var(--color-slate-800);
          background: var(--color-slate-950);
        }
        .ql-container.ql-snow {
          border-color: var(--color-slate-200);
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          min-height: 300px;
          font-family: inherit;
        }
        .dark .ql-container.ql-snow {
          border-color: var(--color-slate-800);
        }
        .ql-editor {
          min-height: 300px;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
