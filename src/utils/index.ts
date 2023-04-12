import MD5 from "crypto-js/md5"

const apiKey = "732a9c8db7524e6465f8791652c067a6"
const privateKey = "abe4b53cd16ff5dd180e52daf88bbcb3d8ee9b77"

const getHash = (ts:any, secretKey:any, publicKey:any)=> {
    return MD5(ts + secretKey + publicKey).toString()
}

const fetchComics  = async ()=> {
    let baseUrl = `https://gateway.marvel.com/v1/public/comics`

    let ts = Date.now().toString()
    let hash = getHash(ts, privateKey, apiKey)

    let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=50`

    try {
        let response = await fetch(url);
        let data = await response.json()
        return data
    } catch (err){
        console.error(err)
        return err
    }
}

const fetchComicsByTitle  = async (value:any)=> {
    let baseUrl = `https://gateway.marvel.com/v1/public/comics`

    let ts = Date.now().toString()
    let hash = getHash(ts, privateKey, apiKey)

    let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&titleStartsWith=${value}&limit=50`

    try {
        let response = await fetch(url);
        let data = await response.json()
        return data
    } catch (err){
        console.error(err)
        return err
    }
}

const fetchComic  = async (id:any)=> {
    let baseUrl = `https://gateway.marvel.com/v1/public/comics`

    let ts = Date.now().toString()
    let hash = getHash(ts, privateKey, apiKey)

    let url = `${baseUrl}/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`

    try {
        let response = await fetch(url);
        let data = await response.json()
        return data
    } catch (err){
        console.error(err)
        return err
    }
}

export {fetchComics, fetchComicsByTitle, fetchComic};