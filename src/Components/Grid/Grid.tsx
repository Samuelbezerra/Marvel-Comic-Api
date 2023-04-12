import React from 'react'
import "./Grid.css"

type Props = {
    children: any
}

function Grid({children}: Props) {
  return (
    <div className='grid'>{children}</div>
  )
}

export default Grid