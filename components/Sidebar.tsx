
import React, { useState } from 'react';
import { Note, Folder } from '../types';
import { PlusIcon, FolderIcon, FileTextIcon, StarIcon, TrashIcon, SparklesIcon } from '../constants';

interface SidebarProps {
    notes: Note[];
    folders: Folder[];
    activeNoteId: string | null;
    onSelectNote: (id: string) => void;
    onCreateNewNote: () => void;
    onDeleteNote: (id: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const NavItem = ({ icon, label, count, isActive }: { icon: React.ReactNode, label: string, count?: number, isActive?: boolean }) => (
    <a href="#" className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <div className="flex items-center space-x-3">
            {icon}
            <span>{label}</span>
        </div>
        {count && <span className="text-xs text-gray-500">{count}</span>}
    </a>
);

const NoteItem = ({ note, isActive, onSelect, onDelete }: { note: Note, isActive: boolean, onSelect: () => void, onDelete: (e: React.MouseEvent) => void }) => (
    <div
        onClick={onSelect}
        className={`group flex justify-between items-start p-3 rounded-md cursor-pointer ${isActive ? 'bg-primary-100 dark:bg-primary-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
    >
        <div className="flex-1 overflow-hidden">
            <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-primary-800 dark:text-primary-200' : 'text-gray-800 dark:text-gray-100'}`}>{note.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{note.content || 'No content'}</p>
        </div>
        <button onClick={onDelete} className="ml-2 p-1 rounded text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <TrashIcon className="w-4 h-4" />
        </button>
    </div>
);


function Sidebar({ notes, folders, activeNoteId, onSelectNote, onCreateNewNote, onDeleteNote, isOpen, setIsOpen }: SidebarProps) {
    return (
        <aside className={`absolute z-10 lg:relative flex-shrink-0 w-72 bg-gray-50 dark:bg-gray-900/70 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 flex flex-col h-full transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <SparklesIcon className="w-7 h-7 text-primary-500" />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">GeminiPad</span>
                </div>
                 <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
            </div>
            
            <div className="p-4">
                <button onClick={onCreateNewNote} className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-md hover:bg-primary-700 transition-transform transform hover:scale-105 shadow">
                    <PlusIcon className="w-5 h-5" />
                    <span>New Note</span>
                </button>
            </div>

            <nav className="px-4 space-y-1">
                <NavItem icon={<FileTextIcon className="w-5 h-5" />} label="All Notes" count={notes.length} isActive={true} />
                <NavItem icon={<StarIcon className="w-5 h-5" />} label="Favorites" count={notes.filter(n => n.isFavorite).length} />
            </nav>

            <div className="mt-4 px-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Folders</h3>
                <div className="space-y-1">
                    {folders.map(folder => (
                        <NavItem key={folder.id} icon={<FolderIcon className="w-5 h-5" />} label={folder.name} count={notes.filter(n => n.folderId === folder.id).length} />
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 mt-2 space-y-2">
                {notes.map(note => (
                    <NoteItem
                        key={note.id}
                        note={note}
                        isActive={note.id === activeNoteId}
                        onSelect={() => onSelectNote(note.id)}
                        onDelete={(e) => { e.stopPropagation(); onDeleteNote(note.id); }}
                    />
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
