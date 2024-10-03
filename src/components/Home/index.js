import { useState,useEffect } from 'react'
import TeamCard from '../TeamCard'
import './index.css'

const Home = () => {

    const [list,setList] = useState([])


    const getIplTeams = async ()=>{
        const response = await fetch('https://apis.ccbp.in/ipl')
        const data = await response.json()
        const updatedData = data.teams.map(each=>(
            {
                id:each.id,
                name:each.name,
                teamImageUrl:each.team_image_url,
            }
        ))
        setList(updatedData)
    }

    useEffect(() => {
        getIplTeams()
    }, []);
    
    const renderTeams = () =>{

        return(
            <ul className='ul-list'>
                {
                    list.map((team)=><TeamCard team={team} key={team.id}/>)
                }
            </ul>
        )
    }
    return (
        <div className="bg">
            <div className='head-container'>
            <img src='https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png' alt='logo' className='iplLogo'/>
            <h1>IPL Dashboard</h1>
            </div>
            {renderTeams()}
        </div>
    )
}

export default Home