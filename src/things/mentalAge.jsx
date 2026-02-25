import React from 'react'
import MentalForm from './mentalForm'
import { Link } from "react-router-dom";


const MentalAge = () => {
  return (
    <div>

      <nav className="navbar mx-auto max-w-5xl border-b border-base-300 px-4">
        <div className="flex-1">
          <span className="text-lg font-bold tracking-tight">Souldex</span>
        </div>
        <div className="hidden flex-none gap-2 md:flex">
          <button className="btn btn-ghost btn-sm normal-case">Tests</button>
          <Link
            to="/"
            className="btn btn-ghost btn-sm normal-case"
          >
            Back
          </Link>
        </div>
      </nav>


      <div className='ml-[50vh]  mr-[50vh]'>
        <MentalForm />
      </div>

    </div>
  )
}

export default MentalAge