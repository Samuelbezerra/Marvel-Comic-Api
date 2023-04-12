import React, {useState, useEffect} from 'react'
import "./ComicDetails.css"

import {useParams} from "react-router-dom"
import { fetchComic } from '../../utils'

type Props = {}


function ComicDetails({}: Props) {
  let {id}:any = useParams()
  const [comic, setComic]: any = useState()
  const [error, setError]:any = useState(false)
  

  useEffect(() => {
    fetchComic(id)
    .then(data=>setComic(data.data.results[0]))
    .catch(()=>setError(true));
  },[]);

  if(error) {
    return (
      <div className="marvel__details--error">
        You have reached your daily request limit or error fetching the comic. use other api key or try again later.
      </div>
    ) 
  }

  if(!comic) {
    return (
      <div className="marvel__details--error">
        Error fetching the comic or That comic doesn't exist
      </div>
    )
  }

  console.log(comic)

  return (
    <div className='marvel__details'>
      <div className="marvel__details--container">
        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="comic image" />
        <div className="marvel__details--container--text">
          <h4>Title:</h4>
          <p>{comic.title}</p>
          <h4>Created by:</h4>
          {
            comic.creators.items.map((creator:any, key:any)=>(
              <p key={key} className="">{creator.name}</p>
            ))
          }
          <h4>Price:</h4>
          <p>${comic.prices[0].price}</p>
          <button onClick={()=>{
            window.location.pathname = `/cart/${id}`}}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default ComicDetails