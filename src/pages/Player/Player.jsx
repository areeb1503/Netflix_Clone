import React, { useState ,useEffect} from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'  
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const navigate=useNavigate();
  const[apiData,setApiData]=useState({
    name:"",
    key:"",
    typeof:"",
    published_at:"",
  })
  const {id}=useParams();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWRiZjM5ZDJiM2M1NGU4M2M0MzI3NjQyMTFlNjI5OCIsIm5iZiI6MTcyMjc1NTA2MS4wNzIyMjQsInN1YiI6IjY2YWYyNTQ1NzQ0M2YyNzk3OWJkYThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RXVdg45sCsKYWXeP8w-b7vDA5rZb5b_-HEnKsAdPgts'
    }
  };
  

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  
    
  }, [])
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>navigate(-2)} />
      <iframe src={`https://www.youtube.com/embed/${apiData.key}` }height='90%' width='90%'title='trailer' frameBorder='0'allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>

    </div>
  )
}

export default Player