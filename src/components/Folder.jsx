import React from 'react'
import { Link } from 'react-router-dom'

export default function Folder({ folder }) {
  if (folder)
    return (
      <Link
        className="inline-flex items-center px-4 py-2 border border-gray-300 
        rounded-md shadow-sm text-sm font-medium 
        text-gray-700 bg-white hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-indigo-500"
        to={{
          pathname: folder.id ? `/folder/${folder.id}` : '/',
          state: { folder: folder }
        }}
      >
        {folder.name}
      </Link>
    )
  else return null
}
