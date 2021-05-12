import React from 'react'
import { useAuth } from '~/hooks/AuthContext';
import { db } from '~/firebase';
import { ROOT_FOLDER } from '../hooks/useFolder';

export default function AddFolder({ currentFolder }) {

  const { curUser } = useAuth();

  const handleNewFolder = (e) => {
    e.preventDefault();

    if (currentFolder == null) return;

    let name = prompt("Create New Folder", 'new folder')
    if (!name) return

    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({
        id: currentFolder.id,
        name: currentFolder.name,
      })
    }

    db.folders.add({
      name,
      userId: curUser.uid,
      parentId: currentFolder.id,
      path,
      createdAt: db.getTime(),
    })
  }

  return (
    <button
      className="inline-flex mx-10 items-center px-4 py-2 border border-gray-300 
        rounded-md shadow-sm text-sm font-medium 
        text-white bg-indigo-500 hover:bg-indigo-600
        focus:outline-none focus:ring-2 focus:ring-offset-1 
        focus:ring-indigo-400"
      onClick={handleNewFolder}
    >
      Add New Folder
    </button>
  )
}
