import React from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks/AuthContext'

export default function Navbar() {

  const { logout, curUser } = useAuth();
  const history = useHistory();

  const handleLogOut = async () => {
    try {
      await logout();
      history.push('/login')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-between items-center py-4 px-16 mb-8 bg-purple-400">
      <Link to="/"
        className="text-2xl font-black"
      >
        DumpBox
      </Link>
      <div className="flex items-center gap-6">
        <p className="font-semibold">{curUser.email}</p>
        <button className="ml-6 px-4 py-2 rounded text-white bg-red-500"
          onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  )
}
