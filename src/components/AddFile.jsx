import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidV4 } from 'uuid';
import { db, storage } from '~/firebase';
import { useAuth } from '~/hooks/AuthContext';
import { ROOT_FOLDER } from '~/hooks/useFolder';

export default function AddFile({ currentFolder }) {

  const { curUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([])

  const handleUpload = (e) => {
    e.preventDefault();

    const files = e.target.files[0];
    if (!currentFolder || !files) return;

    const id = uuidV4(); 
    setUploadingFiles(p => [
      ...p,
      {id: id, name: files.name, progress: 0, error: null}
    ])

    const parentPath = currentFolder.path.map(d => d.id)

    const filePath = (currentFolder === ROOT_FOLDER) ? 
      [...parentPath, files.name].join('/')
      : 
      [...parentPath, currentFolder.id, files.name].join('/')

    console.log(filePath);

    const uploadTask = storage
      .ref(`/files/${curUser.uid}/${filePath}`)
      .put(files)

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles(p => p.map((upFile)=> {
          if(upFile.id === id) {
            return { ...upFile, progress: progress  }
          }
          return upFile
        }))
      }, (err) => {
        setUploadingFiles(p => p.map((upFile)=> {
          if(upFile.id === id) {
            return { ...upFile, error: "Failed"  }
          }
          return upFile
        }))
      }, () => {
        setUploadingFiles(pf => pf.filter(upFile => upFile.id !== id))

        uploadTask.snapshot.ref.getDownloadURL()
          .then(url => {

            db.files
              .where('name' ,'==', files.name)
              .where('userId', '==', curUser.uid)
              .where('folderId', '==', currentFolder.id)
              .get()
              .then(fls => {
                const file = fls.doc?.[0]
                if (file) {
                  file.ref.update({url: url})
                } else {
                  db.files.add({
                    url: url,
                    name: files.name,
                    createdAt: db.getTime(),
                    folderId: currentFolder.id,
                    userId: curUser.uid
                  })
                }
              })
          })
      }
    )
  }

  return (
    <>
      <label
        className="inline-flex mx-10 items-center px-4 py-2 border border-gray-300 
          rounded-md shadow-sm text-sm font-medium 
          text-white bg-green-500 hover:bg-green-600
          focus:outline-none focus:ring-2 focus:ring-offset-1 
          focus:ring-green-400"
      >
        Upload
        
        <input type="file"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
      {uploadingFiles.length > 0  && 
        createPortal(
          <div className="absolute bottom-4 right-4 max-w-xs">
            {uploadingFiles.map(file => (
              <div key={file.id}
              >
                <p className="truncate">{file.name}</p>
                {Math.round(file.progress * 100)} &nbsp;
                {file.error}
                <progress value={file.progress * 100} max="100" />
              </div>
            ))}
          </div>,
          document.body
        )
      }
    </>
  )
}
