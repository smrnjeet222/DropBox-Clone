import { useEffect, useReducer } from "react";
import { db } from "~/firebase";
import { useAuth } from "~/hooks/AuthContext"

export const ROOT_FOLDER = {
  name: "Root",
  id: null,
  path: [],
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SELECT_FOLDER":
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      }
    case "UPDATE_FOLDER":
      return {
        ...state,
        folder: payload.folder,
      }
    case "SET_CHILD_FOLDERS":
      return {
        ...state,
        childFolders: payload.childFolders,
      }
    case "SET_CHILD_FILES":
      return {
        ...state,
        childFiles: payload.childFiles,
      }
    default:
      return state
  }
}

export function useFolder(folderId = null, folder = null) {
  const { curUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({ type: "SELECT_FOLDER", payload: { folderId, folder } });
  }, [folderId, folder])

  useEffect(() => {
    if (!folderId) {
      return dispatch({ type: "UPDATE_FOLDER", payload: { folder: ROOT_FOLDER } })
    }
    db.folders.doc(folderId).get()
      .then((doc) => {
        const fdoc = db.formatDoc(doc)
        return dispatch({
          type: "UPDATE_FOLDER",
          payload: { folder: fdoc }
        })
      }).catch((err) => {
        console.log(err)
        return dispatch({ type: "UPDATE_FOLDER", payload: { folder: ROOT_FOLDER } })
      })
  }, [folderId])


  useEffect(() => {
    return db.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", curUser.uid)
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        dispatch({
          type: "SET_CHILD_FOLDERS",
          payload: { childFolders: snapshot.docs.map(db.formatDoc) },
        })
      })
  }, [folderId, curUser])

  useEffect(() => {
    return db.files
      .where("folderId", "==", folderId)
      .where("userId", "==", curUser.uid)
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        dispatch({
          type: "SET_CHILD_FILES",
          payload: { childFiles: snapshot.docs.map(db.formatDoc) },
        })
      })
  }, [folderId, curUser])


  return state
}
