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
    <div className="flex justify-between m-6">
      <Link to="/"><h1>GOOGLE DRIVE</h1></Link>
      <div className="flex">
        <p>Profile</p>
        <button className="ml-6 px-4 py-2 text-white bg-red-500"
          onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  )
}
