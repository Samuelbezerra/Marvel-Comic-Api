import React, { useState, useEffect } from 'react'
import "./Cart.css"

import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox"
import "@reach/combobox/styles.css";
import { useParams } from "react-router-dom"
import { fetchComic } from '../../utils'

function Cart({ }) {
  const [address, setAddress] = useState()
  const [addressNumber, setAddressNumber] = useState()
  const [buyed, setBuyed] = useState(false)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD2bvdMbv206GJat2VbssUVfJumciap-CM",
    libraries: ["places"]
  });
  const [comic, setComic] = useState()
  let { id } = useParams()
  const [error, setError] = useState(false)

  function Search() {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
        location: {
          lat: () => -7.221540,
          lng: () => -39.326760
        },
        radius: 200 * 1000
      }
    })


    return <Combobox onSelect={address => {
      setValue(address)
      window.localStorage.setItem("address", address)
    }}>
      <ComboboxInput required className='marvel__cart--search' value={value} onChange={e => {
        setValue(e.target.value)
      }} disabled={!ready} placeholder="Enter address" />
      <ComboboxPopover>
        {status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
      </ComboboxPopover>
    </Combobox>
  }

  useEffect(() => {
    fetchComic(id)
      .then(data => {
        setComic(data.data.results[0])
      })
      .catch(() => setError(true))
  }, [])


  if (error) {
    return (
      <div className="marvel__cart--error">
        You have reached your daily request limit or error fetching the comic. use other api key or try again later.
      </div>
    )
  }

  if (!comic) {
    return (
      <div className="marvel__details--error">
        Error fetching the comic or That comic doesn't exist
      </div>
    )
  }

  return !buyed ? <form onSubmit={(e) => {
    e.preventDefault()
  }} className='marvel__cart'>
    <div className="marvel__cart--form">
      <h2>Shipping</h2>
      <Search />
      <input required className='marvel__cart--search' type="text" name='number' placeholder='Address number' id="number" value={addressNumber} onChange={e=>setAddressNumber(e.target.value)} />
      <h2>Payment details</h2>
      <div className="marvel__cart--form--input">
        <label htmlFor='name-card'>Name on card</label>
        <input required id="name-card" type="text" name="name-card" placeholder='Your name and surname' />
      </div>
      <div className="marvel__cart--form--input">
        <label htmlFor='card-number'>Card number</label>
        <input required id="card-number" type="number" name="card-number" placeholder='1111-2222-3333-4444' />
      </div>
      <div className="marvel__cart--form--input w-50">
        <div className=" w-50">
          <label htmlFor='expiring-date'>Expiring date</label>
          <input required id="expiring-date" type="text" name="expiring-date" placeholder='09-28' />
        </div>
        <div className="w-50">
          <label htmlFor='cvc'>CVC</label>
          <input required id="cvc" type="number" name="cvc" placeholder='***' />
        </div>
      </div>
      <button onClick={()=>setBuyed(!buyed)}className='marvel__cart--buynow'>Buy Now</button>
    </div>
    <div className="marvel__cart--comic">
      <h1>You are buying</h1>
      {comic.title}
      <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="comic" />
    </div>
  </form> : <h1 className='marvel__confirmation'>You have buyed {comic.title}, we are sending the item to {window.localStorage.getItem("address") + ", " + addressNumber}</h1>

}

export default Cart