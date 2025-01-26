import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 place-content-evenly mt-2">
        <NavLink className="text-white font-bold px-2 py-1 text-center  w-20 hover:rounded-xl hover:inset-ring-1 hover:inset-ring-violet-400" to={'/'}>
            Home
        </NavLink>

        <NavLink className="text-white font-bold px-2 py-1 text-center  w-20 hover:rounded-xl hover:inset-ring-1 hover:inset-ring-violet-400" to={'/pastes'}>
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar