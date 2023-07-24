import Navbar from './components/Navbar'

import { Textarea } from './components/ui/textarea'

function App() {
  return (
    <>
      <Navbar />
      <div className='flex justify-center'>
        <Textarea className='w-1/2' />
      </div>
    </>
  )
}

export default App
