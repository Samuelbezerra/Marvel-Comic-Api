import React, {useState, useEffect} from 'react'
import "./Home.css"
import {Comic, Grid, SearchBar} from "../../Components/index"
import { fetchComics } from '../../utils'

type Props = {}

const IMAGE_SIZE = 'portrait_fantastic'


function Home({}: Props)  {
  const [comics,setComics]:any = useState([])
  const [error, setError]:any = useState(false)


  useEffect(() => {
    fetchComics()
    .then(data=>setComics(data.data.results))
    .catch(()=>setError(true));
    console.log(comics)
  },[]);
  

  return (
    <div className='marvel__home'>
      <h1>Discover Marvel Comics</h1>
      <SearchBar setter={setComics} />
        {    
          !error? 
            <Grid> 
              {comics.map((comic:any, id: any)=>(
                <Comic key={id} name={comic.title} thumbnail={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} id={comic.id} />))
              }
            </Grid>
          :
          <div className="marvel__home--error">
            You reached your daily request limit. use other api key or try again later.
          </div>
        }
    </div>
  )
}

export default Home