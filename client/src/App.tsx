/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Navbar from './components/Navbar'
// import { Textarea } from './components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import Canvas from './pages/Canvas'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const socket = io('http://localhost:3000/')

// const socket = io('https://socket-backend-f7w4.onrender.com/')

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

  const handleTextChange = (newText: string, event: KeyboardEvent) => {
    event.preventDefault()
    setText(newText)
    socket.emit('send-doc', { text: newText })
  }

  return (
    <>
      <Navbar />
      <div className='ml-[15%] overflow-hidden '>
        <Tabs defaultValue='docs' activationMode='automatic'>
          <TabsList className='rounded-xl'>
            <TabsTrigger value='docs' className='rounded-xl'>
              Docs
            </TabsTrigger>
            <TabsTrigger value='canvas' className='rounded-xl'>
              Canvas
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='docs'
            className='w-screen h-[600px] dark:text-white'
          >
            {/* <Textarea
              className='w-2/3 rounded-2xl'
              value={text}
              onChange={handleTextChange}
              aria-autocomplete='inline'
            /> */}
            <ReactQuill
              className='w-2/3 dark:text-gray-300  '
              value={text}
              onChange={handleTextChange}
              placeholder='Start writing here.....'
              style={{ height: '500px' }}
            />
          </TabsContent>
          <TabsContent value='canvas'>
            <Canvas />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default App
