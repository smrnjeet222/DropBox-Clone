import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 min-w-screen min-h-screen">
      <header className="m-auto text-center text-white text-4xl">
        <p className="mb-8 ">Hello Vite + React!</p>
        <p>
          <button
            className="px-4 py-2 my-8  border-2 border-yellow-400 focus:ring-2 focus:outline-none"
            onClick={() => setCount((count) => count + 1)}>
            count is: {count} 
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
