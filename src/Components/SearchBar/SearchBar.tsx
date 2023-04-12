import React, {useRef} from 'react'
import "./SearchBar.css"
import { fetchComics, fetchComicsByTitle } from '../../utils'

type Props = {
    setter: any
}

const SearchBar = ({setter}: Props) => {
    let input: any = useRef("")

    const handleClick = async ()=> {
        let value: String = input.current.value;
        let comics:any = await fetchComics()
        if (value == "") return setter(comics.data.results)

        try {
          let comics = await fetchComicsByTitle(value);
          setter(comics.data.results)
        } catch (err) {
          console.log(err)
        }
    }
  return (
    <form onSubmit={e=>{
        e.preventDefault()
        handleClick()
      }} className='marvel__searchbar'>
        <input type="text" placeholder='Search Comic...' ref={input}/>
        <button onClick={handleClick}>Search</button>
    </form>
  )
}

export default SearchBar