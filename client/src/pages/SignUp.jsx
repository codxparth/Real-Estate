import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
export default function SignUp() {

  
    const [formData , setformData] = useState({});
    const [error  , seterror] = useState(null);
    const [loading , setloading] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) =>{
      setformData({
        ...formData,
        [e.target.id] : e.target.value
      })
    }

    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
        setloading(true);
        const res = await  fetch("/api/auth/signup" , 
          {
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(formData)
          }
        );
        const data  = await res.json();
        console.log(data)
        if(data.sucess === false){
          setloading(false)
          seterror(data.message)
         
          return;
        }
        setloading(false)
        seterror(null)
        navigate('/sign-in')
      }

      catch(error){
        setloading(false)
        seterror(error.message)
      }
     
      
    }
  
  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7 ">SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className='border p-3 rounded-lg' id="username"  onChange={handleChange}/>
        <input type="email" placeholder="email" className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
        <input type="password" placeholder="password" className='border p-3 rounded-lg' id="password" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white hover:opacity-70 duration-300 rounded-lg p-3">{loading ? 'loading...' : 'Signup'}</button>
        <button className="bg-red-700 text-white rounded-lg hover:opacity-70 duration-300 p-3">Continue with google</button>
       <div className="flex flex-row gap-x-2 ">
            <h3>Have an account? </h3>
            <Link to={"/sign-in"}>
              <span className="text-blue-700">Signin</span>
            </Link>
       </div>
      </form>
     {error &&  <p className="text-red-500 mt-5 "> {error}</p>}
    </div>


  )
}