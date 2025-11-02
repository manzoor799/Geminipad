import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Note } from '../types';

interface EditorProps {
    note: Note;
    onUpdate: (updatedNote: Partial<Note>) => void;
}

function Editor({ note, onUpdate }: EditorProps) {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [status, setStatus] = useState<'synced' | 'saving' | 'offline'>('synced');
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

    const handleUpdate = useCallback(() => {
        setStatus('saving');
        onUpdate({ title, content });
        setTimeout(() => setStatus('synced'), 1000); // Simulate network latency
    }, [title, content, onUpdate]);

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
        setViewMode('edit'); // Reset to edit mode when note changes
    }, [note]);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (title !== note.title || content !== note.content) {
                handleUpdate();
            }
        }, 2000); // Autosave delay

        return () => {
            clearTimeout(handler);
        };
    }, [title, content, note.title, note.content, handleUpdate]);

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto w-full">
                <div className="flex justify-between items-start mb-4">
                     <div className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(note.updatedAt).toLocaleString()} | {content.split(' ').filter(Boolean).length} words
                    </div>
                     <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
                        <button onClick={() => setViewMode('edit')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${viewMode === 'edit' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary-700 dark:text-primary-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}>Edit</button>
                        <button onClick={() => setViewMode('preview')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${viewMode === 'preview' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary-700 dark:text-primary-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}>Preview</button>
                    </div>
                </div>

                {viewMode === 'edit' ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="w-full bg-transparent text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white focus:outline-none mb-6"
                    />
                ) : (
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 break-words">{title}</h1>
                )}
                
                {viewMode === 'edit' ? (
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing here..."
                        className="w-full bg-transparent text-base md:text-lg text-gray-700 dark:text-gray-300 focus:outline-none resize-none leading-relaxed font-mono"
                        style={{ minHeight: 'calc(100vh - 250px)' }}
                    />
                ) : (
                     <div className="markdown-content text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed" style={{ minHeight: 'calc(100vh - 300px)' }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Editor;