// Write your code here
import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = (props) => {
    const {team} = props
    const {name,teamImageUrl,id} = team
  return (
    
    <li className="team-item">
    <Link to={`/team-matches/${id}`} className="link">
      <img src={teamImageUrl} alt={name} className="team-logo" />
      <p className="team-name">{name}</p>
    </Link>
  </li>
   
  )
}

export default TeamCard
