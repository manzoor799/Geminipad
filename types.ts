
export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string | null;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface Folder {
  id: string;
  name: string;
}
