import React from 'react'
import { Link } from 'react-router-dom';
import RegiShelter from './RegiShelter.jsx'

const Reigster = () => {
  return (
    <>
      <h2>등록</h2>
      <Link to='/register/location'>통제 구역 등록</Link>
      <RegiShelter />
      

    </>

  )
}

export default Reigster