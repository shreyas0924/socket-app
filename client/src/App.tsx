import Navbar from './components/Navbar'
import {io} from "socket.io-client"
import { Textarea } from './components/ui/textarea'
const socket = io("http://localhost:3001/")
function App() {
  socket.on("connection", () => { console.log("server connected") })
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
