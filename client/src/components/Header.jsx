import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="shadow-md bg-slate-200">
       <div className=' flex  justify-between items-center max-w-[1050px] mx-auto p-3'>
            <Link to='/'>
                 {/* 1. logo vala part  */}
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500">Real</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
            </Link>

            {/* 2 . search bar vala part */}

            <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64"/>
                <FaSearch className='text-slate-600 '/>
            </form>

            {/* 3 . home abut sign in */ }
            <ul className=" flex gap-6">
                <Link to="/">
                <li className="text-slate-500 hidden sm:inline hover:underline cursor-pointer">
                    Home
                </li>
                </Link>

                <Link to="/about">
                <li className="text-slate-500 hidden sm:inline hover:underline cursor-pointer">
                    About
                </li>
                </Link>

                <Link to="/sign-in">
                <li className="text-slate-900 hover:underline cursor-pointer">
                    Signin
                </li>
                </Link>

            </ul>
       </div>
    </header>
  )
}
