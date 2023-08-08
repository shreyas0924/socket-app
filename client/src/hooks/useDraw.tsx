import { useEffect, useRef, useState } from 'react'
// import { Draw, Point } from '../types/typing'

export type Draw = {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
}
export type Point = { x: number; y: number }

const useDraw = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) => {
  const [mouseDown, setMouseDown] = useState(false)
  const [isClear, setIsClear] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPoint = useRef<null | Point>(null)

  const onMouseDown = () => setMouseDown(true)

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsClear(!isClear)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return
      const currentPoint = computePointInCanvas(e)

      const ctx = canvasRef.current?.getContext('2d')
      if (!ctx || !currentPoint) return

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current })
      prevPoint.current = currentPoint
    }

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      return { x, y }
    }

    const mouseUpHandler = () => {
      setMouseDown(false)
      prevPoint.current = null
    }

    // Add event listeners
    canvasRef.current?.addEventListener('mousemove', handler)
    window.addEventListener('mouseup', mouseUpHandler)

    // Remove event listeners
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvasRef.current?.removeEventListener('mousemove', handler)
      window.removeEventListener('mouseup', mouseUpHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDraw])

  return { canvasRef, onMouseDown, clear }
}

export default useDraw
