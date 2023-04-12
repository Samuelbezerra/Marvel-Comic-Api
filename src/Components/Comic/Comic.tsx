import React from 'react'
import {Link} from "react-router-dom"
import "./Comic.css"

type Props = {
  name: String
  thumbnail: any
  id: any
}

function Comic({id, name, thumbnail}: Props) {
  return (
    <Link className='marvel__home--comic' to={`/comic/${id}`}>
      <img src={thumbnail} alt="thumbnail" />
      <h1>{name}</h1>
    </Link>
  )
}

export default Comic