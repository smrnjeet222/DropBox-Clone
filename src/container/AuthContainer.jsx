import React from 'react'

export default function AuthContainer({ children }) {
    return (
        <div className="flex min-w-screen min-h-screen">
            <div className="m-auto p-14 border-2 w-8/12 rounded-md">
                {children}
            </div>
        </div>
    )
}
