/* eslint-disable no-empty-pattern */
import { FC, useEffect, useState } from 'react'
import useDraw, { Draw } from '../hooks/useDraw'
import { ChromePicker } from 'react-color'
import useLocalStorage from '../hooks/useLocalStorage'

interface pageProps {}

const Canvas: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>('#000')
  const [canvasData, setCanvasData] = useLocalStorage('canvas', '')

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

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

    // Save canvas data to local storage
    setCanvasData(canvasRef.current?.toDataURL() ?? '')
  }

  useEffect(() => {
    if (canvasData) {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        context?.drawImage(img, 0, 0)
      }
      img.src = canvasData
      img.crossOrigin = 'anonymous'
    }
  }, [canvasData, canvasRef])

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
