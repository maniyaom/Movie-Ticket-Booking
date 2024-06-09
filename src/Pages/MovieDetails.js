import React from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
  const params = useParams();
  const {movieId} = params;
  console.log(movieId)
  return (
    <>
      <Navbar />
      <div>
        {movieId}
      </div>
    </>
  )
}

export default MovieDetails