/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Navbar from './components/Navbar'
import { Textarea } from './components/ui/textarea'

const socket = io('http://localhost:3000')

function App() {
  const [text, setText] = useState<string>('')

  useEffect(() => {
    console.log('Sending doc:', text)
    socket.emit('send-doc', { text })

    socket.on('receive-doc', (e) => {
      console.log('Received doc:', e.text)
      setText(e.text)
    })

    return () => {
      console.log('Cleaning up')
      socket.off('receive-doc')
    }
  }, [])

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setText(newText)

    socket.emit('send-doc', { text: newText })
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center'>
        <Textarea className='w-1/2' value={text} onChange={handleTextChange} />
        {/* <Textarea className='w-1/2' value={text} onChange={handleTextChange} /> */}
      </div>
    </>
  )
}

export default App
