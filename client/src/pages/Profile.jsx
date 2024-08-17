import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from './../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice'

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser , loading , error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formdata, setFormdata] = useState({ username: currentUser.username, email: currentUser.email })
  const [updatesucess , setupdatesucess] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (file) {
      const storage = getStorage(app)
      const filename = new Date().getTime() + file.name
      const storageRef = ref(storage, filename)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setFilePerc(Math.round(progress))
        },
        (error) => {
          console.error('Upload failed:', error)
          setFileUploadError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormdata((prev) => ({ ...prev, avatar: downloadURL }))
            console.log('Upload complete!')
          })
        }
      )
    }
  }, [file])

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(updateUserStart())
  
    try {
      const token = currentUser.token; // Assuming token is stored in currentUser
  
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(formdata),
      })
  
      const data = await res.json()
  
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
  
      dispatch(updateUserSuccess(data))
      setupdatesucess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-9">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formdata.avatar || currentUser?.avatar || ''}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-5"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error uploading image (image must be less than 2 MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
          // disabled={filePerc > 0 && filePerc < 100}
        >
          {loading ?  'Loading...' : 'update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Signout</span>
      </div>
      <p className="text-red-700 mt-5">{error ?  error : ' '}</p>
      <p className="text-green-700 mt-5">{updatesucess ? 'User is updated sucessfully'  : ''}</p>
    </div>

  )
}
