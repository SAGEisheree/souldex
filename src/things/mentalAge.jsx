import React from 'react'
import MentalForm from './mentalForm'
import { Link } from "react-router-dom";
import Navbar from "./navbar";


const MentalAge = () => {
  return (
    <div>

      <div className="-z-10 absolute opacity-50 inset-0 bg-[linear-gradient(to_right,#ffffff99_1px,transparent_1px),linear-gradient(to_bottom,#ffffff99_1px,transparent_1px)] bg-[size:60px_60px]">
      </div>

      <Navbar />


      <div className=''>
        <MentalForm />
      </div>

    </div>
  )
}

export default MentalAge