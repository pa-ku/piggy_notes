import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Note } from '../types';

import EditorTopBar from './EditorTopBar';

interface EditorProps {
  note: Note | null;
  onUpdate: (note: Note) => void;
}

export function Editor({ note, onUpdate }: EditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [localContent, setLocalContent] = useState(note?.content || '');
  const [localTitle, setLocalTitle] = useState(note?.title || '');

  useEffect(() => {
    setLocalContent(note?.content || '');
    setLocalTitle(note?.title || '');
  }, [note?.id]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
    if (note) {
      onUpdate({
        ...note,
        content: e.target.value,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    if (note) {
      onUpdate({
        ...note,
        title: e.target.value,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 bg-gradient-to-tl dark:to-background-light dark:from-background-dark">
        <p className="text-gray-500 dark:text-gray-400">Select a note or create a new one</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-white dark:bg-background-dark">
    <EditorTopBar isPreview={isPreview} setIsPreview={setIsPreview} localTitle={localTitle} handleTitleChange={handleTitleChange} />
      <div className="flex-1 p-5 overflow-y-auto dark:bg-background-light rounded-l-3xl rounded-r-xl mr-3 mb-3">
        {isPreview ? (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {localContent}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={localContent}
            onChange={handleContentChange}
            placeholder="Begin writing your best notes here..."
            className="p-5 w-full h-full resize-none focus:outline-none bg-transparent dark:text-white font-mono"
          />
        )}
      </div>
    </div>
  );
}