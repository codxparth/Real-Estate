import React from 'react'
import { Link } from 'react-router-dom'
export default function SignIn() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7 ">Signin</h1>
      <form className='flex flex-col gap-4'>
      <input type="email" placeholder="email" className='border p-3 rounded-lg' id="email" />
      <input type="password" placeholder="password" className='border p-3 rounded-lg' id="password" />
      <button className="bg-slate-700 text-white hover:opacity-70 duration-300 rounded-lg p-3">Signin</button>
      <button className="bg-red-700 text-white rounded-lg hover:opacity-70 duration-300 p-3">Continue with google</button>
      <div className="flex flex-row gap-x-2 ">
            <h3>Don't have an account? </h3>
            <Link to={"/sign-up"}>
              <span className="text-blue-700">Signup</span>
            </Link>
       </div>
      </form>
    </div>
  )
}
