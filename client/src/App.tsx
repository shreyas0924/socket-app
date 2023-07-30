import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Navbar from './components/Navbar'
import { Textarea } from './components/ui/textarea'

const socket = io('http://127.0.0.1:4000')

function App() {
  const [text, setText] = useState<string>('')

  useEffect(() => {

    socket.on("connection", () => console.log("Connected to Socket"))
    socket.on('textChange', (newText: string) => {
      setText(newText)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setText(newText)
    socket.emit('textChange', newText)
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center'>
        <Textarea className='w-1/2' value={text} onChange={handleTextChange} />
      </div>
    </>
  )
}

export default App