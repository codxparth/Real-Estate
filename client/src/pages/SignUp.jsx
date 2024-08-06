import React from 'react'
import { Link } from 'react-router-dom';
export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7 ">SignUp</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className='border p-3 rounded-lg' id="username"  />
        <input type="email" placeholder="email" className='border p-3 rounded-lg' id="email" />
        <input type="password" placeholder="password" className='border p-3 rounded-lg' id="password" />
        <button className="bg-slate-700 text-white hover:opacity-70 duration-300 rounded-lg p-3">Signup</button>
        <button className="bg-red-700 text-white rounded-lg hover:opacity-70 duration-300 p-3">Continue with google</button>
       <div className="flex flex-row gap-x-2 ">
            <h3>Have an account? </h3>
            <Link to={"/sign-in"}>
              <span className="text-blue-700">Signin</span>
            </Link>
       </div>
      </form>
     
    </div>


  )
}
