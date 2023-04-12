import React from 'react'
import "./About.css"

type Props = {}

function About({}: Props) {
  return (
    <div className='marvel__about'>
      That's not a real company. Made by Samuel Bezerra as a Brisanet challenge project. Marvel and google maps APIs were used in the website. Thank you for analyzing my app, I hope I can bring value to the company and help you guys to be the most desired brand with the largest number of people connected in the Northeast. 
      <br />  
      <br />
      <span>Disclaimer: The limit of searchable comics placed in the API was 50, so you can't search more than 50 at once. The maximum limit that the API allow me use is 100. If there is a error fetching the data, probably my API key have reached the daily request limit. I am not very good at designing also so sorry about it.</span>
    </div>
  )
}

export default About