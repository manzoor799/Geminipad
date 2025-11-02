
import React, { useState } from 'react';
import { Note } from '../types';
import { SparklesIcon, SendIcon } from '../constants';
import * as geminiService from '../services/geminiService';

interface AiCopilotProps {
    note: Note;
    onUpdate: (updatedNote: Partial<Note>) => void;
    onSuggestTitle: () => Promise<void>;
}

type AiAction = 'summarize' | 'rewrite' | 'expand' | 'translate' | 'suggestTitle';

const AiActionButton = ({ label, onClick, isLoading }: { label: string, onClick: () => void, isLoading: boolean }) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-wait"
    >
        {label}
    </button>
);


function AiCopilot({ note, onUpdate, onSuggestTitle }: AiCopilotProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [activeAction, setActiveAction] = useState<AiAction | null>(null);

    const handleAiAction = async (action: AiAction) => {
        if (!note.content) return;

        setIsLoading(true);
        setActiveAction(action);
        let result: string | null = null;
        try {
            switch (action) {
                case 'summarize':
                    result = await geminiService.summarizeText(note.content);
                    break;
                case 'rewrite':
                    result = await geminiService.rewriteText(note.content, 'more professional');
                    break;
                case 'expand':
                    result = await geminiService.expandText(note.content);
                    break;
                case 'translate':
                    result = await geminiService.translateText(note.content, 'Urdu');
                    break;
                case 'suggestTitle':
                    await onSuggestTitle();
                    break;
            }

            if (result) {
                onUpdate({ content: result });
            }
        } catch (error) {
            console.error(`Error during AI action: ${action}`, error);
            // Optionally show an error to the user
        } finally {
            setIsLoading(false);
            setActiveAction(null);
        }
    };

    return (
        <aside className="w-80 border-l border-gray-200 dark:border-gray-800 p-4 flex-col hidden lg:flex">
            <div className="flex items-center space-x-2 mb-4">
                <SparklesIcon className="w-5 h-5 text-primary-500" />
                <h3 className="text-lg font-semibold">AI Copilot</h3>
            </div>
            <div className="flex-1 space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Quick Actions:</p>
                <AiActionButton label="Summarize" onClick={() => handleAiAction('summarize')} isLoading={isLoading && activeAction === 'summarize'} />
                <AiActionButton label="Rewrite Professionally" onClick={() => handleAiAction('rewrite')} isLoading={isLoading && activeAction === 'rewrite'} />
                <AiActionButton label="Expand on this" onClick={() => handleAiAction('expand')} isLoading={isLoading && activeAction === 'expand'} />
                <AiActionButton label="Translate to Urdu" onClick={() => handleAiAction('translate')} isLoading={isLoading && activeAction === 'translate'} />
                <AiActionButton label="Suggest a Title" onClick={() => handleAiAction('suggestTitle')} isLoading={isLoading && activeAction === 'suggestTitle'} />
            </div>
            <div className="mt-auto">
                 <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Ask AI anything...</p>
                 <div className="relative">
                    <input type="text" placeholder="e.g., 'fix grammar'" className="w-full bg-gray-100 dark:bg-gray-800 rounded-md py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-primary-500">
                        <SendIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default AiCopilot;
