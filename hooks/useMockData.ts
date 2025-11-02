import { useState, useEffect } from 'react';
import { Note, Folder } from '../types';

const defaultFolders: Folder[] = [
  { id: 'folder-1', name: 'Project Phoenix' },
  { id: 'folder-2', name: 'Meeting Notes' },
  { id: 'folder-3', name: 'Personal Ideas' },
];

const defaultNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Welcome to Gemini Notepad',
    content: '## Hello, World!\n\nThis is your first note. You can use **Markdown** to format your text. Feel free to explore the AI features in the right panel.\n\n* Summarize\n* Rewrite\n* Expand\n\nStart writing and see your ideas come to life!',
    folderId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFavorite: true,
  },
];

const getInitialData = (userId: string) => {
  try {
    const item = window.localStorage.getItem(`gemini-notepad-data-${userId}`);
    if (item) {
      const parsedData = JSON.parse(item);
      // Basic validation
      if (parsedData.notes && parsedData.folders) {
        return parsedData;
      }
    }
  } catch (error) {
    console.error("Error reading from localStorage", error);
  }
  
  // Return default data for new users
  return { notes: defaultNotes, folders: defaultFolders };
};

export const useMockData = (userId: string | null) => {
  const [data, setData] = useState(() => {
    if (!userId) return { notes: [], folders: [] };
    return getInitialData(userId);
  });

  const { notes, folders } = data;

  useEffect(() => {
    if (userId) {
      setData(getInitialData(userId));
    } else {
      // Clear data on logout
      setData({ notes: [], folders: [] });
    }
  }, [userId]);
  
  useEffect(() => {
    if (userId) {
      try {
        window.localStorage.setItem(`gemini-notepad-data-${userId}`, JSON.stringify({ notes, folders }));
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
    }
  }, [notes, folders, userId]);

  const setNotes = (newNotes: Note[] | ((prevNotes: Note[]) => Note[])) => {
    setData(prevData => {
      const updatedNotes = typeof newNotes === 'function' ? newNotes(prevData.notes) : newNotes;
      return { ...prevData, notes: updatedNotes };
    });
  };

  const setFolders = (newFolders: Folder[] | ((prevFolders: Folder[]) => Folder[])) => {
     setData(prevData => {
      const updatedFolders = typeof newFolders === 'function' ? newFolders(prevData.folders) : newFolders;
      return { ...prevData, folders: updatedFolders };
    });
  };

  return { notes, setNotes, folders, setFolders };
};
