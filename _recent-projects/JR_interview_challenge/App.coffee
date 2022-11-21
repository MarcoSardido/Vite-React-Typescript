import React, { useState } from 'react'
import './style.css'

interface IPoint {
  x: number;
  y: number;
}

const App = () => {
  const [points, setPoints] = useState<IPoint[]>([]);
  const [removedPoints, setRemovedPoints] = useState<IPoint[]>([]);

  const addPoint = (e: React.MouseEvent<HTMLDivElement>) => {
    setPoints([
      ...points,
      { x: e.clientX, y: e.clientY }
    ])
  }

  const undoPoint = () => {
    const newPoint = [...points];
    const remove = newPoint.pop();
    setPoints(newPoint);
    
    if (remove) {
      setRemovedPoints([
        ...removedPoints,
        { x: remove.x, y: remove.y }
      ])
    }
  }

  const redoPoint = () => {
    const newPoint = [...points];
    const removedPoint = [...removedPoints];
    removedPoint.pop();
    newPoint.push(removedPoints[removedPoints.length - 1])
    setPoints(newPoint);
    setRemovedPoints(removedPoint)
  }

  return (
    <>
      <button disabled={points.length === 0} onClick={undoPoint}>Undo Click</button>
      <button disabled={removedPoints.length === 0} onClick={redoPoint}>Redo Click</button>
      <div onClick={addPoint} className="area">
        {points.map((point, index) => (
          <div key={index} className="point" style={{ left: point.x - 5 + 'px', top: point.y + 5 + 'px' }}></div>
        ))}
      </div>
    </>
  )
}

export default App