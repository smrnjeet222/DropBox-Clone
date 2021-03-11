import React from 'react'
import { useHistory } from 'react-router';
import AuthContainer from '~/container/AuthContainer'
import { useAuth } from '~/store/AuthContext';

export default function Dashboard() {

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
        <AuthContainer>
            <span>Dashboard</span>
            <button className="ml-36 px-4 py-2 text-white bg-red-500" onClick={handleLogOut}>Log Out</button>
            <pre>{JSON.stringify(curUser, null, 2)}</pre>
        </AuthContainer>
    )
}
