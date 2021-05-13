import React from 'react'
import { useAuth } from '~/hooks/AuthContext';
import Navbar from '~/components/Navbar';
import AddFolder from '~/components/AddFolder';
import { useFolder } from '~/hooks/useFolder';
import Folder from '../../components/Folder';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import AddFile from '../../components/AddFile';

export default function Home() {

  const { curUser } = useAuth();
  const { folderId } = useParams();
  const { state = {} } = useLocation();

  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);

  let path = folder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  if (folder) path = [...path, ...folder.path]

  return (
    <>
      <Navbar />
      <div className="mx-auto w-3/4">
        <div className="flex justify-between">
          <div className="flex gap-2 align-text-bottom">
            {path.map((d) => (
              <Link key={d.id}
                to={{
                  pathname: d.id ? `/folder/${d.id}` : "/",
                  state: { folder: { ...folder, path: path.slice(1,) } }
                }}
                className="text-xl hover:text-indigo-600"
              >
                {d.name} /
              </Link>
            ))}
            <h2 className="text-2xl"> {folder?.name} </h2>

          </div>
          <div>
            <AddFile currentFolder={folder} />
            <AddFolder currentFolder={folder} />
          </div>
        </div>
        <br />
        <br />
        <div className="flex gap-5">
          {childFolders?.map(fldr => (
            <div key={fldr.id} >
              <Folder folder={fldr} />
            </div>
          ))}
        </div>
        <br />
        <div className="flex gap-5">
          {childFiles?.map(fl => (
            <div key={fl.id} >
              <a href={fl.url} target="_blank">{fl.name}</a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
