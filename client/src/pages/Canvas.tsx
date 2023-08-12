/* eslint-disable no-empty-pattern */
import { FC, useRef, useState } from 'react'
import { useDraw, Draw } from '../hooks/useDraw'
import { ChromePicker } from 'react-color'
import { io } from 'socket.io-client'

interface pageProps {}

const Canvas: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>('#000')

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)
  const socketRef = useRef(io('https://socket-backend-f7w4.onrender.com/'))

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5

    const startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()

    // Send canvas data over socket
    if (canvasRef.current) {
      sendCanvasData(canvasRef.current)
    }
  }

  function sendCanvasData(canvas: HTMLCanvasElement) {
    const image = new Image()

    image.onload = () => {
      const canvasDataUrl = getCanvasDataUrl(canvas)
      socketRef.current.emit('canvasData', canvasDataUrl)
      console.log('Sent canvas data:', canvasDataUrl)
    }

    image.src = getCanvasDataUrl(canvas)
  }

  function getCanvasDataUrl(canvas: HTMLCanvasElement) {
    return canvas.toDataURL() // Converts the canvas image to a base64 string
  }

  return (
    <div className=' bg-white flex justify-center items-center border-gray-950 mr-[25%] mt-5 p-5'>
      <div className='flex flex-col gap-10 p-10'>
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type='button'
          className='p-2 rounded-md border border-black text-black'
          onClick={clear}
        >
          Clear canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={500}
        height={500}
        className='border border-black rounded-md'
      />
    </div>
  )
}

export default Canvas
