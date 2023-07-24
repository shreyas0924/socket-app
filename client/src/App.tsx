import Navbar from './components/Navbar'

import { Textarea } from './components/ui/textarea'

function App() {
  return (
    <>
      <Navbar />
      <div className='flex gap-4'>
        <Textarea className='w-1/2' />
        <Textarea className='w-1/2' />
      </div>
    </>
  )
}

export default App
