import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';
import AiCopilot from './AiCopilot';
import Header from './Header';
import { Note } from '../types';
import { useMockData } from '../hooks/useMockData';
import { suggestTitle } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';

interface NotepadAppProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

function NotepadApp({ isDarkMode, toggleDarkMode }: NotepadAppProps) {
    const { user } = useAuth();
    const { notes, setNotes, folders } = useMockData(user?.uid ?? null);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        // Set initial active note when notes are loaded for a user
        if (notes.length > 0 && !notes.find(n => n.id === activeNoteId)) {
            setActiveNoteId(notes[0].id);
        } else if (notes.length === 0) {
            setActiveNoteId(null);
        }
    }, [notes, activeNoteId]);
    
    const activeNote = notes.find(note => note.id === activeNoteId);

    const createNewNote = () => {
        const newNote: Note = {
            id: `note-${Date.now()}`,
            title: 'Untitled Note',
            content: '',
            folderId: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isFavorite: false,
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setActiveNoteId(newNote.id);
    };

    const updateNote = (updatedNote: Partial<Note>) => {
        setNotes(prevNotes => prevNotes.map(note =>
            note.id === activeNoteId ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() } : note
        ));
    };

    const deleteNote = (noteId: string) => {
        setNotes(prevNotes => {
            const remainingNotes = prevNotes.filter(note => note.id !== noteId);
            if (activeNoteId === noteId) {
                setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
            }
            return remainingNotes;
        });
    };
    
    const handleSuggestTitle = async (content: string) => {
        if (!content.trim()) return;
        const title = await suggestTitle(content);
        if (title) {
            updateNote({ title });
        }
    }

    return (
        <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar
                notes={notes}
                folders={folders}
                activeNoteId={activeNoteId}
                onSelectNote={setActiveNoteId}
                onCreateNewNote={createNewNote}
                onDeleteNote={deleteNote}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />
            <div className="flex-1 flex flex-col transition-all duration-300" style={{ marginLeft: sidebarOpen ? '288px' : '0' }}>
                <Header
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main className="flex-1 flex overflow-hidden">
                    {activeNote ? (
                        <>
                            <Editor
                                key={activeNote.id}
                                note={activeNote}
                                onUpdate={updateNote}
                            />
                            <AiCopilot
                                note={activeNote}
                                onUpdate={updateNote}
                                onSuggestTitle={() => handleSuggestTitle(activeNote.content)}
                            />
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold">No note selected</h2>
                                <p>Create a new note or select one from the list to start.</p>
                                <button onClick={createNewNote} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition">
                                    Create Note
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default NotepadApp;
