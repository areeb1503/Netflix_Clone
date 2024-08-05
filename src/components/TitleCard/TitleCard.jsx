import React, { useEffect, useRef, useState } from 'react'
import './Titlecard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
const TitleCard = ({title,category}) => {
  const cardsRef=useRef()
  const [apiData,setApiData]=useState([])
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWRiZjM5ZDJiM2M1NGU4M2M0MzI3NjQyMTFlNjI5OCIsIm5iZiI6MTcyMjc1NTA2MS4wNzIyMjQsInN1YiI6IjY2YWYyNTQ1NzQ0M2YyNzk3OWJkYThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RXVdg45sCsKYWXeP8w-b7vDA5rZb5b_-HEnKsAdPgts'
    }
  };
  
  
 

  const handleWheel=(e)=>{
    // e.preventDefault();
    // cardsRef.current.scrollLeft+=e.deltaY;
  }
 
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  
    
   
   
    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])
  return (
    <div className='title-cards'>
    <h2>{title ? title : "Popular On Netflix"}</h2>
    <div className="card-list" ref={cardsRef}>
      {Array.isArray(apiData) && apiData.length > 0 ? (
        apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </div>
  )
}

export default TitleCard